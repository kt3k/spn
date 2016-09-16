const {margin} = require('../../src').decorators
const {expect} = require('chai')

describe('margin({x, y, left, right, top, bottom})', () => {
  it('adds margin methods to the decorated class', () => {
    class Foo {}

    margin({
      x: 1,
      y: 2,
      left: 3,
      right: 4,
      top: 5,
      bottom: 6,
    })(Foo)

    expect(Foo.prototype.marginX).to.be.a('function')
    expect(new Foo().marginX()).to.equal(1)
    expect(Foo.prototype.marginY).to.be.a('function')
    expect(new Foo().marginY()).to.equal(2)
    expect(Foo.prototype.marginLeft).to.be.a('function')
    expect(new Foo().marginLeft()).to.equal(3)
    expect(Foo.prototype.marginRight).to.be.a('function')
    expect(new Foo().marginRight()).to.equal(4)
    expect(Foo.prototype.marginTop).to.be.a('function')
    expect(new Foo().marginTop()).to.equal(5)
    expect(Foo.prototype.marginBottom).to.be.a('function')
    expect(new Foo().marginBottom()).to.equal(6)
  })
})
