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
import lunisolarFactory from '../index'

export class Lunisolar implements ILunisolar {
  _config: LunisolarConfigData
  _date: Date
  _solarTerm?: SolarTerm | null
  _lunar?: Lunar
  _char8?: Char8
  _cache = new Map<string, any>()
  constructor(date?: DateParamType, config?: lunisolar.ConfigType) {
    this._date = parseDate(date)
    this._config = Object.assign({}, _GlobalConfig, config)
  }

  get lunisolar(): typeof lunisolarFactory {
    return lunisolarFactory
  }

  get lunar(): Lunar {
    if (this._lunar) return this._lunar
    this._lunar = new Lunar(this._date, { lang: this._config.lang })
    return this._lunar
  }

  // 八字
  get char8(): Char8 {
    if (this._char8) return this._char8
    const config = {
      lang: this._config.lang,
      changeAgeTerm: this._config.changeAgeTerm
    }
    this._char8 = new Char8(this._date, config)
    return this._char8
  }

  // 节气
  get solarTerm(): SolarTerm | null {
    if (this._solarTerm !== undefined) return this._solarTerm
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
  recentSolarTerm(nodeFlag: 0 | 1 | 2): [SolarTerm, Date] {
    const cacheKey = `recent_solar_term:${nodeFlag}`
    const cache = this.cache<[SolarTerm, Date]>(cacheKey)
    if (cache) return cache
    const res = SolarTerm.findNode<false>(this._date, {
      lang: this._config.lang,
      nodeFlag,
      returnValue: false
    })
    this.cache(cacheKey, cache)
    return res
  }

  /**
   * 取得當前日期所在的月建或月將地支，
     月建：子月從0開始，月將：子月月將日到丑月月將日為0，類推
   * @param flag 為0時取月建，為1時取月將
   *
   */
  getMonthBuilder(flag: 0 | 1 = 0): [SB, lunisolar.SolarTerm, Date] {
    const cacheKey = `month_builder:${flag}`
    const cache = this.cache(cacheKey)
    if (cache) return cache
    const sbConfig = {
      lang: this.getConfig('lang')
    }
    const [term, termDate] = this.recentSolarTerm(flag)
    const sbValue = computeSBMonthValueByTerm(this.toDate(), term.value, termDate)

    const sb = new SB(sbValue, undefined, sbConfig)
    this.cache(cacheKey, [sb, term, termDate])
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

  cache<T = any>(key: string): T | undefined
  cache<T = any>(key: string, value: T): void
  cache<T = any>(key: string, value?: T): T | undefined | void {
    if (typeof value === 'undefined') {
      return this._cache.has(key) ? this._cache.get(key) : undefined
    }
    this._cache.set(key, value)
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
