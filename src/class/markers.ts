import { addMarkers, removeMarkers, removeMarkersByTagOrName } from '../utils/markers'

export class Markers {
  static readonly store: MarkersStore = {
    formatList: [],
    formatMap: new Map<string, MarkersMatcherMap>(),
    fnList: []
  }

  readonly markers: StoreMarker[] = []

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
}
