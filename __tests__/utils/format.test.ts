import { format } from '../../src/utils/format'
import { Lunisolar } from '../../src/class/lunisolar'

describe('test format', () => {
  it('test 2022/07/18 14:40', () => {
    const lsr = new Lunisolar('2022/07/18 14:40')
    expect(format('YYYY/MM/DD HH:mm:ss SSS', lsr)).toBe('2022/07/18 14:40:00 000')
    expect(format('lY年 lMlD lH時', lsr)).toBe('二〇二二年 六月二十 未時')
    expect(format('lY年 lM(lL)lD lH時', lsr)).toBe('二〇二二年 六月(大)二十 未時')
    expect(format('lYn年 農歷lMn月lDn日 第lHn個時辰', lsr)).toBe('2022年 農歷6月20日 第8個時辰')
    expect(format('cY cM cD cH', lsr)).toBe('壬寅 丁未 壬申 丁未')
    expect(format('cYs-cYb cMs-cMb cDs-cDb cHs-cHb', lsr)).toBe('壬-寅 丁-未 壬-申 丁-未')
  })

  it('test 2022/03/10', () => {
    const lsr = new Lunisolar('2022/03/10')
    expect(format('cZ年', lsr)).toBe('虎年')
  })

  it('test 2023-09-04', () => {
    const lsr = new Lunisolar('2023-09-04')
    expect(format('YYYY-MM-DD', lsr)).toBe('2023-09-04')
    expect(format('[Year:]YYYY', lsr)).toBe('Year:2023')
    expect(format('d, dR', lsr)).toBe('1, 1')
  })
  it('test 2023-09-10', () => {
    const lsr = new Lunisolar('2023-09-10')
    expect(format('d, dR', lsr)).toBe('0, 2')
  })
})
