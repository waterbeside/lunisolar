import { getBranchValue, getStemValue } from '../../utils'

// 神煞地支順行
export function branchAscGodFunc(offset: number): CheckGodFunc {
  return getCheckGodFunc(
    (lsr, ymdh) => (getBranchValue(lsr, ymdh ?? 'month') + offset) % 12,
    getBranchValue
  )
}

// 神煞地支逆行
export function branchDescGodFunc(offset: number): CheckGodFunc {
  return getCheckGodFunc(
    (lsr, ymdh) =>
      ([0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1][getBranchValue(lsr, ymdh ?? 'month')] + offset) % 12,
    getBranchValue
  )
}

// 神煞天干順行
export function stemAscGodFunc(offset: number): CheckGodFunc {
  return getCheckGodFunc(
    (lsr, ymdh) => (getStemValue(lsr, ymdh ?? 'month') + offset) % 10,
    getStemValue
  )
}

// 月神随月将地支逆行
export function monthGeneralDescGodFunc(offset: number): CheckGodFunc {
  return getCheckGodFunc(
    lsr =>
      ([0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1][lsr.getMonthBuilder(1)[0].branch.value] + offset) %
      12,
    getBranchValue
  )
}

export function getCheckGodFunc<T = number>(
  resFrom: (lsr: lunisolar.Lunisolar, ymdh?: YMDH) => T,
  resTo: (lsr: lunisolar.Lunisolar, ymdh: YMDH) => T
): CheckGodFunc
export function getCheckGodFunc<T = number, U = T>(
  resFrom: (lsr: lunisolar.Lunisolar, ymdh?: YMDH) => T,
  resTo: (lsr: lunisolar.Lunisolar, ymdh: YMDH) => U,
  compareSymbol: 'includes'
): CheckGodFunc
export function getCheckGodFunc<T = number, U = T>(
  resFrom: (lsr: lunisolar.Lunisolar, ymdh?: YMDH) => T,
  resTo: (lsr: lunisolar.Lunisolar, ymdh: YMDH) => U,
  compareSymbol: string = '='
): CheckGodFunc {
  function func<T = number>(lsr: lunisolar.Lunisolar, fromYmdh?: YMDH): T
  function func<T = number>(lsr: lunisolar.Lunisolar, fromYmdh: YMDH | undefined, toYmdh: null): T
  function func(lsr: lunisolar.Lunisolar, fromYmdh: YMDH | undefined, toYmdh: YMDH): boolean
  function func(
    lsr: lunisolar.Lunisolar,
    fromYmdh: undefined | YMDH,
    toYmdh: null | YMDH = null
  ): T | boolean {
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
    (lsr, ymdh) => Number(ruleArray[compareFromFunc(lsr, ymdh ?? 'month', fromDiv)]),
    compareToFunc || compareFromFunc
  )
}
