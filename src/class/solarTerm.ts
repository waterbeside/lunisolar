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
  // static findNode(date: Date): [SolarTerm, number]
  // static findNode(date: Date, config: TermFindNodeConfig1): [number, number]
  // static findNode(date: Date, config: TermFindNodeConfig2): [SolarTerm, number]
  static findNode(date: Date, config?: Partial<TermFindNodeConfig>): [SolarTerm | number, number] {
    const configDefault: TermFindNodeConfig = {
      lang: _GlobalConfig.lang,
      returnValue: false,
      nodeFlag: 0
    }
    const cfg = config ? Object.assign({}, configDefault, config) : configDefault
    const { returnValue, nodeFlag } = cfg
    // TODO: 处理节或气
    const year = date.getFullYear()
    const month = date.getMonth()
    const d = date.getDate()
    const h = date.getHours()
    const termList = SolarTerm.getYearTermDayList(year)
    let termValue = month * 2 // 取得该月的节的value值
    const termDay1 = termList[termValue]
    const termDay2 = termList[termValue + 1]

    if (nodeFlag === 0) {
      // 如果当前日期在该节的日期之前，则为上一个节
      if (d < termDay1 && !(d === termDay1 - 1 && h >= 23)) termValue -= 2
    } else if (nodeFlag === 1) {
      // 如果当前日期在该气的日期之前，则为上一个气
      if (d < termDay2 && !(d === termDay2 - 1 && h >= 23)) termValue -= 1
      else termValue += 1
    } else {
      // 如果当前日期在该月节前，则为上月的气
      if (d < termDay1 && !(d === termDay1 - 1 && h >= 23)) termValue -= 1
      // 如果当前日期在该月气后，则为本月的气
      else if (d > termDay2 || (d === termDay2 - 1 && h >= 23)) termValue += 1
    }

    termValue = (termValue + 24) % 24
    if (returnValue) return [termValue, termList[termValue]]
    const newSolarTermConfig = {
      lang: cfg.lang || _GlobalConfig.lang
    }
    return [new SolarTerm(termValue, newSolarTermConfig), termList[termValue]]
  }

  valueOf() {
    return this.value
  }

  toString() {
    return String(_GlobalConfig.locales[this._config.lang].solarTerm[this.value])
  }
}
