import { getBy12God, getBy12GodDataByKey } from '../gods/by12Gods'
import { getDuty12God } from '../gods/duty12Gods'
import { getLife12God } from '../gods/life12Gods'
import { hourGods } from '../gods/hourGods'
import { God } from './god'
import { cacheAndReturn } from '../../../utils'
import { GOD_QUERY_STRING as GQS } from '../constants'
import { orderActs, getTodayActs } from '../utils/extractGodActs'
import { arToString, prettyGetGodsYMDH, checkQueryString } from '../utils'
import { getAllDayHourGods, getAllDayHourLucks } from '../utils/allDayHourGods'
import { getGods, createGod } from '../gods/index'
import {
  dayGoodGodNames,
  dayGoodGods,
  createGod as createDayGoodGod
} from '../directionGods/dayGoodGods'
import { trans } from '../utils'
import { commonActs, emperorActs, civilActs, defaultActs } from '../actData'

export class TheGods {
  // 取得所有宜忌词条
  static getAllActs(actType: 0 | 1 | 2 | 3 = 0, lang = 'zh'): string[] {
    const t = (key: string) => (lang ? trans(key, lang, 'acts') : key)
    if (actType === 1) {
      // 通书六十事
      return commonActs.map(i => t(i))
    } else if (actType === 2) {
      // 御用六十七事
      return emperorActs.map(i => t(i))
    } else if (actType === 3) {
      // 民用三十七事
      return civilActs.map(i => t(i))
    }
    return defaultActs.map(i => t(i))
  }
  private _cache = new Map<string, any>()
  lsr: lunisolar.Lunisolar
  constructor(lsr: lunisolar.Lunisolar) {
    this.lsr = lsr
  }

  get lang() {
    return this.lsr.getConfig('lang') as string
  }

  getGods(ymdh: YmdhSu | string = 'MD'): God[] {
    ymdh = prettyGetGodsYMDH(ymdh, false)
    const ymdhSet = new Set(['y', 'm', 'd', 'h'])
    if (ymdhSet.has(ymdh)) return getGods(this, ymdh, this._cache)
    const cacheKey = `theGods:getGods:${ymdh}`
    const fn = () => {
      const res: God[] = []
      const used = new Set<string>()
      for (let i = 0; i < ymdh.length; i++) {
        const c = ymdh[i]
        if (used.has(c) || !ymdhSet.has(c)) continue
        const gods = getGods(this, c, this._cache)
        used.add(c)
        res.push(...gods)
      }
      return res
    }
    return cacheAndReturn(cacheKey, fn, this._cache)
  }

  getGoodGods(ymdh: YmdhSu | string = 'MD') {
    return this.getGods(ymdh).filter(g => {
      const data = g.data
      const isShow = data?.extra?.showGB || false
      return data.luckLevel > 0 && isShow
    })
  }

  getBadGods(ymdh: YmdhSu | string = 'MD') {
    return this.getGods(ymdh).filter(g => {
      const data = g.data
      const isShow = data?.extra?.showGB || false
      return data.luckLevel < 0 && isShow
    })
  }

  getAllDayHourGods(): God[][] {
    const cacheKey = `theGods:allDayHourGods`
    if (this._cache.has(cacheKey)) return this._cache.get(cacheKey) as God[][]
    const dayHours = getAllDayHourGods(this.lsr)
    const res: God[][] = new Array(12)
    const cate = 'hour'
    // 貴登天門
    const gdtmCheckFunc = hourGods.貴登天門[0] // 用于檢查是否貴登天門時
    const gdtmCdt = gdtmCheckFunc<number[]>(this.lsr, 'day')
    // 九醜
    const uglily9CheckFunc = hourGods.九醜[0]
    const uglily9Cdt = uglily9CheckFunc(this.lsr, 'day')

    // 遍歷十二時辰
    for (let i = 0; i < 12; i++) {
      const godKeys = dayHours[i] || []
      const gods: God[] = []
      for (let idx = 0; idx < godKeys.length; idx++) {
        const key = godKeys[idx]
        if (!key) continue
        if (idx === 0) {
          // idx为串宫12神
          const godData = getBy12GodDataByKey(key)
          if (godData) {
            gods.push(createGod(this.lsr, key, cate, 'blackYellow'))
            continue
          }
        }
        // 处理其它时神
        const god = createGod(this.lsr, key, 'hour', 'hour')
        if (god) {
          gods.push(god)
          // 如何有天乙贵人，检查是否贵登天门时
          if (key === '天乙貴人') {
            if (gdtmCdt.includes(i)) {
              god.supple.set('貴登天門', true)
            }
          }
        }
        // 檢查是否九醜
        if (uglily9Cdt !== null && uglily9Cdt === i) {
          gods.push(createGod(this.lsr, '九醜', 'hour', 'hour'))
        }
      }
      res[i] = gods
    }
    this._cache.set(cacheKey, res)
    return res
  }

  getLuckHours(luckType: 0 | 1 = 0): number[] {
    return getAllDayHourLucks(this.lsr, luckType)
  }

  getAllLuckDirection(): DayLuckDirectionGodRes[] {
    const cacheKey = 'theGods:allLuckDirection'
    if (this._cache.has(cacheKey)) return this._cache.get(cacheKey)
    const res: DayLuckDirectionGodRes[] = dayGoodGodNames.map(item => {
      return this.getLuckDirection(item)
    })
    this._cache.set(cacheKey, res)
    return res
  }

  getLuckDirection(godKeyOrName: DayLuckDirectionGodNames): DayLuckDirectionGodRes
  getLuckDirection(godKeyOrName: string): DayLuckDirectionGodRes | null {
    // trans
    let godKey = dayGoodGodNames.find(item => {
      if (item === godKeyOrName) return true
      const tString = trans(item, this.lang, 'gods')
      if (tString === godKeyOrName) return true
      return false
    })
    if (!godKey) return null
    const itemCacheKey = `theGods:luckDirection:${godKey}`
    if (this._cache.has(itemCacheKey)) return this._cache.get(itemCacheKey)
    const stemValue = this.lsr.char8.day.stem.value
    const godData = dayGoodGods[godKey]
    const ruleLen = godData.rule.length
    const d24Value = godData.rule[stemValue % ruleLen]
    const itemRes: DayLuckDirectionGodRes = [
      this.lsr.lunisolar.Direction24.create(d24Value, { lang: this.lang }),
      createDayGoodGod(godKey, this.lang)
    ]
    this._cache.set(itemCacheKey, itemRes)
    return itemRes
  }

  getDuty12God(): God {
    const cacheKey = `theGods:duty12God`
    if (this._cache.has(cacheKey)) return this._cache.get(cacheKey)
    const [_, key] = getDuty12God(this.lsr)
    const god = createGod(this.lsr, key, 'day', 'duty')
    this._cache.set(cacheKey, god)
    return god
  }

  getLife12God(ymdh: YMDH): God {
    const cacheKey = `theGods:live12God:${ymdh}`
    if (this._cache.has(cacheKey)) return this._cache.get(cacheKey)
    const [_, key] = getLife12God(this.lsr, ymdh)
    const god = createGod(this.lsr, key, ymdh, 'life')
    this._cache.set(cacheKey, god)
    return god
  }

  getBy12God(dh: 'day' | 'hour'): God {
    const fromYmdh = dh === 'day' ? 'month' : 'day'
    const cacheKey = `theGods:by12God:${dh}`
    if (this._cache.has(cacheKey)) return this._cache.get(cacheKey)
    const [_, key] = getBy12God(this.lsr, fromYmdh, dh)
    const god = createGod(this.lsr, key, dh, 'blackYellow')
    this._cache.set(cacheKey, god)
    return god
  }

  getActs(
    actType: 0 | 1 | 2 | 3 = 0,
    returnKey: boolean = false,
    replacer?: { [key: string]: string }
  ): ActsDictList {
    const cacheKey = `theGods:getActs:${actType}:${returnKey ? 1 : 0}: ${
      replacer ? arToString(replacer) : 'null'
    }`
    return cacheAndReturn(
      cacheKey,
      () => {
        const acts = getTodayActs(this)
        const res = orderActs(
          acts,
          actType,
          returnKey ? false : this.lsr.getConfig().lang,
          replacer
        )
        return res
      },
      this._cache
    )
  }

  getGoodActs(
    actType: 0 | 1 | 2 | 3 = 0,
    returnKey: boolean = false,
    replacer?: { [key: string]: string }
  ): string[] {
    return this.getActs(actType, returnKey, replacer).good
  }

  getBadActs(
    actType: 0 | 1 | 2 | 3 = 0,
    returnKey: boolean = false,
    replacer?: { [key: string]: string }
  ): string[] {
    return this.getActs(actType, returnKey, replacer).bad
  }

  query(queryString: string): God | God[] | string[] | null {
    const ck = (qs: string) => checkQueryString(queryString, qs, this.lang)
    if (ck(GQS.YG)) return this.getGods('Y')
    if (ck(GQS.MG)) return this.getGods('M')
    if (ck(GQS.DG)) return this.getGods('D')
    if (ck(GQS.HG)) return this.getGods('H')
    if (ck(GQS.TDG)) return this.getGods('MD')
    if (ck(GQS.DBYG)) return this.getBy12God('day')
    if (ck(GQS.HBYG)) return this.getBy12God('hour')
    if (ck(GQS.DTG)) return this.getDuty12God()
    if (ck(GQS.YLLG)) return this.getLife12God('year')
    if (ck(GQS.MLLG)) return this.getLife12God('month')
    if (ck(GQS.DLLG)) return this.getLife12God('day')
    if (ck(GQS.HLLG)) return this.getLife12God('hour')
    if (ck(GQS.GA)) return this.getGoodActs(0)
    if (ck(GQS.GA1)) return this.getGoodActs(1)
    if (ck(GQS.GA2)) return this.getGoodActs(2)
    if (ck(GQS.GA3)) return this.getGoodActs(3)
    if (ck(GQS.BA)) return this.getBadActs(0)
    if (ck(GQS.BA1)) return this.getBadActs(1)
    if (ck(GQS.BA2)) return this.getBadActs(2)
    if (ck(GQS.BA3)) return this.getBadActs(3)
    return null
  }
}
