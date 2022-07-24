import lunisolar from '../src'

describe('lunisolar', () => {
  it('lunisolar should be a function', () => {
    expect(lunisolar).toBeInstanceOf(Function)
  })

  it('更改换岁时机, 冬至换岁，中气换月', () => {
    const lsr = lunisolar('2022-01-05', { changeAgeTerm: -1 })
    expect(lsr.char8.year.toString()).toBe('壬寅')
    expect(lsr.char8.month.toString()).toBe('庚子')
    expect(lunisolar('2022-01-02', { changeAgeTerm: -1 }).char8.month.toString()).toBe('庚子')
    expect(lunisolar('2022-01-02', { changeAgeTerm: -1 }).char8.month.toString()).toBe('庚子')
    expect(lunisolar('2022-01-20', { changeAgeTerm: -1 }).char8.month.toString()).toBe('辛丑')
  })
})
