import { addMarkers, removeMarkersByTag } from '../../src/utils/markers'
import festivals from '../../src/markers/festivals.zh'

describe('test markers', () => {
  const formatList: string[] = []
  const formatMap = new Map<string, MarkersInGlobalConfig>()
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

  it('test removeMarkersByTag function', () => {
    removeMarkersByTag(gbMarkers, '國際主題')
    expect(gbMarkers.formatMap.get('MMDD')?.get('0202')).toEqual(undefined)
    expect(gbMarkers.formatMap.get('MMDD')?.get('0204')).toEqual(undefined)
    expect(gbMarkers.formatMap.get('MMDD')?.get('1024')?.length ?? 0).toBe(0)
  })
})
