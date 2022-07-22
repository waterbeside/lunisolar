import { INVALID_DATE_STRING, FORMAT_DEFAULT, REGEX_FORMAT } from '../constants'
import { padZoneStr } from '../utils'
import { _GlobalConfig } from '../config'

export const format = (formatStr: string, lsr: lunisolar.Lunisolar): string => {
  if (lsr._date.toString() === INVALID_DATE_STRING) return INVALID_DATE_STRING
  let str = formatStr || FORMAT_DEFAULT
  // const zoneStr = Utils.z(lsr)
  const y = lsr._date.getFullYear()
  const M = lsr._date.getMonth() + 1
  const D = lsr._date.getDate()
  const w = lsr._date.getDay()
  const H = lsr._date.getHours()
  const m = lsr._date.getMinutes()
  const s = lsr._date.getSeconds()
  const zoneStr = padZoneStr(lsr)
  const lunar = lsr.lunar
  const char8 = lsr.char8
  const locale = _GlobalConfig.locales[lsr._config.lang]

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
    SSS: String(lsr._date.getMilliseconds()).padStart(3, '0'),
    Z: zoneStr, // 'ZZ' logic below
    // 生肖
    zo: locale.zodiacAnimal[char8.year.branch.value],
    // 节气
    t: lsr.term ? String(lsr.term.value + 1) : '',
    T: lsr.term ? lsr.term.toString() : '',
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
