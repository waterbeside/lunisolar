import { commonGods } from '../gods/commonGods'
import { yearGods } from '../gods/yearGods'
import { monthGods } from '../gods/monthGods'
import { monthSeasonGods } from '../gods/monthSeasonGods'
import { dayGods } from '../gods/dayGods'
import { hourGods } from '../gods/hourGods'
import { createBy12Gods } from '../gods/by12Gods'
import { God } from './god'

function getGodConfig(lsr: lunisolar.Lunisolar, key: string) {
  const godData = lsr.L(`theGods.${key}`)
  let name = key
  let bad: string[] = []
  let good: string[] = []
  if (typeof godData === 'string') {
    name = godData
  } else if (Array.isArray(godData)) {
    if (godData.length >= 3) [good, bad, name] = godData
    else if (godData.length === 2) [good, bad] = godData
    else good = godData[0]
  }
  return {
    key,
    name,
    bad,
    good
  }
}

function fetchTheGod<T = { [key: string]: GodDictItem }>(
  lsr: lunisolar.Lunisolar,
  godDict: T,
  fromYmdh: YMDH | undefined,
  toYmdh: YMDH
): God[] {
  const res: God[] = []
  for (const key in godDict) {
    const [checkFunc, _] = godDict[key] as GodDictItem
    if (checkFunc(lsr, fromYmdh, toYmdh)) {
      res.push(new God(getGodConfig(lsr, key)))
    }
  }
  return res
}

class TheGods {
  private data: {} = {}
  constructor(lsr: lunisolar.Lunisolar) {
    const yGods = fetchTheGod(lsr, yearGods, 'year', 'day')
    yGods.push(...fetchTheGod(lsr, commonGods, 'year', 'day'))
    const mGods = fetchTheGod(lsr, monthGods, 'month', 'day')
    mGods.push(...fetchTheGod(lsr, commonGods, 'month', 'day'))
    mGods.push(...fetchTheGod(lsr, monthSeasonGods, undefined, 'day'))
    const dGods = fetchTheGod(lsr, dayGods, undefined, 'day')
    const hGods = fetchTheGod(lsr, hourGods, 'day', 'hour')

  }
}

export { TheGods }
