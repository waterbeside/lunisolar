import { getBy12God } from '../gods/by12Gods'
import { getDuty12God } from '../gods/duty12Gods'
import { God } from './god'
import { cacheAndReturn } from '../../../utils'
import { GOD_QUERY_STRING as GQS } from '../constants'
import { orderActs, getTodayActs } from '../utils/extractGodActs'
import {
  arToString,
  prettyGetGodsYMDH,
  getGods,
  createLife12Gods,
  checkQueryString
} from '../utils'

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
    const god = new God({ key, good, bad, luckLevel, cate: dh }, { locale: this.locale })
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
