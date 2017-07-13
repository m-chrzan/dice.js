const { lex } = require('../src/lexer.js')

describe('lex', () => {
  it('lexes the empty string', () => {
    expect(lex('')).toEqual([])
  })

  it('signals an error on unexpected input', () => {
    expect(lex('q')).toBe('error')
  })

  describe('basic dice', () => {
    it('1d6', () => {
      expect(lex('1d6')).toEqual([
        { type: 'number', value: 1 },
        { type: 'd' },
        { type: 'number', value: 6 }
      ])
    })

    it('42d172', () => {
      expect(lex('42d172')).toEqual([
        { type: 'number', value: 42 },
        { type: 'd' },
        { type: 'number', value: 172 }
      ])
    })
  })
})