import lunisolar from '../../../src/index'
import advanced from '../../../src/plugins/advanced'

lunisolar.extend(advanced)

interface Lunisolar extends ILunisolar {
  fetalGod: string
  fetalGodData: FetalGodData
}

describe('plugins/advanced tireGod', () => {
  it('2022-07-08', () => {
    const lsr = lunisolar('2022-07-08') as unknown as Lunisolar
    expect(lsr.fetalGod).toBe('倉庫棲外東南')
    expect(lsr.fetalGodData.stemPlace).toBe('倉庫')
    expect(lsr.fetalGodData.branchPlace).toBe('雞棲')
    expect(lsr.fetalGodData.description).toBe('倉庫棲外東南')
    expect(lsr.fetalGodData.direction).toBe('外東南')
  })
})
