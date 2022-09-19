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
  return [
    getCheckGodFunc(
      (lsr: lunisolar.Lunisolar, ymdh: YMDH = defaultYmdh) =>
        (order[getBranchValue(lsr, ymdh) % 6] + offset) % 12,
      getBranchValue
    ),
    4
  ]
}

const createBy12Gods = (defaultYmdh: YMDH = 'month'): By12Gods => {
  const by12Gods: By12Gods = {} as By12Gods
  for (const idx in by12GodNames) {
    const item = by12GodNames[idx]
    by12Gods[item] = theBy12Gods(Number(idx))
  }
  return by12Gods
}

export { by12GodNames, createBy12Gods, By12Gods }
