declare namespace lunisolar {
  export interface Utils {
    parseJD: (d?: DateParamType, isUTC?: boolean, offset?: number, unClone = false) => JD
    format: (formatStr: string, lsr: lunisolar.Lunisolar) => string
    dateDiff: (
      date1: DateParamType,
      date2: DateParamType,
      unit?: GreUnit,
      float?: boolean
    ) => number
  }
}
