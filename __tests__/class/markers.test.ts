import { Markers } from '../../src/class/markers'
import festivals from '../../src/markers/festivals.zh'
import festivalsCN from '../../src/markers/festivals.zh-cn'
import lunisolar from '../../src'

describe('Test class Markers', () => {
  Markers.add(festivals)
  it('test Markers.add ', () => {
    expect(Markers.store.formatList).toEqual(['MMDD', 'M,d,dR', 'M,d,dRr', 'lMn,lDn'])
    // console.log(gbMarkers.formatMap.keys())
    expect(Array.from(Markers.store.formatMap.keys())).toEqual([
      'MMDD',
      'M,d,dR',
      'M,d,dRr',
      'lMn,lDn'
    ])

    const d1004 = Markers.store.formatMap.get('MMDD')?.get('1004')
    const d1004a = d1004 ? d1004[0] : undefined
    expect(d1004a?.tag).toEqual(['國際主題', 'environment'])
    expect(
      d1004?.map(v => {
        return v.name
      })
    ).toEqual(['世界動物日'])
  })

  it('Test markers.list  and markers.add and markers.remove', () => {
    const lsr = lunisolar('2023-10-19')
    const markers = new Markers(lsr)
    markers.add({ name: '这天要值班', tag: '备忘' })
    markers.add({ name: '今天我生日', tag: '生日' })
    // for (const item of markers) { // ES6
    //   console.log('test markers item', item)
    // }
    expect(markers.list.map(v => v.name)).toEqual(['这天要值班', '今天我生日'])
    markers
      .remove('生日', true)
      .add({ name: '重阳准备', tag: ['备忘2'], data: { desc: '樵园已经开始封路' } })
    expect(markers.list.map(v => v.name)).toEqual(['这天要值班', '重阳准备'])

    const marker = markers.list.find(v => v.name === '重阳准备')
    expect(marker?.data?.desc || '').toBe('樵园已经开始封路')
  })

  it('Test markers reset and clean', () => {
    const lsr = lunisolar('2023-10-23')
    lsr.markers.add({ name: '测试', tag: 'test' })
    expect(lsr.markers.list.map(v => v.name)).toEqual(['重陽節', '测试'])
    lsr.markers.reset()
    expect(lsr.markers.list.map(v => v.name)).toEqual(['重陽節'])
    lsr.markers.add({ name: '测试2', tag: 'test' })
    expect(lsr.markers.list.map(v => v.name)).toEqual(['重陽節', '测试2'])
    lsr.markers.clean(1)
    expect(lsr.markers.list.map(v => v.name)).toEqual(['测试2'])
    lsr.markers.clean(2)
    expect(lsr.markers.list.map(v => v.name)).toEqual([])
  })

  it('test markers filter and find', () => {
    lunisolar.Markers.clean().add(festivalsCN, '节日')
    const lsr = lunisolar('2023-03-03')
    lsr.markers.add({ name: '抄经', tag: 'work', data: { desc: '临写一次经飞经' } })
    expect(lsr.markers.toString()).toBe('世界野生动植物日,全国爱耳日,国际爱耳日,抄经')
    expect(lsr.markers.find({ name: '世界野生动植物日' })?.tag.join(',')).toBe(
      '国际主题,environment,节日'
    )
    expect(lsr.markers.find(v => v.name === '抄经')?.data?.desc ?? '').toBe('临写一次经飞经')
    expect(
      lsr.markers
        .filter({ tag: 'health' })
        .map(v => v.name)
        .join(',')
    ).toBe('全国爱耳日,国际爱耳日')
  })

  it('测试自定义节日列表', () => {
    const markersSetting: MarkersSetting = [
      {
        format: 'MMDD', // 将会使用lunisolar().format('MMDD')方法格式化日期
        markers: {
          '1019': {
            // 如果format方法返回值与此key匹配，则为当前日期会取得此marker
            tag: '生日',
            name: '我的生日'
          },
          '0919': {
            tag: ['生日', '吐槽'], // tag可以是数组
            name: '假的生日',
            data: {
              // 可以通过data，设定任何信息以便取用
              desc: '身份证是的生日写早了一个月, 所以公司都提早一个月给我庆生',
              color: '#aa0000'
            }
          }
        }
      },
      {
        format: 'lMn,lDn', // 农历月日
        markers: {
          '4,14': {
            // 农历四月十四
            tag: '生日',
            name: '吕洞宾诞辰',
            data: {
              desc: '西樵山大仙诞交通管制',
              color: '#00cccc'
            }
          }
        }
      }
    ]

    // 再编写自定义的日期备注列表
    const markersSetting2: MarkersSetting = [
      {
        format: 'MMDD', // 将会使用lunisolar().format('MMDD')方法格式化日期
        markers: {
          '1003': [
            {
              //同一日期可以设定多个marker
              tag: '任务',
              name: '带家人出去吃饭'
            },
            {
              tag: ['任务', '保险'],
              name: '交汽车保险'
            }
          ]
        }
      }
    ]

    lunisolar.Markers.add(markersSetting, '自定义节日').add(markersSetting2, '自定义备忘')

    const lsr1003 = lunisolar('2023-10-03').markers.list
    expect(lsr1003.map(v => v.name)).toEqual(['带家人出去吃饭', '交汽车保险'])

    const lsr0919 = lunisolar('2023-09-19')
    expect(lsr0919.markers.toString()).toBe('假的生日')
    expect(lsr0919.markers.find({ name: '假的生日' })?.data?.desc).toBe(
      '身份证是的生日写早了一个月, 所以公司都提早一个月给我庆生'
    )
    lunisolar.Markers.removeByTag('吐槽')
    expect(lunisolar('2023-09-19').markers.toString()).toBe('')
    expect(lsr0919.markers.toString()).toBe('假的生日')
    lsr0919.markers.reset()
    expect(lsr0919.markers.toString()).toBe('')
  })
})
