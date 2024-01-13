import { JD } from '@lunisolar/julian'
import { SB0_MONTH } from '../constants/calendarData'
import { _GlobalConfig, g } from '../config'
import {
  FIRST_YEAR,
  LAST_YEAR,
  LUNAR_MONTH_DATAS,
  LUNAR_NEW_YEAR_DATE
} from '../constants/lunarData'

/**
 * 取得春节在该年哪天
 * @param year 年份
 * @returns Date对象
 */
export const getLunarNewYearDay = function (year: number, isUTC = false): JD {
  const lnyd = LUNAR_NEW_YEAR_DATE[year - FIRST_YEAR]
  const jd = parseJD(`${year}/${Math.floor(lnyd / 100)}/${lnyd % 100}`)
  return isUTC ? jd.utc() : jd
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

export const prettyYear = function (year: string | number, lang?: string) {
  let isB = false
  if (typeof year === 'number') return year
  if (year.toLowerCase().indexOf('bc') === 0) {
    isB = true
    year = year.slice(2)
  } else if (year.toLowerCase().indexOf('b') === 0) {
    isB = true
    year = year.slice(1)
  } else if (year.indexOf('公元前') === 0) {
    isB = true
    year = year.slice(3)
  }
  if (!Number.isNaN(Number(year))) return prettyYearIsB(year, isB)
  const locale = _GlobalConfig.locales[lang ?? _GlobalConfig.lang]
  let yearString = ''
  for (let i = 0; i < year.length; i++) {
    let n = -1
    if (year[i] === '零' || year[i] === '〇') n = 0
    else {
      n = locale.numerals.indexOf(year[i])
    }
    yearString += n >= 0 ? n : ''
  }
  return prettyYearIsB(yearString, isB)
}

export const prettyYearIsB = function (year: number | string, isB: boolean) {
  return isB ? -Number(year) + 1 : Number(year)
}

export const prettyLunarData = function (lunarData: ParseFromLunarParam, lang?: string) {
  const locale = _GlobalConfig.locales[lang ?? _GlobalConfig.lang]
  if (lunarData.year !== void 0) {
    lunarData.year = prettyYear(lunarData.year)
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
export const parseFromLunar = function (
  lunarData: ParseFromLunarParam,
  lang?: string,
  isUTC = false
): JD {
  prettyLunarData(lunarData, lang)
  const date = new Date()
  const year = lunarData.year ? Number(lunarData.year) : date.getFullYear()
  let month = Number(lunarData.month)
  const day = Number(lunarData.day)
  const hour = lunarData.hour ? Number(lunarData.hour) : 0
  let isLeapMonth = lunarData.isLeapMonth ?? false
  if (month > 100) {
    month -= 100
    isLeapMonth = true
  }
  // 計算年份
  if ((year < FIRST_YEAR || year > LAST_YEAR) && !g.plugins.has('@lunisolar/plugin-sx')) {
    throw new Error('Invalid lunar year: out of range')
  }
  if (month < 1) {
    throw new Error('Invalid lunar month')
  }
  const nyd = getLunarNewYearDay(year, isUTC)
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
  return parseJD(
    {
      jdn: nyd.jdn + daySum + (hour * 2) / 24
    },
    isUTC
  )
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
  ymdh: YMDH,
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
  date: Date | JD,
  termValue: number,
  termDate: Date | JD,
  isUTC: boolean = false
): number => {
  const jd = parseJD(date, isUTC, undefined, true)
  const termJd = parseJD(termDate, isUTC)
  const termDay = termJd.day
  const month = jd.month - 1
  const termMonth = (termValue / 2) >> 0
  const monthOffset =
    termMonth < month ||
    (month === 0 && termMonth === 11) ||
    (termDay > jd.day && !(termDay - 1 === jd.day && jd.hour >= 23))
      ? -1
      : 0
  // 求月天干 （2018年12月大雪乃甲子月）
  let monthDiff = ((jd.year - SB0_MONTH[0]) * 12 + jd.month - 1 - SB0_MONTH[1] + 1) % 60

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

/**
 * 转为JD对象
 * @param d 日期字符串或日期对象
 * @param isUTC 是否UTC时间
 * @param offset 时间偏移值，以分钟为单位
 * @param offset 时间偏移值，以分钟为单位i
 * @returns 返回日期对像
 */
export const parseJD = (
  d?: DateParamType,
  isUTC?: boolean,
  offset?: number,
  unClone = false
): JD => {
  if (d === null) throw Error('Invalid Date')
  if (unClone && d instanceof JD) {
    if (isUTC === d.isUTC()) return d
  }
  let config = { isUTC: isUTC ?? false, offset: offset ?? 0 }
  if (typeof d === 'number') return JD.fromTimestamp(d, config)
  if (d && typeof d === 'object' && !(d instanceof Date)) {
    if (d.hasOwnProperty('_config') || d.hasOwnProperty('config')) {
      const defaultConfig = (d as any)._config
      config = {
        isUTC: isUTC ?? defaultConfig?.isUTC ?? false,
        offset: offset ?? defaultConfig?.offset ?? 0
      }
    }
    if (
      d.hasOwnProperty('toDate') &&
      typeof (d as any).toDate === 'function' &&
      !d.hasOwnProperty('jd') &&
      !d.hasOwnProperty('jdn')
    ) {
      return new JD((d as any).toDate, config)
    }
  }
  return new JD(d as any, config)
}
