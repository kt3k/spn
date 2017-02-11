const { ratio } = require('../')
const { expect } = require('chai')

describe('ratio({x, y})', () => {
  it('adds ratioX and ratioY methods', () => {
    class Foo {}

    ratio({x: 0.1, y: 0.2})(Foo)
    expect(Foo.prototype.ratioX).to.be.a('function')
    expect(new Foo().ratioX()).to.equal(0.1)
    expect(Foo.prototype.ratioY).to.be.a('function')
    expect(new Foo().ratioY()).to.equal(0.2)
  })
})

describe('ratio.x', () => {
  it('adds the ratioX method to the class', () => {
    class Foo {}

    ratio.x(0.4)(Foo)

    expect(Foo.prototype.ratioX).to.be.a('function')
    expect(new Foo().ratioX()).to.equal(0.4)
  })
})

describe('ratio.y', () => {
  it('adds the ratioY method to the class', () => {
    class Foo {}

    ratio.y(0.7)(Foo)

    expect(Foo.prototype.ratioY).to.be.a('function')
    expect(new Foo().ratioY()).to.equal(0.7)
  })
})
