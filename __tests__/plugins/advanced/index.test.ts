import lunisolar from '../../../src/index'
import advanced from '../../../src/plugins/advanced'

lunisolar.extend(advanced)

interface Lunisolar extends ILunisolar {
  tireGod: string
  tireGodData: TireGodData
}

describe('plugins/advanced tireGod', () => {
  it('2022-07-08', () => {
    const lsr = lunisolar('2022-07-08') as unknown as Lunisolar
    expect(lsr.tireGod).toBe('倉庫棲外東南')
    expect(lsr.tireGodData.stemPlace).toBe('倉庫')
    expect(lsr.tireGodData.branchPlace).toBe('雞棲')
    expect(lsr.tireGodData.description).toBe('倉庫棲外東南')
    expect(lsr.tireGodData.direction).toBe('外東南')
  })
})
