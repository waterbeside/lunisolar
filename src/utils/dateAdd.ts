import { UNITS } from '../constants'
import { parseDate, prettyUnit } from './index'

export function dateAdd(date: DateParamType, value: number, unit?: Unit): Date {
  date = parseDate(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  unit = (unit ? prettyUnit(unit) : 'millisecond') as UnitFullNameLower
  let diff = value
  if (unit === UNITS.d || unit === UNITS.ld) {
    diff = value * 24 * 60 * 60 * 1000
  } else if (unit === UNITS.h) {
    diff = value * 60 * 60 * 1000
  } else if (unit === UNITS.m) {
    diff = value * 60 * 1000
  } else if (unit === UNITS.s) {
    diff = value * 1000
  } else if (unit === UNITS.M) {
    return new Date(date.setMonth(month - 1 + value))
  } else if (unit === UNITS.y) {
    return new Date(date.setFullYear(year + value))
  }
  return new Date(date.valueOf() + diff)
}
