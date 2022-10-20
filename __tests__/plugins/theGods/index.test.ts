import lunisolar from '../../../src/index'
import theGods from '../../../src/plugins/theGods'
import { God } from '../../../src/plugins/theGods/class/god'
import type { TheGods } from '../../../src/plugins/theGods/class/theGods'

lunisolar.extend(theGods)

interface Lunisolar extends ILunisolar {
  // duty12God: God
  theGods: TheGods
}

describe('plugins/theGods duty12God', () => {
  it('2022-08-16', () => {
    const lsr = lunisolar('2022-08-16') as unknown as Lunisolar
    expect(lsr.theGods.getDuty12God().toString()).toBe('執')
  })
  it('2022-08-25', () => {
    const lsr = lunisolar('2022-08-25') as unknown as Lunisolar
    expect(lsr.theGods.getDuty12God().name).toBe('滿')
  })
})

describe('plugins/theGods life12God', () => {
  it('2022-09-28', () => {
    const lsr = lunisolar('2022-09-28') as unknown as Lunisolar
    expect(lsr.theGods.getLife12God('day').name).toBe('絕')
  })
  it('2022-09-29', () => {
    const lsr = lunisolar('2022-09-29') as unknown as Lunisolar
    expect(lsr.theGods.getLife12God('day').name).toBe('絕')
  })
  it('2022-09-30', () => {
    const lsr = lunisolar('2022-09-30') as unknown as Lunisolar
    expect(lsr.theGods.getLife12God('day').name).toBe('墓')
  })
  it('2022-10-01', () => {
    const lsr = lunisolar('2022-10-01') as unknown as Lunisolar
    expect(lsr.theGods.getLife12God('day').name).toBe('胎')
  })
  it('2022-10-2', () => {
    const lsr = lunisolar('2022-10-2') as unknown as Lunisolar
    expect(lsr.theGods.getLife12God('day').name).toBe('胎')
  })
  it('2022-10-3', () => {
    const lsr = lunisolar('2022-10-3') as unknown as Lunisolar
    expect(lsr.theGods.getLife12God('day').name).toBe('墓')
  })
  it('2022-10-4', () => {
    const lsr = lunisolar('2022-10-4') as unknown as Lunisolar
    expect(lsr.theGods.getLife12God('day').name).toBe('絕')
  })

  describe('plugins/theGods 神煞', () => {
    it('2022-10-19', () => {
      // 壬寅年 庚戌月 乙巳日
      const lsr = lunisolar('2022-10-19') as unknown as Lunisolar
      // 年神
      const tobeYearGods = ['陰貴', '太陰', '六害', '歲刑', '天官符']
      expect(lsr.theGods.getGods('Y').map(g => g.key)).toEqual(tobeYearGods)
      // 月神
      const tobeMonthGods = ['遊禍', '陰德', '續世', '血忌']
      expect(lsr.theGods.getGods('M').map(g => g.key)).toEqual(tobeMonthGods)
      // 日神
      const tobeDayGods = ['寶日', '無祿']
      expect(lsr.theGods.getGods('D').map(g => g.key)).toEqual(tobeDayGods)

      const gods = lsr.theGods.getGods('YMD')
      expect(gods.map(g => g.key)).toEqual([...tobeYearGods, ...tobeMonthGods, ...tobeDayGods])

      const acts = lsr.theGods.getActs(0)
      console.log(acts)

      // console.log()
      // const yg = lsr.theGods.yearGods
    })
  })
})
