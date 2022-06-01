import { toDate } from './helper/utils'
import * as lunData from './data/lunarData'

function getLunarNewYearDate(year: number): Date {
  const lnyd = lunData.LUNAR_NEW_YEAR_DATE[year - 1901]
  return toDate(`${year}/${Math.floor(lnyd / 100)}/${lnyd % 100}`)
}

function getLunarMonthDate(year: number, dateDiff: number): [number, number] {
  const monthData = lunData.LUNAR_MONTH_DATAS[year - 1901]
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
      year < 1901 ||
      year > 2100 ||
      (year === 1901 && date.getMonth() < 1) ||
      (year === 1901 && date.getMonth() === 1 && date.getDate() < 19)
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
  }

  _date: Date
  _m: number
  _d: number

  lunarNewYearDate(year: number | undefined): Date {
    return getLunarNewYearDate(year || this._date.getFullYear())
  }

  getMonth(): number {
    return this._m
  }

  getDate(): number {
    return this._d
  }
}
