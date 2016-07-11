const {ratio} = require('../../src').decorators
const {expect} = require('chai')

class Foo {}

describe('ratio.x', () => {
  it('adds the ratioX method to the class', () => {
    ratio.x(0.4)(Foo)

    expect(Foo.prototype.ratioX).to.be.a('function')
    expect(new Foo().ratioX()).to.equal(0.4)
  })
})

describe('ratio.y', () => {
  it('adds the ratioY method to the class', () => {
    ratio.y(0.7)(Foo)

    expect(Foo.prototype.ratioY).to.be.a('function')
    expect(new Foo().ratioY()).to.equal(0.7)
  })
})
