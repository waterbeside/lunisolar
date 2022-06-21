import { SB } from './stemBranch'
import { Term } from './term'
import * as U from '../utils'
import { SB0_MONTH, SB0_DATE } from '../constants/calendarData'

export class Char8 {
  private _value: number = -1
  private _list: SB[] = []
  constructor(sbList: [SB, SB, SB, SB]) {
    this._list = sbList
    this._value = this._computeValue(sbList)
  }

  get value() {
    return this._value
  }

  get list() {
    return this._list
  }

  get year() {
    return this._list[0]
  }

  get month() {
    return this._list[1]
  }

  get day() {
    return this._list[2]
  }

  get twoHour() {
    return this._list[3]
  }
  // 日主
  get me() {
    return this._list[2].stem
  }

  private _computeValue(sbList: SB[] = this._list) {
    let res = 0
    for (let i = 0; i < 4; i++) {
      res += sbList[i].valueOf() * Math.pow(10, 2 * (3 - i))
    }
    return res
  }

  static computeSBYear(date: Date | number, changeEgeTrem: number | null = null) {
    let year = typeof date !== 'number' ? date.getFullYear() : date
    if (changeEgeTrem !== null && typeof date !== 'number') {
      changeEgeTrem = changeEgeTrem % 24
      let isPreYear = changeEgeTrem < 0
      changeEgeTrem = changeEgeTrem >= 0 ? changeEgeTrem : 24 + changeEgeTrem
      // 查出当前节气日期
      let yearStart = date.getFullYear()
      if (isPreYear) yearStart--
      const yearEnd = yearStart + 1
      // 该年的岁的范围
      const startTermDate = Term.findDate(yearStart, changeEgeTrem)
      const endTermDate = Term.findDate(yearEnd, changeEgeTrem)
      const startDate = U.toDate(
        `${startTermDate[0]}-${startTermDate[1]}-${startTermDate[2] - 1} 23:00:00`
      )
      const endDate = U.toDate(`${endTermDate[0]}-${endTermDate[1]}-${endTermDate[2] - 1} 23:00:00`)
      // 检查是否在该岁的范围内
      if (date.valueOf() < startDate.valueOf()) year--
      else if (date.valueOf() >= endDate.valueOf()) year++
    }
    const stemValue = (year - 4) % 10
    const branchValue = (year - 4) % 12
    return new SB(stemValue, branchValue)
  }

  static computeSBMonth(date: Date) {
    // 知道该日是哪个节气之后便可知道该日是哪个地支月
    const node = Term.findNode(date, true)
    const monthOffset =
      node[1] > date.getDate() && !(node[1] - 1 === date.getDate() && date.getHours() >= 23)
        ? -1
        : 0
    // 求月天干 （2018年12月大雪乃甲子月）
    let monthDiff =
      ((date.getFullYear() - SB0_MONTH[0]) * 12 + date.getMonth() - SB0_MONTH[1] + 1) % 60
    monthDiff = (monthDiff < 0 ? 60 + monthDiff : monthDiff) + monthOffset
    return new SB(monthDiff)
  }

  toString() {
    return `${this.year}${this.month}${this.day}${this.twoHour}`
  }

  valueOf() {
    return this._value
  }
}
