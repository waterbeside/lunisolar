declare namespace lunisolar {
  /**
   * ## class Lunisolar
   * @param date 日期(Date或JD对象) | 日期字符串 | 时间戳
   * @param config 设置
   */
  export class Lunisolar extends CacheClass {
    readonly _config: LunisolarConfigData
    readonly _offset: number
    readonly jd: JD

    constructor(date?: DateParamType, config?: ConfigType)

    get lunisolar(): typeof lunisolar
    get year(): number
    get month(): number
    get day(): number
    get dayOfWeek(): number
    get hour(): number
    get minute(): number
    get second(): number
    get millisecond(): number

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
    recentSolarTerm(nodeFlag: 0 | 1 | 2): [SolarTerm, JD]
    /**
     * 取得當前日期所在的月建或月將对应的月建地支，
      月建：子月從0開始，月將：子月月將日到丑月月將日為0，類推
     * @param flag 為0時取月建，為1時取月將, default 0
    */
    getMonthBuilder(flag?: 0 | 1): [SB, lunisolar.SolarTerm, JD]
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
}
