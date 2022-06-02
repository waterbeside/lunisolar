import * as C from './constants'
import * as U from './utils'
import { Lunar } from './lunar.class'

export class Lunisolar {
  _date: Date = new Date()
  _lunar?: Lunar
  constructor(date: lunisolar.DateConfigType) {
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
