import { toDate } from '../utils'

import {
  FIRST_YEAR,
  LAST_YEAR,
  LUNAR_MONTH_DATAS,
  LUNAR_NEW_YEAR_DATE
} from '../constants/lunarData'
import { LUNAR_MONTH_NAMES, LUNAR_DATE_NAMES, NUMBER_STRING } from '../constants/calendarData'

function getLunarNewYearDate(year: number): Date {
  const lnyd = LUNAR_NEW_YEAR_DATE[year - FIRST_YEAR]
  return toDate(`${year}/${Math.floor(lnyd / 100)}/${lnyd % 100}`)
}

function getLunarMonthDate(year: number, dateDiff: number): [number, number] {
  const monthData = LUNAR_MONTH_DATAS[year - FIRST_YEAR]
  // 取出闰月
  const leapMonth = monthData >> 13
  const leapMonthIsBig = (monthData >> 12) & 1
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

function getDateDiff(date1: Date, date2: Date): number {
  return Math.floor((date1.valueOf() - date2.valueOf()) / 86400000)
}

export class Lunar {
  constructor(dateObj: DateParamType) {
    const date = toDate(dateObj)
    this._date = date
    let year = date.getFullYear()
    if (
      year < FIRST_YEAR ||
      year > LAST_YEAR ||
      (year === FIRST_YEAR && date.getMonth() < 1) ||
      (year === FIRST_YEAR && date.getMonth() === 1 && date.getDate() < 19)
    ) {
      throw new Error('Invalid lunar year: out of range')
    }
    let dateDiff = getDateDiff(date, getLunarNewYearDate(year))

    if (date && date.getHours() === 23) {
      dateDiff = dateDiff + 1
    }
    if (dateDiff < 0) {
      year = year - 1
      dateDiff = getDateDiff(date, getLunarNewYearDate(year))
    }
    ;[this._m, this._d] = getLunarMonthDate(year, dateDiff)
    this._y = year
  }

  _date: Date
  _y: number
  _m: number
  _d: number

  isLeapMonth(): boolean {
    return this._m > 100
  }

  isBigMonth(): boolean {
    const monthData = LUNAR_MONTH_DATAS[this._y - FIRST_YEAR]
    if (this.isLeapMonth()) {
      return ((monthData >> 12) & 1) === 1
    } else {
      return ((monthData >> (this._m - 1)) & 1) === 1
    }
  }

  lunarNewYearDate(year: number | undefined): Date {
    return getLunarNewYearDate(year || this._y)
  }

  getYear(): number {
    return this._y
  }

  getMonth(): number {
    return this._m
  }

  getDate(): number {
    return this._d
  }

  getYearName(): string {
    let res = ''
    let year = this._y
    while (year) {
      const s = NUMBER_STRING[year % 10]
      res = s + res
      year = Math.floor(year / 10)
    }
    return res
  }

  getMonthName(): string {
    return this.isLeapMonth()
      ? '閏' + LUNAR_MONTH_NAMES[this._m - 101]
      : LUNAR_MONTH_NAMES[this._m - 1]
  }

  getDateName(): string {
    return LUNAR_DATE_NAMES[this._d - 1]
  }

  toString(): string {
    return `${this.getYearName()}年${this.getMonthName()}${this.getDateName()}`
  }

  valueOf(): number {
    return this._date.valueOf()
  }
}
