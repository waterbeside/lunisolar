import { commonGods } from './commonGods'
import { yearGods } from './yearGods'
import { monthGods } from './monthGods'
import { monthSeasonGods } from './monthSeasonGods'

const godDict: { [key: string]: { [key: string]: GodDictItem } } = {
  commonGods,
  yearGods,
  monthGods,
  monthSeasonGods
}

export { godDict }
