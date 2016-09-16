const {animation} = require('../../src').decorators
const {Animation} = require('../../src')
const {expect} = require('chai')

describe('animation({show, hide})', () => {
  it('adds `showAnim` and `hideAnim` methods', () => {
    class Foo {}
    animation({show: ['foo', 300], hide: ['bar', 400]})(Foo)

    expect(Foo.prototype.showAnim).to.be.a('function')
    expect(new Foo().showAnim()).to.be.instanceof(Animation)
    expect(new Foo().showAnim().name).to.equal('foo')
    expect(new Foo().showAnim().duration).to.equal(300)

    expect(Foo.prototype.hideAnim).to.be.a('function')
    expect(new Foo().hideAnim()).to.be.instanceof(Animation)
    expect(new Foo().hideAnim().name).to.equal('bar')
    expect(new Foo().hideAnim().duration).to.equal(400)
  })

  it('does nothing if show and hide params are not given', () => {
    class Foo {}
    animation({})(Foo)

    expect(Foo.prototype.showAnim).to.be.undefined
    expect(Foo.prototype.hideAnim).to.be.undefined
  })

  it('gives default duration 500 to each animation if the duration is not given', () => {
    class Foo {}
    animation({show: ['foo'], hide: ['bar']})(Foo)

    expect(Foo.prototype.showAnim).to.be.a('function')
    expect(new Foo().showAnim().duration).to.equal(500)

    expect(Foo.prototype.hideAnim).to.be.a('function')
    expect(new Foo().hideAnim().duration).to.equal(500)
  })
})

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
