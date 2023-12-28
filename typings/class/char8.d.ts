declare namespace lunisolar {
  /**
   * ## class Char8
   * 八字
   * @param dateOrSbList 日期 或者 八字四柱的天干地支組合
   * @param Char8Config { lang: 语言名, changeAgeTerm: 用于換歲的節氣 }
   */
  export class Char8 extends CacheClass {
    readonly _config: Required<Char8Config>
    constructor(dateOrSbList: Date | JD | [SB, SB, SB, SB], config?: Char8Config)
    init(dateOrSbList: Date | JD | [SB, SB, SB, SB]): void
    toString(): string
    valueOf(): number
    getConfig(): Required<Char8Config>
    get value(): number
    /**
     * @returns 八字四柱的天干地支組合列表
     */
    get list(): [SB, SB, SB, SB]
    /**
     * @returns 年柱
     */
    get year(): SB
    /**
     * @returns 月柱
     */
    get month(): SB
    /**
     * @returns 日柱
     */
    get day(): SB
    /**
     * @returns 時柱
     */
    get hour(): SB
    /**
     * @returns 日主
     */
    get me(): Stem

    /**
     * 计算八字value值
     * @param sbList SB实例例表
     * @returns number
     */
    static computeValue(sbList: SB[]): number

    /**
     * 計算年柱
     * @param yearOrDate 年份或日期對象
     * @param Char8Config { lang: 语言名, changeAgeTerm: 用于換歲的節氣 }
     */
    static computeSBYear(yearOrDate: Date | JD | number, config?: Char8Config): SB
    /**
      計算月柱
      @param date 日期的Date或JD對象
     */
    static computeSBMonth(date: Date | JD, config?: Char8Config): SB
    /**
      計算日柱
      @param date 日期的Date或JD對象
     */
    static computeSBDay(date: Date | JD, config?: Char8Config): SB
    /**
      計算時柱
      @param date 日期的Date或JD對象
      @param sbDay 日柱 (時柱天干由日柱推算，可以不填)
     */
    static computeSBHour(date: Date | JD, sbDay?: SB, config?: Char8Config): SB
  }
}
