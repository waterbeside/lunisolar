type MarkersSettingItem = {
  tag: string | string[]
  data?: {
    [key: string]: any
  }
  name: string
}

type MarkerFormatFn = (lsr: lunisolar.Lunisolar) => unknown

type MarkersSetting = {
  format: string | MarkerFormatFn
  markers: {
    [key: string]: MarkersSettingItem | MarkersSettingItem[]
  }
}[]

type MarkerSetting = Pick<MarkersSettingItem, 'name'> & Partial<Omit<MarkersSettingItem, 'name'>>

type ConfigMarkersFnListItem = { fn: MarkerFormatFn; markers: MarkersInGlobalConfig }

type ConfigMarkers = {
  formatList: string[]
  formatMap: Map<string, ConfigMarkersMatcherMap>
  fnList: ConfigMarkersFnListItem[]
}

type ConfigMarker = Pick<MarkersSettingItem, 'name' | 'data'> & { tag: string[] }
type ConfigMarkersMatcherMap = Map<string, ConfigMarker[]>
