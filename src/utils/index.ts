import { REGEX_PARSE, UNITS } from '../constants'
import { SB0_MONTH } from '../constants/calendarData'
import { _GlobalConfig } from '../config'
import {
  FIRST_YEAR,
  LAST_YEAR,
  LUNAR_MONTH_DATAS,
  LUNAR_NEW_YEAR_DATE
} from '../constants/lunarData'

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
 * @param isUTC 是否UTC时间
 * @returns 返回日期对像
 */
export const parseDate = (date?: DateParamType, isUTC: boolean = false): Date => {
  if (typeof date === 'undefined') return new Date()
  if (date === null) return new Date(NaN) // null is invalid
  if (typeof date === 'object' && !(date instanceof Date) && typeof date.toDate !== 'undefined') {
    const dToDate = date.toDate()
    if (dToDate instanceof Date) return dToDate
  }

  if (date instanceof Date) return new Date(date.valueOf())
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const d = date.match(REGEX_PARSE) as any
    if (d) {
      const m = d[2] - 1 || 0
      const ms = (d[7] || '0').substring(0, 3)
      if (isUTC) {
        return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms))
      }
      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms)
    }
  }
  return new Date(date as string | number)
}

/**
 * 取得春节在该年哪天
 * @param year 年份
 * @returns Date对象
 */
export const getLunarNewYearDay = function (year: number): Date {
  const lnyd = LUNAR_NEW_YEAR_DATE[year - FIRST_YEAR]
  return parseDate(`${year}/${Math.floor(lnyd / 100)}/${lnyd % 100}`)
}

/**
 * 取出当年闰月
 * @param year 年份
 * @returns [闰月月份，是否大月]
 */
export const getYearLeapMonth = function (year: number): [number, boolean] {
  const monthData = LUNAR_MONTH_DATAS[year - FIRST_YEAR]
  // 取出闰月
  const leapMonth = monthData >> 13
  const leapMonthIsBig = (monthData >> 12) & 1
  return [leapMonth, leapMonthIsBig === 1]
}

export const prettyLunarData = function (lunarData: ParseFromLunarParam, lang?: string) {
  const locale = _GlobalConfig.locales[lang ?? _GlobalConfig.lang]
  if (typeof lunarData.year === 'string') {
    let yearString = ''
    for (let i = 0; i < lunarData.year.length; i++) {
      let n = -1
      if (lunarData.year[i] === '零' || lunarData.year[i] === '〇') n = 0
      else {
        n = locale.numerals.indexOf(lunarData.year[i])
      }
      yearString += n >= 0 ? n : ''
    }
    lunarData.year = Number(yearString)
  }
  if (typeof lunarData.month === 'string') {
    let month = lunarData.month
    if (month[0] === locale.leap) {
      // 闰月处理
      lunarData.isLeapMonth = true
      month = lunarData.month.slice(1)
    }
    let newMonth = locale.lunarMonths.indexOf(month)
    if (newMonth === -1) {
      newMonth = locale.lunarMonthsAlias.indexOf(month)
    }
    lunarData.month = lunarData.isLeapMonth ? newMonth + 100 + 1 : newMonth + 1
  }
  if (typeof lunarData.day === 'string') {
    lunarData.day = locale.lunarDays.indexOf(lunarData.day) + 1
  }
  if (typeof lunarData.hour === 'string') {
    lunarData.hour = locale.branchs.indexOf(lunarData.hour)
  }
}

/**
 * 从阴历解释数据
 * @param lunarData 阴历数据
 * @returns Date对象
 */
export const parseFromLunar = function (lunarData: ParseFromLunarParam, lang?: string) {
  prettyLunarData(lunarData, lang)
  const today = new Date()
  const year = lunarData.year ? Number(lunarData.year) : today.getFullYear()
  let month = Number(lunarData.month)
  const day = Number(lunarData.day)
  const hour = lunarData.hour ? Number(lunarData.hour) : 0
  let isLeapMonth = lunarData.isLeapMonth ?? false
  if (month > 100) {
    month -= 100
    isLeapMonth = true
  }
  // 計算年份
  if (year < FIRST_YEAR || year > LAST_YEAR) {
    throw new Error('Invalid lunar year: out of range')
  }
  if (month < 1) {
    throw new Error('Invalid lunar month')
  }
  const nyd = getLunarNewYearDay(year)
  const [leapMonth, leapMonthIsBig] = getYearLeapMonth(year)
  if (isLeapMonth && leapMonth !== month) {
    throw new Error('Invalid lunar leap month: no this leap month')
  }
  const monthData = LUNAR_MONTH_DATAS[year - FIRST_YEAR]
  const monthIsBig = isLeapMonth ? leapMonthIsBig : (monthData >> (month - 1)) & 1
  let daySum = 0
  for (let i = 0; i < month; i++) {
    const isBig = (monthData >> i) & 1
    daySum += isBig ? 30 : 29
    if (i === month - 1 && !isLeapMonth) break
    if (i === leapMonth - 1) {
      daySum += leapMonthIsBig ? 30 : 29
    }
  }
  daySum -= (monthIsBig ? 30 : 29) - day + 1
  const date = new Date(nyd.valueOf() + daySum * 24 * 60 * 60 * 1000)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return parseDate(`${y}/${m}/${d} ${hour * 2}:00`)
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
 * @param isUTC 是否UTC时间
 * @returns 天干地支组合索引 范围[0, 59]
 */
export const computeSBMonthValueByTerm = (
  date: Date,
  termValue: number,
  termDate: Date,
  isUTC: boolean = false
): number => {
  const termDay = termDate.getDate()
  const month = getDateData(date, 'Month', isUTC)
  const termMonth = (termValue / 2) >> 0
  const monthOffset =
    termMonth < month ||
    (month === 0 && termMonth === 11) ||
    (termDay > getDateData(date, 'Date', isUTC) &&
      !(
        termDay - 1 === getDateData(date, 'Date', isUTC) && getDateData(date, 'Hours', isUTC) >= 23
      ))
      ? -1
      : 0
  // 求月天干 （2018年12月大雪乃甲子月）
  let monthDiff =
    ((getDateData(date, 'FullYear', isUTC) - SB0_MONTH[0]) * 12 +
      getDateData(date, 'Month', isUTC) -
      SB0_MONTH[1] +
      1) %
    60

  return (monthDiff + monthOffset + 60) % 60
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
  const resAsCurr = (curr: any) => {
    if (typeof curr === 'string' || typeof curr === 'number' || typeof curr === 'function') {
      res = curr
      return true
    }
    return false
  }
  while (keySplit.length >= 0) {
    if (resAsCurr(curr)) break
    if (keySplit.length === 0) break
    const currKey = keySplit.shift()
    if (currKey === undefined) return ''
    if (Array.isArray(curr)) {
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

/**
  * 五鼠遁计算天干
  ```
  ---- 五鼠遁 ---
  甲己还加甲，乙庚丙作初。
  丙辛从戊起，丁壬庚子居。
  戊癸起壬子，周而复始求。
  ```
  * @param fromStemValue 起始天干 (计算时柱天干则此处应为日柱天干)
  * @param branchValue 目标地支 （计算时柱天干，时处应为时柱地支）
  * @returns {SB} 返回天地支对象
*/
export function computeRatStem(fromStemValue: number, branchValue: number = 0): number {
  const h2StartStemNum = (fromStemValue % 5) * 2
  return (h2StartStemNum + branchValue) % 10
}

/**
 * 把两个列表分别作为key为value合并成字典
 * @param keyList key列表数组
 * @param valueList value列表数组
 */
export function twoList2Dict<T = any>(keyList: string[], valueList: T[]): { [key: string]: T } {
  const res: { [key: string]: T } = {}
  for (let i = 0; i < keyList.length; i++) {
    const key = keyList[i]
    const value = valueList[i]
    res[key] = value
  }
  return res
}

const classTypeDict: { [key in 'stem' | 'branch' | 'trigram8' | 'element5']: [number, string] } = {
  stem: [10, 'stems'],
  branch: [12, 'branchs'],
  trigram8: [8, 'eightTrigram'],
  element5: [5, 'fiveElements']
}

// 处理天干、地支、八卦等value
export const parseCommonCreateClassValue = function (
  value: number | string,
  type: 'stem' | 'branch' | 'trigram8' | 'element5',
  lang: string,
  gConfig: { [key: string]: any }
): number {
  if (typeof value === 'number') {
    value = value % classTypeDict[type][0]
  } else if (typeof value === 'string') {
    const idx: number = gConfig.locales[lang][classTypeDict[type][1]].indexOf(value)
    if (idx === -1) throw new Error(`Invalid ${type} value`)
    value = idx
  }
  return value
}

/**
 * 计算地支的三合五行
 * @param branchValue 地支value值
 */
export const computeTriadE5Value = function (branchValue: number) {
  const e5v = [4, 0, 1, 3]
  const idx = branchValue % 4
  return e5v[idx]
}

export const computeGroup6E5Value = function (branchValue: number) {
  const e5v = [2, 0, 1, 3, 4, 2]
  branchValue = branchValue === 0 ? 12 : branchValue
  if (branchValue < 7) return e5v[branchValue - 1]
  return e5v[12 - branchValue]
}

export const defineLocale = (localeData: { name: string; [x: string]: any }): LsrLocale =>
  localeData

export const computeUtcOffset = (date: Date) => {
  // 與moment.js保持一致
  // Because a bug at FF24, we're rounding the timezone offset around 15 minutes
  // https://github.com/moment/moment/pull/1871
  return -Math.round(date.getTimezoneOffset() / 15) * 15
}

type DateDataKey =
  | 'fullYear'
  | 'month'
  | 'date'
  | 'day'
  | 'hours'
  | 'minutes'
  | 'seconds'
  | 'milliseconds'

type UpCaseDateDataKey =
  | 'FullYear'
  | 'Month'
  | 'Date'
  | 'Day'
  | 'Hours'
  | 'Minutes'
  | 'Seconds'
  | 'Milliseconds'

export const getDateData = (
  date: Date,
  dataKey: DateDataKey | UpCaseDateDataKey,
  isUTC: boolean = false
): number => {
  const upcaseFirst = (dataKey.slice(0, 1).toUpperCase() + dataKey.slice(1)) as UpCaseDateDataKey
  return isUTC ? date[`getUTC${upcaseFirst}`]() : date[`get${upcaseFirst}`]()
}
