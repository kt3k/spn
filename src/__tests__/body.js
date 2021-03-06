const { Area, Body, Prebody, Rect, Point } = require('../')
const { div } = require('dom-gen')
const { expect } = require('chai')
const { def, make } = require('capsid')

describe('Body', () => {
  let elem, body

  before(() => {
    def('body', Body)

    class MyBody extends Body {
      width () { return 10 }
      height () { return 20 }
    }

    def('my-body', MyBody)
  })

  class MarginedBody extends Body {
    width () { return 100 }
    height () { return 100 }
    marginX () { return 15 }
    marginY () { return 25 }
  }

  def('margined-body', MarginedBody)

  beforeEach(() => {
    elem = div()

    body = make('my-body', elem[0])

    body.x = 30
    body.y = 40
  })

  it('has default width=100 and height=100', () => {
    const body = make('body', div()[0])

    body.updateElem()

    expect(body.elem.width()).to.equal(100)
    expect(body.elem.height()).to.equal(100)
  })

  describe('updateElem', () => {
    it('sets up the element dimensions', () => {
      body.updateElem()

      expect(body.elem.width()).to.equal(10)
      expect(body.elem.height()).to.equal(20)
      expect(body.elem.css('left')).to.equal('30px')
      expect(body.elem.css('top')).to.equal('40px')
    })

    it('sets the duration of the transition if given', () => {
      body.updateElem(345)

      expect(body.elem.css('transition-duration')).to.equal('345ms')
    })
  })

  describe('show', () => {
    it('calls update{Rect,Offset}', done => {
      const foo = new Promise(resolve => { body.updateRect = resolve })
      const bar = new Promise(resolve => { body.updateOffset = resolve })

      body.show()

      Promise.all([foo, bar]).then(() => done())
    })
  })

  describe('actualWidth and actualHeight', () => {
    it('returns the actual width and height, respectively', () => {
      const body = make('margined-body', div()[0])

      body.updateElem()

      expect(body.actualWidth()).to.equal(70)
      expect(body.actualHeight()).to.equal(50)
    })
  })

  describe('{top,left,right,bottom}Limit', () => {
    it('returns the limit coordinates', () => {
      expect(body.rightLimit()).to.equal(40)
      expect(body.leftLimit()).to.equal(30)
      expect(body.topLimit()).to.equal(40)
      expect(body.bottomLimit()).to.equal(60)
    })
  })

  describe('centerX and centerY', () => {
    it('returns the x of the center of the body', () => {
      expect(body.centerX()).to.equal(35)
      expect(body.centerY()).to.equal(50)
    })
  })

  describe('stop', () => {
    it('', () => {
      body.stop()
    })
  })

  describe('engage', () => {
    it('engages the current state to the dom', done => {
      body.setAt(new Point(50, 60))
      body.setArea(new Area(120, 140))

      body.engage(100).then(() => {
        expect(body.x).to.equal(50)
        expect(body.y).to.equal(60)

        expect(body.posture.width).to.equal(120)
        expect(body.posture.height).to.equal(140)
        done()
      })
    })

    it('uses transition-duration 500ms if defaultTransitionDuration method is unavailable', () => {
      class X extends Prebody {
      }
      def('engage-test-x', X)
      const body = make('engage-test-x', div()[0])

      body.engage()

      expect(body.el.style.transitionDuration).to.equal('500ms')
    })

    it('restore original transition-duration after the method execution', () => {
      const body = make('my-body', div()[0])

      body.el.style.transitionDuration = '978ms'

      body.engage(100).then(() => {
        expect(body.el.style.transitionDuration).to.equal('978ms')
      })
    })
  })

  describe('moveToX', () => {
    it('it moves the sprite offset to specified x', () => {
      body.moveToX(50)

      expect(body.x).to.equal(50)
      expect(body.y).to.equal(40)
      expect(body.elem.css('left')).to.equal('50px')
      expect(body.elem.css('top')).to.equal('40px')
    })
  })

  describe('moveToY', () => {
    it('it moves the sprite offset to specified x', () => {
      body.moveToY(50)

      expect(body.x).to.equal(30)
      expect(body.y).to.equal(50)
      expect(body.elem.css('left')).to.equal('30px')
      expect(body.elem.css('top')).to.equal('50px')
    })
  })

  describe('setRect', () => {
    it('it sets the rect', () => {
      const rect = new Rect({
        top: 0, right: 10, bottom: 40, left: 20
      })

      body.setRect(rect)

      expect(body.posture.width).to.equal(rect.width())
      expect(body.posture.height).to.equal(rect.height())
    })

    it('updates x, y and the dimension', () => {
      const rect = new Rect({
        top: 0, right: 10, bottom: 40, left: 20
      })

      body.setRect(rect)

      expect(body.topLimit()).to.equal(rect.top)
      expect(body.rightLimit()).to.equal(rect.right)
      expect(body.bottomLimit()).to.equal(rect.bottom)
      expect(body.leftLimit()).to.equal(rect.left)
    })
  })

  describe('setAt', () => {
    it('sets the body at the given point', () => {
      body.setAt(new Point(105, 205))

      expect(body.x).to.equal(105)
      expect(body.y).to.equal(205)
    })
  })

  describe('getPoint', () => {
    it('gets the point where the body is at', () => {
      const point = body.getPoint()

      expect(point.x).to.equal(30)
      expect(point.y).to.equal(40)
    })
  })

  describe('setArea', () => {
    it('sets the area which the body occupies', () => {
      body.setArea(new Area(15, 25))

      expect(body.posture.width).to.equal(15)
      expect(body.posture.height).to.equal(25)
    })
  })

  describe('getArea', () => {
    it('gets the area which the body occupies', () => {
      const area = body.getArea()

      expect(area.width).to.equal(10)
      expect(area.height).to.equal(20)
    })
  })
})
