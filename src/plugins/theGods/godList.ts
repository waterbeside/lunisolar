const branchValue = (lsr: lunisolar.Lunisolar, ymdh: 'year' | 'month' | 'day' | 'hour') =>
  lsr.char8[ymdh].branch.value

const stemValue = (lsr: lunisolar.Lunisolar, ymdh: 'year' | 'month' | 'day' | 'hour') =>
  lsr.char8[ymdh].stem.value

// 年神順行檢查
function branchOrderYearGodFunc(offset: number): CheckGodFunc {
  return getCheckGodFunc(lsr => (branchValue(lsr, 'year') + offset) % 12, branchValue)
}

// 年神逆行檢查
function branchReorderYearGodFunc(offset: number): CheckGodFunc {
  return getCheckGodFunc(
    lsr => ([0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1][branchValue(lsr, 'year')] + offset) % 12,
    branchValue
  )
}

function getCheckGodFunc<T = number>(
  resFrom: (lsr: lunisolar.Lunisolar) => T,
  resTo: (lsr: lunisolar.Lunisolar, ymdh: 'year' | 'month' | 'day' | 'hour') => T
): CheckGodFunc
function getCheckGodFunc<T = number, U = T>(
  resFrom: (lsr: lunisolar.Lunisolar) => T,
  resTo: (lsr: lunisolar.Lunisolar, ymdh: 'year' | 'month' | 'day' | 'hour') => U,
  compareSymbol: 'includes'
): CheckGodFunc
function getCheckGodFunc<T = number, U = T>(
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

const godList: { [key: string]: GodDictItem } = {
  // key : [取得方法, [宜], [忌], 属于年月日时用四位二进程表示]
  歲德: [getCheckGodFunc(lsr => Number('06284'[stemValue(lsr, 'year') % 5]), stemValue), [], [], 8],
  歲德合: [
    getCheckGodFunc(lsr => Number('51739'[stemValue(lsr, 'year') % 5]), stemValue),
    [],
    [],
    8
  ],
  歲禄: [
    getCheckGodFunc(lsr => [2, 3, 5, 6, 5, 6, 8, 9, 11, 0][stemValue(lsr, 'year')], branchValue),
    [],
    [],
    8
  ],
  陽貴: [
    getCheckGodFunc(lsr => [7, 8, 9, 11, 1, 0, 1, 2, 3, 5][stemValue(lsr, 'year')], branchValue),
    [],
    [],
    8
  ],
  陰貴: [
    getCheckGodFunc(lsr => [1, 0, 11, 9, 7, 8, 7, 6, 5, 3][stemValue(lsr, 'year')], branchValue),
    [],
    [],
    8
  ],
  金神: [
    getCheckGodFunc<number[], number>(
      lsr =>
        [
          [6, 7, 8, 9],
          [4, 5],
          [2, 3, 6, 7, 0, 1],
          [2, 3, 10, 11],
          [8, 9, 0, 1]
        ][stemValue(lsr, 'year') % 5],
      branchValue,
      'includes'
    ),
    [],
    [],
    8
  ],
  破敗五鬼: [
    getCheckGodFunc(
      lsr => [6, 4, 0, 1, 5, 2, 3, 7, 6, 4][stemValue(lsr, 'year')],
      (lsr, ymdh) => lsr.char8[ymdh].stem.trigram8.valueOf()
    ),
    [],
    [],
    8
  ],
  陰府太歲: [
    getCheckGodFunc<number[], number>(
      lsr =>
        [
          [2, 6],
          [3, 7],
          [4, 0],
          [7, 5],
          [0, 1]
        ][stemValue(lsr, 'year') % 5],
      (lsr, ymdh) => lsr.char8[ymdh].stem.trigram8.valueOf(),
      'includes'
    ),
    [],
    [],
    8
  ],
  // 年神隨歲方順行者
  奏書: [
    getCheckGodFunc(
      lsr => [7, 7, 4, 4, 4, 6, 6, 6, 0, 0, 0, 7][branchValue(lsr, 'year')],
      (lsr, ymdh) => lsr.char8[ymdh].stem.trigram8.valueOf()
    ),
    [],
    [],
    8
  ],
  博士: [
    getCheckGodFunc(
      lsr => [6, 6, 0, 0, 0, 7, 7, 7, 4, 4, 4, 6][branchValue(lsr, 'year')],
      (lsr, ymdh) => lsr.char8[ymdh].stem.trigram8.valueOf()
    ),
    [],
    [],
    8
  ],
  力士: [
    getCheckGodFunc(
      lsr => [4, 4, 6, 6, 6, 0, 0, 0, 7, 7, 7, 4][branchValue(lsr, 'year')],
      (lsr, ymdh) => lsr.char8[ymdh].stem.trigram8.valueOf()
    ),
    [],
    [],
    8
  ],
  蠶室: [
    getCheckGodFunc(
      lsr => [0, 0, 7, 7, 7, 4, 4, 4, 6, 6, 6, 0][branchValue(lsr, 'year')],
      (lsr, ymdh) => lsr.char8[ymdh].stem.trigram8.valueOf()
    ),
    [],
    [],
    8
  ],
  // 年神隨支順行者
  太歲: [branchOrderYearGodFunc(0), [], [], 8],
  太陽: [branchOrderYearGodFunc(1), [], [], 8],
  喪門: [branchOrderYearGodFunc(2), [], [], 8],
  太陰: [branchOrderYearGodFunc(3), [], [], 8],
  官符: [branchOrderYearGodFunc(4), [], [], 8],
  // godList.畜官 = [...godList.官符]
  支德: [branchOrderYearGodFunc(5), [], [], 8],
  // godList.死符 = [...godList.支德]; godList.小耗 = [...godList.支德];
  歲破: [branchOrderYearGodFunc(6), [], [], 8],
  // godList.大耗 = [...godList.歲破]
  龍德: [branchOrderYearGodFunc(7), [], [], 8],
  白虎: [branchOrderYearGodFunc(8), [], [], 8],
  福德: [branchOrderYearGodFunc(9), [], [], 8],
  吊客: [branchOrderYearGodFunc(10), [], [], 8],
  病符: [branchOrderYearGodFunc(11), [], [], 8],
  // 巡山羅㬋: [],
  // 年支隨歲退行者
  神后: [branchReorderYearGodFunc(0), [], [], 8],
  功曹: [branchReorderYearGodFunc(2), [], [], 8],
  天罡: [branchReorderYearGodFunc(4), [], [], 8],
  勝光: [branchReorderYearGodFunc(6), [], [], 8],
  傳送: [branchReorderYearGodFunc(8), [], [], 8],
  河魁: [branchReorderYearGodFunc(10), [], [], 8],
  六害: [branchReorderYearGodFunc(7), [], [], 8],
  五鬼: [branchReorderYearGodFunc(4), [], [], 8],
  // 年神從歲支三合者
  歲馬: [
    getCheckGodFunc(
      lsr => [2, 11, 8, 5][lsr.char8.year.branch.value % 4],
      (lsr, ymdh) => lsr.char8[ymdh].branch.value
    ),
    [],
    [],
    8
  ]
}

godList.畜官 = [...godList.官符]
godList.死符 = [...godList.支德]
godList.小耗 = [...godList.支德]

export default godList
