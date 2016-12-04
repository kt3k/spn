const { Rect, Grid, Point } = require('../src')
const { expect } = require('chai')

describe('Rect', () => {
  let rect

  beforeEach(() => {
    rect = new Rect({
      top: 100,
      left: 300,
      right: 500,
      bottom: 600
    })
  })

  describe('width', () => {
    it('returns the width of the rect', () => {
      expect(rect.width()).to.equal(200)
    })
  })

  describe('height', () => {
    it('returns the height of the rect', () => {
      expect(rect.height()).to.equal(500)
    })
  })

  describe('scaleTop', () => {
    it('scales the top side with the given scale', () => {
      const scaled = rect.scaleTop(2)

      expect(scaled.top).to.equal(-400)
      expect(scaled.left).to.equal(300)
      expect(scaled.right).to.equal(500)
      expect(scaled.bottom).to.equal(600)
    })
  })

  describe('scaleLeft', () => {
    it('scales the left side with the given scale', () => {
      const scaled = rect.scaleLeft(2)

      expect(scaled.top).to.equal(100)
      expect(scaled.left).to.equal(100)
      expect(scaled.right).to.equal(500)
      expect(scaled.bottom).to.equal(600)
    })
  })

  describe('scaleRight', () => {
    it('scales the right side with the given scale', () => {
      const scaled = rect.scaleRight(2)

      expect(scaled.top).to.equal(100)
      expect(scaled.left).to.equal(300)
      expect(scaled.right).to.equal(700)
      expect(scaled.bottom).to.equal(600)
    })
  })

  describe('scaleBottom', () => {
    it('scales the bottom side with the given scale', () => {
      const scaled = rect.scaleBottom(2)

      expect(scaled.top).to.equal(100)
      expect(scaled.left).to.equal(300)
      expect(scaled.right).to.equal(500)
      expect(scaled.bottom).to.equal(1100)
    })
  })

  describe('shiftUp', () => {
    it('shifts the rect upward the given units long', () => {
      const shifted = rect.shiftUp(2)

      expect(shifted.top).to.equal(-900)
      expect(shifted.left).to.equal(300)
      expect(shifted.right).to.equal(500)
      expect(shifted.bottom).to.equal(-400)
    })

    it('shifts the rect upward a unit long if called without argument', () => {
      const shifted = rect.shiftUp()

      expect(shifted.top).to.equal(-400)
      expect(shifted.left).to.equal(300)
      expect(shifted.right).to.equal(500)
      expect(shifted.bottom).to.equal(100)
    })
  })

  describe('shiftLeft', () => {
    it('shifts the rect leftward the given units long', () => {
      const shifted = rect.shiftLeft(2)

      expect(shifted.top).to.equal(100)
      expect(shifted.left).to.equal(-100)
      expect(shifted.right).to.equal(100)
      expect(shifted.bottom).to.equal(600)
    })

    it('shifts the rect leftward a unit long if called without argument', () => {
      const shifted = rect.shiftLeft()

      expect(shifted.top).to.equal(100)
      expect(shifted.left).to.equal(100)
      expect(shifted.right).to.equal(300)
      expect(shifted.bottom).to.equal(600)
    })
  })

  describe('shiftRight', () => {
    it('shifts the rect rightward the given units long', () => {
      const shifted = rect.shiftRight(2)

      expect(shifted.top).to.equal(100)
      expect(shifted.left).to.equal(700)
      expect(shifted.right).to.equal(900)
      expect(shifted.bottom).to.equal(600)
    })

    it('shifts the rect rightward a unit long if called without argument', () => {
      const shifted = rect.shiftRight()

      expect(shifted.top).to.equal(100)
      expect(shifted.left).to.equal(500)
      expect(shifted.right).to.equal(700)
      expect(shifted.bottom).to.equal(600)
    })
  })

  describe('shiftDown', () => {
    it('shifts the rect downward the given units long', () => {
      const shifted = rect.shiftDown(2)

      expect(shifted.top).to.equal(1100)
      expect(shifted.left).to.equal(300)
      expect(shifted.right).to.equal(500)
      expect(shifted.bottom).to.equal(1600)
    })

    it('shifts the rect downward a unit long if called without argument', () => {
      const shifted = rect.shiftDown()

      expect(shifted.top).to.equal(600)
      expect(shifted.left).to.equal(300)
      expect(shifted.right).to.equal(500)
      expect(shifted.bottom).to.equal(1100)
    })
  })

  describe('cutTop', () => {
    it('cuts the top part of the given height', () => {
      const cut = rect.cutTop(100)

      expect(cut.top).to.equal(100)
      expect(cut.left).to.equal(300)
      expect(cut.right).to.equal(500)
      expect(cut.bottom).to.equal(200)
    })
  })

  describe('cutLeft', () => {
    it('cuts the left part of the given width', () => {
      const cut = rect.cutLeft(100)

      expect(cut.top).to.equal(100)
      expect(cut.left).to.equal(300)
      expect(cut.right).to.equal(400)
      expect(cut.bottom).to.equal(600)
    })
  })

  describe('cutRight', () => {
    it('cuts the right part of the given width', () => {
      const cut = rect.cutRight(100)

      expect(cut.top).to.equal(100)
      expect(cut.left).to.equal(400)
      expect(cut.right).to.equal(500)
      expect(cut.bottom).to.equal(600)
    })
  })

  describe('cutBottom', () => {
    it('cuts the bottom part of the given height', () => {
      const cut = rect.cutBottom(100)

      expect(cut.top).to.equal(500)
      expect(cut.left).to.equal(300)
      expect(cut.right).to.equal(500)
      expect(cut.bottom).to.equal(600)
    })
  })

  describe('extCutTop', () => {
    it('cuts out the next area of the top side of the rect with the given height', () => {
      const cut = rect.extCutTop(50)

      expect(cut.top).to.equal(50)
      expect(cut.left).to.equal(300)
      expect(cut.right).to.equal(500)
      expect(cut.bottom).to.equal(100)
    })
  })

  describe('extCutLeft', () => {
    it('cuts out the next area of the left side of the rect with the given width', () => {
      const cut = rect.extCutLeft(50)

      expect(cut.top).to.equal(100)
      expect(cut.left).to.equal(250)
      expect(cut.right).to.equal(300)
      expect(cut.bottom).to.equal(600)
    })
  })

  describe('extCutRight', () => {
    it('cuts out the next area of the right side of the rect with the given width', () => {
      const cut = rect.extCutRight(50)

      expect(cut.top).to.equal(100)
      expect(cut.left).to.equal(500)
      expect(cut.right).to.equal(550)
      expect(cut.bottom).to.equal(600)
    })
  })

  describe('extCutBottom', () => {
    it('cuts out the next area of the bottom side of the rect with the given height', () => {
      const cut = rect.extCutBottom(50)

      expect(cut.top).to.equal(600)
      expect(cut.left).to.equal(300)
      expect(cut.right).to.equal(500)
      expect(cut.bottom).to.equal(650)
    })
  })

  describe('similarInnerTangent', () => {
    it('returns a similar rect which is an inner tangent of the given rect', () => {
      const tangent = rect.similarInnerTangent(new Rect({
        top: 0,
        left: 0,
        right: 100,
        bottom: 50
      }))

      expect(tangent.top).to.equal(0)
      expect(tangent.left).to.equal(40)
      expect(tangent.right).to.equal(60)
      expect(tangent.bottom).to.equal(50)

      const tangent0 = rect.similarInnerTangent(new Rect({
        top: 0,
        left: 0,
        right: 2000,
        bottom: 10000
      }))

      expect(tangent0.top).to.equal(2500)
      expect(tangent0.left).to.equal(0)
      expect(tangent0.right).to.equal(2000)
      expect(tangent0.bottom).to.equal(7500)
    })
  })

  describe('margin', () => {
    it('returns a new rect with the given margins added', () => {
      const margined = rect.margin({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
      })

      expect(margined.top).to.equal(110)
      expect(margined.left).to.equal(310)
      expect(margined.right).to.equal(490)
      expect(margined.bottom).to.equal(590)
    })
  })

  describe('windowAsRect', () => {
    it('returns a rect of the size of the current window', () => {
      const rect = Rect.windowAsRect()

      expect(rect.top).to.equal(0)
      expect(rect.left).to.equal(0)
      expect(rect.right).to.equal($(window).width())
      expect(rect.bottom).to.equal($(window).height())
    })
  })

  describe('getBestRect', () => {
    it('gets the best available rect inside it with the given horizontal and vertical ratios', () => {
      const best = rect.getBestRect({horizontal: 1, vertical: 2})

      expect(best.top).to.equal(150)
      expect(best.left).to.equal(300)
      expect(best.right).to.equal(500)
      expect(best.bottom).to.equal(550)

      const best0 = rect.getBestRect({horizontal: 1, vertical: 5})

      expect(best0.top).to.equal(100)
      expect(best0.left).to.equal(350)
      expect(best0.right).to.equal(450)
      expect(best0.bottom).to.equal(600)
    })
  })

  describe('toGrid', () => {
    it('returns a grid which has origin at the center of the rect', () => {
      const grid = rect.toGrid()

      expect(grid.x).to.equal(rect.centerX())
      expect(grid.y).to.equal(rect.centerY())
    })

    it('returns a grid which has unit width and height as the width and rect of the rect', () => {
      const grid = rect.toGrid()

      expect(grid.unitWidth).to.equal(rect.width())
      expect(grid.unitHeight).to.equal(rect.height())
    })
  })

  describe('dual', () => {
    it('returns a dual grid', () => {
      const dual = rect.dual()

      expect(dual).to.be.instanceof(Grid)
      expect(dual.x).to.equal(rect.centerX())
      expect(dual.y).to.equal(rect.centerY())
      expect(dual.unitWidth).to.equal(rect.width())
      expect(dual.unitHeight).to.equal(rect.height())
    })

    it('returns a dual grid and its dual is the same as the original', () => {
      const dualDual = rect.dual().dual()

      expect(dualDual).to.be.instanceof(Rect)
      expect(dualDual.top).to.equal(rect.top)
      expect(dualDual.left).to.equal(rect.left)
      expect(dualDual.right).to.equal(rect.right)
      expect(dualDual.bottom).to.equal(rect.bottom)
    })
  })

  describe('center', () => {
    it('returns the center point', () => {
      const point = rect.center()

      expect(point).to.be.instanceof(Point)
      expect(point.x).to.equal(rect.centerX())
      expect(point.y).to.equal(rect.centerY())
    })
  })

  describe('bottomCenter', () => {
    it('returns the bottom center point', () => {
      const point = rect.bottomCenter()

      expect(point).to.be.instanceof(Point)
      expect(point.x).to.equal(rect.centerX())
      expect(point.y).to.equal(rect.bottom)
    })
  })

  describe('topCenter', () => {
    it('returns the top center point', () => {
      const point = rect.topCenter()

      expect(point).to.be.instanceof(Point)
      expect(point.x).to.equal(rect.centerX())
      expect(point.y).to.equal(rect.top)
    })
  })
})
