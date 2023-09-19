export function addMarkers(lsr: typeof lunisolar, markersSetting: MarkersSetting) {
  const configMarkers = lsr._globalConfig._global.markers
  prettyMarkersSetting(markersSetting, configMarkers)
}

export function prettyMarkersSetting(markersSetting: MarkersSetting, configMarkers: ConfigMarkers) {
  for (const item of markersSetting) {
    const { format, markers } = item
    if (typeof format === 'string') {
      let formatMapItem
      if (configMarkers.formatMap.has(format)) {
        formatMapItem = configMarkers.formatMap.get(format)
      } else {
        configMarkers.formatList.push(format)
      }
      if (formatMapItem === void 0) formatMapItem = new Map<string, ConfigMarker[]>()
      prettyMarkers(markers, formatMapItem)
      configMarkers.formatMap.set(format, formatMapItem)
    } else if (typeof format === 'function') {
      const mapItem = new Map<string, ConfigMarker[]>()
      prettyMarkers(markers, mapItem)
      configMarkers.fnList.push({
        fn: format,
        markers: mapItem
      })
    }
  }
}

export function prettyMarkers(
  markers: {
    [key: string]: MarkersSettingItem | MarkersSettingItem[]
  },
  dateMapping: Map<string, ConfigMarker[]>
) {
  for (const key in markers) {
    const item = markers[key]
    const markerItemList: ConfigMarker[] = []
    if (Array.isArray(item)) {
      for (const it of item) {
        markerItemList.push(prettyMarkersItem(it))
      }
    } else {
      markerItemList.push(prettyMarkersItem(item))
    }
    if (dateMapping.has(key))
      dateMapping.set(key, (dateMapping.get(key) || []).concat(markerItemList))
  }
  return dateMapping
}

export function prettyMarkersItem(markersItem: MarkersSettingItem) {
  const { tag, name } = markersItem
  const res: ConfigMarker = {
    tag: [],
    name
  }
  if (Array.isArray(tag)) res.tag = tag.slice()
  else res.tag.push(tag)
  if (markersItem.data === void 0) res.data = Object.assign({}, markersItem.data)
  return res
}
