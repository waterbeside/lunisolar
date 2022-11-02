export class GodBase {
  readonly data: GodBaseClassData
  constructor(data: GodBaseClassDataParam) {
    const aliasList = data?.extra?.alias || []

    const godData = {
      key: data.key,
      good: [...(data.good || [])],
      bad: [...(data.bad || [])],
      luckLevel: data?.luckLevel || 0,
      cate: data?.cate || null,
      extra: data?.extra || null,
      alias: [...aliasList]
    }
    for (const d in godData) {
      Object.defineProperty(godData, d, {
        writable: false
      })
    }
    this.data = godData
  }

  get key() {
    return this.data.key
  }

  toString() {
    return this.key
  }
}
