const {wait} = require('../src')
const {expect} = require('chai')

describe('wait', () => {
  it('returns a promise', () => {
    expect(wait()).to.be.instanceof(Promise)
  })

  it('resolves in the given milliseconds', () => {
    let foo = false
    let bar = false

    setTimeout(() => {
      foo = true
    }, 600)
    setTimeout(() => {
      bar = true
    }, 400)

    wait(500).then(() => {
      expect(foo).to.be.false
      expect(bar).to.be.true
    })
  })

  it('resolves with the given object', () => {
    let a = {}

    wait(0, a).then((x) => {
      expect(a).to.equal(x)
    })
  })
})
