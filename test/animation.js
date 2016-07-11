const {Animation} = require('../src')
const {div} = require('dom-gen')

describe('Animation', () => {
  let anim

  beforeEach(() => {
    anim = new Animation('foo', 400)
  })

  describe('apply', () => {
    it('returns promise which resolves in its duration', () => {
      let called300 = false
      let called500 = false

      setTimeout(() => (called300 = true), 300)
      setTimeout(() => (called500 = true), 500)

      return anim.apply(div()).then(() => {
        expect(called300).to.be.true
        expect(called500).to.be.false
      })
    })

    it('sets given animation to the given elem', () => {
      const elem = div()

      anim.apply(elem)

      expect(elem.css('-webkit-animation')).to.equal('foo 400ms')
    })
  })
})
