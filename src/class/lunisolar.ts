import { LUNAR_UNITS_SET, INVALID_DATE_STRING, FORMAT_DEFAULT, REGEX_FORMAT } from '../constants'
import { parseDate, prettyUnit, padZoneStr } from '../utils'
import { dateDiff, lunarDateDiff } from '../utils/dateDiff'
import { Lunar } from './lunar'
import { Term } from './term'
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
  _term?: Term | null
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
  get term(): Term | null {
    if (this._term !== undefined) return this._term
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
    if (date === term1) return new Term((month - 1) * 2, config)
    else if (date === term2) return new Term((month - 1) * 2 + 1, config)
    else return null
  }

  // 八字
  get char8(): Char8 {
    if (this._char8) return this._char8
    const config = {
      lang: this._config.lang,
      changeEgeTrem: this._config.changeEgeTrem
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
    // const locale = this.$locale()
    console.log('run in format')
    if (this._date.toString() === INVALID_DATE_STRING) return INVALID_DATE_STRING

    let str = formatStr || FORMAT_DEFAULT
    // const zoneStr = Utils.z(this)
    const y = this._date.getFullYear()
    const M = this._date.getMonth() + 1
    const D = this._date.getDate()
    const w = this._date.getDay()
    const H = this._date.getHours()
    const m = this._date.getMinutes()
    const s = this._date.getSeconds()
    const zoneStr = padZoneStr(this)
    const lunar = this.lunar
    const char8 = this.char8
    const locale = _GlobalConfig.locales[this._config.lang]

    const { weekdays, months, meridiem } = locale
    const getShort = (arr: string[], index: number, full?: string[], length?: number) =>
      (arr && arr[index]) || (full ? full[index].slice(0, length) : '')
    // const get$H = num => Utils.s($H % 12 || 12, num, '0')
    const h = H % 12 || 12

    const meridiemFunc =
      meridiem ||
      ((hour: number, minute: number, isLowercase: boolean) => {
        const m = hour < 12 ? 'AM' : 'PM'
        return isLowercase ? m.toLowerCase() : m
      })

    const matches = {
      YY: String(y).slice(-2),
      YYYY: String(y),
      M: String(M),
      MM: String(M).padStart(2, '0'),
      MMM: getShort(locale.monthsShort, M - 1, months, 3),
      MMMM: getShort(months, M - 1),
      D: String(D),
      DD: String(D).padStart(2, '0'),
      d: String(w),
      dd: getShort(locale.weekdaysMin, w, weekdays, 2),
      ddd: getShort(locale.weekdaysShort, w, weekdays, 3),
      dddd: weekdays[w],
      H: String(H),
      HH: String(H).padStart(2, '0'),
      h: String(h),
      hh: String(h).padStart(2, '0'),
      a: meridiemFunc(H, m, true),
      A: meridiemFunc(H, m, false),
      m: String(m),
      mm: String(m).padStart(2, '0'),
      s: String(s),
      ss: String(s).padStart(2, '0'),
      SSS: String(this._date.getMilliseconds()).padStart(3, '0'),
      Z: zoneStr, // 'ZZ' logic below
      // 生肖
      zo: locale.zodiacAnimal[char8.year.branch.value],
      // 陰歷
      lY: lunar.getYearName(),
      lM: lunar.getMonthName(),
      lD: lunar.getDayName(),
      lH: lunar.getHourName(),
      lL: lunar.isBigMonth ? locale.bigMonth : locale.smallMonth,
      // 陰歷(數字形式)
      lYn: String(lunar.year),
      lMn: String(lunar.month),
      lDn: String(lunar.day),
      lHn: String(lunar.hour + 1),
      // 八字
      cY: char8.year.toString(),
      cYs: char8.year.stem.toString(),
      cYb: char8.year.branch.toString(),
      cM: char8.month.toString(),
      cMs: char8.month.stem.toString(),
      cMb: char8.month.branch.toString(),
      cD: char8.day.toString(),
      cDs: char8.day.stem.toString(),
      cDb: char8.day.branch.toString(),
      cH: char8.hour.toString(),
      cHs: char8.hour.stem.toString(),
      cHb: char8.hour.branch.toString()
    }

    str = str.replace(REGEX_FORMAT, (match, $1) => {
      console.log('match', match)
      return $1 || matches[match as keyof typeof matches] || zoneStr.replace(':', '')
    }) // 'ZZ'
    return str
  }

  diff(date: lunisolar.DateConfigType | Lunisolar, unit?: Unit, float: boolean = false): number {
    unit = unit ? prettyUnit(unit) : 'millisecond'
    if (LUNAR_UNITS_SET.has(unit)) {
      // 如果是农历查询
      return lunarDateDiff(
        this,
        date instanceof Lunisolar ? date : new Lunisolar(date, this._config),
        unit,
        float
      )
    }
    return dateDiff(this._date, date, unit, float)
  }
}
