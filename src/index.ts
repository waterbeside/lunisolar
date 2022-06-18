import { Lunisolar } from './class/lunisolar'
import { Lunar } from './class/lunar'
import { Stem, Branch } from './class/stemBranch'
import { Term } from './class/term'

export default function lunisolar(date: DateConfigType | Lunisolar): Lunisolar {
  if (date instanceof Lunisolar) {
    date = date.date
  }
  return new Lunisolar(date)
}

lunisolar.Lunar = Lunar
lunisolar.Stem = Stem
lunisolar.Branch = Branch
lunisolar.Term = Term
