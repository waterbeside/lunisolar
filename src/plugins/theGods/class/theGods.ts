import { commonGods } from '../gods/commonGods'
import { yearGods } from '../gods/yearGods'
import { monthGods } from '../gods/monthGods'
import { monthSeasonGods } from '../gods/monthSeasonGods'
import { dayGods } from '../gods/dayGods'
import { hourGods } from '../gods/hourGods'
import { getBy12God } from '../gods/by12Gods'
import { getDuty12God } from '../gods/duty12Gods'
import { getLife12God } from '../gods/life12Gods'
import { God } from './god'
import { getTranslation, cacheAndReturn } from '../../../utils'
import { GOD_QUERY_STRING as GQS } from '../constants'
import { orderActs, getTodayActs } from '../utils/extractGodActs'
import { arToString } from '../utils'

function fetchTheGod<T = { [key: string]: GodDictItem }>(
  lsr: lunisolar.Lunisolar,
  godDict: T,
  fromYmdh: YMDH | undefined,
  toYmdh: YMDH
): God[] {
  const res: God[] = []
  for (const key in godDict) {
    const [checkFunc, good, bad, _, extra] = godDict[key] as GodDictItem
    if (checkFunc(lsr, fromYmdh, toYmdh)) {
      const godData: GodClassData = {
        key,
        good: good || [],
        bad: bad || [],
        extra: extra || null
      }
      const godConfig: GodClassConfig = {
        lang: lsr.getConfig('lang') as string,
        locale: lsr.getLocale()
      }
      res.push(new God(godData, godConfig))
    }
  }
  return res
}

function createLife12Gods(lsr: lunisolar.Lunisolar, ymdh: YMDH, godConfig: GodClassConfig) {
  const [_, key] = getLife12God(lsr, ymdh)
  return new God(
    {
      key,
      good: null,
      bad: null
    },
    godConfig
  )
}

function checkQueryString(
  queryString: string,
  checkString: string,
  locale: { [key: string]: any }
): boolean {
  return queryString === checkString || queryString === getTranslation(locale, checkString)
}

class TheGods {
  private _cache: { [key: string]: any } = {}
  data: TheGodsClassData = {
    gods: {
      y: [],
      m: [],
      d: [],
      h: []
    },
    byGod: {
      d: null,
      h: null
    },
    day: [],
    hour: [],
    goodAct: [],
    badAct: []
  }
  lsr: lunisolar.Lunisolar
  constructor(lsr: lunisolar.Lunisolar) {
    this.lsr = lsr
    const yGods = fetchTheGod(lsr, yearGods, 'year', 'day')
    yGods.push(...fetchTheGod(lsr, commonGods, 'year', 'day'))
    const mGods = fetchTheGod(lsr, monthGods, 'month', 'day')
    mGods.push(...fetchTheGod(lsr, commonGods, 'month', 'day'))
    mGods.push(...fetchTheGod(lsr, monthSeasonGods, undefined, 'day'))
    const dGods = fetchTheGod(lsr, dayGods, undefined, 'day')
    const hGods = fetchTheGod(lsr, hourGods, 'day', 'hour')
    this.data.gods.y = yGods
    this.data.gods.m = mGods
    this.data.gods.d = dGods
    this.data.gods.h = hGods

    const godConfig: GodClassConfig = {
      lang: lsr.getConfig('lang') as string,
      locale: lsr.getLocale()
    }
    this._cache.lang = godConfig.lang
    this._cache.locale = godConfig.locale
  }

  get locale() {
    return this._cache.locale
  }

  get godConfig() {
    return {
      lang: this._cache.lang,
      locale: this._cache.locale
    }
  }

  getGods(ymdh: 'Y' | 'M' | 'D' | 'H' | string): God[] {
    ymdh = ymdh.toLowerCase()
    const u: { [key: string]: 'y' | 'm' | 'd' | 'h' } = {
      year: 'y',
      month: 'm',
      d: 'd',
      h: 'h'
    }
    if (u.hasOwnProperty(ymdh)) {
      return this.data.gods[u[ymdh]]
    }
    const res: God[] = []
    for (let i = 0; i < ymdh.length; i++) {
      const c = ymdh[i]
      if (!this.data.gods.hasOwnProperty(c)) continue
      const gods = this.data.gods[c as 'y' | 'm' | 'd' | 'h']
      res.push(...gods)
    }
    return res
  }

  getDuty12God(): God {
    const cacheKey = `duty12God`
    if (this._cache.hasOwnProperty(cacheKey)) return this._cache[cacheKey]
    const [_, key, good, bad, extra] = getDuty12God(this.lsr)
    const god = new God({ key, good, bad, extra }, this.godConfig)
    this._cache[cacheKey] = god
    return god
  }

  getLife12God(ymdh: YMDH): God {
    const cacheKey = `live12God:${ymdh}`
    if (this._cache.hasOwnProperty(cacheKey)) return this._cache[cacheKey]
    const god = createLife12Gods(this.lsr, ymdh, this.godConfig)
    this._cache[cacheKey] = god
    return god
  }

  getBy12God(ymdh: 'day' | 'hour'): God {
    const fromYmdh = ymdh === 'day' ? 'month' : 'day'
    const cacheKey = `by12God:${ymdh}`
    if (this._cache.hasOwnProperty(cacheKey)) return this._cache[cacheKey]
    const [_, key, good, bad] = getBy12God(this.lsr, fromYmdh, ymdh)
    const god = new God({ key, good, bad }, this.godConfig)
    this._cache[cacheKey] = god
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
    if (this._cache[cacheKey]) return this._cache[cacheKey]
    const acts = getTodayActs(this)
    const res = orderActs(acts, actType, returnKey ? this.locale : false, replacer)
    this._cache[cacheKey] = res

    return res
  }

  getGoodAct(
    actType: 0 | 1 | 2 | 3 = 0,
    returnKey: boolean = false,
    replacer?: { [key: string]: string }
  ): string[] {
    return this.getActs(actType, returnKey, replacer).good
  }

  getBadAct(
    actType: 0 | 1 | 2 | 3 = 0,
    returnKey: boolean = false,
    replacer?: { [key: string]: string }
  ): string[] {
    return this.getActs(actType, returnKey, replacer).bad
  }

  query(queryString: string): God | God[] | string[] | null {
    const locale = this.locale
    if (checkQueryString(queryString, GQS.YG, locale)) return this.getGods('Y')
    if (checkQueryString(queryString, GQS.MG, locale)) return this.getGods('M')
    if (checkQueryString(queryString, GQS.DG, locale)) return this.getGods('D')
    if (checkQueryString(queryString, GQS.HG, locale)) return this.getGods('H')
    if (checkQueryString(queryString, GQS.TDG, locale)) {
      return cacheAndReturn(
        `query:${GQS.TDG}`,
        this.getGods('YMD'),
        // [...this.data.gods.y, ...this.data.gods.m, ...this.data.gods.d],
        this._cache
      ) as God[]
    }
    if (checkQueryString(queryString, GQS.DBYG, locale)) return this.getBy12God('day')
    if (checkQueryString(queryString, GQS.HBYG, locale)) return this.getBy12God('hour')
    if (checkQueryString(queryString, GQS.DTG, locale)) return this.getDuty12God()
    if (checkQueryString(queryString, GQS.YLLG, locale)) return this.getLife12God('year')
    if (checkQueryString(queryString, GQS.MLLG, locale)) return this.getLife12God('month')
    if (checkQueryString(queryString, GQS.DLLG, locale)) return this.getLife12God('day')
    if (checkQueryString(queryString, GQS.HLLG, locale)) return this.getLife12God('hour')
    if (checkQueryString(queryString, GQS.GA, locale)) return this.getGoodAct(0)
    if (checkQueryString(queryString, GQS.GA1, locale)) return this.getGoodAct(1)
    if (checkQueryString(queryString, GQS.GA2, locale)) return this.getGoodAct(2)
    if (checkQueryString(queryString, GQS.GA3, locale)) return this.getGoodAct(3)
    if (checkQueryString(queryString, GQS.BA, locale)) return this.getBadAct(0)
    if (checkQueryString(queryString, GQS.BA1, locale)) return this.getBadAct(1)
    if (checkQueryString(queryString, GQS.BA2, locale)) return this.getBadAct(2)
    if (checkQueryString(queryString, GQS.BA3, locale)) return this.getBadAct(3)
    return null
  }
}

export { TheGods }
