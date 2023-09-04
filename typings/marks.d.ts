type MarkerMap = {
  format: string
  map: Map<string, MarkerMapDateDictItem[]>
}

type MarkerMapDateDictItem = {
  tag: Set<string>
  data: any
  desc: string
}

type MarkerSetting = {}
