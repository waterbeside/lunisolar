import { INVALID_DATE_STRING, FORMAT_DEFAULT, REGEX_FORMAT } from '../constants'
import { padZoneStr } from '../utils'
import { _GlobalConfig } from '../config'

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
  const locale = _GlobalConfig.locales[lsr._config.lang]
  const isBC = lsr.year < 0
  let yStr = String(Math.abs(y))
  yStr = yStr.length < 4 ? yStr.padStart(4, '0') : yStr

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
    J: String(lsr.jd.jdn),
    Y: String(y),
    YY: (isBC ? '-' : '') + (isBC && String(y).length > 2 ? String(y) : yStr.slice(-2)),
    YYYY: (isBC ? '-' : '') + yStr,
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
    SSS: String(lsr.millisecond).padStart(3, '0'),
    Z: zoneStr, // 'ZZ' logic below
    // 生肖
    cZ: () => locale.chineseZodiac[lsr.char8.year.branch.value],
    // 节气
    t: () => (lsr.solarTerm ? String(lsr.solarTerm.value + 1) : ''),
    T: () => (lsr.solarTerm ? lsr.solarTerm.toString() : ''),
    // 陰歷
    lY: () => lsr.lunar.getYearName(),
    lM: () => lsr.lunar.getMonthName(),
    lD: () => lsr.lunar.getDayName(),
    lH: () => lsr.lunar.getHourName(),
    lL: () => (lsr.lunar.isBigMonth ? locale.bigMonth : locale.smallMonth),
    // 陰暦(數字形式)
    lYn: () => String(lsr.lunar.year),
    lMn: () => String(lsr.lunar.month),
    lDn: () => String(lsr.lunar.day),
    lHn: () => String(lsr.lunar.hour + 1),
    // 八字
    cY: () => lsr.char8.year.toString(),
    cYs: () => lsr.char8.year.stem.toString(),
    cYb: () => lsr.char8.year.branch.toString(),
    cM: () => lsr.char8.month.toString(),
    cMs: () => lsr.char8.month.stem.toString(),
    cMb: () => lsr.char8.month.branch.toString(),
    cD: () => lsr.char8.day.toString(),
    cDs: () => lsr.char8.day.stem.toString(),
    cDb: () => lsr.char8.day.branch.toString(),
    cH: () => lsr.char8.hour.toString(),
    cHs: () => lsr.char8.hour.stem.toString(),
    cHb: () => lsr.char8.hour.branch.toString(),
    // 八字（数字形式）
    cYn: () => lsr.char8.year.value,
    cYsn: () => lsr.char8.year.stem.value,
    cYbn: () => lsr.char8.year.branch.value,
    cMn: () => lsr.char8.month.value,
    cMsn: () => lsr.char8.month.stem.value,
    cMbn: () => lsr.char8.month.branch.value,
    cDn: () => lsr.char8.day.value,
    cDsn: () => lsr.char8.day.stem.value,
    cDbn: () => lsr.char8.day.branch.value,
    cHn: () => lsr.char8.hour.value,
    cHsn: () => lsr.char8.hour.stem.value,
    cHbn: () => lsr.char8.hour.branch.value,
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
