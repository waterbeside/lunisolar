declare namespace lunisolar {
  export const utils: {
    parseJD: (d?: DateParamType, isUTC?: boolean, offset?: number, unClone = false) => JD
    format: (formatStr: string, lsr: lunisolar.Lunisolar) => string
    dateDiff: (
      date1: DateParamType,
      date2: DateParamType,
      unit?: GreUnit,
      float?: boolean
    ) => number
    /**
     * ## 使传入的lunarData的年月日时等内容全转为数字
     * @param lunarData 传入阴历的年月日时
    ```
      {
        year?: number | string
        month: number | string
        day: number | string
        hour?: number | string
        isLeapMonth?: boolean
      }
      ```
     * @param lang 指定要使用的语言，默认为undefined, 即默认使用lunisolar正在使用的语言
     * @returns void
     */
    prettyLunarData: (lunarData: ParseFromLunarParam, lang?: string) => void
    prettyYear: (year: string | number, lang?: string) => number
  }
}
