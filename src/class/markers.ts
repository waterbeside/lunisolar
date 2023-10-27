import {
  addMarkers,
  removeMarkers,
  removeMarkersByTagOrName,
  getMarkersFromFormatList,
  prettyMarkersItem,
  filterStoreMarkers,
  filterByObj
} from '../utils/markers'

export class Markers {
  _list: StoreMarker[] | null = null
  static readonly store: MarkersStore = {
    formatList: [],
    formatMap: new Map<string, MarkersMatcherMap>(),
    fnList: []
  }

  storeMarkers: StoreMarker[] = []
  storeMarkersFromGlobal: StoreMarker[] = []
  readonly lsr: lunisolar.Lunisolar

  static add(markersSetting: MarkersSetting, tags?: string | string[]) {
    addMarkers(Markers.store, markersSetting, tags)
    return Markers
  }

  static clean() {
    Markers.store.formatList = []
    Markers.store.formatMap = new Map<string, MarkersMatcherMap>()
    Markers.store.fnList = []
    return Markers
  }

  static cleanFnList() {
    Markers.store.fnList = []
    return Markers
  }

  static remove(format: string, matcher?: string, names?: string | string[]) {
    removeMarkers(Markers.store, format, matcher, names)
    return Markers
  }

  static removeByTag(tags: string | string[]) {
    removeMarkersByTagOrName(Markers.store, tags, true)
    return Markers
  }

  static removeByName(names: string | string[]) {
    removeMarkersByTagOrName(Markers.store, names, false)
    return Markers
  }

  constructor(lsr: lunisolar.Lunisolar) {
    this.lsr = lsr
    this.init()
  }

  init() {
    const mksArr: StoreMarker[][] = []
    const mksStore = Markers.store
    for (const formatKey of mksStore.formatList) {
      const matcher = this.lsr.format(formatKey)
      const mks = getMarkersFromFormatList(mksStore, formatKey, matcher)
      if (mks) mksArr.push(mks)
    }
    this.storeMarkersFromGlobal.splice(0, this.storeMarkersFromGlobal.length, ...mksArr.flat())
  }

  add(marker: MarkersSettingItem | MarkersSettingItem[], tags?: string | string[]) {
    this._list = null
    if (Array.isArray(marker)) {
      for (const item of marker) {
        this.add(item, tags)
      }
    } else {
      const mk = prettyMarkersItem(marker, tags)
      this.storeMarkers.push(mk)
    }
    return this
  }

  /**
   * 移除指定名称或tag的markers
   * @param name 指定的marker名字或tag
   * @param isTag name参数是否为tag, 默认为false
   * @param flag  1： 只移除通过本实例add方法加进来的markers, 2: 只移除从全局设定进本实例的markers，0: 包括1和2。
   * @returns 返回本markers实例
   */
  remove(name: string | string[], isTag: Boolean = false, flag: 0 | 1 | 2 = 0) {
    this._list = null
    if (flag === 0 || flag === 1) {
      this.storeMarkersFromGlobal = filterStoreMarkers(this.storeMarkersFromGlobal, name, isTag)
    }
    if (flag === 0 || flag === 2) {
      this.storeMarkers = filterStoreMarkers(this.storeMarkers, name, isTag)
    }
    return this
  }

  /**
   * 清除所有markers
   * @param flag  1: 只清除从全局设定进本实例的markers，2： 只清除通过本实例add方法加进来的markers, 0：包括1和2
   * @returns 返回本markers实例
   */
  clean(flag: 0 | 1 | 2 = 0) {
    this._list = null
    if (flag === 0 || flag === 1) {
      this.storeMarkersFromGlobal = []
      // this.storeMarkersFromGlobal.splice(0, this.storeMarkersFromGlobal.length)
    }
    if (flag === 0 || flag === 2) {
      this.storeMarkers = []
      // this.storeMarkers.splice(0, this.storeMarkersFromGlobal.length)
    }
    return this
  }

  /**
   * 重置markers实例
   * @returns
   */
  reset() {
    this._list = null
    this.clean(0)
    this.init()
    return this
  }

  [Symbol.iterator](): IteratorInterface {
    let index = 0
    const list = this.list
    return {
      next() {
        if (index < list.length) {
          return {
            value: list[index++],
            done: false
          }
        } else {
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }

  /**
   * 取得markers列表
   */
  get list(): StoreMarker[] {
    if (this._list == null) this._list = [...this.storeMarkersFromGlobal, ...this.storeMarkers]
    return this._list
  }

  filter(fn: Partial<MarkersSettingItem> | MarkersFilterFn): StoreMarker[] {
    if (typeof fn === 'function') return this.list.filter(fn)
    if (typeof fn === 'object') {
      return this.list.filter(item => filterByObj(fn, item))
    }
    return []
  }

  find(fn: Partial<MarkersSettingItem> | MarkersFilterFn): StoreMarker | undefined {
    if (typeof fn === 'function') return this.list.find(fn)
    if (typeof fn === 'object') {
      return this.list.find(item => filterByObj(fn, item))
    }
    return undefined
  }

  toString() {
    return this.list.map(v => v.name).join(',')
  }
}
