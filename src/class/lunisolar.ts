import { LUNAR_UNITS_SET } from '../constants'
import { parseDate, prettyUnit } from '../utils'
import { dateDiff, lunarDateDiff } from '../utils/dateDiff'
import { format } from '../utils/format'
import { Lunar } from './lunar'
import { SolarTerm } from './solarTerm'
import { Char8 } from './char8'
import { FIRST_YEAR, LAST_YEAR } from '../constants/lunarData'
import { _GlobalConfig } from '../config'

export class Lunisolar implements ILunisolar {
  _config: GlobalConfig
  _date: Date
  _solarTerm?: SolarTerm | null
  _lunar?: Lunar
  _char8?: Char8
  _cache: { [key: string]: any } = {}
  constructor(date?: DateParamType, config?: lunisolar.ConfigType) {
    this._date = parseDate(date)
    this._config = Object.assign({}, _GlobalConfig, config)
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
    return SolarTerm.findNode<false>(this._date, {
      lang: this._config.lang,
      nodeFlag,
      returnValue: false
    })
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
      return typeof this._cache[key] !== 'undefined' ? this._cache[key] : undefined
    }
    this._cache[key] = value
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
}
