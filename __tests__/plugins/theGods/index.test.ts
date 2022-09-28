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
})
