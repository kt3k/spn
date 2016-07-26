const {animation} = require('../../src').decorators
const {Animation} = require('../../src')
const {expect} = require('chai')

describe('animation.show', () => {
  it('adds showAnim method to prototype', () => {
    class Foo {}
    animation.show('foo', 500)(Foo)

    expect(Foo.prototype.showAnim).to.be.a('function')
    expect(new Foo().showAnim()).to.be.instanceof(Animation)
  })
})

describe('animation.hide', () => {
  it('adds hideAnim method to prototype', () => {
    class Bar {}
    animation.hide('bar', 500)(Bar)

    expect(Bar.prototype.hideAnim).to.be.a('function')
    expect(new Bar().hideAnim()).to.be.instanceof(Animation)
  })
})

describe('animation.show().hide()', () => {
  it('adds showAnim and hideAnim methods', () => {
    class Bar {}
    animation.show('bar-show', 400).hide('bar-hide', 500)(Bar)

    expect(Bar.prototype.showAnim).to.be.a('function')
    expect(new Bar().showAnim()).to.be.instanceof(Animation)
    expect(Bar.prototype.hideAnim).to.be.a('function')
    expect(new Bar().hideAnim()).to.be.instanceof(Animation)
  })
})
