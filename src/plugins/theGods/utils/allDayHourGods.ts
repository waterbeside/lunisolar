import { hourGods, HourGods } from '../gods/hourGods'
import { getBy12GodIdx, getBy12GodKeyByIdx, getBy12GodDataByKey } from '../gods/by12Gods'
import { computeRatStem } from '../../../utils'

const hourGodsSbDict: (string[][] | null)[] = new Array(60).fill(null)
const hourGodsSbLuck: number[][] = new Array(60)
const hourGodsSbLuck_dragon: number[] = new Array(60).fill(0)

/**
 * 生成六十日时辰定局
 * @param lsr Lunisolar实例
 */
const craateTheDayHourGods = function (lsr: lunisolar.Lunisolar) {
  const daySb = lsr.char8.day
  // 遍历12个时辰
  const [bsIdx, _] = getBy12GodIdx(daySb.branch.value, 0, 'hour')
  const luckLevels = new Array<number>(12).fill(0)
  let luckLevelNum01 = 0
  const dayHours = new Array<string[]>(12)
  for (let i = 0; i < 12; i++) {
    const gods = new Array<string>()
    const byIdx = (bsIdx + i) % 12
    const byKey = getBy12GodKeyByIdx(byIdx, 'hour')
    const byData = getBy12GodDataByKey(byKey)
    const byLuck = byData && byData[2] > 0 ? 1 : 0
    gods.push(byKey) // 先加串宫十二神
    let luckLevel = byData ? byData[2] : 0
    for (const k in hourGods) {
      const item = hourGods[k as keyof HourGods]
      const extra = item[4]
      if (!extra || !extra.isDay60HourGod) continue
      const checkFun = item[0]
      const ept = checkFun(lsr, 'day') // 时柱的天干或地支的期望验证值
      if (ept === null) continue
      let checked = false
      const checkBy = extra.checkBy // 通过天干还是地支验证
      let sOrBValue: number | null = null
      if (checkBy === 'stem') {
        sOrBValue = computeRatStem(daySb.stem.value, i)
      } else if (checkBy === 'branch') {
        sOrBValue = i
      } else {
        continue
      }
      if (Array.isArray(ept) && ept.includes(sOrBValue)) checked = true
      else if (typeof ept === 'number' && ept === sOrBValue) checked = true
      if (checked) {
        gods.push(k)
        const llv = item[3] > 0 ? 1 : item[3] < 0 ? -1 : 0
        luckLevel += llv
      }
    }
    dayHours[i] = gods
    luckLevels[i] = luckLevel
    luckLevelNum01 += (byLuck > 0 ? 1 : 0) << i
  }
  hourGodsSbDict[daySb.value] = dayHours

  hourGodsSbLuck[daySb.value] = luckLevels
  hourGodsSbLuck_dragon[daySb.value] = luckLevelNum01
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
 * @param luckType 0默认，按串宫十二神定吉凶，1，按吉凶神个数定吉凶
 * @returns {number[]} 各时辰吉凶
 */
export const getAllDayHourLucks = function (
  lsr: lunisolar.Lunisolar,
  luckType: 0 | 1 = 0
): number[] {
  const daySbValue = lsr.char8.day.value
  let dayHours = hourGodsSbDict[daySbValue]
  if (!dayHours) craateTheDayHourGods(lsr)
  if (luckType === 0) {
    const res = []
    const luckNum = hourGodsSbLuck_dragon[daySbValue]
    for (let i = 0; i < 12; i++) {
      const llv = ((luckNum >> i) & 1) > 0 ? 1 : -1
      res.push(llv)
    }
    return res
  }
  return hourGodsSbLuck[daySbValue].slice()
}
