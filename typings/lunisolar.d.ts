declare function lunisolar(
  date?: lunisolar.DateConfigType,
  configType?: lunisolar.ConfigType
): lunisolar.Lunisolar

declare namespace lunisolar {
  export type DateConfigType = string | number | Date | null | undefined
  export interface ConfigType extends Partial<Omit<GlobalConfig, 'locales'>> {}
  export interface Locale extends ILocale {}
  export const _globalConfig: GlobalConfig
  /**
   * 陰歷對象
   */
  export class Lunar {
    constructor(date: Date, config?: ClassCommonConfig)
    /**
     * Return string like '二〇二一年冬月廿九子時'
     */
    toString(): string
    /**
     * Return the Date.valueOf()
     */
    valueOf(): number
    /**
     * 當年的閏月，如果為0則為沒有閏月
     */
    leapMonth: number
    /**
     * 當年的閏月是否大朋
     */
    leapMonthIsBig: boolean
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
     * 取得陰歷時辰下標 0 ~ 11
     */
    get hour(): number
    /**
      取得當年陰歷年正月初一的对应的公历日期
     */
    get lunarNewYearDay(): Date
    /**
     * 月相
     */
    get phaseOfTheMoon(): string
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
      @returns {Date}
     */
    static getLunarNewYearDay(year: number): Date
  }

  /**
    class 五行
  */
  export class Element5 {
    static create(value: number | string | Element5, config?: ClassCommonConfig): Element5
    constructor(value: number | string | Element5, config?: ClassCommonConfig)
    toString(): string
    valueOf(): number
    /**
    the Element5.value is the index of ['木', '火', '土', '金', '水']
    */
    get value(): number
  }

  /**
   * class 八卦
   */
  export class Trigram8 {
    static create(value: number, config?: ClassCommonConfig): Trigram8
    constructor(value: number, config?: ClassCommonConfig)
    get value(): number
    toString(): string
    valueOf(): number
  }

  /**
   * class 廿四山
   */
  export class Direction24 {
    static create(value: number | Branch | Stem | Trigram8, config?: ClassCommonConfig): Direction24
    static createFromAngle(angle: number, config: ClassCommonConfig): Direction24
    constructor(value: number | Branch | Stem | Trigram8, config?: ClassCommonConfig)
    get value(): number
    get sign(): Stem | Branch | Trigram8
    get signName(): string
    get type(): string
    get angle(): number
    toString(): string
    valueOf(): number
  }

  /**
   * class 天干
   * @param value 天干索引 | 天干名稱 | 天干實例
   */
  export class Stem {
    static create(value: number | string | Stem, config?: ClassCommonConfig): Stem
    constructor(value: number | string | Stem, config?: ClassCommonConfig)
    toString(): string
    valueOf(): number
    /**
     * 天干的索引 0 ~ 9
     * ```
     *    0     1    2     3     4     5     6     7     8     9
     *  ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
     * ```
     */
    get value(): number

    /**
     * 可与天干组合的地支
     */
    branchs: Branch[]
    /**
     * 天干的五行属性
     */
    e5: Element5
    /**
     天干纳甲卦
     */
    trigram8: Trigram8
  }

  /**
   * class 地支
   * @param value 地支索引 | 地支名稱 | 地支實例
   */
  export class Branch {
    static create(value: number | string | Branch, config?: ClassCommonConfig): Branch
    constructor(value: number | string | Branch, config?: ClassCommonConfig)
    toString(): string
    valueOf(): number
    /**
     * 地支索引 0 ~ 11
     * ```
     *    0     1    2     3     4     5     6     7     8     9    10    11
     *  ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
     * ```
     */
    get value(): number
    /**
     * 地支藏干
     * ```
     * 返回地支數組，數組長度1~3個，
     * [本氣，中氣，余氣]
     * ```
     */
    get hiddenStems(): Stem[]
    /**
     * 地支五行
     */
    get e5(): Element5
    /**
     * 三合
     */
    get triad(): [Branch, Branch]
  }

  /**
   * class 天干地支组合(八字單柱)
   *
   * SB為 StemBranch 的簡寫
   */
  export class SB {
    /**
     * @param value 60位的天干地支組合的索引值
     */
    constructor(value: number)
    /**
     * @param stemOrValue 天干索引 | 天干名稱 | 天干實例 (當branch為undefined時，則為天干地支組合索引值)
     * @param branch 地支索引 | 地支名稱 | 地支實例
     */
    constructor(
      stemOrValue: number | string | Stem,
      branch?: number | string | Branch,
      config?: ClassCommonConfig
    )
    toString(): string
    valueOf(): number
    /**
     * @returns 60位的天干地支組合的索引值 0 ~ 59
     */
    get value(): number
    /**
     * @returns 天干實例
     */
    get stem(): Stem
    /**
     * @returns 地支實例
     */
    get branch(): Branch
  }

  /**
   * class 節氣
   * @param value 節氣索引 | 節氣名稱 | 節氣實例
   */
  export class SolarTerm {
    constructor(value: number | string | SolarTerm, config?: ClassCommonConfig)
    toString(): string
    valueOf(): number
    /**
     * @returns 節氣索引 0 ~ 23
     */
    get value(): number
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
     * @param {Date} date 日期
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
      date: Date,
      config: TermFindNodeConfig<T>
    ): [T extends true ? number : SolarTerm, Date]
    static findNode(date: Date, config?: TermFindNodeConfig<boolean>): [SolarTerm | number, Date]
  }

  /**
   * class 八字
   */
  export class Char8 {
    /**
     * @param dateOrSbList 八字四柱的天干地支組合
     */
    constructor(dateOrSbList: [SB, SB, SB, SB], config?: Char8Config)
    /**
     * @param dateOrSbList 日期
     * @param changeAgeTerm 用于換歲的節氣
     */
    constructor(dateOrSbList: Date, config?: Char8Config)
    get value(): number
    toString(): string
    valueOf(): number
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
      計算年柱
      @param yearOrDate 年份或日期對象
      @param changeAgeTerm 用于換歲的節氣
     */
    static computeSBYear(yearOrDate: Date | number, config?: Char8Config): SB
    /**
      計算月柱
      @param date 日期對象
     */
    static computeSBMonth(date: Date, config?: Char8Config): SB
    /**
      計算日柱
      @param date 日期對象
     */
    static computeSBDay(date: Date, config?: Char8Config): SB
    /**
      計算時柱
      @param date 日期對象
      @param sbDay 日柱 (時柱天干由日柱推算，可以不填)
     */
    static computeSBHour(date: Date, sbDay?: SB, config?: Char8Config)
  }

  /**
   * class Lunisolar
   */
  export class Lunisolar implements ILunisolar {
    _config: LunisolarConfigData
    _date: Date
    _solarTerm?: SolarTerm | null
    _lunar?: Lunar
    _char8?: Char8
    _cache: Map<string, any>
    constructor(date?: DateParamType, config?: ConfigType)
    get lunisolar(): typeof lunisolar
    /**
     * get lunar object
     *
     * 取得陰歷對象
     */
    get lunar(): Lunar
    /**
     * Get the current solar term object
     *
     * 取得當前節氣對象
     */
    get solarTerm(): SolarTerm | null
    /**
     * Get the current char8 object
     *
     * 取得八字對象
     */
    get char8(): Char8
    /**
     * Get the most recent solar term on the current date
     *
     * 取得当前日期之前的最近的节气点
     * @param nodeFlag 取的节气点，0: 取节， 1: 取气, 2: 节或气都取
     */
    recentSolarTerm(nodeFlag: 0 | 1 | 2): [SolarTerm, Date]
    /**
     * 取得季节索引
     */
    getSeasonIndex(): number

    /**
     * 取得當前日期所在的月建或月將地支，
      月建：子月從0開始，月將：子月月將日到丑月月將日為0，類推
     * @param flag 為0時取月建，為1時取月將, default 0
    */
    getMonthBuilder(flag?: 0 | 1): [SB, lunisolar.SolarTerm, Date]
    /**
     * 取得季节
     */
    getSeason(isShortName?: boolean): string

    getConfig(): LunisolarConfigData
    getConfig(key: keyof LunisolarConfigData): LunisolarConfigData[typeof key]
    getConfig(key?: keyof LunisolarConfigData): any
    /**
     * 取得當前語言包
     * @param lang 語言包名稱，不填時為當前設定語言包
     */
    getLocale(lang?: string): LocaleData
    /**
     * 通过语言包的key取得翻译结果
     * @param key 语言key, 多层key可通过.号分隔，如 'theGods.建'
     */
    L(key: keyof LocaleData): LocaleData[typeof key]
    L<T = any>(key: string): T | string
    /**
     * Returns a Date object for the current time
     *
     * 返回当前日期的Date对象
     */
    toDate(): Date
    /**
     * Clone a new Lunisolar object
     *
     * 克隆Lunisolar對象
     */
    clone(): Lunisolar

    /**
     * 取得缓存
     * @param key 缓存key
     */
    cache<T = any>(key: string): T | undefined
    /**
     * 设置缓存
     *
     * @param key 缓存key
     * @param value 要设置的内容
     */
    cache<T = any>(key: string, value: T): void
    /**
     * Returns a timestamp in seconds
     */
    unix(): number
    /**
     * Returns the valueOf of the Date object
     */
    valueOf(): number
    /**
     * utc offset
     */
    utcOffset(): number
    /**
     * Returns the toISOString of the Date object
     */
    toISOString(): string
    /**
     * Returns the toUTCString of the Date object
     */
    toString(): string
    /**
     * Calculate date difference
     *
     * 計算日期差
     *
     * @param date 要对比的日期
     * @param unit 单位
     * @param float 是否返小数
     */
    diff(date: DateConfigType | Lunisolar, unit?: Unit, float?: boolean): number
    /**
     * 日期加减
     *
     * @param value 加减的数值，负数即为减
     * @param unit 单位
     */
    add(value: number, unit?: Unit): Lunisolar
    /**
     * 格式化日期
     *
     * @param formatStr 格式化字符串
     */
    format(formatStr: string): string
  }

  /**
   * The type for Lunisolar Plugin Function
   * @param option 插件配置
   * @param lsClass Lunisolar Class
   * @param lsInstance lunisolar
   */
  export type PluginFunc<T = any> = (
    option: T,
    lsClass: typeof lunisolar.Lunisolar,
    lsFactory: typeof lunisolar
  ) => Promise<void> | void

  /**
   * Setting global Configuration
   *
   * 设置全局配置
   * @param config 配置内容
   */
  export function config(config: ConfigType): typeof lunisolar

  /**
   * lunisolar 加載插件方法
   *
   * This method is used for luisolar to load plugins
   * @param pluginFunc 插件（以函数型式存在）
   * @param option 插件配置
   */
  export function extend<T = any>(plugin: PluginFunc<T>, options?: T): typeof lunisolar

  /**
   * Loading language packs
   *
   * 加载语言包
   * @param localeData 语言包, 可以存入单个或多个，多个则以数组形式传入，最后一个语言包会覆盖前面的。
   */
  export function locale(localeData: ILocale | ILocale[], unChangeLang?: boolean): typeof lunisolar

  /**
   * 取得语言包
   *
   * @param lang 语言名称，如en, zh等
   */
  export function getLocale(lang: string): LocaleData
}
