import { INVALID_DATE_STRING, FORMAT_DEFAULT, REGEX_FORMAT } from '../constants'
import { padZoneStr } from '../utils'
import { _GlobalConfig } from '../config'

/**
 * 返回当前时间对应的分令。0-9分为子分，10-19分为寅分，以此类推。
 * @param hour 当前小时数
 * @param minute 当前分钟数
 */
const formatMinutes = (hour: number, minute: number): string => {
  const isEven = hour % 2 == 0
  const resolvedMinute = isEven ? minute + 60 : minute
  // 一个时辰120分钟对应12份，每份10分钟
  const minutesPerPortion = 120 / 12;
  const index = Math.floor(resolvedMinute / minutesPerPortion);
  const branchName = lunisolar.Branch.getNames()[index]
  return branchName
}

export const format = (formatStr: string, lsr: lunisolar.Lunisolar): string => {
  if (lsr.toUTCString() === INVALID_DATE_STRING) return INVALID_DATE_STRING
  let str = formatStr || FORMAT_DEFAULT
  // const zoneStr = Utils.z(lsr)
  const y = lsr.year
  const M = lsr.month
  const D = lsr.day
  const w = lsr.dayOfWeek
  const H = lsr.hour
  const m = lsr.minute
  const s = lsr.second
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
    SSS: String(lsr.millis).padStart(3, '0'),
    Z: zoneStr, // 'ZZ' logic below
    // 生肖
    cZ: locale.chineseZodiac[char8.year.branch.value],
    // 节气
    t: lsr.solarTerm ? String(lsr.solarTerm.value + 1) : '',
    T: lsr.solarTerm ? lsr.solarTerm.toString() : '',
    // 陰歷
    lY: lunar.getYearName(),
    lM: lunar.getMonthName(),
    lD: lunar.getDayName(),
    lH: lunar.getHourName(),
    lL: lunar.isBigMonth ? locale.bigMonth : locale.smallMonth,
    // 陰暦(數字形式)
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
    cHb: char8.hour.branch.toString(),
    cFb: formatMinutes(H, m),
    // 八字（数字形式）
    cYn: char8.year.value,
    cYsn: char8.year.stem.value,
    cYbn: char8.year.branch.value,
    cMn: char8.month.value,
    cMsn: char8.month.stem.value,
    cMbn: char8.month.branch.value,
    cDn: char8.day.value,
    cDsn: char8.day.stem.value,
    cDbn: char8.day.branch.value,
    cHn: char8.hour.value,
    cHsn: char8.hour.stem.value,
    cHbn: char8.hour.branch.value,
    // 該周幾是該月的第幾次出現
    dR: function (): string {
      return String(Math.ceil(D / 7))
    },
    // 該周幾是該月的倒数第几个
    dRr: function (): string {
      const nextMonth1 = lsr.lunisolar(`${y}-${M + 1}-1 ${H}:${m}:${s}`, lsr._config)
      const diff = Math.abs(nextMonth1.diff(lsr, 'day'))
      return String(Math.ceil(diff / 7))
    }
  }

  str = str.replace(REGEX_FORMAT, (match, $1) => {
    const matched = matches[match as keyof typeof matches]
    return (
      $1 ||
      (typeof matched === 'function'
        ? matched()
        : matched !== void 0
        ? matched
        : zoneStr.replace(':', ''))
    )
  }) // 'ZZ'
  return str
}
