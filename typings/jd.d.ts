type JDConfig = {
  isUTC: boolean
  offset: number
}

declare namespace lunisolar {
  export class JD {
    readonly jdn: number
    readonly jdms: number
    readonly _config: JDConfig
    readonly timezoneOffset: number
    readonly cache: Map<string, any>
    constructor(
      jdd?:
        | DateConfigType
        | JD
        | {
            jd: JD
            [key: string]: any
          },
      config?: Partial<JDConfig>
    )
    /**
     * Gregorian calendar to Julian Day Number
     * 公历转儒略日数
     *
     * @param date  Gregorian calendar date 公历
     * @param isUTC is UTC?
     * @returns Julian Day Number
     */
    static gre2jdn(date?: Date | Partial<DateDict> | string, isUTC?: boolean): number
    /**
     * Create JD object from the Gregorian calendar
     *
     * @param dateDict Gregorian calendar date
     * @param config config
     * @returns JD Instance
     */
    static fromGre(dateDict?: Partial<DateDict> | string, config?: Partial<JDConfig>): JD
    /**
     * Create JD object from the Julian Day Number
     *
     * @param jdn Julian Day Number
     * @param config config
     * @returns JD Instance
     */
    static fromJdn(jdn: number, config?: Partial<JDConfig>): JD
    static fromTimestamp(timestamp: number, config?: Partial<JDConfig>): JD
    /**
     * Julian Day Number to Gregorian calendar
     * 儒略日数转公历
     * @param jdn Julian Day Number 儒略日数
     * @param isUTC is UTC? defalut `false`
     * @returns DateDict
     */
    static jdn2gre(jdn: number, isUTC?: boolean, jdms?: number): Required<DateDict>
    toGre(): Required<DateDict>
    clone(): JD
    local(): JD
    utc(): JD
    isUTC(): boolean
    get year(): number
    get month(): number
    get day(): number
    get hour(): number
    get minute(): number
    get second(): number
    get millisecond(): number
    get dayOfWeek(): number
    get timestamp(): number
    toDate(): Date
    toISOString(): string
    toUTCString(): string
    toString(): string
    valueOf(): number
    add(value: number, unit: GreUnit): JD
    format(formatStr?: string): string
  }
}
