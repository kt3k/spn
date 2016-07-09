const {animation} = require('../../src').decorators
const {Animation} = require('../../src')

const {expect} = require('chai')

class Foo {}

class Bar {}

describe('animation.show', () => {
  it('adds showAnim method to prototype', () => {
    animation.show('foo', 500)(Foo)

    expect(Foo.prototype.showAnim).to.be.a('function')
    expect(new Foo().showAnim()).to.be.instanceof(Animation)
  })
})

describe('animation.hide', () => {
  it('adds hideAnim method to prototype', () => {
    animation.hide('bar', 500)(Bar)

    expect(Bar.prototype.hideAnim).to.be.a('function')
    expect(new Bar().hideAnim()).to.be.instanceof(Animation)
  })
})
