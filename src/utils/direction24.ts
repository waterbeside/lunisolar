import { Trigram8 } from '../class/trigram8'
import { Stem, Branch } from '../class/stemBranch'

type DirectionList = [
  Branch, // 子
  Stem, // 癸
  Branch, // 丑
  Trigram8, // 艮
  Branch, // 寅
  Stem, // 甲
  Branch, // 卯
  Stem, // 乙
  Branch, // 辰
  Trigram8, // 巽
  Branch, // 巳
  Stem, // 丙
  Branch, // 午
  Stem, // 丁
  Branch, // 未
  Trigram8, // 坤
  Branch, // 申
  Stem, // 庚
  Branch, // 酉
  Stem, // 辛
  Branch, // 戌
  Trigram8, // 乾
  Branch, // 亥
  Stem // 壬
]

type StemsAndBranchs = { stem: Stem[]; branch: Branch[] }

export const getDirection24List = (lang: string = 'zh'): DirectionList => {
  const config = {
    lang
  }
  return [
    new Branch(0, config), // 0 子
    new Stem(9, config), // 1 癸
    new Branch(1, config), // 2 丑
    new Trigram8(4, config), // 3 艮
    new Branch(2, config), // 4寅
    new Stem(0, config), // 5 甲
    new Branch(3, config), // 6卯
    new Stem(1, config), // 7乙
    new Branch(4, config), // 8辰
    new Trigram8(6, config), // 9巽
    new Branch(5, config), // 10巳
    new Stem(2, config), // 11丙
    new Branch(6, config), // 12午
    new Stem(3, config), // 13丁
    new Branch(7, config), // 14未
    new Trigram8(0, config), // 15坤
    new Branch(8, config), // 16申
    new Stem(6, config), // 17庚
    new Branch(9, config), // 18酉
    new Stem(7, config), // 19辛
    new Branch(10, config), // 20戌
    new Trigram8(7, config), // 21乾
    new Branch(11, config), // 22亥
    new Stem(8, config) // 23壬
  ]
}

// 取得月厌位所在的24山的索引值
export const getMonthHateAtDrt24 = (branchValue: number): number => {
  // [0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  return [0, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2][branchValue]
}

// 取得厌前厌后
export const getHateFrontAndBack = (
  branchValue: number,
  lang: string = 'zh'
): [StemsAndBranchs, StemsAndBranchs] => {
  const hate = getMonthHateAtDrt24(branchValue) // 月厌位
  const hateOp = (hate + 12) % 24 // 厌对位
  const hill24 = getDirection24List(lang)
  const ying: StemsAndBranchs = { stem: [], branch: [] }
  const yang: StemsAndBranchs = { stem: [], branch: [] }
  for (let i = 0; i < 24; i++) {
    if (i === hate || i === hateOp) continue
    const item = hill24[i]
    // 月厌逆行十二辰为阳
    if (
      (hate > hateOp && i < hate && i > hateOp) ||
      (hate < hateOp && ((0 <= i && i < hate) || (hateOp < i && i <= 23)))
    ) {
      if (item instanceof Stem) yang.stem.push(item)
      if (item instanceof Branch) yang.branch.push(item)
    } else {
      if (item instanceof Stem) ying.stem.push(item)
      if (item instanceof Branch) ying.branch.push(item)
    }
  }
  return [yang, ying]
}
