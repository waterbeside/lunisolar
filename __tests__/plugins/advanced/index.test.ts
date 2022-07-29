import lunisolar from '../../../src/index'
import advanced from '../../../src/plugins/advanced'

lunisolar.extend(advanced)

interface Lunisolar extends ILunisolar {
  fetalGod: string
  fetalGodData: FetalGodData
}

describe('plugins/advanced fetalGod', () => {
  it('2022-07-08', () => {
    const lsr = lunisolar('2022-07-08') as unknown as Lunisolar
    expect(lsr.fetalGod).toBe('倉庫棲外東南')
    expect(lsr.fetalGodData.stemPlace).toBe('倉庫')
    expect(lsr.fetalGodData.branchPlace).toBe('雞棲')
    expect(lsr.fetalGodData.description).toBe('倉庫棲外東南')
    expect(lsr.fetalGodData.direction).toBe('外東南')
  })
})


describe('plugins/advanced takeSound', () => {
  it('2022-07-08', () => {
    const lsr = lunisolar('2022-07-08') as unknown as Lunisolar
    expect(lsr.char8.day.takeSound).toBe('大海水')
    expect(lsr.takeSound).toBe('大海水')

    const lsr2 = lunisolar('2016-05-17') as unknown as Lunisolar
    expect(lsr2.takeSound).toBe('平地木')

    const lsr3 = lunisolar('2022-1-1') as unknown as Lunisolar
    expect(lsr3.takeSound).toBe('大溪水')
  })
})
