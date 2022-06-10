import { Lunisolar } from '../../src/class/lunisolar'
import {
  FIRST_YEAR,
  TERM_MINIMUM_DATES,
  TERM_SAME_HEX,
  TERM_LIST
} from '../../src/constants/lunarData'
import { SOLAR_TERMS } from '../../src/constants/calendarData'
import solarTermDateList from '../datas/solarTermDateList'

export function reduceTermList(year: number) {
  const binData = TERM_SAME_HEX[TERM_LIST[year - FIRST_YEAR]].toString(2)
  const res = []
  const res2 = []
  let temp = binData.padStart(48, '0')
  while (res.length < 24) {
    const currDate = parseInt(temp.slice(temp.length - 2), 2)
    const minDate = TERM_MINIMUM_DATES[res.length]
    res.push(currDate)
    res2.push(currDate + minDate)
    temp = temp.slice(0, temp.length - 2)
  }
  return [res, res2]
}

describe('test Term', () => {
  for (const yearOffset in solarTermDateList) {
    const year = FIRST_YEAR + Number(yearOffset)
    it(`${year}`, () => {
      for (const i in solarTermDateList[yearOffset]) {
        const month = ('0' + ((Number(i) >> 1) + 1)).slice(-2)
        const date = ('0' + solarTermDateList[yearOffset][i]).slice(-2)
        const lun = new Lunisolar(`${year}-${month}-${date}`)
        let res = lun.term()
        if (res instanceof Array) {
          console.log(`${year}-${month}-${date}`)
          console.log(res)
          res = null
        }
        expect(res?.toString() || null).toBe(SOLAR_TERMS[Number(i)])
      }
    })
  }
})
