export function cacheClass<T extends { new (...args: any[]): {} }>(target: T) {
  const targetPrototype = target.prototype
  if (targetPrototype.cache === void 0) {
    Object.defineProperty(targetPrototype, 'cache', {
      value: new Map<string, any>(),
      configurable: false,
      writable: false
    })
  }
}

export function cache(cacheKey: string, isArgsAffectKey: boolean = false): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    const original =
      descriptor.value === void 0 ? (descriptor.get as Function) : (descriptor.value as Function)
    const getOrValue = descriptor.value === void 0 ? 'get' : 'value'
    ;(descriptor as any)[getOrValue] = function (this: any, ...args: any[]) {
      if (args.length > 0 && isArgsAffectKey) {
        const argsStr = JSON.stringify(args)
        cacheKey += argsStr
      }
      if (this.cache.has(cacheKey)) return this.cache.get(cacheKey)
      const result = original.call(this, ...args)
      this.cache.set(cacheKey, result)
      return result
    }
  }
}
