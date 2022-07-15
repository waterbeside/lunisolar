import { REGEX_PARSE, UNITS } from '../constants'

/**
 * 处理日期单位
 * @param unit
 */
export const prettyUnit = (unit: Unit): UnitFullName => {
  unit = unit.trim() as Unit
  return (UNITS as any)[unit] || unit.toLowerCase()
}

/**
 * 转为日期对象
 * @param date 日期字符串或日期对象
 * @returns 返回日期对像
 */
export const toDate = (date?: DateParamType): Date => {
  if (typeof date === 'undefined') return new Date()
  if (date === null) return new Date(NaN) // null is invalid
  if (typeof date.date !== 'undefined' && date.date instanceof Date) date = date.date
  if (date instanceof Date) return date
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const d = date.match(REGEX_PARSE) as any
    if (d) {
      const m = d[2] - 1 || 0
      const ms = (d[7] || '0').substring(0, 3)
      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms)
    }
  }
  return new Date(date as string | number)
}
