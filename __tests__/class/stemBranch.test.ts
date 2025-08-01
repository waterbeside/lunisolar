import { SB, Branch } from '../../src/class/stemBranch'
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

  it('旬空', () => {
    const resList = [
      [10, 11],
      [8, 9],
      [6, 7],
      [4, 5],
      [2, 3],
      [0, 1]
    ]
    for (let i = 0; i < 60; i++) {
      let res
      res = resList[Math.floor(i / 10)]
      expect(
        (() => {
          const sb = new SB(i)
          return sb.missing.map(i => i.value)
        })()
      ).toEqual(res)
    }
  })
})

describe('branch triad', () => {
  it('test 寅', () => {
    expect(new Branch('寅').triad.map(item => item.toString())).toEqual(['午', '戌'])
  })
  it('test 午', () => {
    expect(new Branch('午').triad.map(item => item.toString())).toEqual(['戌', '寅'])
  })
  it('test 子', () => {
    expect(new Branch('子').triad.map(item => item.toString())).toEqual(['辰', '申'])
  })
})

// 三会
describe('branch meeting', () => {
  it('test 子', () => {
    expect(new Branch('子').meeting.map(item => item.toString())).toEqual(['亥', '丑'])
    expect(new Branch('亥').meetingE5.name).toEqual('水')
    expect(new Branch('子').meetingE5.name).toEqual('水')
    expect(new Branch('丑').meetingE5.name).toEqual('水')
  })
  it('test 寅', () => {
    expect(new Branch('寅').meeting.map(item => item.toString())).toEqual(['卯', '辰'])
    expect(new Branch('寅').meetingE5.name).toEqual('木')
    expect(new Branch('卯').meetingE5.name).toEqual('木')
    expect(new Branch('辰').meetingE5.name).toEqual('木')
  })
  it('test 未', () => {
    expect(new Branch('未').meeting.map(item => item.toString())).toEqual(['巳', '午'])
    expect(new Branch('巳').meetingE5.name).toEqual('火')
    expect(new Branch('午').meetingE5.name).toEqual('火')
    expect(new Branch('未').meetingE5.name).toEqual('火')
  })
  it('test 酉', () => {
    expect(new Branch('酉').meeting.map(item => item.toString())).toEqual(['申', '戌'])
    expect(new Branch('申').meetingE5.name).toEqual('金')
    expect(new Branch('酉').meetingE5.name).toEqual('金')
    expect(new Branch('戌').meetingE5.name).toEqual('金')
  })
})
