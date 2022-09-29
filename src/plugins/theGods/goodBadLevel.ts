import type { TheGods } from './class/theGods'
import type { God } from './class/god'
import { GOD_QUERY_STRING as GQS } from './constants'
/*
-----
宜忌等第表
[級別, 地支[], 神煞名[]]
級別: 0 to 5
0：上     吉足胜凶，从宜不从忌
1：上次   吉足抵凶，遇德从宜不从忌，不遇从宜亦从忌
2：中     吉不抵凶，遇德从宜不从忌，不遇从忌不从宜
3：中次   凶胜于吉，遇德从宜亦从忌，不遇从忌不从宜
4：下     凶又逢凶，遇德从忌不从宜，不遇诸事皆忌
5: 下下   凶叠大凶，遇德亦诸事皆忌
-----
*/

const theDeList = ['歲德', '歲德合', '月德', '月德合', '天德', '天德合']

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

const signGodList = [
  '相日',
  '月建',
  '時德',
  '六合',
  '天吏',
  '長生',
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
  const set = new Set(theDeList)
  return set.has(god.key)
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
    [0, [2, 8], ['長生', '六合', '劫煞']],
    [2, [5, 11], ['長生', '劫煞']],
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
    [0, [2, 8], ['長生', '六合', '收日']],
    [1, [1, 4, 7, 10], ['除日', '相日']],
    [2, [5, 11], ['長生', '月害', '收日']],
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
    [2, [5, 11], ['長生', '劫煞']],
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

/**
 * 取得等次
 * @param theGods TheGods實例
 * @param monthBranchValue 月的地支索引值
 */
function findLevel(
  theGods: TheGods,
  monthBranchValue: number
): [number | null, Map<string, boolean>] {
  const dutyGodKey = theGods.getDuty12God().key + '日'
  const life12GodKey = theGods.getLife12God('day').key
  const levelDict = getGoodBadLevelDict()
  const signGodMap = getTheSignGodMap()
  if (signGodMap.has(dutyGodKey)) signGodMap.set(dutyGodKey, true)
  if (dutyGodKey === '建日') signGodMap.set('月建', true)
  if (signGodMap.has(life12GodKey)) signGodMap.set(dutyGodKey, true)

  for (const godItem of theGods.query(GQS.TDG)) {
    if (signGodMap.has(godItem.key)) signGodMap.set(godItem.key, true)
    if (isDe(godItem)) signGodMap.set('德', true)
  }
  let levelDictItem = null
  let currLevelKey = null
  for (const levelkey of levelKeyList) {
    if (signGodMap.has(levelkey) && signGodMap.get(levelkey) === true) {
      levelDictItem = levelDict[levelkey]
      currLevelKey = levelDict[levelkey]
    }
  }
  if (!levelDictItem) return [null, signGodMap]
  let level = null
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
  return [level, signGodMap]
}

export { theDeList, getGoodBadLevelDict, findLevel, isDe }
