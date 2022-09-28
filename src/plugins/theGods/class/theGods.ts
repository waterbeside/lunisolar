import { commonGods } from '../gods/commonGods'
import { yearGods } from '../gods/yearGods'
import { monthGods } from '../gods/monthGods'
import { monthSeasonGods } from '../gods/monthSeasonGods'
import { dayGods } from '../gods/dayGods'
import { hourGods } from '../gods/hourGods'
import { createBy12Gods } from '../gods/by12Gods'
import { getDuty12God } from '../gods/duty12Gods'
import { getLife12God } from '../gods/life12Gods'
import { God } from './god'
import { getTranslation } from '../../../utils'

function fetchTheGod<T = { [key: string]: GodDictItem }>(
  lsr: lunisolar.Lunisolar,
  godDict: T,
  fromYmdh: YMDH | undefined,
  toYmdh: YMDH
): God[] {
  const res: God[] = []
  for (const key in godDict) {
    const [checkFunc, good, bad, _] = godDict[key] as GodDictItem
    if (checkFunc(lsr, fromYmdh, toYmdh)) {
      const godData: GodClassData = {
        key,
        good: good || [],
        bad: bad || []
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

function getActFromGod(gods: God[], whichAct: 0 | 1 = 0, acts = new Set()) {
  // const acts = new Set()
  for (const g of gods) {
    const itemActs = whichAct === 1 ? g.data.bad : g.data.good
    for (const ia of itemActs) {
      acts.add(ia)
    }
  }
  return acts
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

  getDuty12God(): God {
    const cacheKey = `duty12God`
    if (this._cache.hasOwnProperty(cacheKey)) return this._cache[cacheKey]
    const dutyGodData = getDuty12God(this.lsr)
    const god = new God(
      {
        key: dutyGodData[1],
        good: dutyGodData[2],
        bad: dutyGodData[3]
      },
      this.godConfig
    )
    this._cache[cacheKey] = god
    return god
  }

  getLife12God(ymdh: YMDH) {
    const cacheKey = `live12God:${ymdh}`
    if (this._cache.hasOwnProperty(cacheKey)) return this._cache[cacheKey]
    const god = createLife12Gods(this.lsr, ymdh, this.godConfig)
    this._cache[cacheKey] = god
    return god
  }

  getAct(whichAct: 0 | 1 = 0, returnKey: boolean = false): string[] {
    let theActs: string[] = []
    const actTypeString = whichAct === 1 ? 'bad' : 'good'
    if (this.data[actTypeString]) {
      theActs = [...this.data[actTypeString]]
    } else {
      const acts = new Set<string>()
      const gods = [
        ...this.data.gods.y,
        ...this.data.gods.m,
        ...this.data.gods.d,
        this.getDuty12God()
      ]
      getActFromGod(gods, whichAct, acts)
      theActs = Array.from(acts)
      this.data[actTypeString] = theActs
    }
    return returnKey ? theActs : theActs.map(item => getTranslation(this._cache.locale, item))
  }

  getGoodAct(returnKey: boolean = false): string[] {
    return this.getAct(0, returnKey)
  }

  getBadAct(returnKey: boolean = false): string[] {
    return this.getAct(1, returnKey)
  }

  query(queryString: string, returnKey: boolean = false) {
    ;('')
  }
}

export { TheGods }
