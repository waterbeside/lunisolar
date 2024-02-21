import { SolarTerm } from '../../src/class/solarTerm'
import { parseJD } from '../../src/utils'

describe('test the Term class', () => {
  it('1901-02-04 立春', () => {
    expect(SolarTerm.findDate(1901, '立春').format('YYYY-MM-DD HH:mm')).toEqual('1901-02-04 12:00')
  })

  it('2022-02-04 立春', () => {
    expect(SolarTerm.findDate(2022, 2).format('YYYY-MM-DD HH:mm')).toEqual('2022-02-04 12:00')
  })

  it('2022-03-20 春分', () => {
    expect(SolarTerm.findDate(2022, '春分').format('YYYY-MM-DD')).toEqual('2022-03-20')
  })

  it('2021-12-21 春分', () => {
    expect(SolarTerm.findDate(2021, '冬至').format('YYYY-MM-DD')).toEqual('2021-12-21')
  })
})

describe('test Term findNode', () => {
  it('test', () => {
    expect(SolarTerm.findNode(parseJD('2022-07-24'), { nodeFlag: 1, returnValue: true })).toEqual([
      new SolarTerm('大暑').valueOf(),
      parseJD('2022-07-23')
    ])
  })
  it('test2', () => {
    expect(SolarTerm.findNode(parseJD('2022-07-24'), { nodeFlag: 0, returnValue: true })).toEqual([
      new SolarTerm('小暑').valueOf(),
      parseJD('2022-07-07')
    ])
  })

  it('test3', () => {
    expect(SolarTerm.findNode(parseJD('2022-1-1'), { nodeFlag: 0, returnValue: true })).toEqual([
      new SolarTerm('大雪').valueOf(),
      parseJD('2021-12-07')
    ])

    expect(SolarTerm.findNode(parseJD('2022-1-1'), { nodeFlag: 1, returnValue: true })).toEqual([
      new SolarTerm('冬至').valueOf(),
      parseJD('2021-12-21')
    ])

    expect(SolarTerm.findNode(parseJD('2022-1-1'), { nodeFlag: 2, returnValue: true })).toEqual([
      new SolarTerm('冬至').valueOf(),
      parseJD('2021-12-21')
    ])
  })
})
