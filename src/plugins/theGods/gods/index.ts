// 神煞对象池

// import { GodBase } from '../class/godBase'
import { God } from '../class/god'

import { prettyGetGodsYMDH } from '../utils'
import type { TheGods } from '../class/theGods'
import { godsDicts } from '../utils/godsDicts'

/**
验证是否附合神煞
 */
export function checkGod(
  lsr: lunisolar.Lunisolar,
  godKey: string,
  godDict: { [key: string]: GodDictItem },
  fromYmdh: YMDH | undefined,
  toYmdh: YMDH
) {
  const [checkFunc] = godDict[godKey]
  return checkFunc(lsr, fromYmdh, toYmdh)
}

/**
 * 取得神煞初始数据字典
 * @param dictKey 从哪份数据创建
 */
export function getGodDict(dictKey: string) {
  if (!godsDicts.hasOwnProperty(dictKey)) return undefined
  return godsDicts[dictKey as keyof typeof godsDicts]
}

export function createGod(
  lsr: lunisolar.Lunisolar,
  godKey: string,
  cate: YMDH,
  fromDict?: FromGodsType
): God {
  return new God({
    key: godKey,
    cate: cate,
    fromDict: fromDict,
    lang: lsr.getConfig('lang') as string
  })
}

// 根据lsr验证该神煞是否存在，并生成god实例
export const checkAndCreateGod = (
  lsr: lunisolar.Lunisolar,
  godDictKey: FromGodsType,
  godKey: string,
  godCate: YMDH,
  fromYmdh: YMDH | undefined,
  toYmdh: YMDH
): God | undefined => {
  const godDict = getGodDict(godDictKey)
  if (!godDict) return undefined
  if (!checkGod(lsr, godKey, godDict, fromYmdh, toYmdh)) return undefined
  return createGod(lsr, godKey, godCate, godDictKey)
}

// 根据lsr从神煞数据生成当天对应数据的神煞
export const createLsrGods = (
  lsr: lunisolar.Lunisolar,
  godDictKey: FromGodsType,
  fromYmdh: YMDH | undefined,
  toYmdh: YMDH,
  godCate: YMDH
): God[] => {
  const res: God[] = []
  const godDict = getGodDict(godDictKey)
  if (!godDict) return res
  for (const key in godDict) {
    if (checkGod(lsr, key, godDict, fromYmdh, toYmdh)) {
      const god = createGod(lsr, key, godCate, godDictKey)
      if (god) res.push(god)
    }
  }
  return res
}

export const getGods = function (
  theGods: TheGods,
  ymdh: YmdhSu | YMDH | string,
  cache?: Map<string, any>
): God[] {
  const pYmdh = prettyGetGodsYMDH(ymdh, true)
  const cacheKey = `theGods:godsData:${ymdh}`
  if (cache && cache.has(cacheKey)) {
    return cache.get(cacheKey) as God[]
  }
  let gods: God[] = []
  let setCache = pYmdh !== null
  if (pYmdh === 'y') {
    gods = createLsrGods(theGods.lsr, 'year', 'year', 'day', 'year')
    gods.push(...createLsrGods(theGods.lsr, 'common', 'year', 'day', 'year'))
  } else if (pYmdh === 'm') {
    gods = createLsrGods(theGods.lsr, 'month', 'month', 'day', 'month')
    gods.push(...createLsrGods(theGods.lsr, 'common', 'month', 'day', 'month'))
    gods.push(...createLsrGods(theGods.lsr, 'monthSeason', 'month', 'day', 'month'))
  } else if (pYmdh === 'd') {
    gods = createLsrGods(theGods.lsr, 'day', undefined, 'day', 'day')
    gods.push(theGods.getBy12God('day'))
  } else if (pYmdh === 'h') {
    gods = createLsrGods(theGods.lsr, 'hour', 'day', 'hour', 'hour')
    gods.push(theGods.getBy12God('hour'))
  }
  if (cache && setCache) cache.set(cacheKey, gods)
  return gods
}
