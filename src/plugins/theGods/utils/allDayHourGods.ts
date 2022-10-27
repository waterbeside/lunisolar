import { hourGods, HourGods } from '../gods/hourGods'
import { getBy12GodIdx, by12GodNames, getBy12GodDataByKey } from '../gods/by12Gods'

const hourGodsSbDict: (string[][] | null)[] = new Array(60).fill(null)
const hourGodsSbLuck: number[][] = new Array(60)
const hourGodsSbLuck01: number[] = new Array(60).fill(0)

/**
 * 生成六十日时辰定局
 * @param lsr Lunisolar实例
 */
const craateTheDayHourGods = function (lsr: lunisolar.Lunisolar) {
  const daySb = lsr.char8.day
  // 遍历12个时辰
  const [bsIdx, _] = getBy12GodIdx(daySb.branch.value, 0)
  const luckLevels = new Array<number>(12).fill(0)
  let luckLevelNum01 = 0
  const dayHours = new Array<string[]>(12)
  for (let i = 0; i < 12; i++) {
    const gods = new Array<string>()
    const byIdx = (bsIdx + i) % 12
    const byKey = by12GodNames[byIdx]
    const byData = getBy12GodDataByKey(byKey)
    gods.push(byKey) // 先加串宫十二神
    let luckLevel = byData[2]
    for (const k in hourGods) {
      const item = hourGods[k as keyof HourGods]
      const extra = item[4]
      if (!extra || !extra.isDay60HourGod) continue
      const checkFun = item[0]
      const checked = checkFun(lsr, 'day', 'hour')
      if (!checked) continue
      gods.push(k)
      const llv = item[3] > 0 ? 1 : -1
      luckLevel += llv
    }
    dayHours[i] = gods
    luckLevels[i] = luckLevel
    luckLevelNum01 += (byData[2] > 0 ? 1 : 0) << i
  }
  hourGodsSbDict[daySb.value] = dayHours

  hourGodsSbLuck[daySb.value] = luckLevels
  hourGodsSbLuck01[daySb.value] = luckLevelNum01
  return dayHours
}

/**
 * 取得当日各时神神煞
 * @param lsr Lunisolar实例
 * @returns 返回当天各时辰的god key
 */
export function getAllDayHourGods(lsr: lunisolar.Lunisolar): string[][] {
  const daySbValue = lsr.char8.day.value
  let dayHours = hourGodsSbDict[daySbValue]
  if (!dayHours) dayHours = craateTheDayHourGods(lsr)
  return dayHours.slice()
}

/**
 * 取得当日各时辰吉凶
 * @param lsr Lunisolar实例
 * @param luckType 0默认，按吉凶神个数定吉凶，1，按串宫十二神定吉凶
 * @returns {number[]} 各时辰吉凶
 */
export const getAllDayHourLucks = function (
  lsr: lunisolar.Lunisolar,
  luckType: 0 | 1 = 1
): number[] {
  const daySbValue = lsr.char8.day.value
  let dayHours = hourGodsSbDict[daySbValue]
  if (!dayHours) craateTheDayHourGods(lsr)
  if (luckType === 1) {
    const res = []
    const luckNum = hourGodsSbLuck01[daySbValue]
    for (let i = 0; i < 12; i++) {
      const llv = ((luckNum >> i) & 1) > 0 ? 1 : -1
      res.push(llv)
    }
    return res
  }
  return hourGodsSbLuck[daySbValue].slice()
}
