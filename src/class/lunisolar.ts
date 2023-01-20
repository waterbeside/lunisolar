import { LUNAR_UNITS_SET } from '../constants'
import { parseDate, prettyUnit, computeSBMonthValueByTerm, getTranslation } from '../utils'
import { dateDiff, lunarDateDiff } from '../utils/dateDiff'
import { dateAdd } from '../utils/dateAdd'
import { format } from '../utils/format'
import { Lunar } from './lunar'
import { SolarTerm } from './solarTerm'
import { Char8 } from './char8'
import { FIRST_YEAR, LAST_YEAR } from '../constants/lunarData'
import { _GlobalConfig } from '../config'
import { SB } from './stemBranch'
import lunisolarFac from '../index'
import { cache } from '../utils/decorators'
import { CacheClass } from './CacheClass'

export class Lunisolar extends CacheClass {
  readonly _config: LunisolarConfigData
  protected _date: Date
  constructor(date?: DateParamType, config?: lunisolar.ConfigType) {
    super()
    this._date = parseDate(date)
    this._config = Object.assign({}, _GlobalConfig, config)
  }

  get lunisolar(): typeof lunisolar {
    return lunisolarFac
  }

  get year(): number {
    return this._date.getFullYear()
  }

  get month(): number {
    return this._date.getMonth() + 1
  }

  get day(): number {
    return this._date.getDate()
  }

  get dayOfWeek(): number {
    return this._date.getDay()
  }

  get hour(): number {
    return this._date.getHours()
  }

  get minute(): number {
    return this._date.getMinutes()
  }

  get second(): number {
    return this._date.getSeconds()
  }

  get millis(): number {
    return this._date.getMilliseconds()
  }

  @cache('lunisolar:lunar')
  get lunar(): Lunar {
    return new Lunar(this._date, { lang: this._config.lang })
  }

  // 八字
  @cache('lunisolar:char8')
  get char8(): Char8 {
    const config = {
      lang: this._config.lang,
      changeAgeTerm: this._config.changeAgeTerm
    }
    return new Char8(this._date, config)
  }

  // 节气
  @cache('lunisolar:solarTerm')
  get solarTerm(): SolarTerm | null {
    const year = this._date.getFullYear()
    if (year < FIRST_YEAR || year > LAST_YEAR) {
      throw new Error(`${year} is not a lunar year`)
    }
    const month = this._date.getMonth() + 1
    const date = this._date.getDate()
    const [term1, term2] = SolarTerm.getMonthTerms(year, month)
    const config = {
      lang: this._config.lang
    }
    if (date === term1) return new SolarTerm((month - 1) * 2, config)
    else if (date === term2) return new SolarTerm((month - 1) * 2 + 1, config)
    else return null
  }

  /**
   * 取得当前日期之前的最近的节气点
   * @param nodeFlag 取的节气点，0: 取节， 1: 取气, 2: 节或气都取
   */
  @cache('lunisolar:recentSolarTerm', true)
  recentSolarTerm(nodeFlag: 0 | 1 | 2): [SolarTerm, Date] {
    return SolarTerm.findNode<false>(this._date, {
      lang: this._config.lang,
      nodeFlag,
      returnValue: false
    })
  }

  /**
   * 取得當前日期所在的月建或月將地支，
     月建：子月從0開始，月將：子月月將日到丑月月將日為0，類推
   * @param flag 為0時取月建，為1時取月將
   *
   */
  @cache('lunisolar:getMonthBuilder', true)
  getMonthBuilder(flag: 0 | 1 = 0): [SB, lunisolar.SolarTerm, Date] {
    const sbConfig = {
      lang: this.getConfig('lang')
    }
    const [term, termDate] = this.recentSolarTerm(flag)
    const sbValue = computeSBMonthValueByTerm(this.toDate(), term.value, termDate)
    const sb = new SB(sbValue, undefined, sbConfig)
    return [sb, term, termDate]
  }

  getSeasonIndex() {
    const rst = this.recentSolarTerm(0)
    const termVal = rst[0].value
    if (2 <= termVal && termVal < 8) return 0
    if (8 <= termVal && termVal < 14) return 1
    if (14 <= termVal && termVal < 20) return 2
    return 3
  }

  getSeason(isShortName: boolean = false): string {
    const ssv = this.getSeasonIndex()
    const locale = this.getLocale()
    return isShortName && locale.seasonShortName
      ? locale.seasonShortName[ssv]
      : locale.seasonName[ssv]
  }

  getLocale(lang?: string): LocaleData {
    return _GlobalConfig.locales[lang ?? this._config.lang]
  }

  L(key: keyof LocaleData): LocaleData[typeof key]
  L<T = any>(key: string): T | string {
    const locale = this.getLocale()
    return getTranslation<T, LocaleData>(locale, key)
  }

  getConfig(): LunisolarConfigData
  getConfig(key: keyof LunisolarConfigData): LunisolarConfigData[typeof key]
  getConfig(key?: keyof LunisolarConfigData): any {
    if (typeof key === 'undefined') return this._config
    if (typeof this._config[key]) return this._config[key]
    return _GlobalConfig[key]
  }

  toDate(): Date {
    return new Date(this._date.valueOf())
  }

  clone() {
    return new Lunisolar(this._date, this._config)
  }

  unix() {
    return Math.floor(this.valueOf() / 1000)
  }

  valueOf() {
    return this._date.valueOf()
  }

  utcOffset() {
    // 與moment.js保持一致
    // Because a bug at FF24, we're rounding the timezone offset around 15 minutes
    // https://github.com/moment/moment/pull/1871
    return -Math.round(this._date.getTimezoneOffset() / 15) * 15
  }

  toISOString() {
    return this._date.toISOString()
  }

  toString() {
    return this._date.toUTCString() + ` (${this.lunar})`
  }

  format(formatStr: string): string {
    return format(formatStr, this)
  }

  diff(date: DateParamType, unit?: Unit, float: boolean = false): number {
    unit = (unit ? prettyUnit(unit) : 'millisecond') as UnitFullNameLower
    if (LUNAR_UNITS_SET.has(unit)) {
      // 如果是农历查询
      return lunarDateDiff(
        this,
        date instanceof Lunisolar ? date : new Lunisolar(date, this._config),
        unit as LunarUnit,
        float
      )
    }
    return dateDiff(this._date, date, unit as GreUnit, float)
  }

  add(value: number, unit?: Unit): Lunisolar {
    const date = this.toDate()
    const newDate = dateAdd(date, value, unit)
    return new Lunisolar(newDate, this.getConfig())
  }
}
