import { Lunisolar } from './lunisolar.class'

export default function lunisolar(date: lunisolar.DateConfigType | Lunisolar): Lunisolar {
  if (date instanceof Lunisolar) {
    date = date.date
  }
  return new Lunisolar(date)
}
