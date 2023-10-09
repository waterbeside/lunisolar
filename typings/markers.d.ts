type MarkersSettingItem = {
  tag: string | string[]
  data?: {
    [key: string]: any
  }
  name: string
}

type MarkerFormatFn = (lsr: lunisolar.Lunisolar) => string | null

type MarkersSetting = {
  format: string | MarkerFormatFn
  markers: {
    [key: string]: MarkersSettingItem | MarkersSettingItem[]
  }
}[]

type MarkerSetting = Pick<MarkersSettingItem, 'name'> & Partial<Omit<MarkersSettingItem, 'name'>>

type MarkersFnListItem = { fn: MarkerFormatFn; markers: MarkersMatcherMap }

type MarkersStore = {
  formatList: string[]
  formatMap: Map<string, MarkersMatcherMap>
  fnList: MarkersFnListItem[]
}

type StoreMarker = Pick<MarkersSettingItem, 'name' | 'data'> & { tag: string[] }
type MarkersMatcherMap = Map<string, ConfigMarker[]>

type LsrGetMarkersFn = (tag?: string | string[]) => ConfigMarker[]

type LsrMarkers = {
  _store: StoreMarker[]
  get: LsrGetMarkersFn
}

// declare namespace lunisolar {
//   export class Markers {
//     static readonly store: MarkersStore
//     readonly markers: StoreMarker[]
//     static add(markersSetting: MarkersSetting, tags?: string | string[]): void
//     static clean(): void
//     static cleanFnList(): void
//     static remove(format: string, matcher?: string, names?: string | string[]): void
//     static removeByTag(tags: string | string[]): void
//     static removeByName(names: string | string[]): void
//   }
// }
