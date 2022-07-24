import { SB } from './stemBranch'
import { SolarTerm } from './solarTerm'
import { Lunar } from './lunar'
import { parseDate } from '../utils'
import { SB0_MONTH, SB0_DATE } from '../constants/calendarData'
import { _GlobalConfig } from '../config'

export class Char8 {
  private _value: number = -1
  private _list: [SB, SB, SB, SB]
  private _config = {
    changeAgeTerm: _GlobalConfig.changeAgeTerm,
    lang: _GlobalConfig.lang
  }
  constructor(dateOrSbList: [SB, SB, SB, SB], config?: ClassCommonConfig)
  constructor(dateOrSbList: Date, config?: ClassCommonConfig)
  constructor(dateOrSbList: Date | [SB, SB, SB, SB], config?: ClassCommonConfig) {
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
    if (dateOrSbList instanceof Date) {
      const y = Char8.computeSBYear(dateOrSbList, this._config)
      const m = Char8.computeSBMonth(dateOrSbList, this._config)
      const d = Char8.computeSBDay(dateOrSbList, this._config)
      const h = Char8.computeSBHour(dateOrSbList, d, this._config)
      dateOrSbList = [y, m, d, h]
    }
    if (Array.isArray(dateOrSbList)) {
      this._list = dateOrSbList
      this._value = this._computeValue(dateOrSbList)
    } else {
      throw new Error('Invalid Char8')
    }
  }

  get value() {
    return this._value
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

  private _computeValue(sbList: SB[] = this._list) {
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
  static computeSBYear(date: Date | number, config?: Char8Config) {
    let changeAgeTerm =
      config && config.changeAgeTerm !== undefined
        ? config.changeAgeTerm
        : _GlobalConfig.changeAgeTerm
    let year = typeof date !== 'number' ? date.getFullYear() : date
    if (changeAgeTerm !== null && changeAgeTerm !== undefined && typeof date !== 'number') {
      // 如果 changeAgeTerm 设有值， 则按照该节气换岁
      changeAgeTerm = changeAgeTerm % 24
      let isPreYear = changeAgeTerm < 0
      changeAgeTerm = changeAgeTerm >= 0 ? changeAgeTerm : 24 + changeAgeTerm
      // 查出当前节气日期
      let yearStart = date.getFullYear()
      if (isPreYear) yearStart--
      const yearEnd = yearStart + 1
      // 该年的岁的范围
      const startTermDate = SolarTerm.findDate(yearStart, changeAgeTerm)
      const endTermDate = SolarTerm.findDate(yearEnd, changeAgeTerm)
      const startDate = parseDate(
        `${startTermDate[0]}-${startTermDate[1]}-${startTermDate[2] - 1} 23:00:00`
      )
      const endDate = parseDate(
        `${endTermDate[0]}-${endTermDate[1]}-${endTermDate[2] - 1} 23:00:00`
      )
      // 检查是否在该岁的范围内
      if (date.valueOf() < startDate.valueOf()) year--
      else if (date.valueOf() >= endDate.valueOf()) year++
    } else if (changeAgeTerm === null && typeof date !== 'number') {
      // changeAgeTerm 为null时，则以正月初一换岁
      const theNewYearDate = Lunar.getLunarNewYearDate(year)
      if (date.valueOf() < theNewYearDate.valueOf() - 60 * 60 * 1000) year--
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
  static computeSBMonth(date: Date, config?: Char8Config) {
    const lang = config && config.lang !== undefined ? config.lang : _GlobalConfig.lang
    const changeAgeTerm =
      config && config.changeAgeTerm !== undefined
        ? config.changeAgeTerm
        : _GlobalConfig.changeAgeTerm
    const findNodeConfig = {
      lang,
      returnValue: true,
      nodeFlag: (changeAgeTerm + 24) % 2 // 根据changeAgeTerm的奇偶来判定是节换月还是中气换月
    }
    // 知道该日是哪个节气之后便可知道该日是哪个地支月
    const [termValue, termDay] = SolarTerm.findNode(date, findNodeConfig) as [number, number]
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
    const sbConfig = {
      lang
    }
    return new SB(monthDiff, undefined, sbConfig)
  }

  /**
   * 取日的天干地支
   * @param date 日期
   * @returns {SB} 返回天地支对象
   */
  static computeSBDay(date: Date, config?: Char8Config) {
    const sb0 = parseDate(`${SB0_DATE[0]}-${SB0_DATE[1]}-${SB0_DATE[2] - 1} 23:00:00`)
    let daydiff = Math.floor((date.valueOf() - sb0.valueOf()) / (1000 * 60 * 60 * 24)) % 60
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
  static computeSBHour(date: Date, sbDay?: SB, config?: Char8Config) {
    if (!sbDay) sbDay = Char8.computeSBDay(date)
    const hour = date.getHours()
    const dayStem = sbDay.stem
    // 五鼠遁方法计算子时起始天干
    const h2StartStemNum = (dayStem.value % 5) * 2
    const branchNum = ((hour + 1) >> 1) % 12
    const stemNum = (h2StartStemNum + branchNum) % 10
    return new SB(stemNum, branchNum, config)
  }

  toString() {
    return `${this.year} ${this.month} ${this.day} ${this.hour}`
  }

  valueOf() {
    return this._value
  }
}
