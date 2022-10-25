/*
by12Gods (black & yellow 12 gods)

黄黑12神

道远几时通达，路遥何日还乡。
```
青龙明堂与天刑，朱雀金匮天德神；
白虎玉堂天牢黑，玄武司命惊勾陈。
```

*/

import { getBranchValue } from '../../../utils'
import { getCheckGodFunc } from '../utils'

const by12GodNames = [
  '青龍',
  '明堂',
  '天刑',
  '朱雀',
  '金匱',
  '天德',
  '白虎',
  '玉堂',
  '天牢',
  '玄武',
  '司命',
  '勾陳'
] as const

type By12Gods = { [key in typeof by12GodNames[number]]: GodDictItem }

/**
 ```
 青龍 明堂 金匱 寶光 玉堂 司命 與吉神并則從所宜，與凶神并， 則從所忌
 ```
 */
const by12GodData: {
  [key in typeof by12GodNames[number]]: [string[] | null, string[] | null, number]
} = {
  青龍: [null, null, 1],
  明堂: [null, null, 1],
  天刑: [null, null, -1],
  朱雀: [null, null, -1],
  金匱: [null, null, 1],
  天德: [null, null, 1],
  白虎: [null, null, -1],
  玉堂: [null, null, 1],
  天牢: [null, null, -1],
  玄武: [null, null, -1],
  司命: [null, null, 1],
  勾陳: [null, null, -1]
}

/**
 * 
 ```
 子午青龙起在申，卯酉之日又在寅。
  寅申须从子上起，巳亥在午不须论。
  唯有辰戌归辰位，丑未原从戌上寻。
 ```
 * @param offset 
 * @returns 
 */
function theBy12Gods(offset: number, defaultYmdh: YMDH = 'month'): GodDictItem {
  const order = [8, 10, 0, 2, 4, 6] // 申戌子寅辰午
  const godKey = by12GodNames[offset]
  return [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh: YMDH = defaultYmdh) =>
        (order[getBranchValue(lsr, ymdh) % 6] + offset) % 12,
      getBranchValue
    ),
    by12GodData[godKey][0],
    by12GodData[godKey][1],
    4
  ]
}

const createBy12Gods = (defaultYmdh: YMDH = 'month'): By12Gods => {
  const by12Gods: By12Gods = {} as By12Gods
  for (const idx in by12GodNames) {
    const item = by12GodNames[idx]
    by12Gods[item] = theBy12Gods(Number(idx), defaultYmdh)
  }
  return by12Gods
}

/**
 * @param lsr The instance of Lunisolar
 * @returns [黃黑12神索引, 名稱，宜[], 忌[]]
 */
function getBy12God(
  lsr: lunisolar.Lunisolar,
  fromYmdh: YMDH,
  toYmdh: YMDH
): [number, string, string[] | null, string[] | null] {
  const fromBv = getBranchValue(lsr, fromYmdh)
  const toBv = getBranchValue(lsr, toYmdh)
  const offsetList = [4, 2, 0, 10, 8, 6]
  const offset = offsetList[fromBv % 6]
  const godIdx = (toBv + offset) % 12
  const godKey = by12GodNames[godIdx]
  const [good, bad] = by12GodData[godKey]
  return [godIdx, godKey, good, bad]
}

export { by12GodNames, createBy12Gods, getBy12God, By12Gods }
