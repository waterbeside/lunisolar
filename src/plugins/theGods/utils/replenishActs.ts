import { leave4BadAct } from '../actData'

/**
 * 天干百忌
 * @param stemValue 天干索引值
 * @returns [宜[], 忌[]]
 */
export function getStemActs(stemValue: number): [string[], string[]] {
  const stemActs: [string[], string[]][] = [
    [[], ['開倉']],
    [[], ['栽種']],
    [[], []],
    [[], ['整容', '剃頭']],
    [[], []],
    [[], []],
    [[], ['經絡']],
    [[], ['酝酿']],
    [[], ['开渠', '穿井']],
    [[], []]
  ]
  return stemActs[stemValue % 10]
}

/**
 * 地支百忌
 * @param stemValue 地支索引值
 * @returns [宜[], 忌[]]
 */
export function getBranchActs(branchValue: number): [string[], string[]] {
  const branchActs: [string[], string[]][] = [
    [['沐浴'], []],
    [[], ['冠帶']],
    [[], ['祭祀']],
    [[], ['穿井']],
    [[], []],
    [[], ['出行']],
    [[], ['苫蓋']],
    [[], ['求醫療病']],
    [[], ['安床']],
    [[], ['宴會']],
    [[], []],
    [['沐浴'], ['嫁娶']]
  ]
  return branchActs[branchValue % 12]
}

/**
 * 補充天干地支百忌
 * @param sb 天干地支對象實例
 * @param acts 宜忌對象
 */
export function addSBActs(sb: lunisolar.SB, acts: ActsSet) {
  const [sGood, sBad] = getStemActs(sb.stem.value)
  const [bGood, bBad] = getBranchActs(sb.branch.value)
  for (const g of sGood) acts.good.add(g)
  for (const b of sBad) acts.bad.add(b)
  for (const g of bGood) acts.good.add(g)
  for (const b of bBad) acts.bad.add(b)
}

/**
 * 補充陰歷宜忌 （人神所在日、月相等）
 * @param lunar 陰歷實例
 * @param acts 宜忌對象
 */
export function addLunarActs(lunar: lunisolar.Lunar, acts: ActsSet) {
  // 人神所在日
  if (lunar.day === 12) acts.bad.add('剃頭')
  else if (lunar.day === 15) {
    acts.bad.add('剃頭')
    acts.bad.add('整手足甲')
  } else if ([1, 6, 19, 21, 23]) acts.bad.add('整手足甲')

  // 朔望弦
  if ([1, 15, 7, 8, 22, 23].includes(lunar.day)) acts.bad.add('求醫療病')
  // 晦 (所忌與四離四絕相同)
  if (lunar.isLastDayOfMonth) {
    for (const b of leave4BadAct) {
      acts.bad.add(b)
    }
  }
}
