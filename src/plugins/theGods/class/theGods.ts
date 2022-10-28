import { getBy12God, getBy12GodDataByKey } from '../gods/by12Gods'
import { getDuty12God } from '../gods/duty12Gods'
import { hourGods } from '../gods/hourGods'
import { God } from './god'
import { cacheAndReturn } from '../../../utils'
import { GOD_QUERY_STRING as GQS } from '../constants'
import { orderActs, getTodayActs } from '../utils/extractGodActs'
import {
  arToString,
  prettyGetGodsYMDH,
  getGods,
  createLife12Gods,
  checkQueryString,
  creatOneGod
} from '../utils'
import { getAllDayHourGods, getAllDayHourLucks } from '../utils/allDayHourGods'

class TheGods {
  private _cache = new Map<string, any>()
  lsr: lunisolar.Lunisolar
  constructor(lsr: lunisolar.Lunisolar) {
    this.lsr = lsr
  }

  get locale() {
    return this.lsr.getLocale()
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

  getDuty12God(): God {
    const cacheKey = `theGods:duty12God`
    if (this._cache.has(cacheKey)) return this._cache.get(cacheKey)
    const [_, key, good, bad, extra, luckLevel] = getDuty12God(this.lsr)
    const god = new God({ key, good, bad, luckLevel, extra }, { locale: this.locale })
    this._cache.set(cacheKey, god)
    return god
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
            const [good, bad, luckLevel] = godData
            gods.push(new God({ key, good, bad, luckLevel, cate }, { locale: this.locale }))
            continue
          }
        }
        const god = creatOneGod(this.lsr, hourGods, key, 'hour')
        if (god) {
          gods.push(god)
          // 如何有天乙贵人，检查是否贵登天门时
          if (key === '天乙貴人') {
            if (gdtmCdt.includes(i)) {
              god.data.alias.push('貴登天門')
            }
          }
        }
        // 檢查是否九醜
        if (uglily9Cdt !== null && uglily9Cdt === i) {
          gods.push(
            new God(
              {
                key: '九醜',
                good: hourGods.九醜[1],
                bad: hourGods.九醜[2],
                luckLevel: hourGods.九醜[3],
                cate
              },
              { locale: this.locale }
            )
          )
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

  getLife12God(ymdh: YMDH): God {
    const cacheKey = `theGods:live12God:${ymdh}`
    if (this._cache.has(cacheKey)) return this._cache.get(cacheKey)
    const god = createLife12Gods(this.lsr, ymdh, { locale: this.locale })
    this._cache.set(cacheKey, god)
    return god
  }

  getBy12God(dh: 'day' | 'hour'): God {
    const fromYmdh = dh === 'day' ? 'month' : 'day'
    const cacheKey = `theGods:by12God:${dh}`
    if (this._cache.has(cacheKey)) return this._cache.get(cacheKey)
    const [_, key, good, bad, luckLevel] = getBy12God(this.lsr, fromYmdh, dh)
    const god = new God(
      { key, good, bad, luckLevel, cate: dh, extra: { showGB: true } },
      { locale: this.locale }
    )
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
          returnKey ? (this.locale as LocaleData) : false,
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
    const locale = this.locale
    const ck = (qs: string) => checkQueryString(queryString, qs, locale)
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

export { TheGods }
