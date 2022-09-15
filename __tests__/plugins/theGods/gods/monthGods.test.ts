import lunisolar from '../../../../src/index'
import { monthGods } from '../../../../src/plugins/theGods/gods/monthGods'

describe('plugins/theGods/gods/不将', () => {
  const bujiangChenkFunc = monthGods.不將[0]
  it('2022-02-05 寅月', () => {
    const lsr = lunisolar('2022-02-05')
    const bujiangList = bujiangChenkFunc<number[]>(lsr)
    const testArr = [2, 3, 12, 13, 15, 23, 25, 26, 27, 35, 36, 37, 47]
    expect(bujiangList.length).toBe(testArr.length)
    testArr.forEach(item => {
      expect(bujiangList.includes(item)).toBe(true)
    })
  })

  it('2022-03-08 卯月', () => {
    const lsr = lunisolar('2022-03-08')
    const bujiangList = bujiangChenkFunc<number[]>(lsr)
    const testArr = [1, 2, 11, 12, 13, 22, 23, 25, 26, 35, 36, 46]
    expect(bujiangList.length).toBe(testArr.length)
    testArr.forEach(item => {
      expect(bujiangList.includes(item)).toBe(true)
    })
  })

  it('2022-05-08 巳月', () => {
    const lsr = lunisolar('2022-05-08')
    const bujiangList = bujiangChenkFunc<number[]>(lsr)
    const testArr = [0, 10, 11, 12, 10, 21, 22, 23, 24, 32, 33, 34, 44]
    expect(bujiangList.length).toBe(testArr.length)
    testArr.forEach(item => {
      expect(bujiangList.includes(item)).toBe(true)
    })
  })

  it('2022-12-08 子月', () => {
    const lsr = lunisolar('2022-12-08')
    const bujiangList = bujiangChenkFunc<number[]>(lsr)
    const testArr = [3, 5, 13, 15, 16, 17, 25, 26, 27, 28, 37, 38, 53]
    expect(bujiangList.length).toBe(testArr.length)
    testArr.forEach(item => {
      expect(bujiangList.includes(item)).toBe(true)
    })
  })
})
