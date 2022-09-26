import { commonGods } from '../gods/commonGods'
import { yearGods } from '../gods/yearGods'
import { monthGods } from '../gods/monthGods'
import { monthSeasonGods } from '../gods/monthSeasonGods'
import { dayGods } from '../gods/dayGods'
import { hourGods } from '../gods/hourGods'
import { createBy12Gods } from '../gods/by12Gods'
import { God } from './god'
import { getDutyGod } from '../gods/duty12Gods'

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

class TheGods {
  _cache: { [key: string]: any } = {}
  private data: TheGodsClassData = {
    gods: {
      y: [],
      m: [],
      d: [],
      h: []
    },
    duty12God: null,
    byGod: {
      d: null,
      h: null
    },
    day: [],
    hour: [],
    goodAct: [],
    badAct: []
  }
  constructor(lsr: lunisolar.Lunisolar) {
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

    const dutyGodData = getDutyGod(lsr)
    this.data.duty12God = new God(
      {
        key: dutyGodData[1],
        good: dutyGodData[2],
        bad: dutyGodData[3]
      },
      godConfig
    )
  }
}

export { TheGods }
