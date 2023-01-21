import { Trigram8 } from '../class/trigram8'
import { Stem, Branch } from '../class/stemBranch'

const direction24Cache = new Map<string, any>()

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
  const cacheKey = `direction24List:${lang}`
  if (direction24Cache.has(cacheKey)) return direction24Cache.get(cacheKey)
  const config = {
    lang
  }
  const res: DirectionList = [
    Branch.create(0, config), // 0 子
    Stem.create(9, config), // 1 癸
    Branch.create(1, config), // 2 丑
    Trigram8.create(4, config), // 3 艮
    Branch.create(2, config), // 4寅
    Stem.create(0, config), // 5 甲
    Branch.create(3, config), // 6卯
    Stem.create(1, config), // 7乙
    Branch.create(4, config), // 8辰
    Trigram8.create(6, config), // 9巽
    Branch.create(5, config), // 10巳
    Stem.create(2, config), // 11丙
    Branch.create(6, config), // 12午
    Stem.create(3, config), // 13丁
    Branch.create(7, config), // 14未
    Trigram8.create(0, config), // 15坤
    Branch.create(8, config), // 16申
    Stem.create(6, config), // 17庚
    Branch.create(9, config), // 18酉
    Stem.create(7, config), // 19辛
    Branch.create(10, config), // 20戌
    Trigram8.create(7, config), // 21乾
    Branch.create(11, config), // 22亥
    Stem.create(8, config) // 23壬
  ]
  direction24Cache.set(cacheKey, res)
  return res
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
