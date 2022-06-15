import * as C from '../constants'
import * as U from '../utils'
import { Lunar } from './lunar'
import { Term } from './term'
import { FIRST_YEAR, LAST_YEAR } from '../constants/lunarData'
import { TERM_MINIMUM_DATES, TERM_SAME_HEX, TERM_LIST } from '../constants/lunarData'

export class Lunisolar {
  private _date: Date
  private _term?: Term | null
  private _lunar?: Lunar
  constructor(date?: lunisolar.DateConfigType) {
    this._date = U.toDate(date)
  }

  get lunar(): Lunar {
    if (this.lunar) return this._lunar as Lunar
    this._lunar = new Lunar(this._date)
    return this._lunar
  }

  get date(): Date {
    return this._date
  }

  // 节气
  get term(): Term | null {
    if (this._term !== undefined) return this._term
    const year = this._date.getFullYear()
    if (year < FIRST_YEAR || year > LAST_YEAR) {
      throw new Error(`${year} is not a lunar year`)
    }
    const month = this._date.getMonth() + 1
    const date = this._date.getDate()
    // 由于存放的超出js的安全整数范围，故先转为字符串
    const data = TERM_SAME_HEX[TERM_LIST[year - FIRST_YEAR]].toString(2).padStart(48, '0')
    const cutLen = (month - 1) * 4
    const monthTermData = parseInt(data.slice(data.length - cutLen - 4, data.length - cutLen), 2)
    const term1 = (monthTermData & 3) + TERM_MINIMUM_DATES[(month - 1) * 2]
    const term2 = (monthTermData >> 2) + TERM_MINIMUM_DATES[(month - 1) * 2 + 1]

    if (date === term1) return new Term((month - 1) * 2)
    else if (date === term2) return new Term((month - 1) * 2 + 1)
    else return null
  }

  clone() {
    return new Lunisolar(this._date)
  }

  valueOf() {
    return this._date.valueOf()
  }

  diff(date: lunisolar.DateConfigType | Lunisolar, unit?: Unit, config?: any): number {
    return U.dateDiff(this.date, date, unit, config)
  }

  add(value: number, unit?: Unit, config?: any) {
    unit = unit ? U.prettyUnit(unit) : 'ms'
    if (C.UNITS.ms === unit) {
    }
  }
}
