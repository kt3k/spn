const { width, height, transition } = require('../')
const { expect } = require('chai')

class Foo {}

describe('width', () => {
  it('adds width method to the given class', () => {
    width(50)(Foo)

    expect(Foo.prototype.width).to.be.a('function')
    expect(new Foo().width()).to.equal(50)
  })
})

describe('height', () => {
  it('adds height method to the given class', () => {
    height(80)(Foo)

    expect(Foo.prototype.height).to.be.a('function')
    expect(new Foo().height()).to.equal(80)
  })
})

describe('transition.duration', () => {
  it('adds defaultTransitionDuration method to the given class', () => {
    transition.duration(170)(Foo)

    expect(Foo.prototype.defaultTransitionDuration).to.be.a('function')
    expect(new Foo().defaultTransitionDuration()).to.equal(170)
  })
})
