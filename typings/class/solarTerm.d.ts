declare namespace lunisolar {
  /**
   * ## class SolarTerm
   * 節氣
   * @param value 節氣索引 | 節氣名稱 | 節氣實例
   * @param config 设置
   */
  export class SolarTerm {
    /**
     * @returns 節氣索引 0 ~ 23
     */
    readonly value: number
    readonly _config: Required<ClassCommonConfig>
    constructor(value: number | string | SolarTerm, config?: ClassCommonConfig)
    toString(): string
    valueOf(): number
    /**
     * @returns 取得节气名称
     */
    get name(): string
    /**
     * @returns 節氣名稱列表
     */
    static getNames: (lang?: string) => string[]
    /**
     * Get the date list of solar terms for a year
     *
     * 取得某年節氣的日期列表
     * @param year 年份
     * @returns {number[]} [d, d, d, d...]
     */
    static getYearTermDayList: (year: number) => number[]
    /**
     * 取得某年某月的两个节气的日期
     * @param year 年
     * @param month 月
     * @returns {[number, number]} [节, 气]
     */
    static getMonthTerms: (year: number, month: number) => [number, number]
    /**
     * 查出指定節氣的日期
     * @param year 年份
     * @param SolarTerm 節氣索引 | 節氣名稱 | 節氣實例
     * @returns [year, month, day]
     */
    static findDate(
      year: number,
      termValue: number | string | SolarTerm,
      config?: ClassCommonConfig
    ): [number, number, number]
    /**
     * 查出指定日期属于哪个節气之後，并返回该節气及该節气日期
     * @param {Date | JD} date 日期
     * @param {Partial<TermFindNodeConfig>} config 
      ```
      config:{
        lang： 语言, 
        returnValue: 是否反回value而非实例，默认为false, 
        nodeFlag: 0取节，1取气，2两者皆可
      }
      ```
     * @returns {[SolarTerm | number, number]} [節氣, 節氣日期]
     */
    static findNode<T extends boolean = false>(
      date: Date | JD,
      config: TermFindNodeConfig<T>
    ): [T extends true ? number : SolarTerm, JD]
    static findNode(date: Date | JD, config?: TermFindNodeConfig<boolean>): [SolarTerm | number, JD]
  }
}
