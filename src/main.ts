import { Lunisolar } from './class/lunisolar'
import { Lunar } from './class/lunar'

export default function lunisolar(date: DateConfigType | Lunisolar): Lunisolar {
  if (date instanceof Lunisolar) {
    date = date.date
  }
  return new Lunisolar(date)
}

lunisolar.Lunar = Lunar
