import { LUNAR_UNITS_SET } from '../constants'
import { parseDate, prettyUnit } from '../utils'
import { dateDiff, lunarDateDiff } from '../utils/dateDiff'
import { format } from '../utils/format'
import { Lunar } from './lunar'
import { SolarTerm } from './solarTerm'
import { Char8 } from './char8'
import {
  FIRST_YEAR,
  LAST_YEAR,
  TERM_MINIMUM_DATES,
  TERM_SAME_HEX,
  TERM_LIST
} from '../constants/lunarData'
import { _GlobalConfig } from '../config'

export class Lunisolar implements ILunisolar {
  _config: GlobalConfig
  _date: Date
  _solarTerm?: SolarTerm | null
  _lunar?: Lunar
  _char8?: Char8
  constructor(date?: lunisolar.DateConfigType | Lunisolar, config?: lunisolar.ConfigType) {
    this._date = parseDate(date)
    this._config = Object.assign({}, _GlobalConfig, config)
  }

  get lunar(): Lunar {
    if (this._lunar) return this._lunar
    this._lunar = new Lunar(this._date, { lang: this._config.lang })
    return this._lunar
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
    // 由于存放的超出js的安全整数范围，故先转为字符串
    const data = TERM_SAME_HEX[TERM_LIST[year - FIRST_YEAR]].toString(2).padStart(48, '0')
    const cutLen = (month - 1) * 4
    const monthTermData = parseInt(data.slice(data.length - cutLen - 4, data.length - cutLen), 2)
    const term1 = (monthTermData & 3) + TERM_MINIMUM_DATES[(month - 1) * 2]
    const term2 = (monthTermData >> 2) + TERM_MINIMUM_DATES[(month - 1) * 2 + 1]
    const config = {
      lang: this._config.lang
    }
    if (date === term1) return new SolarTerm((month - 1) * 2, config)
    else if (date === term2) return new SolarTerm((month - 1) * 2 + 1, config)
    else return null
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
    return this._date.toUTCString()
  }

  format(formatStr: string): string {
    return format(formatStr, this)
  }

  diff(date: lunisolar.DateConfigType | Lunisolar, unit?: Unit, float: boolean = false): number {
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
