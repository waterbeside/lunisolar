import { Term } from '../../src/class/term'

describe('test the Term class', () => {
  it('1901-02-04 立春', () => {
    expect(Term.findDate(1901, '立春')).toEqual([1901, 2, 4])
  })

  it('2022-02-04 立春', () => {
    expect(Term.findDate(2022, 2)).toEqual([2022, 2, 4])
  })

  it('2022-03-20 春分', () => {
    expect(Term.findDate(2022, '春分')).toEqual([2022, 3, 20])
  })
})
