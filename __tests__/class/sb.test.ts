import { SB } from '../../src/class/stemBranch'
// import * as U from '../../src/utils'

const testData = [
  // eslint-disable-next-line prettier/prettier
  '甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥',
  // eslint-disable-next-line prettier/prettier
  '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉', '丙戌', '丁亥',
  // eslint-disable-next-line prettier/prettier
  '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥',
  // eslint-disable-next-line prettier/prettier
  '庚子', '辛丑', '壬寅', '癸卯', '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥',
  // eslint-disable-next-line prettier/prettier
  '壬子', '癸丑', '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥',
]

describe('SB', () => {
  it('Test SB', () => {
    for (let i = 0; i < testData.length; i++) {
      expect(
        (() => {
          const sb = new SB(i)
          return sb.toString()
        })()
      ).toBe(testData[i])
    }
  })
})