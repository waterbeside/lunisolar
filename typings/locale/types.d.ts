interface LocaleData {
  name: string
  leap: string
  lunarYearUnit: string
  lunarHourUnit: string
  bigMonth: string
  smallMonth: string
  weekdays: string[]
  months: string[]
  weekdaysShort: string[]
  monthsShort: string[]
  weekdaysMin: string[]
  /**
   * The lunar months name
   *
   * There are 12 items in the array，
   */
  lunarMonths: string[]
  /**
   * The lunar months alias 陰歷月份別名
   *
   * There are 12 items in the array，
   */
  lunarMonthsAlias: string[]
  /**
   * The lunar days name
   *
   * There are 30 items in the array，
   */
  lunarDays: string[]
  /**
   * number (數字: like 〇一二三四五六七八九十)
   */
  numerals: string[]
  /**
   * Constellation name (星座)
   */
  constellationName: string[]
  /**
   * Solar term (二十四節氣)
   *
   * There are 24 items in the array，
   *
   * From Xiaohan to the end of winter solstice 始于小寒 終于冬至
   */
  solarTerm: string[]
  /**
   * 季节
   */
  seasonName: string[]
  seasonShortName?: string[]
  /**
   * Heavenly stem 天干
   *
   * There are 10 items in the array，
   */
  stems: string[]
  /**
   * Earthly Branches 地支
   *
   * There are 12 items in the array，
   */
  branchs: string[]
  /**
   * Separator for combination of heavenly stem and earth branches 天干地支组合时的分隔符
   */
  stemBranchSeparator: string
  /**
   * Chinese zodiac 十二生肖
   *
   * There are 12 items in the array，
   */
  chineseZodiac: string[]
  /**
   * Five Elements 五行
   *
   * There are 5 items in the array，
   *
   * like (木 火 土 金 水)
   */
  fiveElements: string[]
  /**
   * Eight Trigram 八卦
   *
   * There are 5 Trigram in the array，
   *
   * like (坎 艮 震 巽 离 坤 兑 乾)
   */
  eightTrigram: string[]
  /**
   * The format of the date
   */
  formats: {
    LT: string
    LTS: string
    L: string
    LL: string
    LLL: string
    LLLL: string
    l: string
    ll: string
    lll: string
    llll: string
  }
  /**
   * The meridiem (午夜)
   */
  meridiem: (hour: number, minute: number, isLowercase?: boolean) => string
}

declare interface ILocale extends Partial<LocaleData> {
  name: string
}
