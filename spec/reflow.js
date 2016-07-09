const {reflow} = require('../src')
const {div} = require('dom-gen')

describe('reflow', () => {
  let elem

  beforeEach(() => {
    elem = div()
  })

  it('returns the given element', () => {
    expect(reflow(elem)).to.equal(elem)
  })

  it('references the offsetHeight of the given elem', (done) => {
    Object.defineProperty(elem.get(0), 'offsetHeight', {
      get: () => done()
    })

    reflow(elem)
  })
})
