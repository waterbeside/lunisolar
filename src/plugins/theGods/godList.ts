// 年神順行檢查
function yearGodBranchOrderCheck(
  offset: number,
  lsr: lunisolar.Lunisolar,
  ymdh: 'year' | 'month' | 'day' | 'hour' = 'day'
) {
  return (lsr.char8.year.branch.value + offset) % 12 === lsr.char8[ymdh].branch.value
}

const godList: { [key: string]: GodDictItem } = {
  // key : [取得方法, [宜], [忌], 属于年月日时用四位二进程表示]
  歲德: [
    (lsr, ymdh = 'day') =>
      Number('06284'[lsr.char8.year.stem.value % 5]) === lsr.char8[ymdh].stem.value,
    [],
    [],
    8
  ],
  歲德合: [
    (lsr, ymdh = 'day') =>
      Number('51739'[lsr.char8.year.stem.value % 5]) === lsr.char8[ymdh].stem.value,
    [],
    [],
    8
  ],
  歲禄: [
    (lsr, ymdh = 'day') =>
      [2, 3, 5, 6, 5, 6, 8, 9, 11, 0][lsr.char8.year.stem.value] === lsr.char8[ymdh].branch.value,
    [],
    [],
    8
  ],
  陽貴: [
    (lsr, ymdh = 'day') =>
      [7, 8, 9, 11, 1, 0, 1, 2, 3, 5][lsr.char8.year.stem.value] === lsr.char8[ymdh].branch.value,
    [],
    [],
    8
  ],
  陰貴: [
    (lsr, ymdh = 'day') =>
      [1, 0, 11, 9, 7, 8, 7, 6, 5, 3][lsr.char8.year.stem.value] === lsr.char8[ymdh].branch.value,
    [],
    [],
    8
  ],
  金神: [
    (lsr, ymdh = 'day') =>
      [
        [6, 7, 8, 9],
        [4, 5],
        [2, 3, 6, 7, 0, 1],
        [2, 3, 10, 11],
        [8, 9, 0, 1]
      ][lsr.char8.year.stem.value % 5].includes(lsr.char8[ymdh].branch.value),
    [],
    [],
    8
  ],
  破敗五鬼: [
    (lsr, ymdh = 'day') =>
      [6, 4, 0, 1, 5, 2, 3, 7, 6, 4][lsr.char8.year.stem.value] ===
      lsr.char8[ymdh].stem.trigram8.valueOf(),
    [],
    [],
    8
  ],
  陰府太歲: [
    (lsr, ymdh = 'day') =>
      [2, 3, 4, 7, 0][lsr.char8.year.stem.value % 5] === lsr.char8[ymdh].stem.trigram8.valueOf() ||
      [6, 7, 0, 5, 1][lsr.char8.year.stem.value % 5] === lsr.char8[ymdh].stem.trigram8.valueOf(),
    [],
    [],
    8
  ],
  // 年神隨歲方順行者
  奏書: [
    (lsr, ymdh = 'day') =>
      [7, 7, 4, 4, 4, 6, 6, 6, 0, 0, 0, 7][lsr.char8.year.branch.value] ===
      lsr.char8[ymdh].stem.trigram8.valueOf(),
    [],
    [],
    8
  ],
  博士: [
    (lsr, ymdh = 'day') =>
      [6, 6, 0, 0, 0, 7, 7, 7, 4, 4, 4, 6][lsr.char8.year.branch.value] ===
      lsr.char8[ymdh].stem.trigram8.valueOf(),
    [],
    [],
    8
  ],
  力士: [
    (lsr, ymdh = 'day') =>
      [4, 4, 6, 6, 6, 0, 0, 0, 7, 7, 7, 4][lsr.char8.year.branch.value] ===
      lsr.char8[ymdh].stem.trigram8.valueOf(),
    [],
    [],
    8
  ],
  蠶室: [
    (lsr, ymdh = 'day') =>
      [0, 0, 7, 7, 7, 4, 4, 4, 6, 6, 6, 0][lsr.char8.year.branch.value] ===
      lsr.char8[ymdh].stem.trigram8.valueOf(),
    [],
    [],
    8
  ],
  // 年神隨支順行者
  太歲: [(lsr, ymdh = 'day') => yearGodBranchOrderCheck(0, lsr, ymdh), [], [], 8],
  太陽: [(lsr, ymdh = 'day') => yearGodBranchOrderCheck(1, lsr, ymdh), [], [], 8],
  喪門: [(lsr, ymdh = 'day') => yearGodBranchOrderCheck(2, lsr, ymdh), [], [], 8],
  太陰: [(lsr, ymdh = 'day') => yearGodBranchOrderCheck(3, lsr, ymdh), [], [], 8],
  官符: [
    // godList.畜官 = [...godList.官符]
    (lsr, ymdh = 'day') => yearGodBranchOrderCheck(4, lsr, ymdh),
    [],
    [],
    8
  ],
  支德: [
    // godList.死符 = [...godList.支德]; godList.小耗 = [...godList.支德];
    (lsr, ymdh = 'day') => yearGodBranchOrderCheck(5, lsr, ymdh),
    [],
    [],
    8
  ]
}

godList.畜官 = [...godList.官符]
godList.死符 = [...godList.支德]
godList.小耗 = [...godList.支德]

export default godList
