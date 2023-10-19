import {
  addMarkers,
  removeMarkers,
  removeMarkersByTagOrName,
  getMarkersFromFormatList,
  prettyMarkersItem,
  filterStoreMarkers
} from '../utils/markers'

export class Markers {
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
  }

  static clean() {
    Markers.store.formatList = []
    Markers.store.formatMap = new Map<string, MarkersMatcherMap>()
    Markers.store.fnList = []
  }

  static cleanFnList() {
    Markers.store.fnList = []
  }

  static remove(format: string, matcher?: string, names?: string | string[]) {
    removeMarkers(Markers.store, format, matcher, names)
  }

  static removeByTag(tags: string | string[]) {
    removeMarkersByTagOrName(Markers.store, tags, true)
  }

  static removeByName(names: string | string[]) {
    removeMarkersByTagOrName(Markers.store, names, false)
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

  remove(name: string | string[], isTag: Boolean = false, flag: 0 | 1 | 2 = 0) {
    if (flag === 0 || flag === 2) {
      this.storeMarkersFromGlobal = filterStoreMarkers(this.storeMarkersFromGlobal, name, isTag)
    }
    if (flag === 0 || flag === 1) {
      this.storeMarkers = filterStoreMarkers(this.storeMarkers, name, isTag)
    }
    return this
  }

  clean(flag: 0 | 1 | 2 = 0) {
    if (flag === 0 || flag === 2) {
      this.storeMarkersFromGlobal = []
      // this.storeMarkersFromGlobal.splice(0, this.storeMarkersFromGlobal.length)
    }
    if (flag === 0 || flag === 1) {
      this.storeMarkers = []
      // this.storeMarkers.splice(0, this.storeMarkersFromGlobal.length)
    }
    return this
  }

  reset() {
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

  get list() {
    return [...this.storeMarkersFromGlobal, ...this.storeMarkers]
  }

  toString() {
    return this.list.map(v => v.name).join(',')
  }
}
