/**
 * 添加marker
 * @param lsr lunisolar函数
 * @param markersSetting markers设置对象
 * @param tags 标签
 */
export function addMarkers(
  configMarkers: ConfigMarkers,
  markersSetting: MarkersSetting,
  tags?: string | string[]
) {
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
      prettyMarkers(markers, formatMapItem, tags)
      configMarkers.formatMap.set(format, formatMapItem)
    } else if (typeof format === 'function') {
      const mapItem = new Map<string, ConfigMarker[]>()
      prettyMarkers(markers, mapItem, tags)
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
  dateMapping: Map<string, ConfigMarker[]>,
  tags?: string | string[]
) {
  for (const key in markers) {
    const item = markers[key]
    const markerItemList: ConfigMarker[] = []
    if (Array.isArray(item)) {
      for (const it of item) {
        markerItemList.push(prettyMarkersItem(it, tags))
      }
    } else {
      markerItemList.push(prettyMarkersItem(item, tags))
    }
    if (dateMapping.has(key))
      dateMapping.set(key, (dateMapping.get(key) || []).concat(markerItemList))
    else dateMapping.set(key, markerItemList)
  }
  return dateMapping
}

export function prettyMarkersItem(markersItem: MarkersSettingItem, tags?: string | string[]) {
  const { tag, name } = markersItem
  const res: ConfigMarker = {
    tag: [],
    name
  }
  if (Array.isArray(tag)) res.tag = tag.slice()
  else res.tag.push(tag)

  if (Array.isArray(tags)) res.tag = res.tag.concat(tags)
  else if (typeof tags === 'string') res.tag.push(tags)

  if (markersItem.data === void 0) res.data = Object.assign({}, markersItem.data)
  return res
}

export function removeMarkersInMatcherMap(
  mk: ConfigMarkersMatcherMap,
  tagsOrNames?: string | string[],
  isTag: Boolean = true,
  matcher?: string | string[]
) {
  const runItem = (key: string, ton?: string | string[]) => {
    if (!mk.has(key)) return false
    const mkV = mk.get(key) // 取得指定日期的marker列表
    if (mkV === void 0) return false
    if (ton === void 0) {
      mk.delete(key)
      return false
    }
    const newV = mkV.filter((v, idx) => {
      if (isTag) {
        const tn = Array.isArray(ton) ? ton : [ton]
        return !isHasIntersection(v.tag, tn)
      } else {
        if (Array.isArray(ton)) {
          return !ton.includes(v.name)
        } else {
          return ton !== v.name
        }
      }
    })
    if (newV.length === 0) mk.delete(key)
    else if (newV.length < mkV.length) mk.set(key, newV)
    return true
  }
  if (matcher === void 0) {
    // 当matcher未定义时，历遍所有key
    const mkKeys = Array.from(mk.keys())
    for (const key of mkKeys) {
      if (!runItem(key, tagsOrNames)) continue
    }
  } else if (Array.isArray(matcher)) {
    for (const key of matcher) {
      if (!runItem(key, tagsOrNames)) continue
    }
  } else {
    runItem(matcher, tagsOrNames)
  }
}

/**
 * 按标签或名称移除markers
 * @param gbMarkers 全局的markers设置
 * @param tagsOrNames 标签
 * @param isTag tagsOrNames参数是否为tag
 */
export function removeMarkersByTagOrName(
  gbMarkers: ConfigMarkers,
  tagsOrNames: string | string[],
  isTag: Boolean = true
) {
  // 处理formatList
  removeMarkersFromFormatListByTN(gbMarkers, tagsOrNames, isTag)
  // 处理fnList
  removeMarkersFromFnListByTN(gbMarkers, tagsOrNames, isTag)
}

export function removeMarkersFromFormatItemByTN(
  formatMap: Map<string, ConfigMarkersMatcherMap>,
  format: string,
  tagsOrNames?: string | string[],
  isTag: Boolean = true,
  matcher?: string | string[]
) {
  if (formatMap.has(format)) {
    const mk = formatMap.get(format)
    if (mk === void 0) return false
    removeMarkersInMatcherMap(mk, tagsOrNames, isTag, matcher)
    if (mk.size === 0) formatMap.delete(format)
    else return true
  }
  return false
}

export function removeMarkersFromFormatListByTN(
  gbMarkers: ConfigMarkers,
  tagsOrNames: string | string[],
  isTag: Boolean = true
) {
  const { formatList, formatMap } = gbMarkers
  const newFormatList: string[] = []
  // 处理formatList
  for (const format of formatList) {
    if (removeMarkersFromFormatItemByTN(formatMap, format, tagsOrNames, isTag)) {
      newFormatList.push(format)
    }
  }
  if (newFormatList.length !== formatList.length) gbMarkers.formatList = newFormatList
}

export function removeMarkersFromFnListByTN(
  gbMarkers: ConfigMarkers,
  tagsOrNames?: string | string[],
  isTag: Boolean = true,
  matcher?: string | string[]
) {
  const { fnList } = gbMarkers
  const newFnList: ConfigMarkersFnListItem[] = []
  for (const fnItem of fnList) {
    const { fn, markers } = fnItem
    removeMarkersInMatcherMap(markers, tagsOrNames, isTag, matcher)
    if (markers.size > 0) newFnList.push({ fn, markers })
  }
  if (newFnList.length !== fnList.length) gbMarkers.fnList = newFnList
}

/**
 * 移除markers
 * @param gbMarkers 全局的markers设置
 * @param format 日期format格式 如MMDD
 * @param matchStr 配置format格式的日期，如 1001
 */
export function removeMarkers(
  gbMarkers: ConfigMarkers,
  format: string | true,
  matcher?: string | string[],
  name?: string | string[]
) {
  if (format === true) {
    // 当format为true时，只从fnList删除
    removeMarkersFromFnListByTN(gbMarkers, name, false, matcher)
  } else {
    // 从formatList删除
    const { formatList, formatMap } = gbMarkers
    removeMarkersFromFormatItemByTN(formatMap, format, name, false, matcher)
    if (!formatMap.has(format)) {
      gbMarkers.formatList = formatList.filter((v, i) => v !== format)
    }
  }
}

/**
 * 查两个数组是否有交集
 * @param arr1 数组1
 * @param arr2 数组2
 */
export function isHasIntersection(arr1: string[], arr2: string[]): boolean {
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.includes(arr2[i])) return true
  }
  return false
}
