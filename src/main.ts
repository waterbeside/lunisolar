import { Lunisolar } from './lunisolar.class'
import { Lunar } from './lunar.class'

export default function lunisolar(date: DateConfigType | Lunisolar): Lunisolar {
  if (date instanceof Lunisolar) {
    date = date.date
  }
  return new Lunisolar(date)
}

lunisolar.Lunar = Lunar
