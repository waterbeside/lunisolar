import { getBranchValue, getStemValue } from '../../utils'

// 神煞地支順行
export function branchAscGodFunc(offset: number): CheckGodFunc {
  return getCheckGodFunc((lsr, ymdh) => (getBranchValue(lsr, ymdh) + offset) % 12, getBranchValue)
}

// 神煞地支逆行
export function branchDescGodFunc(offset: number): CheckGodFunc {
  return getCheckGodFunc(
    (lsr, ymdh) =>
      ([0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1][getBranchValue(lsr, ymdh)] + offset) % 12,
    getBranchValue
  )
}

// 神煞天干順行
export function stemAscGodFunc(offset: number): CheckGodFunc {
  return getCheckGodFunc((lsr, ymdh) => (getStemValue(lsr, ymdh) + offset) % 10, getStemValue)
}

export function getCheckGodFunc<T = number>(
  resFrom: (lsr: lunisolar.Lunisolar, ymdh: YMDH) => T,
  resTo: (lsr: lunisolar.Lunisolar, ymdh: YMDH) => T
): CheckGodFunc
export function getCheckGodFunc<T = number, U = T>(
  resFrom: (lsr: lunisolar.Lunisolar, ymdh: YMDH) => T,
  resTo: (lsr: lunisolar.Lunisolar, ymdh: YMDH) => U,
  compareSymbol: 'includes'
): CheckGodFunc
export function getCheckGodFunc<T = number, U = T>(
  resFrom: (lsr: lunisolar.Lunisolar, ymdh: YMDH) => T,
  resTo: (lsr: lunisolar.Lunisolar, ymdh: YMDH) => U,
  compareSymbol: string = '='
): CheckGodFunc {
  function func<T = number>(lsr: lunisolar.Lunisolar, fromYmdh: YMDH): T
  function func<T = number>(lsr: lunisolar.Lunisolar, fromYmdh: YMDH, toYmdh: null): T
  function func(lsr: lunisolar.Lunisolar, fromYmdh: YMDH, toYmdh: YMDH): boolean
  function func(lsr: lunisolar.Lunisolar, fromYmdh: YMDH, toYmdh: null | YMDH = null): T | boolean {
    const res = resFrom(lsr, fromYmdh)
    if (!toYmdh) return res
    const to = resTo(lsr, toYmdh)
    return compareSymbol === 'includes' && Array.isArray(res)
      ? res.includes(to)
      : res === (to as unknown as T)
  }
  return func
}

export function getCommonCheckGodFunc(
  ruleArray: number[] | string,
  compareFromFunc: StemOrBranchValueFunc,
  fromDiv: number,
  compareToFunc?: StemOrBranchValueFunc
): CheckGodFunc {
  return getCheckGodFunc(
    (lsr, ymdh) => Number(ruleArray[compareFromFunc(lsr, ymdh, fromDiv)]),
    compareToFunc || compareFromFunc
  )
}
