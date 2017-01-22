const { wait, Being, Animation } = require('../src')
const { div } = require('dom-gen')
const { expect } = require('chai')
const { def, make } = require('capsid')

describe('Being', () => {
  let being

  before(() => {
    def('being', Being)
  })

  beforeEach(() => {
    being = make('being', div()[0])

    being.showAnim = () => new Animation('showing', 500)

    being.hideAnim = () => new Animation('abc', 37)
  })

  describe('show', () => {
    it('applies the show animation to the elem', done => {
      const anim = { apply (el) {
        expect(el).to.equal(being.el)

        done()
      } }

      being.showAnim = () => anim

      being.show().catch(e => {
        console.log(e)
        console.log(e.stack)
      })
    })

    it('calls willShow before the main animation', (done) => {
      const anim = { apply () {
        done(new Error('main animation should not called before willShow'))
      } }

      being.showAnim = () => anim

      being.willShow = function () {
        done()
      }

      being.show()
    })

    it('calls didShow after the main animation', (done) => {
      let animCalled = false

      const anim = { apply () {
        animCalled = true
      } }

      being.showAnim = () => anim

      being.didShow = function () {
        expect(animCalled).to.be.true

        done()
      }

      being.show()
    })

    it('adds showing class to the element', () => {
      being.show()

      expect(being.$el.hasClass('showing')).to.be.true
      expect(being.$el.hasClass('shown')).to.be.false
    })

    it('adds shown class to the element at the end of `show`', done => {
      being.show().then(() => {
        expect(being.$el.hasClass('shown')).to.be.true

        done()
      }).catch(done)
    })

    it('waits at least the given duration if constructor.SHOW_DURATION is set', done => {
      being.constructor.SHOW_DURATION = 100
      being.show().then(() => {
        delete being.constructor.SHOW_DURATION

        done()
      })

      wait(50).then(() => {
        expect(being.$el.hasClass('shown')).to.be.false
      })
    })
  })

  describe('hide', () => {
    it('applies the hide animation to the elem', (done) => {
      const anim = { apply (el) {
        expect(el).to.equal(being.el)

        done()
      } }

      being.hideAnim = () => anim

      being.hide()
    })

    it('calls willHide method before the main animation', (done) => {
      const anim = { apply () {
        expect(true).to.be.false
      } }

      being.hideAnim = () => anim

      being.willHide = function () {
        done()
      }

      being.hide()
    })

    it('calls didHide method after the main animation', (done) => {
      let animCalled = false

      const anim = { apply () {
        animCalled = true
      } }

      being.hideAnim = () => anim

      being.didHide = function () {
        expect(animCalled).to.be.true

        done()
      }

      being.hide()
    })

    it('waits at least the given duration if constructor.SHOW_DURATION is set', done => {
      being.constructor.SHOW_DURATION = 100
      being.hide().then(() => {
        delete being.constructor.SHOW_DURATION

        done()
      })

      wait(50).then(() => {
        expect(being.$el.hasClass('showing')).to.be.true
      })
    })
  })

  describe('disappear', () => {
    it('hides and removes the element', () => {
      let hideCalled

      being.hide = function (dur) {
        expect(dur).to.equal(15)

        hideCalled = true

        return Promise.resolve()
      }

      return being.disappear(15).then(() => {
        expect(hideCalled).to.be.true
        expect(being.elem.parent().length).to.equal(0)
      })
    })
  })
})
