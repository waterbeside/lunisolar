import * as C from './constants'
import { Lunisolar } from '../lunisolar.class'

/**
 * 处理日期单位
 * @param unit
 */
export const prettyUnit = (unit: Unit): UnitFullName => {
  unit = unit.trim() as Unit
  return (C.UNITS as any)[unit] || unit.toLowerCase()
}

/**
 * 转为日期对象
 * @param date 日期字符串或日期对象
 * @returns 返回日期对像
 */
export const toDate = (date: DateParamType): Date => {
  if (date instanceof Lunisolar) {
    return date.date
  }
  if (date instanceof Date) {
    return date
  }
  if (date === null) return new Date(NaN) // null is invalid
  if (typeof date === 'undefined') return new Date()
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const d = date.match(C.REGEX_PARSE) as any
    if (d) {
      const m = d[2] - 1 || 0
      const ms = (d[7] || '0').substring(0, 3)
      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms)
    }
  }
  return new Date(date)
}

interface DateDiffConfig {
  float: boolean
  flag: GreLun
}

export function dateDiff(
  date1: DateParamType,
  date2: DateParamType,
  unit?: Unit,
  config?: DateDiffConfig
): number {
  ;[date1, date2] = [toDate(date1), toDate(date2)]
  const diffValue = date2.valueOf() - date1.valueOf()
  unit = unit ? prettyUnit(unit) : 'ms'
  let res = diffValue
  if (C.UNITS.s === unit) {
    res = diffValue / 1000
  } else if (C.UNITS.m === unit) {
    res = diffValue / (1000 * 60)
  } else if (C.UNITS.h === unit) {
    res = diffValue / (1000 * 60 * 60)
  } else if (C.UNITS.d === unit) {
    res = diffValue / (1000 * 60 * 60 * 24)
  } else if (C.UNITS.w === unit) {
    res = diffValue / (1000 * 60 * 60 * 24 * 7)
  } else if (C.UNITS.M === unit) {
    res = monthDiff(date1, date2)
  } else if (C.UNITS.y === unit) {
    res = monthDiff(date1, date2) / 12
  } else if (C.UNITS.q === unit) {
    res = monthDiff(date1, date2) / 3
  }
  const float = config && config.float
  return float ? res : parseInt(String(res))
}

export const monthDiff = (
  date1: DateParamType,
  date2: DateParamType,
  config?: DateDiffConfig
): number => {
  ;[date1, date2] = [toDate(date1), toDate(date2)]
  const yearDiff = date2.getFullYear() - date1.getFullYear()
  const monthDiff = date2.getMonth() - date1.getMonth()
  const diffValue = yearDiff * 12 + monthDiff // 取得月差
  // 下边计算小数部分
  const anchor = new Date(date1).setMonth(date1.getMonth() + diffValue)
  const c = anchor.valueOf() > date2.valueOf()
  const anchor2 = new Date(date1).setMonth(date1.getMonth() + diffValue + (c ? -1 : 1))

  return (
    diffValue + (date2.valueOf() - anchor.valueOf()) / (c ? anchor - anchor2 : anchor2 - anchor) ||
    0
  )
}
