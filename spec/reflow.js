import { reflow } from '../src'
import { div } from 'dom-gen'

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
