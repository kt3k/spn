const { reflow } = require('../')
const { div } = require('dom-gen')
const { expect } = require('chai')

describe('reflow', () => {
  let el

  beforeEach(() => {
    el = div()[0]
  })

  it('returns undefined', () => {
    expect(reflow(el)).to.be.undefined
  })

  it('references the offsetHeight of the given elem', done => {
    Object.defineProperty(el, 'offsetHeight', {
      get: () => done()
    })

    reflow(el)
  })
})
