type GodConfig = {
  key: string
  good: string[]
  bad: string[]
  desc?: string
  name?: string
}

class God {
  key: string
  name: string
  good: string[]
  bad: string[]
  constructor(config: GodConfig) {
    this.key = config.key
    this.name = config.name ?? config.key
    this.good = config.good
    this.bad = config.bad
  }

  toString() {
    return this.name
  }
}

export { God }
