import { C8God } from './../class/c8God'
import { Pillar } from './../class/pillar'
import type { Char8Ex } from '../class/char8ex'
import { godDict, godKeys, godKeysSet } from '../constants/godDict'
import type { GodRuleItem, GodRule } from '../constants/godDict'

type CheckResItem = (YMDH | 'null')[]
type RuleRes = [CheckResItem, CheckResItem, CheckResItem, CheckResItem]
type CheckC8GodReturn = {
  luckLevel: number
  res: RuleRes
  isHasTrue: boolean
}

const ymdhList: YMDH[] = ['year', 'month', 'day', 'hour']

export const checkC8God = (c8ex: Char8Ex, godKey: string): CheckC8GodReturn => {
  if (!godKeysSet.has(godKey)) throw new Error(`Error C8God key: ${godKey}`)
  const { luckLevel, rules } = godDict[godKey]
  const allRes: RuleRes = [[], [], [], []]
  let hasTrue = false
  for (const rule of rules) {
    const { res, isHasTrue } = checkC8RuleItem(c8ex, rule)
    if (rules.length === 1) return { luckLevel, res, isHasTrue }
    for (let i = 0; i < allRes.length; i++) {
      allRes[i].push(...res[i])
    }
    hasTrue = hasTrue || isHasTrue
  }
  return { luckLevel, res: allRes, isHasTrue: hasTrue }
}

export const checkC8RuleItem = (c8ex: Char8Ex, ruleItem: GodRuleItem) => {
  const { startPillar, startAO } = ruleItem
  const isAnd = startAO === 'and'
  const res: RuleRes = [[], [], [], []]
  const resTemp: [{ [key in YMDH[number]]: boolean }, boolean][] = []
  let isAllTrue = true
  let isHasTrue = false
  for (const sp of startPillar) {
    const [spRes, isSpAllTrue, isSpHasTrue] = checkPerStartPillar(c8ex, ruleItem, sp)
    resTemp.push([spRes, isSpAllTrue])
    isAllTrue = isAllTrue && isSpAllTrue
    isHasTrue = isHasTrue || isSpHasTrue
  }
  for (let i = 0; i < resTemp.length; i++) {
    const [spRes] = resTemp[i]
    const sp = startPillar[i]
    const spSplit = sp.split(':')
    const startP = spSplit[0] as YMDH | 'null'
    if (isAnd && !isAllTrue) break
    for (let j = 0; j < 4; j++) {
      const ymdh = ymdhList[j]
      if (spRes[ymdh]) {
        res[j].push(startP)
      }
    }
  }
  return {
    res,
    isAllTrue,
    isHasTrue
  }
}

export const checkPerStartPillar = (
  c8ex: Char8Ex,
  ruleItem: GodRuleItem,
  sp: string
): [{ [key in YMDH[number]]: boolean }, boolean, boolean] => {
  const { startBy, startMapping, findBy, sbFormatter, ruleParams, rule } = ruleItem
  const spSplit = sp.split(':')
  const startP = spSplit[0] as YMDH | 'null'
  const endPs = (spSplit[1] ? [spSplit[1]] : ymdhList) as YMDH[]
  let resDict: { [key in YMDH[number]]: boolean } = {
    year: false,
    month: false,
    day: false,
    hour: false
  }
  let isAllTrue = false
  let isHasTrue = false
  let ruleRes: GodRule
  if (typeof rule === 'function') {
    const params = getRuleParams(c8ex, ruleParams)
    ruleRes = rule(...params)
  } else {
    ruleRes = rule
  }

  if (startP === 'null') {
    // 当startP为null时，只要endP合rull即可
    const ruleSet = new Set(ruleRes)
    return getPillarCheckRes(c8ex, endPs, findBy, ruleSet)
  } else {
    const startPO = c8ex[startP]
    let startValue: number
    if (startBy === 'season') startValue = c8ex.lsr.getSeasonIndex()
    else if (startBy === 'takeSoundE5') startValue = startPO.takeSoundE5.valueOf()
    else if (startBy === 'sb') startValue = startPO.value
    else if (startBy === 'stem' || startBy === 'branch') {
      let [sv, bv] = [startPO.stem.value, startPO.branch.value]
      if (typeof sbFormatter === 'function') [sv, bv] = sbFormatter(sv, bv)
      startValue = startBy === 'stem' ? sv : bv
    } else {
      throw new Error(`Error value RuleItem.startBy: ${startBy}`)
    }
    // 如果存在startMapping则跟据startMapping取值
    if (startMapping) startValue = useStartMappingValue(startValue, startMapping)

    const ruleHit = ruleRes[startValue]
    if (ruleHit === null) return [resDict, isAllTrue, isHasTrue]
    const ruleSet = Array.isArray(ruleHit) ? new Set(ruleHit) : new Set([ruleHit])

    return getPillarCheckRes(c8ex, endPs, findBy, ruleSet)
  }
}

export const useStartMappingValue = (
  startValue: number,
  startMapping: number[] | number[][]
): number => {
  for (let i = 0; i < startMapping.length; i++) {
    const mapItem = startMapping[i]
    if (typeof mapItem === 'number') {
      if (startValue === mapItem) return i
    } else if (Array.isArray(mapItem)) {
      if ((mapItem as number[]).includes(startValue)) return i
    }
  }
  return startValue
}

export const getRuleParams = (c8ex: Char8Ex, ruleParams?: string[] | null) => {
  if (ruleParams === null || ruleParams === void 0) return []
  return ruleParams.map(item => getObjectProperties(c8ex, item))
}

export const getObjectProperties = (obj: Object, propsString: string): unknown => {
  const props = propsString.split('.')
  let res: any = obj
  while (props.length > 0) {
    const curr = props.shift()
    if (curr === void 0 || res[curr] === void 0) return undefined
    res = res[curr]
  }
  return res
}

export const getEndTarget = (
  endPO: Pillar,
  findBy: 'branch' | 'stem' | 's,b' | 'sb'
): number | [string, string] => {
  let target: number | [string, string]
  if (findBy === 's,b') target = [`s${endPO.stem.value}`, `b${endPO.branch.value}`]
  else if (findBy === 'sb') target = endPO.value
  else if (findBy === 'stem') target = endPO.stem.value
  else if (findBy === 'branch') target = endPO.branch.value
  else throw new Error(`Error godDict prop: findBy ${findBy}`)
  return target
}

export const getPillarCheckRes = (
  c8ex: Char8Ex,
  endPs: YMDH[],
  findBy: 'branch' | 'stem' | 's,b' | 'sb',
  ruleSet: Set<number | number[] | null | string>
): [{ [key in YMDH[number]]: boolean }, boolean, boolean] => {
  const resDict = {
    year: false,
    month: false,
    day: false,
    hour: false
  }
  let allTrue = true
  let hasTrue = false
  for (const endP of endPs) {
    const endPO = c8ex[endP]
    const target = getEndTarget(endPO, findBy)
    let isHit = false
    if (Array.isArray(target)) {
      for (const t of target) {
        if (ruleSet.has(t)) {
          resDict[endP] = true
          isHit = true
          break
        }
      }
    } else if (ruleSet.has(target)) {
      isHit = true
      resDict[endP] = true
    }
    if (!isHit) allTrue = false
    else hasTrue = true
  }
  return [resDict, allTrue, hasTrue]
}

export const getGodLuckLevel = (godKey: string) => {
  if (!godKeysSet.has(godKey)) throw new Error(`Error C8God key: ${godKey}`)
  const { luckLevel } = godDict[godKey]
  return luckLevel
}

export const createAllC8Gods = (c8ex: Char8Ex) => {
  const allGodsRes: { [x in YMDH]: C8God[] } = {
    year: [],
    month: [],
    day: [],
    hour: []
  }
  const godSet: { [x in YMDH]: Set<string> } = {
    year: new Set<string>(),
    month: new Set<string>(),
    day: new Set<string>(),
    hour: new Set<string>()
  }
  for (const key of godKeys) {
    const { res } = checkC8God(c8ex, key)
    for (let i = 0; i < 4; i++) {
      const ymdh = ymdhList[i]
      if (res[i].length > 0 && !godSet[ymdh].has(key)) {
        const god = new C8God(key, { lang: c8ex.lsr.getConfig().lang })
        godSet[ymdh].add(key)
        allGodsRes[ymdh].push(god)
      }
    }
  }
  return allGodsRes
}
