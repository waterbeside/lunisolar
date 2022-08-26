import lunisolar from '../../../src/index'
import theGods from '../../../src/plugins/theGods'

lunisolar.extend(theGods)

interface Lunisolar extends ILunisolar {
  duty12God: string
}

describe('plugins/theGods', () => {
  it('2022-08-16', () => {
    const lsr = lunisolar('2022-08-16') as unknown as Lunisolar
    expect(lsr.duty12God).toBe('執')
  })
  it('2022-08-25', () => {
    const lsr = lunisolar('2022-08-25') as unknown as Lunisolar
    expect(lsr.duty12God).toBe('滿')
  })
})
