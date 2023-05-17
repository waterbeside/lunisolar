import { UNITS } from '../constants'
import { LUNAR_MONTH_DATAS, FIRST_YEAR } from '../constants/lunarData'
import { prettyUnit } from '@lunisolar/utils'
import { parseJD } from './index'

/**
 * 計算兩日期的時間差
 * @param date1 起始日期
 * @param date2 結束日期
 * @param unit 單位
 * @param float 是否返回小數
 * @returns {nnumber}
 */
export function dateDiff(
  date1: DateParamType,
  date2: DateParamType,
  unit?: GreUnit,
  float?: boolean
): number {
  const [jd1, jd2] = [
    parseJD(date1, undefined, undefined, true),
    parseJD(date2, undefined, undefined, true)
  ]
  const diffValue = jd1.jdn - jd2.jdn
  unit = (unit ? prettyUnit(unit) : 'millisecond') as GreUnitFullName
  let res = diffValue
  if (UNITS.s === unit) {
    res = diffValue * 24 * 60 * 60
  } else if (UNITS.m === unit) {
    res = diffValue * 24 * 60
  } else if (UNITS.h === unit) {
    res = diffValue * 24
  } else if (UNITS.ms === unit) {
    res = diffValue * 24 * 60 * 60 * 1000
  } else if (UNITS.w === unit) {
    res = diffValue / 7
  } else if (UNITS.M === unit) {
    res = monthDiff(jd1, jd2)
  } else if (UNITS.y === unit) {
    res = monthDiff(jd1, jd2) / 12
  } else if (UNITS.q === unit) {
    res = monthDiff(jd1, jd2) / 3
  }
  return float ? res : parseInt(String(res))
}

/**
 * 月差
 * @param date1 日期1
 * @param date2 日期2
 * @returns {number}
 */
export const monthDiff = (date1: DateParamType, date2: DateParamType): number => {
  let [jd1, jd2] = [
    parseJD(date1, undefined, undefined, true),
    parseJD(date2, undefined, undefined, true)
  ]
  let sign = 1
  if (jd1.jdn < jd2.jdn) {
    ;[jd1, jd2] = [jd2, jd1]
    sign = -1
  }
  const yearDiff = jd2.year - jd1.year
  const monthDiff = jd2.month - jd1.month
  const diffValue = yearDiff * 12 + monthDiff // 取得月差
  // 下边计算小数部分
  const anchor = jd1.add(diffValue, 'month')
  const c = anchor.jdn > jd2.jdn
  const anchor2 = jd1.add(diffValue + (c ? -1 : 1), 'month')
  const dd = c ? anchor.jdn - anchor2.jdn : anchor2.jdn - anchor.jdn
  return -sign * (diffValue + (dd === 0 ? 0 : (jd2.jdn - anchor.jdn) / dd))
}

/**
 * 計算陰歷的時間差
 * @param lsr1 起始日
 * @param lsr2 結束日
 * @returns {number}
 */
export const lunarDateDiff = (
  lsr1: lunisolar.Lunisolar,
  lsr2: lunisolar.Lunisolar,
  unit?: LunarUnit,
  float?: boolean
): number => {
  const [lunar1, lunar2] = [lsr1.lunar, lsr2.lunar]
  const [year1, year2] = [lunar1.year, lunar2.year]
  let diff = lsr1.jd.jdn - lsr2.jd.jdn
  unit = prettyUnit(unit) as LunarUnitFullNameLower
  if (unit === UNITS.ly) {
    const diff = year1 - year2
    return float ? diff - 1 + getYearDecimals(lsr2, true) + getYearDecimals(lsr1, false) : diff
  } else if (unit === UNITS.lM) {
    return lunarMonthDiff(lsr1, lsr2, float)
  } else if (unit === UNITS.lh) {
    diff = diff * 12
  }
  return float ? diff : Math.ceil(diff)
}

/**
 * 計算陰歷的月差
 * @param lsr1 起始日
 * @param lsr2 結束日
 * @returns {number}
 */
export const lunarMonthDiff = (
  lsr1: lunisolar.Lunisolar,
  lsr2: lunisolar.Lunisolar,
  float?: boolean
): number => {
  if (lsr1 < lsr2) return -lunarMonthDiff(lsr2, lsr1, float)
  const [lunar1, lunar2] = [lsr1.lunar, lsr2.lunar]
  const [year1, year2] = [lunar1.year, lunar2.year]
  const [month1, month2] = [lunar1.month, lunar2.month]
  let currYear = year2
  let cnt = 0
  while (currYear <= year1) {
    let [start, end] = [1, 12]
    if (currYear === year2) start = month2
    if (currYear === year1) end = month1
    cnt += countLunarMonthInYear(currYear, start, end)
    currYear++
  }
  if (!float) return cnt - 1
  // 計算小數部分
  if (cnt > 0) {
    cnt += getMonthDecimals(lsr2, true) + getMonthDecimals(lsr1, false) - 2
  } else {
    const monthLen = lunar2.isBigMonth ? 30 : 29
    cnt = (lsr1.jd.jdn - lsr2.jd.jdn) / monthLen
  }
  return cnt
}

/**
 * 計算該年有多少個月
 */
export const countLunarMonthInYear = (year: number, start?: number, end?: number): number => {
  const monthData = LUNAR_MONTH_DATAS[year - FIRST_YEAR]
  LUNAR_MONTH_DATAS
  start = start || 1
  end = end || 12
  let addLeap = false
  if (start > 100) {
    start -= 100
    addLeap = true
  }
  if (end > 100) {
    end -= 100
    addLeap = true
  }
  const leapMonth = monthData >> 13
  if (start <= leapMonth && leapMonth <= end) addLeap = true
  return end - start + 1 + (addLeap ? 1 : 0)
}

/**
 * 用于計算陰歷月差的小數部分
 * @param lsr 日期
 * @param isAfterPath 是否后半部分
 * @returns {number}
 */
export const getMonthDecimals = (
  lsr: lunisolar.Lunisolar,
  isAfterPath: boolean = false
): number => {
  const monthDayLen = lsr.lunar.isBigMonth ? 30 : 29
  const day = lsr.lunar.day
  return isAfterPath ? 1 - day / monthDayLen : day / monthDayLen
}

/**
 * 用于計算陰歷年差的小數部分
 * @param lsr 日期
 * @param isAfterPath 是否后半部分
 * @returns {number}
 */
export const getYearDecimals = (lsr: lunisolar.Lunisolar, isAfterPath: boolean = false): number => {
  const leapMonth = lsr.lunar.leapMonth
  const yearMonthLen = leapMonth > 0 ? 13 : 12
  let isLeapMonth = false
  let month = lsr.lunar.month
  if (month > 100) {
    month -= 100
    isLeapMonth = true
  }
  if (leapMonth > 0 && (month > leapMonth || (month === leapMonth && isLeapMonth))) month++
  const md = getMonthDecimals(lsr, isAfterPath)
  return isAfterPath ? 1 - (month - md) / yearMonthLen : (month + md - 1) / yearMonthLen
}
