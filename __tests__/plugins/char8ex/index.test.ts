import lunisolar from '../../../src/index'
import char8ex from '../../../src/plugins/char8ex'
import type { Char8Ex } from '../../../src/plugins/char8ex/class/char8ex'
import type { Lunisolar } from '../../../src/class/lunisolar'

lunisolar.extend(char8ex)
lunisolar.config({ lang: 'zh' })

interface LunisolarEx extends Lunisolar {
  char8ex: (sex: 0 | 1) => Char8Ex
}

describe('plugins/char8ex', () => {
  it('2023-01-15 12:26', () => {
    const lsr = lunisolar('2023-01-15 12:26') as unknown as LunisolarEx
    const c8ex = lsr.char8ex(1)
    expect(c8ex.gods.year.map(item => item.name)).toEqual(
      expect.arrayContaining(['文昌貴人', '金輿', '天廚貴人', '劫煞'])
    )
    expect(c8ex.gods.day.map(item => item.key)).toEqual(
      expect.arrayContaining(['元辰', '將星', '金神'])
    )
    expect(c8ex.hour.gods.map(item => item.key)).toEqual(
      expect.arrayContaining(['將星', '桃花', '帝座'])
    )
  })

  it('2023-01-11 14:19', () => {
    const lsr = lunisolar('2023-01-11 14:19') as unknown as LunisolarEx
    const c8ex = lsr.char8ex(1)
    expect(c8ex.gods.year.map(item => item.key)).toEqual(
      expect.arrayContaining(['文昌貴人', '國印貴人', '天廚貴人', '劫煞'])
    )
    expect(c8ex.gods.month.map(item => item.key)).toEqual(expect.arrayContaining(['寡宿', '華蓋']))
  })

  it('2023-01-22 15:19', () => {
    const lsr = lunisolar('2023-01-22 15:19') as unknown as LunisolarEx
    const c8ex = lsr.char8ex(1)
    expect(c8ex.gods.day.map(item => item.key)).toEqual(
      expect.arrayContaining(['魁罡貴人', '華蓋', '天德', '日德'])
    )
  })

  it('2023-01-15 12:26', () => {
    const lsr = lunisolar('2023-01-15 12:26') as unknown as LunisolarEx
    const c8ex = lsr.char8ex(1)
    expect(c8ex.embryo().name).toBe('甲辰')
    expect(c8ex.ownSign().name).toBe('庚戌')
    expect(c8ex.bodySign().name).toBe('戊申')

    expect(c8ex.year.stemTenGod.name).toBe('劫財')
    expect(c8ex.month.stemTenGod.name).toBe('比肩')
    expect(c8ex.day.stemTenGod.name).toBe('日主')
    expect(c8ex.hour.stemTenGod.name).toBe('正官')

    expect(c8ex.year.branchTenGod.map(i => i.name)).toEqual(['傷官', '正財', '正官'])
    expect(c8ex.month.branchTenGod.map(i => i.name)).toEqual(['七殺', '比肩', '梟神'])
    expect(c8ex.day.branchTenGod.map(i => i.name)).toEqual(['梟神'])
    expect(c8ex.hour.branchTenGod.map(i => i.name)).toEqual(['偏財', '七殺'])
  })
})
