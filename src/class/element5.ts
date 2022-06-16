import { FIVE_ELEMENTS } from '../constants/calendarData'

export class Element5 {
  private _value: number = -1
  constructor(value: number | string | Element5) {
    if (value instanceof Element5) return value
    if (typeof value === 'number') {
      this._value = value % 5
    } else if (typeof value === 'string') {
      const elementIndex = FIVE_ELEMENTS.indexOf(value)
      if (elementIndex === -1) throw new Error('Invalid five-element value')
      this._value = elementIndex
    }
  }

  get value(): number {
    return this._value
  }

  toString(): string {
    return this._value === -1 ? 'Invalid five-element value' : FIVE_ELEMENTS[this._value]
  }

  valueOf(): number {
    return this._value
  }
}
