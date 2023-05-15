declare function lunisolar(
  date?: DateConfigType | JDDict,
  configType?: lunisolar.ConfigType
): lunisolar.Lunisolar

declare namespace lunisolar {
  export type DateConfigType = string | number | Date | null | undefined | DateDictPart
  export interface FromLunarData extends ParseFromLunarParam {
    [k: string]: any
  }
  export interface ConfigType extends Partial<Omit<GlobalConfig, 'locales'>> {
    extra?: any
  }
  export interface Locale extends LsrLocale {}
  export const _globalConfig: GlobalConfig
  /**
   * ## class Lunar
   * 陰歷對象
   * @param date 日期对象
   * @param config 设置
   */
  export class Lunar {
    readonly _date: date
    /**
     * 取得該年陰歷正月初一的所在公歷年
     */
    readonly year: number
    /**
     * 取得陰歷月
     */
    readonly month: number
    /**
     * 取得陰歷日
     */
    readonly day: number
    /**
     * 取得陰歷時辰下標 0 ~ 11
     */
    readonly hour: number
    /**
     * 當年的閏月，如果為0則為沒有閏月
     */
    readonly leapMonth: number
    /**
     * 當年的閏月是否大朋
     */
    readonly leapMonthIsBig: boolean
    readonly _config: Required<LunarConfig>
    static fromLunar(lunarData: ParseFromLunarParam, config?: LunarConfig): Lunar
    constructor(date: Date, config?: LunarConfig)
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
    get lunarNewYearDay(): Date
    /**
     * 取得本农历年的取后一天
     */
    get lastDayOfYear(): Date
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
      @returns {Date}
     */
    static getLunarNewYearDay(year: number): Date
  }

  /**
   * ## class Element5
   * 五行
   * @param value 五行索引值或五行对象
   * @param config 设置
   */
  export class Element5 {
    /**
     * the Element5.value is the index of ['木', '火', '土', '金', '水']
     */
    readonly value: number
    readonly _config: Required<ClassCommonConfig>
    static getNames: (lang?: string) => string[]
    static instances: Map<string, Element5>
    static create(value: number | string | Element5, config?: ClassCommonConfig): Element5
    constructor(value: number | string | Element5, config?: ClassCommonConfig)
    toString(): string
    valueOf(): number
    /**
     * 取得五行名称
     */
    get name(): string
    /**
     * 相生
     * Inter-promoting (相生 xiāngshēng): the effect in the generating (生 shēng) cycle
     */
    generating(): Element5
    /**
     * 相克
     * Inter-regulating (相克 xiāngkè): the effect in the overcoming (克 kè) cycle
     */
    overcoming(): Element5

    /**
     * 相洩
     *  Weakening (相洩/相泄 xiāngxiè): the effect in a deficient or reverse generating (生 shēng) cycle
     */
    weakening(): Element5

    /**
     * 相侮
     * Counteracting (相侮 xiāngwǔ or 相耗 xiānghào??): the effect in a deficient or reverse overcoming (克 kè) cycle
     */
    counteracting(): Element5
  }

  /**
   * ## class Trigram8
   * 八卦
   * @param value 八卦各爻作为二进制时的总和数
   * @param config 设置
   */
  export class Trigram8 {
    readonly value: number
    readonly _config: Required<ClassCommonConfig>
    /**
     * 顺序为 坤震坎兌艮離巽乾
     * @param lang 语言包名，不设置时为使用当前语言包
     * @returns string[]
     */
    static getNames: (lang?: string) => string[]
    static instances: Map<string, Trigram8>
    static create(value: number, config?: ClassCommonConfig): Trigram8
    constructor(value: number, config?: ClassCommonConfig)
    get name(): string
    toString(): string
    valueOf(): number
  }

  /**
   * ## class Direction24
   * 廿四山
   * @param value 24山索引值 | 天干实例 | 地支实例 | 八卦实例
   * @param config 设置
   */
  export class Direction24 {
    readonly value: number
    readonly _sign: Stem | Branch | Trigram8
    readonly _config: Required<ClassCommonConfig>
    static getNames: (lang?: string) => string[]
    static instances: Map<string, Direction24>
    static create(value: number | Branch | Stem | Trigram8, config?: ClassCommonConfig): Direction24
    static createFromAngle(angle: number, config: ClassCommonConfig): Direction24
    constructor(value: number | Branch | Stem | Trigram8, config?: ClassCommonConfig)
    /**
     * 当前所在的二十四山位置的对象，可以是天干、地支、八卦对象
     */
    get sign(): Stem | Branch | Trigram8
    /**
     * 当前所在的二十四山的位置的对象的名称
     */
    get name(): string
    /**
     *  当前所在的二十四山的位置的对象的原型类名
     */
    get type(): 'Branch' | 'Stem' | 'Trigram8'
    /**
     * 角度，
     ```text
     360度均分为24份，从子山为0度开始，顺时针行走，每山15度，到壬山345度结束
     ```
     */
    get angle(): number
    /**
     * 方向名称
     * 返回国际化翻译后的名称
     */
    get direction(): string
    /**
     * 方向名索引
     * 返回方向名称的索引，其索引顺序为九宫数号
     */
    get directionIndex(): number
    toString(): string
    valueOf(): number
  }

  /**
   * ## class Stem
   * 天干
   * @param value 天干索引 | 天干名稱 | 天干實例
   * @param config 设置
   */
  export class Stem extends CacheClass {
    readonly value: number
    readonly _config: Required<ClassCommonConfig>
    static getNames: (lang?: string) => string[]
    static instances: Map<string, Stem>
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
    get name(): string
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
   * ## class Branch
   * 地支
   * @param value 地支索引 | 天干名稱 | 天干實例
   * @param config 设置
   */
  export class Branch extends CacheClass {
    /**
     * 地支索引 0 ~ 11
     * ```
     *    0     1    2     3     4     5     6     7     8     9    10    11
     *  ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
     * ```
     */
    readonly value: number
    readonly _config: Required<ClassCommonConfig>
    static getNames: (lang?: string) => string[]
    static instances: Map<string, Branch>
    static create(value: number | string | Branch, config?: ClassCommonConfig): Branch
    constructor(value: number | string | Branch, config?: ClassCommonConfig)
    toString(): string
    valueOf(): number
    get name(): string
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

    /**
     * 三合五行属性
     */
    get triadE5(): Element5

    /**
     * 六合
     */
    get group6(): Branch

    /**
     * 六合五行属性
     */
    get group6E5(): Element5

    /**
     * 相刑
     */
    get punishing(): Branch

    /**
     * 被刑
     */
    get punishBy(): Branch

    /**
     * 相冲
     */
    get conflict(): Branch

    /**
     * 相破
     */
    get destroying(): Branch

    /**
     * 相害
     */
    get harming(): Branch
  }

  /**
   * ## class SB
   * 天干地支组合(八字單柱)
   *
   * SB為 StemBranch 的簡寫
   * @param value 60位的天干地支組合的索引值
   * @param config 设置
   */
  export class SB {
    /**
     * 天干實例
     */
    readonly stem: Stem
    /**
     * 地支實例
     */
    readonly branch: Branch
    /**
     * 60位的天干地支組合的索引值 0 ~ 59
     */
    readonly value: number
    readonly _config: Required<ClassCommonConfig>
    static getNames: (lang?: string) => string[]
    static instances: Map<string, SB>
    static create(value: number | SB, config?: ClassCommonConfig): SB
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
     * 天干地支名，如'甲子'
     */
    get name(): string
    /**
     * 旬空
     */
    get missing(): [Branch, Branch]
  }

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
   * ## class Char8
   * 八字
   * @param dateOrSbList 日期 或者 八字四柱的天干地支組合
   * @param Char8Config { lang: 语言名, changeAgeTerm: 用于換歲的節氣 }
   */
  export class Char8 {
    readonly value: number
    readonly _list: [SB, SB, SB, SB]
    readonly _config: Required<Char8Config>
    constructor(dateOrSbList: Date | [SB, SB, SB, SB], config?: Char8Config)
    toString(): string
    valueOf(): number
    getConfig(): Required<Char8Config>
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
    static computeValue(sbList: SB[]) {
      let res = 0
      for (let i = 0; i < 4; i++) {
        res += sbList[i].valueOf() * Math.pow(10, 2 * (3 - i))
      }
      return res
    }

    /**
     * 計算年柱
     * @param yearOrDate 年份或日期對象
     * @param Char8Config { lang: 语言名, changeAgeTerm: 用于換歲的節氣 }
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
   * ## class Lunisolar
   * @param date 日期对象 | 日期字符串
   * @param config 设置
   */
  export class Lunisolar extends CacheClass {
    readonly _config: LunisolarConfigData
    // readonly _date: Date
    readonly _offset: number
    readonly jd: JD

    constructor(date?: DateParamType | JDDict, config?: ConfigType)

    get lunisolar(): typeof lunisolar
    get year(): number
    get month(): number
    get day(): number
    get dayOfWeek(): number
    get hour(): number
    get minute(): number
    get second(): number
    get millis(): number

    /**
     * get lunar object
     *
     * 取得陰歷對象
     */
    get lunar(): Lunar
    /**
     * Get the current char8 object
     *
     * 取得八字對象
     */
    get char8(): Char8

    /**
     * 取得所有markers
     */
    get markers(): Markers
    /**
     * Get the current solar term object
     *
     * 取得當前節氣對象
     */
    get solarTerm(): SolarTerm | null
    /**
     * Get the most recent solar term on the current date
     *
     * 取得当前日期之前的最近的节气点
     * @param nodeFlag 取的节气点，0: 取节， 1: 取气, 2: 节或气都取
     */
    recentSolarTerm(nodeFlag: 0 | 1 | 2): [SolarTerm, Date]
    /**
     * 取得當前日期所在的月建或月將对应的月建地支，
      月建：子月從0開始，月將：子月月將日到丑月月將日為0，類推
     * @param flag 為0時取月建，為1時取月將, default 0
    */
    getMonthBuilder(flag?: 0 | 1): [SB, lunisolar.SolarTerm, Date]

    /**
     * 取得季节索引
     */
    getSeasonIndex(): number

    /**
     * 取得季节
     */
    getSeason(isShortName?: boolean): string

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

    getConfig(): LunisolarConfigData
    getConfig(key: keyof LunisolarConfigData): LunisolarConfigData[typeof key]
    getConfig(key?: keyof LunisolarConfigData): any
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
     * Returns a timestamp in seconds
     */
    unix(): number
    /**
     * Returns the valueOf of the Date object
     */
    valueOf(): number
    /**
     * Convert to the local time
     */
    local(): Lunisolar
    /**
     * Convert to the UTC time
     */
    utc(): Lunisolar
    /**
     * Check if UTC time
     */
    isUTC(): boolean

    /**
     * get utcOffset
     */
    utcOffset(): number
    /**
     * set utcOffset and return a new Lunisolar instance
     */
    utcOffset(utcOffset: number): Lunisolar
    /**
     * Returns the toISOString of the Date object
     */
    toISOString(): string
    /**
     * Returns the toUTCString of the Date object
     */
    toUTCString(): string
    /**
     * Returns the toUTCString of the Date object and lunar info
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
    add(value: number, unit?: GreUnit): Lunisolar
    /**
     * 格式化日期
     *
     * @param formatStr 格式化字符串
     */
    format(formatStr: string): string
    // markers: {
    //   get: LsrGetMarkersFn
    // }
  }

  // export class Markers {
  //   static readonly store: MarkersStore
  //   readonly markers: StoreMarker[]
  //   static add(markersSetting: MarkersSetting, tags?: string | string[]): void
  //   static clean(): void
  //   static cleanFnList(): void
  //   static remove(format: string, matcher?: string, names?: string | string[]): void
  //   static removeByTag(tags: string | string[]): void
  //   static removeByName(names: string | string[]): void
  // }

  /**
   * The type for Lunisolar Plugin Function
   * @param option 插件配置
   * @param lsClass Lunisolar Class
   * @param lsInstance lunisolar
   */
  export type PluginFunc<T = unknown> = {
    (
      option: T,
      lsClass: typeof lunisolar.Lunisolar,
      lsFactory: typeof lunisolar
    ): Promise<void> | void
    $once?: any
    [x: string]: any
  }

  export function utc(date?: DateConfigType | Lunisolar, config?: ConfigType): Lunisolar

  /**
   * Get the Lunisolar instance by lunar data
   *
   * 通过阴历数据创建lunisolar实例（阴历反查）
   * @param lunarData 阴历数据 {year, month, day, hour, isLeapMonth}
   * @param config 创建Lunisolar实例时对应的设置
   */
  export function fromLunar(lunarData: ParseFromLunarParam, config?: configType): Lunisolar

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
  export function extend<T = unknown>(plugin: PluginFunc<T>, options?: T): typeof lunisolar

  /**
   * Loading language packs
   *
   * 加载语言包
   * @param localeData 语言包, 可以存入单个或多个，多个则以数组形式传入，最后一个语言包会覆盖前面的。
   */
  export function locale(
    localeData: LsrLocale | LsrLocale[],
    unChangeLang?: boolean
  ): typeof lunisolar

  /**
   * 取得语言包
   *
   * @param lang 语言名称，如en, zh等
   */
  export function getLocale(lang: string): LocaleData

  export function defineLocale(localeData: { name: string; [x: string]: any }): LsrLocale
}
