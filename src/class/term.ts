import { FIRST_YEAR, TERM_MINIMUM_DATES, TERM_SAME_HEX, TERM_LIST } from '../constants/lunarData'
import { _GlobalConfig } from '../config'

export class Term {
  private _value: number = -1
  private _config = {
    lang: _GlobalConfig.lang
  }
  constructor(value: number | string | Term, config?: ClassCommonConfig) {
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
    if (value instanceof Term) return value
    if (typeof value === 'number') {
      this._value = value % 24
    } else if (typeof value === 'string') {
      const termIndex = _GlobalConfig.locales[this._config.lang].solarTerm.indexOf(value)
      if (termIndex === -1) throw new Error('Invalid term value')
      this._value = termIndex
    }
  }

  get value() {
    return this._value
  }

  static getNames(lang?: string): string[] {
    lang = lang || _GlobalConfig.lang
    return [..._GlobalConfig.locales[lang].solarTerm]
  }

  /**
   * 取得当年的节气日期列表 [d, d, d, d...]
   * @param year 年份
   * @returns {number[]}
   */
  static getYearTermDayList(year: number): number[] {
    const binData = TERM_SAME_HEX[TERM_LIST[year - FIRST_YEAR]].toString(2)
    const res = []
    let temp = binData.padStart(48, '0')
    while (res.length < 24) {
      const currDate = parseInt(temp.slice(temp.length - 2), 2)
      const minDate: number = TERM_MINIMUM_DATES[res.length]
      res.push(currDate + minDate)
      temp = temp.slice(0, temp.length - 2)
    }
    return res
  }

  // 查出指定节气的日期 [year, month, day]
  static findDate(
    year: number,
    termValue: number | string | Term,
    config?: ClassCommonConfig
  ): [number, number, number] {
    const lang = config && config.lang ? config.lang : _GlobalConfig.lang
    if (termValue instanceof Term) termValue = termValue.value
    termValue =
      typeof termValue === 'string'
        ? _GlobalConfig.locales[lang].solarTerm.indexOf(termValue)
        : termValue % 24
    const month = termValue >> 1
    const dayList = Term.getYearTermDayList(year)
    const day = dayList[termValue]
    return [year, month + 1, day]
  }

  /**
   * 查出指定日期属于哪个节之后，并返回该节及该节日期
   * @param date 日期
   * @param returnValue 节气是否只返回该节气的值,还是返回节气对象
   * @returns {[Term | number, number]} [节气, 节气日期]
   */
  static findNode(date: Date, returnValue: true): [number, number]
  static findNode(date: Date, returnValue: false, config?: ClassCommonConfig): [Term, number]
  static findNode(
    date: Date,
    returnValue: boolean = false,
    config?: ClassCommonConfig
  ): [Term | number, number] {
    const year = date.getFullYear()
    const month = date.getMonth()
    const d = date.getDate()
    const termList = Term.getYearTermDayList(year)
    let termValue = month * 2
    const termDay = termList[termValue]
    // 如果当前日期在该节的日期之前，则为上一个节
    if (d < termDay && !(d === termDay - 1 && date.getHours() >= 23)) termValue -= 2
    termValue = (termValue + 24) % 24
    return returnValue ? [termValue, termDay] : [new Term(termValue, config), termDay]
  }

  valueOf() {
    return this.value
  }

  toString() {
    return String(_GlobalConfig.locales[this._config.lang].solarTerm[this.value])
  }
}
