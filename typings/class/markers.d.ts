declare namespace lunisolar {
  export type MarkersSettingItem = {
    name: string
    tag?: string | string[]
    data?: {
      [key: string]: any
    }
  }

  export type MarkersSetting = {
    format: string | MarkerFormatFn
    markers: {
      [key: string]: MarkersSettingItem | MarkersSettingItem[]
    }
  }[]

  type MarkerFormatFn = (lsr: lunisolar.Lunisolar) => string | null

  type MarkerSetting = Pick<MarkersSettingItem, 'name'> & Partial<Omit<MarkersSettingItem, 'name'>>

  type MarkersFnListItem = { fn: MarkerFormatFn; markers: MarkersMatcherMap }

  type MarkersStore = {
    formatList: string[]
    formatMap: Map<string, MarkersMatcherMap>
    fnList: MarkersFnListItem[]
  }

  type StoreMarker = Pick<MarkersSettingItem, 'name' | 'data'> & { tag: string[] }
  type MarkersMatcherMap = Map<string, StoreMarker[]>

  type LsrGetMarkersFn = (tag?: string | string[]) => StoreMarker[]

  type LsrMarkers = {
    _store: StoreMarker[]
    get: LsrGetMarkersFn
  }

  type MarkersFilterFn = (item: StoreMarker, index?: number, arr?: StoreMarker[]) => boolean

  export class Markers {
    _list: StoreMarker[] | null
    static readonly store: MarkersStore
    readonly storeMarkers: StoreMarker[]
    readonly storeMarkersFromGlobal: StoreMarker[]
    readonly lsr: lunisolar.Lunisolar
    static add(markersSetting: MarkersSetting, tags?: string | string[]): typeof Markers
    static clean(): typeof Markers
    static cleanFnList(): typeof Markers
    static remove(format: string, matcher?: string, names?: string | string[]): typeof Markers
    static removeByTag(tags: string | string[]): typeof Markers
    static removeByName(names: string | string[]): typeof Markers
    constructor(lsr: lunisolar.Lunisolar): Markers
    init(): void
    add(markers: MarkersSettingItem[], tags?: string | string[]): Markers
    remove(name: string | string[], isTag?: Boolean, flag?: 0 | 1 | 2): Markers
    clean(flag?: 0 | 1 | 2): Markers
    reset(): Markers
    [Symbol.iterator](): IteratorInterface
    get list(): StoreMarker[]
    filter(fn: Partial<MarkersSettingItem> | MarkersFilterFn): StoreMarker[]
    find(fn: Partial<MarkersSettingItem> | MarkersFilterFn): StoreMarker | undefined
    toString(): string
  }
}

type MarkersStore = lunisolar.MarkersStore
type StoreMarker = lunisolar.StoreMarker
type MarkersSetting = lunisolar.MarkersSetting
type MarkersSettingItem = lunisolar.MarkersSettingItem
type MarkersMatcherMap = lunisolar.MarkersMatcherMap
type MarkersFilterFn = lunisolar.MarkersFilterFn
type MarkersFnListItem = lunisolar.MarkersFnListItem
