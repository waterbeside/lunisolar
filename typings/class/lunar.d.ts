declare namespace lunisolar {
  /**
   * ## class Lunar
   * 陰歷對象
   * @param date 日期对象
   * @param config 设置
   */
  export class Lunar extends CacheClass {
    readonly jd: JD
    /**
     * 取得該年陰歷正月初一的所在公歷年
     */
    get year(): number
    /**
     * 取得陰歷月
     */
    get month(): number
    /**
     * 取得陰歷日
     */
    get day(): number
    /**
     * 取得陰歷時辰下標 0 ~ 11
     */
    get hour(): number
    /**
     * 當年的閏月，如果為0則為沒有閏月
     */
    get leapMonth(): number
    /**
     * 當年的閏月是否大朋
     */
    get leapMonthIsBig(): boolean
    readonly _config: Required<LunarConfig>
    static fromLunar(lunarData: ParseFromLunarParam, config?: LunarConfig): Lunar
    constructor(date: Date | JD, config?: LunarConfig)

    init(): void
    /**
     * Return string like '二〇二一年冬月廿九子時'
     */
    toString(): string
    /**
     * Return the Date.valueOf()
     */
    valueOf(): number
    /**
     * 是否為閏月
     */
    get isLeapMonth(): boolean
    /**
     * 是否為大月
     */
    get isBigMonth(): boolean
    /**
     * 是否本月的最后一天（晦日）
     */
    get isLastDayOfMonth(): boolean
    /**
      取得當年陰歷年正月初一的对应的公历日期
     */
    get lunarNewYearDay(): JD
    /**
     * 取得本农历年的取后一天
     */
    get lastDayOfYear(): JD
    /**
     * 月相
     */
    get phaseOfTheMoon(): string
    /**
     * 取得Date对象
     */
    toDate(): Date
    /**
     * 取得該年陰歷正月初一的所在公歷年(中文)
     */
    getYearName(): string
    /**
     * 取得陰歷月(中文)
     */
    getMonthName(): string
    /**
     * 取得陰歷日(中文)
     */
    getDayName(): string
    /**
     * 取得陰歷時辰(中文)
     */
    getHourName(): string
    /**
      取得當年陰歷年正月初一的对应的公历日期
      @param {number} year 要查询的公历年份
      @returns {JD}
     */
    static getLunarNewYearDay(year: number): JD
  }
}
