import { Markers } from '../../src/class/markers'
import festivals from '../../src/markers/festivals.zh'
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

  it('Test markers.list  and markers.add', () => {
    const lsr = lunisolar('2023-10-23')
    const markers = new Markers(lsr)
    markers.add({ name: '这天要值班', tag: '备忘' })
    // for (const item of markers.list) {
    //   console.log('test markers item', item)
    // }
    expect(markers.list.map(v => v.name)).toEqual(['重陽節', '这天要值班'])
  })
})
