import { Lunisolar } from './class/lunisolar'
import { Lunar } from './class/lunar'
import { Term } from './class/term'
import { Char8 } from './class/char8'
import { SB, Stem, Branch } from './class/stemBranch'
import { Element5 } from './class/element5'

export default function lunisolar(date: DateConfigType | Lunisolar): Lunisolar {
  if (date instanceof Lunisolar) {
    date = date.date
  }
  return new Lunisolar(date)
}

lunisolar.Lunar = Lunar
lunisolar.Term = Term
lunisolar.Char8 = Char8
lunisolar.SB = SB
lunisolar.Stem = Stem
lunisolar.Branch = Branch
lunisolar.Element5 = Element5
lunisolar.Lunisolar = Lunisolar
lunisolar.extend = <T = any>(plugin: PluginFunc, options?: T): typeof lunisolar => {
  if (!(plugin as any).$once) {
    plugin(options, Lunisolar, lunisolar)
    ;(plugin as any).$once = true
  }
  return lunisolar
}
