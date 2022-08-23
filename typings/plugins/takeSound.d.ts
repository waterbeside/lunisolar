import { PluginFunc } from 'lunisolar'

declare module 'lunisolar' {
  interface Lunisolar {
    takeSound: string
  }
  interface SB {
    takeSound: string
    takeSoundE5: string
  }
}

declare const plugin: PluginFunc
export = plugin
