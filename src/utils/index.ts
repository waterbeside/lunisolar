import { REGEX_PARSE, UNITS } from '../constants'
import { SB0_MONTH } from '../constants/calendarData'

/**
 * 处理日期单位
 * @param unit
 */
export const prettyUnit = (unit?: Unit): UnitFullNameLower | '' => {
  if (!unit) return ''
  unit = unit.trim() as Unit
  return (
    (UNITS as { [prop: string]: UnitFullNameLower })[unit] ||
    (unit || '').toLowerCase().replace(/s$/, '')
  )
}

/**
 * 转为日期对象
 * @param date 日期字符串或日期对象
 * @returns 返回日期对像
 */
export const parseDate = (date?: DateParamType): Date => {
  if (typeof date === 'undefined') return new Date()
  if (date === null) return new Date(NaN) // null is invalid
  if (
    typeof date === 'object' &&
    !(date instanceof Date) &&
    typeof date._date !== 'undefined' &&
    date._date instanceof Date
  )
    return date._date
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

/**
 * utc偏移值
 * @param instance lunisolar實例
 */
export const padZoneStr = (instance: lunisolar.Lunisolar) => {
  const negMinutes = -instance.utcOffset()
  const minutes = Math.abs(negMinutes)
  const hourOffset = Math.floor(minutes / 60)
  const minuteOffset = minutes % 60
  return `${negMinutes <= 0 ? '+' : '-'}${String(hourOffset).padStart(2, '0')}:${String(
    minuteOffset
  ).padStart(2, '0')}`
}

/**
 * 天干納甲 通過天干取得八卦
  ```
   乾纳甲壬，坤纳乙癸，
   震纳庚，巽纳辛，
   坎纳戊，离纳己，
   艮纳丙，兑纳丁
  ```
 * @param stemValue 天干索引
 * @returns 返回八卦索引值
 */
export const getTrigramValueByStem = function (stemValue: number): number {
  return [7, 0, 4, 3, 2, 5, 1, 5, 7, 0][stemValue]
}

export const getYmdhSB = (
  lsr: lunisolar.Lunisolar,
  ymdh: YMDH,
  buildFlag: 0 | 1 = 0
): lunisolar.SB => (ymdh === 'month' ? lsr.getMonthBuilder(buildFlag)[0] : lsr.char8[ymdh])

// 取地支值
export const getBranchValue: StemOrBranchValueFunc = (
  lsr: lunisolar.Lunisolar,
  ymdh: YMDH,
  div?: number
) => {
  let sb = getYmdhSB(lsr, ymdh, 0)
  return div ? sb.branch.value % div : sb.branch.value
}

// 取天干值
export const getStemValue: StemOrBranchValueFunc = (
  lsr: lunisolar.Lunisolar,
  ymdh: YMDH,
  div?: number
) => {
  let sb = getYmdhSB(lsr, ymdh, 0)
  return div ? sb.stem.value % div : sb.stem.value
}
// 取天干八卦
export const getStemTrigram8Value: StemOrBranchValueFunc = (
  lsr: lunisolar.Lunisolar,
  ymdh: 'year' | 'month' | 'day' | 'hour',
  div?: number
) => {
  let sb = getYmdhSB(lsr, ymdh, 0)
  const res = sb.stem.trigram8.valueOf()
  return div ? res % div : res
}

/**
 * 通过节气取得月的天干地支
 *
 * @param date 当前日期
 * @param termValue 节气索引值
 * @param termDate 节气日期
 * @returns 天干地支组合索引 范围[0, 59]
 */
export const computeSBMonthValueByTerm = (
  date: Date,
  termValue: number,
  termDate: Date
): number => {
  const termDay = termDate.getDate()
  const month = date.getMonth()
  const termMonth = (termValue / 2) >> 0
  const monthOffset =
    termMonth < month ||
    (month === 0 && termMonth === 11) ||
    (termDay > date.getDate() && !(termDay - 1 === date.getDate() && date.getHours() >= 23))
      ? -1
      : 0
  // 求月天干 （2018年12月大雪乃甲子月）
  let monthDiff =
    ((date.getFullYear() - SB0_MONTH[0]) * 12 + date.getMonth() - SB0_MONTH[1] + 1) % 60
  monthDiff = (monthDiff < 0 ? 60 + monthDiff : monthDiff) + monthOffset
  return monthDiff % 60
}

/**
 * 通过天干和地支索引值，计算60个天干地支组合的索引
 * @param stemValue 天干索引值
 * @param branchValue 地支索引值
 */
export const computeSBValue = (stemValue: number, branchValue: number): number => {
  // 如果一个为奇数一个为偶数，则不能组合
  if ((stemValue + branchValue) % 2 !== 0) throw new Error('Invalid SB value')
  return (stemValue % 10) + ((6 - (branchValue >> 1) + (stemValue >> 1)) % 6) * 10
}

export function isNumber(value: number | string): boolean {
  return !isNaN(Number(value))
}

/**
 * 取得譯文
 * @param key 譯文key
 */
export function getTranslation<T = any, U = LocaleData>(locale: U, key: string): T | string {
  const keySplit = key.split('.')
  let curr: any = locale
  let res = key
  while (keySplit.length > 0) {
    const currKey = keySplit.shift()
    if (currKey === undefined) return ''
    if (typeof curr === 'string' || typeof curr === 'number' || typeof curr === 'function') {
      res = curr
    } else if (Array.isArray(curr)) {
      const idx = Number(currKey)
      if (isNaN(idx) || idx >= curr.length) return ''
      curr = curr[idx]
      res = curr
    } else if (curr.hasOwnProperty(currKey)) {
      curr = curr[currKey]
    } else {
      return keySplit[keySplit.length - 1] || currKey
    }
  }
  return res
}

export function cacheAndReturn<T = any>(
  key: string,
  getDataFn: () => T,
  cache: Map<string, any>
): T {
  if (cache.has(key)) return cache.get(key) as T
  const res = getDataFn()
  cache.set(key, res)
  return res
}

/**
 * 取得月相
 * @param lunar Lunar实例
 * @param locale 语言包
 * @returns {string}
 */
export function phaseOfTheMoon(lunar: lunisolar.Lunar, locale: LocaleData): string {
  const lunarDay = lunar.day
  if (lunarDay === 1) return locale.moonPhase.朔
  if ([7, 8, 22, 23].includes(lunarDay)) return locale.moonPhase.弦
  if (lunarDay === 15) return locale.moonPhase.望
  if (lunar.isLastDayOfMonth) return locale.moonPhase.晦
  return ''
}
