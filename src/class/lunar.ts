import { parseDate, phaseOfTheMoon } from '../utils'

import {
  FIRST_YEAR,
  LAST_YEAR,
  LUNAR_MONTH_DATAS,
  LUNAR_NEW_YEAR_DATE
} from '../constants/lunarData'
import { _GlobalConfig } from '../config'

function getLunarNewYearDate(year: number): Date {
  const lnyd = LUNAR_NEW_YEAR_DATE[year - FIRST_YEAR]
  return parseDate(`${year}/${Math.floor(lnyd / 100)}/${lnyd % 100}`)
}

function getYearLeapMonth(year: number): [number, boolean] {
  const monthData = LUNAR_MONTH_DATAS[year - FIRST_YEAR]
  // 取出闰月
  const leapMonth = monthData >> 13
  const leapMonthIsBig = (monthData >> 12) & 1
  return [leapMonth, leapMonthIsBig === 1]
}

/**
 * @param year 春節所在的公歷年
 * @param dateDiff 當日與當年春節相差天數
 * @returns [月, 日]
 */
function getLunarMonthDate(
  year: number,
  dateDiff: number,
  yearLeapMonth?: [number, boolean]
): [number, number] {
  const monthData = LUNAR_MONTH_DATAS[year - FIRST_YEAR]
  // 取出闰月
  const [leapMonth, leapMonthIsBig] = yearLeapMonth || getYearLeapMonth(year)
  let month = 1
  dateDiff += 1 // 因为是从正月初一开始计算，所以要加1
  let isLeap = false
  while (dateDiff > 29) {
    const isBig = (monthData >> (month - 1)) & 1
    dateDiff = dateDiff - (isBig ? 30 : 29)
    if (month === leapMonth) {
      const leapMonthDateLong = leapMonthIsBig ? 30 : 29
      if (dateDiff > leapMonthDateLong) {
        dateDiff = dateDiff - leapMonthDateLong
      } else {
        isLeap = true
        break
      }
    }
    month++
  }
  return [isLeap ? 100 + month : month, dateDiff]
}

/**
 * 兩日相關天數
 * @param date1 起始日
 * @param date2 結束日
 * @returns 天數
 */
function getDateDiff(date1: Date, date2: Date): number {
  return Math.floor((date2.valueOf() - date1.valueOf()) / 86400000)
}

/**
 * class Lunar
 */
export class Lunar {
  _date: Date
  _y: number
  _m: number
  _d: number
  _h: number
  leapMonth: number
  leapMonthIsBig: boolean
  private _config = {
    lang: _GlobalConfig.lang
  }

  constructor(dateObj: DateParamType, config?: ClassCommonConfig) {
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
    const date = parseDate(dateObj)
    this._date = date
    let year = date.getFullYear()
    let month = date.getMonth()
    let hours = date.getHours()
    // 計算年份
    if (
      year < FIRST_YEAR ||
      year > LAST_YEAR ||
      (year === FIRST_YEAR && month < 1) ||
      (year === FIRST_YEAR && month === 1 && date.getDate() < 19)
    ) {
      throw new Error('Invalid lunar year: out of range')
    }
    let dateDiff = getDateDiff(getLunarNewYearDate(year), date)

    if (date && hours === 23) {
      dateDiff = dateDiff + 1
    }
    if (dateDiff < 0) {
      year = year - 1
      dateDiff = getDateDiff(getLunarNewYearDate(year), date)
    }
    this._y = year
    // 取得當年的闰月
    const [leapMonth, leapMonthIsBig] = getYearLeapMonth(year)
    this.leapMonth = leapMonth
    this.leapMonthIsBig = leapMonthIsBig
    // 計算年和月
    ;[this._m, this._d] = getLunarMonthDate(year, dateDiff, [leapMonth, leapMonthIsBig])
    // 計算時辰 0 ~ 11
    this._h = (hours + 1) % 24 >> 1
  }

  get isLeapMonth(): boolean {
    return this._m > 100
  }

  get isBigMonth(): boolean {
    const monthData = LUNAR_MONTH_DATAS[this._y - FIRST_YEAR]
    if (this.isLeapMonth) {
      return ((monthData >> 12) & 1) === 1
    } else {
      return ((monthData >> (this._m - 1)) & 1) === 1
    }
  }

  get year(): number {
    return this._y
  }

  get month(): number {
    return this._m
  }

  get day(): number {
    return this._d
  }

  get hour(): number {
    return this._h
  }
  /**
   * 当年正月初一的日期
   */
  get lunarNewYearDate(): Date {
    return getLunarNewYearDate(this._y)
  }

  /**
   * 取得月相
   */
  get phaseOfTheMoon() {
    return phaseOfTheMoon(this, _GlobalConfig.locales[this._config.lang])
  }

  getYearName(): string {
    let res = ''
    let year = this._y
    const numerals = _GlobalConfig.locales[this._config.lang].numerals
    while (year) {
      const s = numerals[year % 10]
      res = s + res
      year = Math.floor(year / 10)
    }
    return res
  }

  getMonthName(): string {
    const LunarMonthNames = _GlobalConfig.locales[this._config.lang].lunarMonths
    const leapStr = _GlobalConfig.locales[this._config.lang].leap
    return (this.isLeapMonth ? leapStr : '') + LunarMonthNames[(this._m % 100) - 1]
  }

  getDayName(): string {
    const lunarDayNames = _GlobalConfig.locales[this._config.lang].lunarDays
    return lunarDayNames[this._d - 1]
  }

  getHourName(): string {
    return _GlobalConfig.locales[this._config.lang].branchs[this._h]
  }

  toString(): string {
    const locale = _GlobalConfig.locales[this._config.lang]
    return `${this.getYearName()}${
      locale.lunarYearUnit
    }${this.getMonthName()}${this.getDayName()}${this.getHourName()}${locale.lunarHourUnit}`
  }

  valueOf(): number {
    return this._date.valueOf()
  }

  static getLunarNewYearDate(year: number): Date {
    return getLunarNewYearDate(year)
  }
}
