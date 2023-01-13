import lunisolar from '../../../src/index'
import type { Lunisolar } from '../../../src/class/lunisolar'
import type { Char8 } from '../../../src/class/char8'
import type { Element5 } from '../../../src/class/element5'
import type { SB } from '../../../src/class/stemBranch'
import advanced from '../../../src/plugins/advanced'

lunisolar.extend(advanced)

interface SBX extends SB {
  _takeSoundValue: string
  takeSound: string
  takeSoundE5: Element5
}

interface Char8X extends Char8 {
  year: SBX
  month: SBX
  day: SBX
  hour: SBX
}

interface LunisolarEx extends Lunisolar {
  fetalGod: string
  fetalGodData: FetalGodData
  takeSound: string
  char8: Char8X
}

describe('plugins/advanced fetalGod', () => {
  it('2022-07-08', () => {
    const lsr = lunisolar('2022-07-08') as unknown as LunisolarEx
    expect(lsr.fetalGod).toBe('倉庫棲外東南')
    expect(lsr.fetalGodData.stemPlace).toBe('倉庫')
    expect(lsr.fetalGodData.branchPlace).toBe('雞棲')
    expect(lsr.fetalGodData.description).toBe('倉庫棲外東南')
    expect(lsr.fetalGodData.direction).toBe('外東南')
  })
})

describe('plugins/advanced takeSound', () => {
  it('2022-07-08', () => {
    const lsr = lunisolar('2022-07-08') as unknown as LunisolarEx
    expect(lsr.takeSound).toBe('大海水')
    expect(lsr.char8.year.takeSound).toBe('金箔金')
    expect(lsr.char8.day.takeSound).toBe('大海水')

    const lsr2 = lunisolar('2016-05-17') as unknown as LunisolarEx
    expect(lsr2.takeSound).toBe('平地木')

    const lsr3 = lunisolar('2022-1-1') as unknown as LunisolarEx
    expect(lsr3.takeSound).toBe('大溪水')
  })
})
