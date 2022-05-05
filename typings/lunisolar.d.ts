declare function lunisolar(date?: lunisolar.DateConfigType): lunisolar.Lunisolar

declare namespace lunisolar {
  export type DateConfigType = string | number | Date | null | undefined
  class Lunisolar {
    get date(): Date
    clone(): Lunisolar
  }
}
