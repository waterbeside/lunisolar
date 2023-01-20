/// <reference path="./types.d.ts" />

declare module 'lunisolar/locale/*' {
  namespace locale {
    interface Locale extends LsrLocale {}
  }

  const locale: locale.Locale

  export = locale
}
