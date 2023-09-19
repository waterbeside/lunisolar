type MarkersSettingItem = {
  tag: string | string[]
  data?: {
    [key: string]: any
  }
  name: string
}

type MarkerFormatFun = (lsr: lunisolar.Lunisolar) => unknown

type MarkersSetting = {
  format: string | MarkerFormatFun
  markers: {
    [key: string]: MarkersSettingItem | MarkersSettingItem[]
  }
}

type MarkerSetting = Pick<MarkersSettingItem, 'name'> & Partial<Omit<MarkersSettingItem, 'name'>>
