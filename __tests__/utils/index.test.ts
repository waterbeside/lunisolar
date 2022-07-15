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
})
