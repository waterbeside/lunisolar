import { addMarkers, removeMarkersByTagOrName, removeMarkers } from '../../src/utils/markers'
import festivals from '../../src/markers/festivals.zh'

describe('test markers', () => {
  const formatList: string[] = []
  const formatMap = new Map<string, ConfigMarkersMatcherMap>()
  const fnList: ConfigMarkersFnListItem[] = []
  const gbMarkers: ConfigMarkers = { formatList, formatMap, fnList }
  addMarkers(gbMarkers, festivals, 'test')
  it('test addMarkers function', () => {
    expect(gbMarkers.formatList).toEqual(['MMDD', 'M,d,dR', 'M,d,dRr', 'lMn,lDn'])
    // console.log(gbMarkers.formatMap.keys())
    expect(Array.from(gbMarkers.formatMap.keys())).toEqual(['MMDD', 'M,d,dR', 'M,d,dRr', 'lMn,lDn'])

    const d1004 = gbMarkers.formatMap.get('MMDD')?.get('1004')
    const d1004a = d1004 ? d1004[0] : undefined
    expect(d1004a?.tag).toEqual(['國際主題', 'environment', 'test'])
    expect(
      d1004?.map(v => {
        return v.name
      })
    ).toEqual(['世界動物日'])

    expect(
      gbMarkers.formatMap
        .get('MMDD')
        ?.get('1024')
        ?.map(v => {
          return v.name
        })
    ).toEqual(['聯合國日', '程序員节'])
  })

  it('test removeMarkersByName function', () => {
    expect(
      gbMarkers.formatMap
        .get('MMDD')
        ?.get('0101')
        ?.map(v => v.name)
    ).toContain('元旦')
    removeMarkersByTagOrName(gbMarkers, '元旦', false)
    expect(gbMarkers.formatMap.get('MMDD')?.get('0101')).toEqual(undefined)
  })

  it('test remove markers', () => {
    expect(
      gbMarkers.formatMap
        .get('MMDD')
        ?.get('0303')
        ?.map(v => v.name)
    ).toEqual(['世界野生動植物日', '全國愛耳日', '國際愛耳日'])

    removeMarkers(gbMarkers, 'MMDD', ['0303'], ['全國愛耳日', '國際愛耳日'])
    expect(
      gbMarkers.formatMap
        .get('MMDD')
        ?.get('0303')
        ?.map(v => v.name)
    ).toEqual(['世界野生動植物日'])

    removeMarkers(gbMarkers, 'MMDD', '0303')
    expect(gbMarkers.formatMap.get('MMDD')?.get('0303')).toEqual(undefined)

    removeMarkers(gbMarkers, true, 't')
    expect(gbMarkers.fnList.length).toBe(0)
  })

  it('test removerMarker only by format', () => {
    expect(
      gbMarkers.formatMap
        .get('M,d,dRr')
        ?.get('1,0,1')
        ?.map(v => v.name)
    ).toEqual(['國際麻風節'])
    removeMarkers(gbMarkers, 'M,d,dRr')
    expect(gbMarkers.formatMap.get('M,d,dRr')).toEqual(undefined)
  })

  it('test removeMarkersByTag function', () => {
    removeMarkersByTagOrName(gbMarkers, '國際主題', true)
    expect(gbMarkers.formatMap.get('MMDD')?.get('0202')).toEqual(undefined)
    expect(gbMarkers.formatMap.get('MMDD')?.get('0204')).toEqual(undefined)
    expect(gbMarkers.formatMap.get('MMDD')?.get('1024')?.length ?? 0).toBe(0)
  })
})
