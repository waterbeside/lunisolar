import { branchValue, stemValue } from '../../utils'

// 年神順行檢查
export function branchOrderYearGodFunc(offset: number): CheckGodFunc {
  return getCheckGodFunc(lsr => (branchValue(lsr, 'year') + offset) % 12, branchValue)
}

// 年神逆行檢查
export function branchReorderYearGodFunc(offset: number): CheckGodFunc {
  return getCheckGodFunc(
    lsr => ([0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1][branchValue(lsr, 'year')] + offset) % 12,
    branchValue
  )
}

export function getCheckGodFunc<T = number>(
  resFrom: (lsr: lunisolar.Lunisolar) => T,
  resTo: (lsr: lunisolar.Lunisolar, ymdh: 'year' | 'month' | 'day' | 'hour') => T
): CheckGodFunc
export function getCheckGodFunc<T = number, U = T>(
  resFrom: (lsr: lunisolar.Lunisolar) => T,
  resTo: (lsr: lunisolar.Lunisolar, ymdh: 'year' | 'month' | 'day' | 'hour') => U,
  compareSymbol: 'includes'
): CheckGodFunc
export function getCheckGodFunc<T = number, U = T>(
  resFrom: (lsr: lunisolar.Lunisolar) => T,
  resTo: (lsr: lunisolar.Lunisolar, ymdh: 'year' | 'month' | 'day' | 'hour') => U,
  compareSymbol: string = '='
): CheckGodFunc {
  function func<T = number>(lsr: lunisolar.Lunisolar): T
  function func<T = number>(lsr: lunisolar.Lunisolar, ymdh: null): T
  function func(lsr: lunisolar.Lunisolar, ymdh: 'year' | 'month' | 'day' | 'hour'): boolean
  function func(
    lsr: lunisolar.Lunisolar,
    ymdh: null | 'year' | 'month' | 'day' | 'hour' = null
  ): T | boolean {
    const res = resFrom(lsr)
    if (!ymdh) return res
    const to = resTo(lsr, ymdh)
    return compareSymbol === 'includes' && Array.isArray(res)
      ? res.includes(to)
      : res === (to as unknown as T)
  }
  return func
}

export function getCommonCheckGodFunc(
  ruleArray: number[] | string,
  compareFromFunc: StemOrBranchValueFunc,
  fromYmdh: 'year' | 'month' | 'day' | 'hour',
  fromDiv: number,
  compareToFunc: StemOrBranchValueFunc
): CheckGodFunc {
  return getCheckGodFunc(
    lsr => Number(ruleArray[compareFromFunc(lsr, fromYmdh, fromDiv)]),
    compareToFunc
  )
}
