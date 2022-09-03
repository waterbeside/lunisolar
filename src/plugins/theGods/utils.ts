import { getBranchValue, getStemValue } from '../../utils'

// 神煞地支順行
export function branchAscGodFunc(
  offset: number,
  ymdh: 'year' | 'month' | 'day' | 'hour'
): CheckGodFunc {
  return getCheckGodFunc(lsr => (getBranchValue(lsr, ymdh) + offset) % 12, getBranchValue)
}

// 神煞地支逆行
export function branchDescGodFunc(
  offset: number,
  ymdh: 'year' | 'month' | 'day' | 'hour'
): CheckGodFunc {
  return getCheckGodFunc(
    lsr => ([0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1][getBranchValue(lsr, ymdh)] + offset) % 12,
    getBranchValue
  )
}

// 神煞天干順行
export function stemAscGodFunc(
  offset: number,
  ymdh: 'year' | 'month' | 'day' | 'hour'
): CheckGodFunc {
  return getCheckGodFunc(lsr => (getStemValue(lsr, ymdh) + offset) % 10, getStemValue)
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
  compareToFunc?: StemOrBranchValueFunc
): CheckGodFunc {
  return getCheckGodFunc(
    lsr => Number(ruleArray[compareFromFunc(lsr, fromYmdh, fromDiv)]),
    compareToFunc || compareFromFunc
  )
}
