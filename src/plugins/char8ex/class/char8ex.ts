import { CacheClass } from './../../../class/cacheClass'
import { cache } from '../../../utils/decorators'
import type { Stem } from '../../../class/stemBranch'
import type { Char8 } from '../../../class/char8'
import type { Lunisolar } from '../../../class/lunisolar'
import { SB } from '../../../class/stemBranch'
import { Pillar } from './pillar'
import { computeRatStem } from '../../../utils'
import { trans } from '../utils'
import { SBX } from '../types'
import { C8God } from './c8God'
import { createAllC8Gods } from '../utils/c8Gods'
import { branchValue2month, month2BranchValue } from '../utils'

export class Char8Ex extends CacheClass {
  readonly _lang: string = 'zh'
  readonly me: Stem
  readonly char8: Char8
  readonly lsr: Lunisolar
  readonly sexValue: 0 | 1
  readonly year: Pillar
  readonly month: Pillar
  readonly day: Pillar
  readonly hour: Pillar
  readonly gods: {
    [x in YMDH]: C8God[]
  } = { year: [], month: [], day: [], hour: [] }

  constructor(lsr: Lunisolar, sexValue: 0 | 1) {
    super()
    this.sexValue = sexValue
    this.lsr = lsr
    this.me = lsr.char8.me
    this.char8 = lsr.char8
    this._lang = lsr.getConfig().lang
    const ymdhList = ['year', 'month', 'day', 'hour']
    const createPillar = (ymdh: YMDH) => {
      return new Pillar({
        sb: this.char8[ymdh] as unknown as SBX,
        me: this.me,
        cate: ymdh,
        lang: lsr.char8.getConfig().lang
      })
    }
    this.year = createPillar('year')
    this.month = createPillar('month')
    this.day = createPillar('day')
    this.hour = createPillar('hour')
    this.gods = createAllC8Gods(this)
    for (let i = 0; i < 4; i++) {
      const ymdh: YMDH = ymdhList[i] as YMDH
      this[ymdh]._pushGods(this.gods[ymdh])
    }
  }

  get list(): [Pillar, Pillar, Pillar, Pillar] {
    return [this.year, this.month, this.day, this.hour]
  }

  get sex(): string {
    return trans(`sex.${this.sexValue}`, this._lang)
  }

  get missing() {
    return this.day.missing
  }

  /**
   * 胎元
   * 生月干进一干，
   * 生月支进三支
   */
  @cache('char8ex:embryo')
  embryo(): SB {
    const s = (this.month.stem.value + 1) % 10
    const b = (this.month.branch.value + 3) % 12
    return new SB(s, b, { lang: this.char8.getConfig().lang })
  }

  /**
   * 命宫
   ```
   口诀：
   若问命主何命宫，子起正月逆查行。
   生月支上起生时，顺查至卯知命宫。
   命宫天干如何定，月柱干支相对应，
   年定月诀也可行。
   ```
   * 掌上推命宫法，以排山掌子位为正月，
   * 也就是将正月固定在子位上，逆数亥为二月，戌为三月，酉为四月，申为五月，未为六月，午为七月，已为八月，辰为九月，卯为十月，寅为十一月，丑为十二月，
   * 然后再把出生时间安在这个月支上，顺数至卯，卯就是命宫。
   * 数字计法，寅为1，m = 月+时, m > 14 则26-m, 否则14-m，即为新的月份数，其所在地支为身宫地
   */
  @cache('char8ex:ownSign')
  ownSign(): SB {
    // const month = this.lsr.lunar.month
    const month = branchValue2month(this.month.branch.value)
    const c8hour = branchValue2month(this.hour.branch.value)
    // const monthSign = (13 - month) % 12
    // const b = (12 + 3 - c8hour + monthSign) % 12
    const newMonth = month + c8hour
    const b = month2BranchValue(newMonth > 14 ? 26 - newMonth : 14 - newMonth)
    // 命宫天干按五虎遁（五虎遁和五鼠遁本质是一样的）
    const s = computeRatStem(this.year.stem.value, b) % 10
    return new SB(s, b, { lang: this.char8.getConfig().lang })
  }

  /**
   * 身宫
   ```
   口诀：
   身宫口诀记心中，子起正月顺查行。
   生月支上起生时，逆推至酉知身宫。
   生月天干两头查，顺逆宫支天干停。

   子上起正月，顺推到本命生月，生时落生月，逆推至酉
   ```
   * 数学计算法: m = (月份数 + 时辰序号) % 12
   */
  @cache('char8ex:bodySign')
  bodySign(): SB {
    // const month = this.lsr.lunar.month
    const month = branchValue2month(this.month.branch.value)
    const c8hour = this.hour.branch.value + 1
    const b = month2BranchValue((month + c8hour) % 12)
    // 查身宫天干
    const s = computeRatStem(this.year.stem.value, b) % 10
    return new SB(s, b, { lang: this.char8.getConfig().lang })
  }

  toString() {
    return `${this.sex}: ${this.year} ${this.month} ${this.day} ${this.hour}`
  }
}
