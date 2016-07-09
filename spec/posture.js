import {Posture, Rect} from '../src'

describe('Posture', () => {
  let posture

  beforeEach(() => {
    posture = new Posture({
      width: 100,
      height: 200,
      ratioX: 0.5,
      ratioY: 0.75,
      marginX: 5,
      marginY: 10
    })
  })

  it('gets width, height, originX, originY, marginX and marginY props from param obj', () => {
    expect(posture.width).to.equal(100)
    expect(posture.height).to.equal(200)
    expect(posture.ratioX).to.equal(0.5)
    expect(posture.ratioY).to.equal(0.75)
    expect(posture.marginX).to.equal(5)
    expect(posture.marginY).to.equal(10)
  })

  it('has default width and height 100 and 100 resp. when they omitted', () => {
    posture = new Posture()

    expect(posture.width).to.equal(100)
    expect(posture.height).to.equal(100)
  })

  describe('actualHeight', () => {
    it('returns the actual height', () => {
      expect(posture.actualHeight()).to.equal(180)
    })
  })

  describe('actualWidth', () => {
    it('returns the actual width', () => {
      expect(posture.actualWidth()).to.equal(90)
    })
  })

  describe('topLimit', () => {
    it('returns the top limit', () => {
      expect(posture.topLimit(0)).to.equal(-140)
      expect(posture.topLimit(100)).to.equal(-40)
      expect(posture.topLimit(200)).to.equal(60)
      expect(posture.topLimit(300)).to.equal(160)
    })
  })

  describe('bottomLimit', () => {
    it('returns the bottom limit', () => {
      expect(posture.bottomLimit(0)).to.equal(40)
      expect(posture.bottomLimit(100)).to.equal(140)
      expect(posture.bottomLimit(200)).to.equal(240)
      expect(posture.bottomLimit(300)).to.equal(340)
    })
  })

  describe('leftLimit', () => {
    it('returns the left limit', () => {
      expect(posture.leftLimit(0)).to.equal(-45)
      expect(posture.leftLimit(100)).to.equal(55)
      expect(posture.leftLimit(200)).to.equal(155)
      expect(posture.leftLimit(300)).to.equal(255)
    })
  })

  describe('rightLimit', () => {
    it('returns the right limit', () => {
      expect(posture.rightLimit(0)).to.equal(45)
      expect(posture.rightLimit(100)).to.equal(145)
      expect(posture.rightLimit(200)).to.equal(245)
      expect(posture.rightLimit(300)).to.equal(345)
    })
  })

  describe('centerX', () => {
    it('returns the horizontal center', () => {
      expect(posture.centerX(0)).to.equal(0)
      expect(posture.centerX(100)).to.equal(100)
      expect(posture.centerX(200)).to.equal(200)
      expect(posture.centerX(300)).to.equal(300)
    })
  })

  describe('centerY', () => {
    it('returns the vertical center', () => {
      expect(posture.centerY(0)).to.equal(-50)
      expect(posture.centerY(100)).to.equal(50)
      expect(posture.centerY(200)).to.equal(150)
      expect(posture.centerY(300)).to.equal(250)
    })
  })

  describe('getXInRect', () => {
    it('gets the horizontal position when the posture is put in the rect', () => {
      const rect = new Rect({
        top: 100,
        left: 100,
        right: 200,
        bottom: 200
      })

      expect(posture.getXInRect(rect)).to.equal(150)
    })
  })

  describe('getYInRect', () => {
    it('gets the horizontal position when the posture is put in the rect', () => {
      const rect = new Rect({
        top: 100,
        left: 100,
        right: 200,
        bottom: 200
      })

      expect(posture.getYInRect(rect)).to.equal(175)
    })
  })

  describe('fitToRect', () => {
    it('fits the size of the posture to the size of the given rect', () => {
      const rect = new Rect({
        top: 100,
        left: 100,
        right: 1800,
        bottom: 2300
      })

      posture.fitToRect(rect)

      expect(posture.width).to.equal(rect.width())
      expect(posture.height).to.equal(rect.height())
    })
  })

  describe('fitInto', () => {
    it('fits the posture into the given width and height keeping the width/height ratio', () => {
      posture.fitInto(50, 1000)

      expect(posture.width).equal(50)
      expect(posture.height).equal(100)

      posture.fitInto(200, 1000)

      expect(posture.width).equal(200)
      expect(posture.height).equal(400)

      posture.fitInto(1000, 800)

      expect(posture.width).equal(400)
      expect(posture.height).equal(800)
    })
  })
})
