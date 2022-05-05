import * as C from './helper/constants'
import * as U from './helper/utils'

// type DateConfigType = string | number | Date | null | undefined

export class Lunisolar {
  _date: Date = new Date()
  constructor(date: lunisolar.DateConfigType) {
    this._date = U.toDate(date)
  }

  get date() {
    return this._date
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
