import { LUNAR_UNITS_SET } from '../constants'
import {
  parseDate,
  prettyUnit,
  computeSBMonthValueByTerm,
  getTranslation,
  computeUtcOffset,
  getDateData
} from '../utils'
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
import { cache } from '@lunisolar/utils'
import { CacheClass } from './cacheClass'
import { Markers } from './markers'

export class Lunisolar extends CacheClass {
  readonly _config: LunisolarConfigData
  readonly _date: Date
  readonly _offset: number
  constructor(date?: DateParamType, config?: lunisolar.ConfigType) {
    super()
    this._config = Object.assign({ extra: {} }, _GlobalConfig, config)

    const { isUTC, offset } = this._config
    const _date = parseDate(date, isUTC)
    if (offset !== 0) {
      _date.setMinutes(_date.getMinutes() + offset)
    }
    const localTimezoneOffset = -1 * parseDate(date).getTimezoneOffset()
    this._config.extra.localTimezoneOffset = localTimezoneOffset

    this._date = _date
    this._offset = offset
  }

  get lunisolar(): typeof lunisolar {
    return lunisolarFac
  }

  get year(): number {
    return getDateData(this._date, 'FullYear', this.isUTC())
  }

  get month(): number {
    return getDateData(this._date, 'Month', this.isUTC()) + 1
  }

  get day(): number {
    return getDateData(this._date, 'Date', this.isUTC())
  }

  get dayOfWeek(): number {
    return getDateData(this._date, 'Day', this.isUTC())
  }

  get hour(): number {
    return getDateData(this._date, 'Hours', this.isUTC())
  }

  get minute(): number {
    return getDateData(this._date, 'Minutes', this.isUTC())
  }

  get second(): number {
    return getDateData(this._date, 'Seconds', this.isUTC())
  }

  get millis(): number {
    return getDateData(this._date, 'Milliseconds', this.isUTC())
  }

  @cache('lunisolar:lunar')
  get lunar(): Lunar {
    return new Lunar(this._date, { lang: this._config.lang, isUTC: this.isUTC() })
  }

  // 八字
  @cache('lunisolar:char8')
  get char8(): Char8 {
    const config = {
      lang: this._config.lang,
      changeAgeTerm: this._config.changeAgeTerm,
      isUTC: this.isUTC(),
      offset: this._offset
    }
    return new Char8(this._date, config)
  }

  // markers
  @cache('lunisolar:markers')
  get markers(): Markers {
    return new Markers(this)
  }

  // 节气
  @cache('lunisolar:solarTerm')
  get solarTerm(): SolarTerm | null {
    const year = this.year
    if (year < FIRST_YEAR || year > LAST_YEAR) {
      throw new Error(`${year}  is not in the allowed time range.`)
    }
    const month = this.month
    const date = this.day
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
   */
  @cache('lunisolar:getMonthBuilder', true)
  getMonthBuilder(flag: 0 | 1 = 0): [SB, lunisolar.SolarTerm, Date] {
    const sbConfig = {
      lang: this.getConfig('lang') as string
    }
    const [term, termDate] = this.recentSolarTerm(flag)
    const sbValue = computeSBMonthValueByTerm(this.toDate(), term.value, termDate)
    const sb = new SB(sbValue, undefined, sbConfig)
    return [sb, term, termDate]
  }

  getSeasonIndex(): number {
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
    return undefined
  }

  toDate(): Date {
    return new Date(this.valueOf())
  }

  clone() {
    return new Lunisolar(this.valueOf(), this._config)
  }

  unix() {
    return Math.floor(this.valueOf() / 1000)
  }

  valueOf() {
    return this._date.valueOf() - this._offset * 60 * 1000
  }

  local() {
    const config = Object.assign({}, this._config, {
      isUTC: false,
      offset: 0
    })
    return new Lunisolar(this.toDate(), config)
  }

  utc(): Lunisolar {
    return this.utcOffset(-this._offset)
  }

  isUTC() {
    return this._config.isUTC
  }

  utcOffset(): number
  utcOffset(utcOffset: number): Lunisolar
  utcOffset(utcOffset?: number): number | Lunisolar {
    if (utcOffset === void 0) {
      if (this.isUTC()) return this._offset
      return computeUtcOffset(this._date)
    }
    const config = Object.assign({}, this._config, {
      isUTC: true,
      offset: Math.abs(utcOffset) <= 16 ? utcOffset * 60 : utcOffset
    })
    return new Lunisolar(this._date, config)
  }

  toISOString() {
    return this._date.toISOString()
  }

  toUTCString() {
    return this._date.toUTCString()
  }

  toString() {
    return this._date.toUTCString() + ` (${this.lunar})` + ` utcOffset: ${this.utcOffset()}`
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

  add(value: number, unit?: DateAddUnit): Lunisolar {
    const date = this.toDate()
    const newDate = dateAdd(date, value, unit)
    return new Lunisolar(newDate, this.getConfig())
  }
}
