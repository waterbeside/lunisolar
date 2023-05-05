import {
  parseDate,
  phaseOfTheMoon,
  getLunarNewYearDay,
  getYearLeapMonth,
  parseFromLunar,
  getDateData
} from '../utils'

import { FIRST_YEAR, LAST_YEAR, LUNAR_MONTH_DATAS } from '../constants/lunarData'
import { _GlobalConfig } from '../config'

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
    const mLength = isBig ? 30 : 29
    dateDiff = dateDiff - mLength
    if (month === leapMonth && dateDiff > 0) {
      // 当还有剩余有dateDiff时，并且是闰月出现的月份，检查是否在闰月
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
  if (isLeap) month += 100
  if (dateDiff === 0) {
    dateDiff = 30
    month--
  }
  return [month, dateDiff]
}

/**
 * 兩日相關天數
 * @param date1 起始日
 * @param date2 結束日
 * @returns 天數
 */
function getDateDiff(date1: Date, date2: Date): number {
  return Math.round((date2.valueOf() - date1.valueOf()) / 86400000)
}

/**
 * class Lunar
 */
export class Lunar {
  readonly _date: Date
  readonly year: number
  readonly month: number
  readonly day: number
  readonly hour: number
  readonly leapMonth: number
  readonly leapMonthIsBig: boolean
  readonly _config: Required<LunarConfig> = {
    lang: _GlobalConfig.lang,
    isUTC: false
  }

  static fromLunar(param: ParseFromLunarParam, config?: LunarConfig): Lunar {
    const date = parseFromLunar(param, config?.lang)
    return new Lunar(date, config)
  }

  constructor(dateObj: DateParamType, config?: LunarConfig) {
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
    const _date = parseDate(dateObj)
    this._date = _date
    const isUTC = this._config.isUTC
    let year = getDateData(_date, 'FullYear', isUTC)
    let month = getDateData(_date, 'Month', isUTC)
    let hours = getDateData(_date, 'Hours', isUTC)
    const day = getDateData(_date, 'Date', isUTC)
    const date = parseDate(`${year}/${month + 1}/${day}`)

    // 計算年份
    if (
      year < FIRST_YEAR ||
      year > LAST_YEAR ||
      (year === FIRST_YEAR && month < 1) ||
      (year === FIRST_YEAR && month === 1 && date.getDate() < 19)
    ) {
      throw new Error('Invalid lunar year: out of range')
    }

    let dateDiff = getDateDiff(getLunarNewYearDay(year), date)
    if (date && hours === 23) dateDiff += 1

    if (dateDiff < 0) {
      year = year - 1
      dateDiff = getDateDiff(getLunarNewYearDay(year), date)
    }

    this.year = year
    // 取得當年的闰月
    const [leapMonth, leapMonthIsBig] = getYearLeapMonth(year)
    this.leapMonth = leapMonth
    this.leapMonthIsBig = leapMonthIsBig
    // 計算年和月
    ;[this.month, this.day] = getLunarMonthDate(year, dateDiff, [leapMonth, leapMonthIsBig])
    // 計算時辰 0 ~ 11
    this.hour = (hours + 1) % 24 >> 1
  }

  get isLeapMonth(): boolean {
    return this.month > 100
  }

  get isBigMonth(): boolean {
    const monthData = LUNAR_MONTH_DATAS[this.year - FIRST_YEAR]
    if (this.isLeapMonth) {
      return ((monthData >> 12) & 1) === 1
    } else {
      return ((monthData >> (this.month - 1)) & 1) === 1
    }
  }

  get isLastDayOfMonth(): boolean {
    if (this.isBigMonth && this.day === 30) return true
    if (!this.isBigMonth && this.day === 29) return true
    return false
  }

  /**
   * 当年正月初一的日期
   */
  get lunarNewYearDay(): Date {
    return getLunarNewYearDay(this.year)
  }

  /**
   * 取得本农历年的取后一天
   */
  get lastDayOfYear(): Date {
    const nextNewYearDay = getLunarNewYearDay(this.year + 1)
    return new Date(nextNewYearDay.valueOf() - 24 * 60 * 60 * 1000)
  }

  /**
   * 取得月相
   */
  get phaseOfTheMoon(): string {
    return phaseOfTheMoon(this, _GlobalConfig.locales[this._config.lang])
  }

  toDate(): Date {
    return new Date(this._date.valueOf())
  }

  getYearName(): string {
    let res = ''
    let year = this.year
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
    return (this.isLeapMonth ? leapStr : '') + LunarMonthNames[(this.month % 100) - 1]
  }

  getDayName(): string {
    const lunarDayNames = _GlobalConfig.locales[this._config.lang].lunarDays
    return lunarDayNames[this.day - 1]
  }

  getHourName(): string {
    return _GlobalConfig.locales[this._config.lang].branchs[this.hour]
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

  static getLunarNewYearDay(year: number): Date {
    return getLunarNewYearDay(year)
  }
}
