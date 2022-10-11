/*
```
-----------------------------------
卷十  p251
goodBadLevel:
宜忌等第表
[級別, 地支[], 神煞名[]]
級別: 0 to 5
0：上     吉足胜凶，从宜不从忌
1：上次   吉足抵凶，遇德从宜不从忌，不遇从宜亦从忌
2：中     吉不抵凶，遇德从宜不从忌，不遇从忌不从宜
3：中次   凶胜于吉，遇德从宜亦从忌，不遇从忌不从宜
4：下     凶又逢凶，遇德从忌不从宜，不遇诸事皆忌
5: 下下   凶叠大凶，遇德亦诸事皆忌
------------------------------------
actLevel:
通过goodBadLevel是否遇德再分级
0: 从宜不从忌
1: 从宜亦从忌
2：从忌不从宜
3：诸事皆忌
```
*/

import type { TheGods } from '../class/theGods'
import type { God } from '../class/god'
import { GOD_QUERY_STRING as GQS, MEETING_DES_SET } from '../constants'
import { addLunarActs, addSBActs } from './replenishActs'

const levelKeyList = [
  '平日',
  '收日',
  '閉日',
  '劫煞',
  '災煞',
  '月煞',
  '月刑',
  '月害',
  '月厭',
  '大時',
  '天吏'
] as const

type LevelKey = typeof levelKeyList[number]

type FilterActHooksKey = 'l0' | 'l1' | 'l2' | 'l3'

type FilterActHooks = {
  [key in FilterActHooksKey[number]]?: ((actLevel: number, acts: ActsSet) => void | true)[]
}

const signGodList = [
  '相日',
  '月建',
  '時德',
  '六合',
  '天吏',
  '月令長生',
  '官日',
  '除日',
  '執日',
  '開日',
  '滿日',
  '民日',
  '月破',
  '危日',
  '建日',
  '月德',
  '大會',
  '守日',
  '成日',
  '定日',
  '德'
]

function isDe(god: God) {
  return MEETING_DES_SET.has(god.key)
}

function getTheSignGodMap() {
  const map = new Map<string, boolean>()
  for (const item of levelKeyList) {
    map.set(item, false)
  }
  for (const item of signGodList) {
    map.set(item, false)
  }
  return map
}

const getGoodBadLevelDict = (): {
  [key in LevelKey]: [number, number[], string[]][]
} => ({
  平日: [
    [0, [11], ['相日', '時德', '六合']],
    [1, [6], ['相日', '六合', '月刑']],
    [2, [8], ['相日', '月害']],
    [3, [2], ['相日', '月害', '月刑']],
    [3, [3, 6, 9], ['天吏']],
    [4, [1, 4, 7, 10], ['月煞']],
    [4, [0], ['天吏', '月刑']]
  ],
  收日: [
    [0, [2, 8], ['月令長生', '六合', '劫煞']],
    [2, [5, 11], ['月令長生', '劫煞']],
    [2, [4, 7], ['月害']],
    [3, [0, 6, 9], ['大時']],
    [3, [1, 10], ['月刑']],
    [4, [3], ['大時']]
  ],
  閉日: [
    [3, [0, 3, 6, 9], ['王日']],
    [3, [1, 4, 7, 10], ['官日', '天吏']],
    [4, [2, 5, 8, 11], ['月煞']]
  ],
  劫煞: [
    [0, [2, 8], ['月令長生', '六合', '收日']],
    [1, [1, 4, 7, 10], ['除日', '相日']],
    [2, [5, 11], ['月令長生', '月害', '收日']],
    [3, [0, 3, 6, 9], ['執日']]
  ],
  災煞: [
    [1, [2, 5, 8, 10], ['開日']],
    [2, [1, 4, 7, 10], ['滿日', '民日']],
    [4, [0, 6], ['月破']],
    [5, [0, 6], ['月厭']]
  ],
  月煞: [
    [1, [3, 9], ['六合', '危日']],
    [3, [0, 6], ['月害', '危日']],
    [4, [2, 5, 8, 11], ['閉日']],
    [4, [1, 4, 7, 10], ['平日']]
  ],
  月刑: [
    [1, [5], ['平日', '六合', '相日']],
    [3, [2], ['相日', '月害', '平日']],
    [3, [4, 9, 11], ['建日']],
    [3, [1, 10], ['收日']],
    [4, [0], ['平日', '天吏']],
    [4, [3], ['收日', '大時']],
    [4, [7, 8], ['月破']],
    [4, [6], ['月建', '月厭', '月德', '大會']]
  ],
  月害: [
    [2, [3, 9], ['守日', '除日']],
    [2, [1, 7], ['執日', '大時']],
    [2, [5, 11], ['月令長生', '劫煞']],
    [2, [8], ['相日', '平日']],
    [3, [0, 6], ['月煞']],
    [3, [4, 10], ['官日', '閉日', '天吏']],
    [3, [2], ['相日', '平日', '月刑']]
  ],
  月厭: [
    [2, [2, 8], ['成日']],
    [2, [1, 7], ['開日']],
    [3, [4, 10], ['定日']],
    [3, [5, 11], ['滿日']],
    [4, [0], ['月建', '德', '大會']],
    [4, [6], ['月建', '月刑', '德', '大會']],
    [5, [3, 9], ['月破', '災煞']]
  ],
  大時: [
    [0, [2, 5, 8, 11], ['除日', '官日']],
    [0, [4, 10], ['執日', '六合']],
    [2, [1, 7], ['執日', '月害']],
    [3, [0, 6, 9], ['收日']],
    [4, [3], ['收日', '月刑']]
  ],
  天吏: [
    [2, [2, 5, 8, 11], ['危日']],
    [3, [1, 4, 7, 10], ['閉日']],
    [3, [3, 6, 9], ['平日']],
    [4, [0], ['平日', '月刑']]
  ]
})

type ActLevelData = [number, number, Map<string, boolean>, ActsSet, Set<string>]

/**
 * 取得等次
 * @param theGods TheGods實例
 */
function findLevel(theGods: TheGods): ActLevelData {
  const monthBranchValue = theGods.lsr.char8.month.branch.value
  const dutyGodKey = theGods.getDuty12God().key + '日'
  const life12GodKey = theGods.getLife12God('month').key
  const levelDict = getGoodBadLevelDict()
  const signGodMap = getTheSignGodMap()
  if (signGodMap.has(dutyGodKey)) signGodMap.set(dutyGodKey, true)
  if (dutyGodKey === '建日') signGodMap.set('月建', true)
  if (signGodMap.has(life12GodKey)) signGodMap.set(dutyGodKey, true)
  const acts: {
    good: Set<string>
    bad: Set<string>
  } = {
    good: new Set<string>(),
    bad: new Set<string>()
  }
  const gods = new Set<string>()
  for (const godItem of theGods.query(GQS.TDG) as God[]) {
    if (signGodMap.has(godItem.key)) signGodMap.set(godItem.key, true)
    if (isDe(godItem)) signGodMap.set('德', true)
    for (const g of godItem.data.good) acts.good.add(g)
    for (const b of godItem.data.bad) acts.bad.add(b)
    gods.add(godItem.key)
  }
  let levelDictItem = null
  // let currLevelKey = null
  for (const levelkey of levelKeyList) {
    if (signGodMap.has(levelkey) && signGodMap.get(levelkey) === true) {
      levelDictItem = levelDict[levelkey]
      // currLevelKey = levelDict[levelkey]
    }
  }
  if (!levelDictItem) return [-1, -1, signGodMap, acts, gods]
  let level = -1
  outer: for (const levelItem of levelDictItem) {
    const [lv, mv, gl] = levelItem
    if (mv.includes(monthBranchValue)) {
      for (const glItem of gl) {
        if (signGodMap.has(glItem) && signGodMap.get(glItem) === true) {
          level = lv
          break outer
        }
      }
    }
  }
  let actLevel = 1
  if (level === 5) actLevel = 3
  else if (level === 4) actLevel = signGodMap.get('德') ? 2 : 3
  else if (level === 3) actLevel = signGodMap.get('德') ? 1 : 2
  else if (level === 2) actLevel = signGodMap.get('德') ? 0 : 2
  else if (level === 1) actLevel = signGodMap.get('德') ? 0 : 1
  else if (level === 0) actLevel = 0
  return [level, actLevel, signGodMap, acts, gods]
}

/**
 * 等第表篩選宜忌
 * @param actLevel 宜忌分級 0: 从宜不从忌 1: 从宜亦从忌 2：从忌不从宜 3：诸事皆忌
 * @param acts 宜忌對象 {good, bad}
 */
function filterActByLevel(actLevel: number, acts: ActsSet, hooks?: FilterActHooks): void {
  const setHooks = function (level: FilterActHooksKey): boolean {
    if (!hooks) return false
    const fns =
      hooks[level] === undefined
        ? []
        : (hooks[level] as ((actLevel: number, acts: ActsSet) => void | true)[])
    for (let i = 0; i < fns.length; i++) {
      if (fns[i](actLevel, acts)) return true
    }
    return false
  }
  if (actLevel === 3) {
    if (setHooks('l3')) return
    acts.good = new Set(['諸事不宜'])
    acts.bad = new Set(['諸事不宜'])
    return
  }
  for (const b of Array.from(acts.bad.keys())) {
    if (acts.good.has(b)) {
      // 2：从忌不从宜
      if (actLevel === 2) {
        if (setHooks('l2')) return
        acts.good.delete(b)
      }
      // 1: 从宜亦从忌
      else if (actLevel === 1) {
        if (setHooks('l1')) return
        acts.good.delete(b)
        acts.bad.delete(b)
      } else if (actLevel === 0) {
        if (setHooks('l0')) return
        acts.bad.delete(b)
      }
    }
  }
  return
}

/**
 * 鋪注條例，等第表之后再篩選 卷十 p251
 ```
 凡鋪注 萬年書 通書，先依用事次第，察其所宜忌之日，
 於某日下注宜某事，某日下注忌某事, 次按宜忌，較量其吉凶之輕重，以定去取。
 ```
 * @param theGods 諸神對象
 * @param acts 宜忌對象 {good, bad}
 */
function filterActAfterLevel(theGods: TheGods, levelData: ActLevelData) {
  const [level, actLevel, signGodMap, acts, gods] = levelData
  const { good, bad } = acts
  //TODO: 取得所有遇德猶忌之事
  const mdsbActs: Set<string> = new Set<string>()
  // 凡鋪宜宜政事，布政事之日，止注宜宣政事
  if (good.has('宣政事') && good.has('布政事')) good.delete('布政事')
  // 凡宜營建宮室，修宮室之日，止注宜營建宮室
  if (good.has('營建宮室') && good.has('修宮室')) {
    good.delete('修宮室')
  }
  // 凡德合、赦愿、月恩、四相、时德等日，不注忌进人口、安床、经络、酝酿、开市、立券、交易、纳财、开仓库、出货财。
  // 如遇德犹忌，及从忌不从宜之日，则仍注忌
  if (
    ['歲德合', '月德合', '天德合', '天赦', '天願', '月恩', '四相', '时德'].some(item =>
      gods.has(item)
    )
  ) {
    ;['進人口', '安床', '經絡', '醞釀', '開市', '立券', '交易', '納財', '開倉庫', '出貨財'].forEach(
      item => {
        // 遇德猶忌，及从忌不从宜之日, 仍注忌
        if (!(mdsbActs.has(item) || actLevel > 1) && bad.has(item)) {
          bad.delete(item)
        }
      }
    )
  }
  var branchValue = theGods.lsr.char8.day.branch.value
  var stemValue = theGods.lsr.char8.day.stem.value
  // 凡天狗寅日忌祭祀，不注宜求福、祈嗣。（应为祈福，求嗣？）
  if (gods.has('天狗') || branchValue === 2) {
    bad.add('祭祀')
    good.delete('祭祀')
    good.delete('祈福')
    good.delete('求嗣')
  }
  // 凡卯日忌穿井，不注宜開渠
  if (branchValue === 3) {
    bad.add('穿井')
    good.delete('穿井')
    good.delete('開渠')
  }
  // 壬日忌開渠，不注宜穿井
  if (stemValue === 8) {
    bad.add('開渠')
    good.delete('開渠')
    good.delete('穿井')
  }
  // 凡巳日忌出行，不注宜出师、遣使。
  if (branchValue === 5) {
    bad.add('出行')
    good.delete('出行')
    good.delete('出師')
    good.delete('遣使')
  }
  // 凡酉日忌宴會，亦不注慶賜 賞賀
  if (branchValue === 9) {
    bad.add('宴會')
    good.delete('宴會')
    good.delete('慶賜')
    good.delete('賞賀')
  }
  // 凡丁日忌剃頭，亦不注宜整容
  if (stemValue === 3) {
    bad.add('剃頭')
    good.delete('剃頭')
    good.delete('整容')
  }
  // 凡吉凶相抵，不注忌祈福，亦不注忌求嗣
  if (actLevel === 1 && !bad.has('祈福')) {
    if (!mdsbActs.has('求嗣')) bad.delete('求嗣')
  }
  // 凡忌诏命公卿、招贤，不注宜施恩封拜、举正直、袭爵受封。
  if (['詔命公卿', '招賢'].some(item => bad.has(item))) {
    ;['施恩封拜', '舉正直', '襲爵受封'].forEach(it => good.delete(it))
  }
  // 凡忌施恩封拜、举正直、袭爵受封，不注宜诏命公卿、招贤。
  if (['施恩封拜', '舉正直', '襲爵受封'].some(item => bad.has(item))) {
    ;['詔命公卿', '招賢'].forEach(it => good.delete(it))
  }
  // 凡宜宣政事之日遇往亡则改宣为布
  if (good.has('宣政事') && gods.has('往亡')) {
    good.delete('宣政事')
    good.add('布政事')
  }
  // 凡月厌忌行幸、上官，不注宜颁诏、施恩封拜、诏命公卿、招贤、举正直。
  // 遇宜宣政事之日，则改宣为布
  if (gods.has('月厭')) {
    ;['行幸', '上官赴任'].forEach(item => {
      good.delete(item)
      bad.add(item)
    })
    ;['頒詔', '施恩封拜', '詔命公卿', '招賢', '舉正直'].forEach(item => {
      good.delete(item)
    })
    if (good.has('宣政事')) {
      good.delete('宣政事')
      good.add('布政事')
    }
  }
  // 凡吉凶相抵，不注忌结婚姻，亦不注忌冠带、纳采问名、嫁娶、进人口，如遇德犹忌之日则仍注忌。
  if (actLevel === 1 && !bad.has('結婚姻')) {
    ;['冠帶', '納采問名', '嫁娶', '進人口'].forEach(item => {
      if (!mdsbActs.has(item)) bad.delete('item')
    })
  }
  // 凡吉凶相抵，不注忌嫁娶，亦不注忌冠带、结婚姻、纳采问名、进人口、搬移、安床，如遇德犹忌之日，则仍注忌
  if (actLevel === 1 && !bad.has('嫁娶')) {
    ;['冠帶', '結婚姻', '納采問名', '進人口', '般移', '安床'].forEach(item => {
      if (!mdsbActs.has(item) && !gods.has('不將')) bad.delete('item')
    })
  }
  // 遇亥日、厌对、八专、四忌、四穷而仍注忌嫁娶者，只注所忌之事，其不忌者仍不注忌。
  // ? 不理解“不忌仍不注忌”，不忌肯定不注忌？
  ;(function () {
    const tempGods = ['厭對', '八專', '四忌', '四窮']
    if (
      actLevel === 1 &&
      (stemValue === 9 || tempGods.some(item => gods.has(item))) &&
      bad.has('嫁娶')
    ) {
      // TODO:
    }
  })()
}

/**
 * 輸出處理后的宜忌
 * @param theGods 諸神對象
 */
function outputActs(theGods: TheGods) {
  const [lv, lv2, signGodMap, acts] = findLevel(theGods)
  // 補充陰歷宜忌
  addLunarActs(theGods.lsr.lunar, acts)
  // 補充百忌日宜忌
  addSBActs(theGods.lsr.char8.day, acts)
  // 補充12值神宜忌
  const dutyGod = theGods.getDuty12God()
  for (const g of dutyGod.data.good) acts.good.add(g)
  for (const b of dutyGod.data.bad) acts.bad.add(b)
  // 等第表篩選宜忌
  if (lv2) filterActByLevel(lv2, acts)
  return acts
}

export { getGoodBadLevelDict, findLevel, isDe, filterActByLevel }
