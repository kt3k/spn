import { Being, Animation } from '../src'
import { div } from 'dom-gen'

describe('Being', () => {
  let being

  before(() => {
    $.cc('being', Being)
  })

  beforeEach(() => {
    being = div().cc.init('being')

    being.showAnim = () => new Animation('showing', 500)

    being.hideAnim = () => new Animation('abc', 37)
  })

  describe('show', () => {
    it('applies the show animation to the elem', (done) => {
      const anim = { apply (elem) {
        expect(elem).to.equal(being.elem)

        done()
      } }

      being.showAnim = () => anim

      being.show().catch((e) => {
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
  })

  describe('hide', () => {
    it('applies the hide animation to the elem', (done) => {
      const anim = { apply (elem) {
        expect(elem).to.equal(being.elem)

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
