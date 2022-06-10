import { SOLAR_TERMS } from '../constants/calendarData'

export class Term {
  value: number
  constructor(value: number) {
    this.value = value % 24
  }

  getList() {
    return [...SOLAR_TERMS]
  }
  valueOf() {
    return this.value
  }

  toString() {
    return String(SOLAR_TERMS[this.value])
  }
}
