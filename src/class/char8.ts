import { SB } from './stemBranch'
import { SolarTerm } from './solarTerm'
import { Lunar } from './lunar'
import { computeSBMonthValueByTerm, computeRatStem, parseJD } from '../utils'
import { SB0_DATE } from '../constants/calendarData'
import { _GlobalConfig } from '../config'
import { JD } from '@lunisolar/julian'

export class Char8 {
  readonly value: number = -1
  readonly _list: [SB, SB, SB, SB]
  readonly _config: Required<Char8Config> = {
    changeAgeTerm: _GlobalConfig.changeAgeTerm,
    isUTC: false,
    lang: _GlobalConfig.lang,
    offset: 0
  }

  constructor(dateOrSbList: JD | Date | [SB, SB, SB, SB], config?: Char8Config) {
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
    if (dateOrSbList instanceof Date || dateOrSbList instanceof JD) {
      const y = Char8.computeSBYear(dateOrSbList, this._config)
      const m = Char8.computeSBMonth(dateOrSbList, this._config)
      const d = Char8.computeSBDay(dateOrSbList, this._config)
      const h = Char8.computeSBHour(dateOrSbList, d, this._config)
      dateOrSbList = [y, m, d, h]
    }
    if (Array.isArray(dateOrSbList)) {
      this._list = dateOrSbList
      this.value = Char8.computeValue(dateOrSbList)
    } else {
      throw new Error('Invalid Char8')
    }
  }

  getConfig() {
    return Object.assign({}, this._config)
  }

  get list() {
    return this._list
  }

  get year() {
    return this._list[0]
  }

  get month() {
    return this._list[1]
  }

  get day() {
    return this._list[2]
  }

  get hour() {
    return this._list[3]
  }
  // 日主
  get me() {
    return this._list[2].stem
  }

  static computeValue(sbList: SB[]) {
    let res = 0
    for (let i = 0; i < 4; i++) {
      res += sbList[i].valueOf() * Math.pow(10, 2 * (3 - i))
    }
    return res
  }

  /**
   * 取年的天五地支
   * @param date 日期
   * @returns {SB} 返回天地支对象
   */
  static computeSBYear(date: Date | JD | number, config?: Char8Config) {
    let changeAgeTerm =
      config && config.changeAgeTerm !== undefined
        ? config.changeAgeTerm
        : _GlobalConfig.changeAgeTerm
    const isUTC = config && config.isUTC
    const jd =
      typeof date === 'number'
        ? parseJD(`${date}-01-01`, isUTC)
        : parseJD(date, isUTC, config?.offset, true)
    let year = typeof date !== 'number' ? jd.year : date
    if (changeAgeTerm !== null && changeAgeTerm !== undefined && typeof date !== 'number') {
      // 如果 changeAgeTerm 设有值， 则按照该节气换岁
      changeAgeTerm = changeAgeTerm % 24
      let isPreYear = changeAgeTerm < 0
      changeAgeTerm = changeAgeTerm >= 0 ? changeAgeTerm : 24 + changeAgeTerm
      // 查出当前节气日期
      let yearStart = jd.year
      if (isPreYear) yearStart--
      const yearEnd = yearStart + 1
      // 该年的岁的范围
      const startTermDate = SolarTerm.findDate(yearStart, changeAgeTerm)
      const endTermDate = SolarTerm.findDate(yearEnd, changeAgeTerm)
      const startDate = parseJD(
        `${startTermDate[0]}-${startTermDate[1]}-${startTermDate[2] - 1} 15:00:00`,
        true
      )
      const endDate = parseJD(
        `${endTermDate[0]}-${endTermDate[1]}-${endTermDate[2] - 1} 15:00:00`,
        true
      )
      // 检查是否在该岁的范围内
      if (jd.jdn < startDate.jdn) year--
      else if (date.valueOf() >= endDate.valueOf()) year++
    } else if (changeAgeTerm === null && typeof date !== 'number') {
      // changeAgeTerm 为null时，则以正月初一换岁
      const theNewYearDate = Lunar.getLunarNewYearDay(year)
      if (jd.jdn < theNewYearDate.jdn - 1 / 24) year--
    }
    const stemValue = (year - 4) % 10
    const branchValue = (year - 4) % 12
    return new SB(stemValue, branchValue, config)
  }

  /**
   * 取月的天干地支
   * @param date 日期
   * @returns {SB} 返回天地支对象
   */
  static computeSBMonth(date: Date | JD, config?: Char8Config) {
    const lang = config && config.lang !== undefined ? config.lang : _GlobalConfig.lang
    let changeAgeTerm =
      config && config.changeAgeTerm !== undefined
        ? config.changeAgeTerm
        : _GlobalConfig.changeAgeTerm
    changeAgeTerm = changeAgeTerm || 0
    const isUTC = config?.isUTC ?? false
    const findNodeConfig = {
      isUTC,
      offset: config?.offset || 0,
      lang,
      returnValue: true,
      nodeFlag: (changeAgeTerm + 24) % 2 // 根据changeAgeTerm的奇偶来判定是节换月还是中气换月
    }
    // 知道该日是哪个节气之后便可知道该日是哪个地支月
    const [termValue, termDate] = SolarTerm.findNode(date, findNodeConfig) as [number, JD]
    const sbValue = computeSBMonthValueByTerm(date, termValue, termDate, isUTC)
    const sbConfig = {
      lang
    }
    return new SB(sbValue, undefined, sbConfig)
  }

  /**
   * 取日的天干地支
   * @param date 日期
   * @returns {SB} 返回天地支对象
   */
  static computeSBDay(date: Date | JD, config?: Char8Config) {
    const isUTC = config?.isUTC || false
    const offset = config?.offset || 0
    const jd = parseJD(date, isUTC, offset, true)
    // const dateValue = isUTC ? date.valueOf() - offset * 60 * 1000 : date.valueOf()
    const sb0 = parseJD(`${SB0_DATE[0]}-${SB0_DATE[1]}-${SB0_DATE[2] - 1} 15:00:00`, true)
    let daydiff = Math.floor(jd.jdn - offset / (60 * 24) - sb0.jdn) % 60
    if (daydiff < 0) daydiff += 60
    return new SB(daydiff, undefined, config)
  }

  /**
   * 取时辰天干地支
    ---- 五鼠遁 ---
    甲己还加甲，乙庚丙作初。
    丙辛从戊起，丁壬庚子居。
    戊癸起壬子，周而复始求。
   * @param date 日期
   * @returns {SB} 返回天地支对象
   */
  static computeSBHour(date: Date | JD, sbDay?: SB, config?: Char8Config) {
    const isUTC = config?.isUTC || false
    if (!sbDay) sbDay = Char8.computeSBDay(date, config)
    const jd = parseJD(date, isUTC, config?.offset, true)
    const hour = jd.hour
    const dayStem = sbDay.stem
    // 五鼠遁方法计算子时起始天干
    const branchNum = ((hour + 1) >> 1) % 12
    const stemNum = computeRatStem(dayStem.value, branchNum)
    return new SB(stemNum, branchNum, config)
  }

  toString() {
    return `${this.year} ${this.month} ${this.day} ${this.hour}`
  }

  valueOf() {
    return this.value
  }
}
