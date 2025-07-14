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
  const getLunar = () => lsr.lunar
  const getChar8 = () => lsr.char8
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
    cZ: () => locale.chineseZodiac[getChar8().year.branch.value],
    // 节气
    t: lsr.solarTerm ? String(lsr.solarTerm.value + 1) : '',
    T: lsr.solarTerm ? lsr.solarTerm.toString() : '',
    // 陰歷
    lY: () => getLunar().getYearName(),
    lM: () => getLunar().getMonthName(),
    lD: () => getLunar().getDayName(),
    lH: () => getLunar().getHourName(),
    lL: () => (getLunar().isBigMonth ? locale.bigMonth : locale.smallMonth),
    // 陰暦(數字形式)
    lYn: () => String(getLunar().year),
    lMn: () => String(getLunar().month),
    lDn: () => String(getLunar().day),
    lHn: () => String(getLunar().hour + 1),
    // 八字
    cY: () => getChar8().year.toString(),
    cYs: () => getChar8().year.stem.toString(),
    cYb: () => getChar8().year.branch.toString(),
    cM: () => getChar8().month.toString(),
    cMs: () => getChar8().month.stem.toString(),
    cMb: () => getChar8().month.branch.toString(),
    cD: () => getChar8().day.toString(),
    cDs: () => getChar8().day.stem.toString(),
    cDb: () => getChar8().day.branch.toString(),
    cH: () => getChar8().hour.toString(),
    cHs: () => getChar8().hour.stem.toString(),
    cHb: () => getChar8().hour.branch.toString(),
    // 八字（数字形式）
    cYn: () => getChar8().year.value,
    cYsn: () => getChar8().year.stem.value,
    cYbn: () => getChar8().year.branch.value,
    cMn: () => getChar8().month.value,
    cMsn: () => getChar8().month.stem.value,
    cMbn: () => getChar8().month.branch.value,
    cDn: () => getChar8().day.value,
    cDsn: () => getChar8().day.stem.value,
    cDbn: () => getChar8().day.branch.value,
    cHn: () => getChar8().hour.value,
    cHsn: () => getChar8().hour.stem.value,
    cHbn: () => getChar8().hour.branch.value,
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
