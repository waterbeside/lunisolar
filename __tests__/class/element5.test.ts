import { Element5 } from '../../src/class/element5'

describe('Element5', () => {
  it('Test Element5', () => {
    const e0 = new Element5(0)
    expect(e0.generating().toString()).toBe('火')
    expect(e0.overcoming().toString()).toBe('土')
    expect(e0.counteracting().toString()).toBe('金')
    expect(e0.weakening().toString()).toBe('水')
  })

  it('Test Element5', () => {
    const e1 = new Element5(1)
    expect(e1.generating().toString()).toBe('土')
    expect(e1.overcoming().toString()).toBe('金')
    expect(e1.counteracting().toString()).toBe('水')
    expect(e1.weakening().toString()).toBe('木')
  })
})
