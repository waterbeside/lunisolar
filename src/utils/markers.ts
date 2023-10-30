/**
 * 添加marker
 * @param markersStore 全局的markers设置
 * @param markersSetting markers设置对象
 * @param tags 标签
 */
export function addMarkers(
  markersStore: MarkersStore,
  markersSetting: MarkersSetting,
  tags?: string | string[]
) {
  for (const item of markersSetting) {
    const { format, markers } = item
    if (typeof format === 'string') {
      let formatMapItem
      if (markersStore.formatMap.has(format)) {
        formatMapItem = markersStore.formatMap.get(format)
      } else {
        markersStore.formatList.push(format)
      }
      if (formatMapItem === void 0) formatMapItem = new Map<string, StoreMarker[]>()
      prettyMarkers(markers, formatMapItem, tags)
      markersStore.formatMap.set(format, formatMapItem)
    } else if (typeof format === 'function') {
      const mapItem = new Map<string, StoreMarker[]>()
      prettyMarkers(markers, mapItem, tags)
      markersStore.fnList.push({
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
  dateMapping: Map<string, StoreMarker[]>,
  tags?: string | string[]
) {
  for (const key in markers) {
    const item = markers[key]
    const markerItemList: StoreMarker[] = []
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
  const res: StoreMarker = {
    tag: [],
    name
  }
  if (Array.isArray(tag)) res.tag = tag.slice()
  else if (typeof tag === 'string') res.tag.push(tag)

  if (Array.isArray(tags)) res.tag = res.tag.concat(tags)
  else if (typeof tags === 'string') res.tag.push(tags)

  if (markersItem.data !== void 0) res.data = Object.assign({}, markersItem.data)
  return res
}

export function filterStoreMarkers(
  mk: StoreMarker[],
  tagsOrNames: string | string[],
  isTag: Boolean = false
) {
  return mk.filter(v => {
    if (isTag) {
      const tn = Array.isArray(tagsOrNames) ? tagsOrNames : [tagsOrNames]
      return !isHasIntersection(v.tag, tn)
    } else {
      if (Array.isArray(tagsOrNames)) return !tagsOrNames.includes(v.name)
      else return tagsOrNames !== v.name
    }
  })
}

export function removeMarkersInMatcherMap(
  mk: MarkersMatcherMap,
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
    const newV = filterStoreMarkers(mkV, ton, isTag)
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
 * @param markersStore 全局的markers设置
 * @param tagsOrNames 标签
 * @param isTag tagsOrNames参数是否为tag
 */
export function removeMarkersByTagOrName(
  markersStore: MarkersStore,
  tagsOrNames: string | string[],
  isTag: Boolean = true
) {
  // 处理formatList
  removeMarkersFromFormatListByTN(markersStore, tagsOrNames, isTag)
  // 处理fnList
  removeMarkersFromFnListByTN(markersStore, tagsOrNames, isTag)
}

export function removeMarkersFromFormatItemByTN(
  formatMap: Map<string, MarkersMatcherMap>,
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
  markersStore: MarkersStore,
  tagsOrNames: string | string[],
  isTag: Boolean = true
) {
  const { formatList, formatMap } = markersStore
  const newFormatList: string[] = []
  // 处理formatList
  for (const format of formatList) {
    if (removeMarkersFromFormatItemByTN(formatMap, format, tagsOrNames, isTag)) {
      newFormatList.push(format)
    }
  }
  if (newFormatList.length !== formatList.length) markersStore.formatList = newFormatList
}

export function removeMarkersFromFnListByTN(
  markersStore: MarkersStore,
  tagsOrNames?: string | string[],
  isTag: Boolean = true,
  matcher?: string | string[]
) {
  const { fnList } = markersStore
  const newFnList: MarkersFnListItem[] = []
  for (const fnItem of fnList) {
    const { fn, markers } = fnItem
    removeMarkersInMatcherMap(markers, tagsOrNames, isTag, matcher)
    if (markers.size > 0) newFnList.push({ fn, markers })
  }
  if (newFnList.length !== fnList.length) markersStore.fnList = newFnList
}

/**
 * 移除markers
 * @param markersStore 全局的markers设置
 * @param format 日期format格式 如MMDD
 * @param matchStr 配置format格式的日期，如 1001
 */
export function removeMarkers(
  markersStore: MarkersStore,
  format: string | true,
  matcher?: string | string[],
  name?: string | string[]
) {
  if (format === true) {
    // 当format为true时，只从fnList删除
    removeMarkersFromFnListByTN(markersStore, name, false, matcher)
  } else {
    // 从formatList删除
    const { formatList, formatMap } = markersStore
    removeMarkersFromFormatItemByTN(formatMap, format, name, false, matcher)
    if (!formatMap.has(format)) {
      markersStore.formatList = formatList.filter((v, i) => v !== format)
    }
  }
}

export function getMarkersFromFormatList(
  markersStore: MarkersStore,
  format: string,
  matcher: string
) {
  const { formatMap } = markersStore
  if (!formatMap.has(format)) return null
  const matcherMap = formatMap.get(format)
  if (matcherMap === void 0) return null
  if (!matcherMap.has(matcher)) return null
  const res = matcherMap.get(matcher)
  if (res === void 0) return null
  return res
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

export function filterByObj(obj: CommonDict, data: CommonDict): boolean {
  for (const key in obj) {
    const v = obj[key]
    const v2 = data[key]
    if (key === 'tag') {
      if (Array.isArray(v)) {
        if (!Array.isArray(v2)) return false
        else if (!isHasIntersection(v, v2)) return false
      } else if (Array.isArray(v2) && !v2.includes(v)) return false
    } else if (typeof v === 'object' && typeof v2 === 'object') {
      if (!filterByObj(v, v2)) return false
    } else if (v !== v2) return false
  }
  return true
}
