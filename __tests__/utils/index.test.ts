import * as U from '../../src/utils'
import * as C from '../../src/constants'
import { Lunisolar } from '../../src/class/lunisolar'

describe('utils', () => {
  it('test prettyUnit', () => {
    for (const unit in C.UNITS) {
      expect(U.prettyUnit(unit as any)).toBe((C.UNITS as any)[unit])
    }
    expect(U.prettyUnit('Millisecond' as any)).toBe('millisecond')
  })

  it('test parseDate', () => {
    const date = new Date()
    expect(U.parseDate(date)).toEqual(date)
    expect(U.parseDate(new Lunisolar(date))).toEqual(date)
    expect(U.parseDate(null).toString()).toBe('Invalid Date')
    expect(Math.floor(U.parseDate(undefined).valueOf() / 10000)).toEqual(
      Math.floor(new Date().valueOf() / 10000)
    )
    expect(U.parseDate('2020-01-01')).toEqual(new Date('2020/01/01 00:00:00'))
    expect(U.parseDate('2020-01-01T12:00:00.000Z')).toEqual(new Date('2020-01-01T12:00:00.000Z'))
  })

  it('computeSBMonthValueByTerm', () => {
    const date = U.parseDate('2018-12-06')
    const msbValue = U.computeSBMonthValueByTerm(date, 20, U.parseDate('2018-11-06T16:00:00.000Z'))
    expect(msbValue).toBe(59)
  })
})
