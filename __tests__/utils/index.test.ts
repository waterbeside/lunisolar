import * as U from '../../src/utils'
import { Lunisolar } from '../../src/class/lunisolar'

describe('utils', () => {
  it('test parseJD', () => {
    const date = new Date()
    expect(U.parseJD(date).toDate()).toEqual(date)
    expect(U.parseJD(new Lunisolar(date)).toDate()).toEqual(date)
    expect(Math.floor(U.parseJD(undefined).timestamp / 10000)).toEqual(
      Math.floor(new Date().valueOf() / 10000)
    )
    expect(U.parseJD('2020-01-01').toDate()).toEqual(new Date('2020/01/01 00:00:00'))
    expect(U.parseJD('2020-01-01T12:00:00.000Z').toDate()).toEqual(
      new Date('2020-01-01T12:00:00.000Z')
    )
  })

  it('test parseDate utc', () => {
    const date = U.parseJD('2023-03-14 15:57', true)
    expect(date.local().format('YYYY-M-DD HH:mm')).toEqual('2023-3-14 23:57')
  })

  it('computeSBMonthValueByTerm', () => {
    const date = U.parseJD('2018-12-06')
    const msbValue = U.computeSBMonthValueByTerm(date, 20, U.parseJD('2018-11-06T16:00:00.000Z'))
    expect(msbValue).toBe(59)
  })
})
