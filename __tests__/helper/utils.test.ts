import * as U from '../../src/helper/utils'
import * as C from '../../src/helper/constants'
import { Lunisolar } from '../../src/lunisolar.class'

describe('utils', () => {
  it('test prettyUnit', () => {
    for (const unit in C.UNITS) {
      expect(U.prettyUnit(unit as any)).toBe((C.UNITS as any)[unit])
    }
    expect(U.prettyUnit('Millisecond' as any)).toBe('millisecond')
  })

  it('test toDate', () => {
    const date = new Date()
    expect(U.toDate(date)).toBe(date)
    expect(U.toDate(new Lunisolar(date))).toBe(date)
    expect(U.toDate(null).toString()).toBe('Invalid Date')
    expect(Math.floor(U.toDate(undefined).valueOf() / 10000)).toEqual(
      Math.floor(new Date().valueOf() / 10000)
    )
    expect(U.toDate('2020-01-01')).toEqual(new Date('2020/01/01 00:00:00'))
    expect(U.toDate('2020-01-01T12:00:00.000Z')).toEqual(new Date('2020-01-01T12:00:00.000Z'))
  })

  it('test dateDiff', () => {
    const date1 = new Date('2020/01/01 00:00:00')
    const date2 = new Date('2020/01/02 00:00:00')
    expect(U.dateDiff(date1, date2)).toBe(86400000)
    expect(U.dateDiff(date1, date2, 'ms')).toBe(86400000)
    expect(U.dateDiff(date1, date2, 's')).toBe(86400)
    expect(U.dateDiff(date1, date2, 'm')).toBe(86400 / 60)
    expect(U.dateDiff(date1, date2, 'h')).toBe(24)

    const m1 = new Lunisolar('2021/01/01 00:00:00')
    const m2 = new Lunisolar('2021/02/02 00:00:00')
    expect(U.dateDiff(m1, m2, 'M')).toBe(1)
  })
})
