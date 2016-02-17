import {Rect, Grid} from '../src'

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

    describe('extCutTop', () => {})
    describe('extCutLeft', () => {})
    describe('extCutRight', () => {})
    describe('extCutBottom', () => {})

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

})
