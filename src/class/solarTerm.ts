import { FIRST_YEAR, TERM_MINIMUM_DATES, TERM_SAME_HEX, TERM_LIST } from '../constants/lunarData'
import { _GlobalConfig } from '../config'

export class SolarTerm {
  private _value: number = -1
  private _config = {
    lang: _GlobalConfig.lang
  }
  constructor(value: number | string | SolarTerm, config?: ClassCommonConfig) {
    if (config) {
      this._config = Object.assign({}, this._config, config)
    }
    if (value instanceof SolarTerm) return value
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

  /**
   * 取得某年某月的两个节气的日期
   * @param year 年
   * @param month 月
   * @returns {[number, number]} [节, 气]
   */
  static getMonthTerms(year: number, month: number): [number, number] {
    // js 位运算最大只支持32位，所以要先转成字符串截取
    const data = TERM_SAME_HEX[TERM_LIST[year - FIRST_YEAR]].toString(2).padStart(48, '0')
    const cutLen = (month - 1) * 4
    const monthTermData = parseInt(data.slice(data.length - cutLen - 4, data.length - cutLen), 2)
    const term1 = (monthTermData & 3) + TERM_MINIMUM_DATES[(month - 1) * 2]
    const term2 = ((monthTermData >> 2) & 3) + TERM_MINIMUM_DATES[(month - 1) * 2 + 1]
    return [term1, term2]
  }

  // 查出指定节气的日期 [year, month, day]
  static findDate(
    year: number,
    termValue: number | string | SolarTerm,
    config?: ClassCommonConfig
  ): [number, number, number] {
    const lang = config && config.lang ? config.lang : _GlobalConfig.lang
    if (termValue instanceof SolarTerm) termValue = termValue.value
    termValue =
      typeof termValue === 'string'
        ? _GlobalConfig.locales[lang].solarTerm.indexOf(termValue)
        : termValue % 24
    const month = termValue >> 1
    const dayList = SolarTerm.getYearTermDayList(year)
    const day = dayList[termValue]
    return [year, month + 1, day]
  }

  /**
   * 查出指定日期属于哪个节或气之后，并返回该节气及该节气日期
   * @param date 日期
   * @param returnValue 节气是否只返回该节气的值,还是返回节气对象
   * @returns {[Term | number, number]} [节气, 节气日期]
   */
  static findNode(date: Date, config?: Partial<TermFindNodeConfig>): [SolarTerm | number, number] {
    const configDefault: TermFindNodeConfig = {
      lang: _GlobalConfig.lang,
      returnValue: false,
      nodeFlag: 0
    }
    const cfg = config ? Object.assign({}, configDefault, config) : configDefault
    const { returnValue, nodeFlag } = cfg
    if (nodeFlag > 2) throw new Error('Invalid nodeFlag')
    const newSolarTermConfig = {
      lang: cfg.lang || _GlobalConfig.lang
    }
    const year = date.getFullYear()
    let month = date.getMonth()
    const d = date.getDate()
    const h = date.getHours()
    let termValue = (month * 2 + 24) % 24 // 取得该月的节的value值

    let [termDay1, termDay2] = SolarTerm.getMonthTerms(year, month + 1)
    let usePreMonth = false
    let beforeTerm2 = false
    if (d < termDay1 && !(d === termDay1 - 1 && h >= 23)) {
      // 当日期在节前, 则取上一个月
      usePreMonth = true
    } else if (d < termDay2 && !(d === termDay2 - 1 && h >= 23)) {
      beforeTerm2 = true
      // 当日期在气之前节之后，前且nodeFlag要求返回气，则取上一个月
      if (nodeFlag === 1) usePreMonth = true
    }
    let termDay: number
    let returnTerm2 = false
    if (usePreMonth) {
      termValue = ((month - 1) * 2 + 24) % 24
      ;[termDay1, termDay2] = SolarTerm.getMonthTerms(year, month)
      if (nodeFlag > 0) returnTerm2 = true
    } else if (nodeFlag === 1 || (nodeFlag === 2 && !beforeTerm2)) returnTerm2 = true
    termDay = returnTerm2 ? termDay2 : termDay1
    termValue = returnTerm2 ? (termValue + 1) % 24 : termValue
    if (returnValue) return [termValue, termDay]
    return [new SolarTerm(termValue, newSolarTermConfig), termDay]
  }

  valueOf() {
    return this.value
  }

  toString() {
    return String(_GlobalConfig.locales[this._config.lang].solarTerm[this.value])
  }
}
