const { parse } = require('../src/parser.js')

describe('parse', () => {
  it('parses a constant', () => {
    expect(parse('5')).toEqual({ type: 'constant', value: 5 })
  })

  it('parses a simple die (1d6)', () => {
    expect(parse('1d6')).toEqual({
      type: 'd',
      left: { type: 'constant', value: 1 },
      right: { type: 'constant', value: 6 }
    })
  })

  it('parses a simple die (10d42)', () => {
    expect(parse('10d42')).toEqual({
      type: 'd',
      left: { type: 'constant', value: 10 },
      right: { type: 'constant', value: 42 }
    })
  })

  it('parses a compound die (1d2d3)', () => {
    expect(parse('1d2d3')).toEqual({
      type: 'd',
      left: { type: 'constant', value: 1 },
      right: {
        type: 'd',
        left: { type: 'constant', value: 2 },
        right: { type: 'constant', value: 3 }
      }
    })
  })

  it('parses constant addition', () => {
    expect(parse('1 + 2')).toEqual({
      type: 'add',
      left: { type: 'constant', value: 1 },
      right: { type: 'constant', value: 2 }
    })
  })

  it('parses dice addition', () => {
    expect(parse('1d6 + 2d8')).toEqual({
      type: 'add',
      left: {
        type: 'd',
        left: { type: 'constant', value: 1 },
        right: { type: 'constant', value: 6 }
      },
      right: {
        type: 'd',
        left: { type: 'constant', value: 2 },
        right: { type: 'constant', value: 8 }
      }
    })
  })

  it('parses dice subtraction', () => {
    expect(parse('1d6 - 2d8')).toEqual({
      type: 'subtract',
      left: {
        type: 'd',
        left: { type: 'constant', value: 1 },
        right: { type: 'constant', value: 6 }
      },
      right: {
        type: 'd',
        left: { type: 'constant', value: 2 },
        right: { type: 'constant', value: 8 }
      }
    })
  })
})
