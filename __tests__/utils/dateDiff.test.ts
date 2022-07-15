import { dateDiff } from '../../src/utils/dateDiff'
import { Lunisolar } from '../../src/class/lunisolar'

describe('test dateDiff', () => {
  it('test dateDiff', () => {
    const date1 = new Date('2020/01/01 00:00:00')
    const date2 = new Date('2020/01/02 00:00:00')
    expect(dateDiff(date1, date2)).toBe(86400000)
    expect(dateDiff(date1, date2, 'ms')).toBe(86400000)
    expect(dateDiff(date1, date2, 's')).toBe(86400)
    expect(dateDiff(date1, date2, 'm')).toBe(86400 / 60)
    expect(dateDiff(date1, date2, 'h')).toBe(24)

    const m1 = new Lunisolar('2021/01/01 00:00:00')
    const m2 = new Lunisolar('2021/02/02 00:00:00')
    expect(dateDiff(m1, m2, 'M')).toBe(1)
  })
})
