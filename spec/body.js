import Body from '../src/body'
import Rect from '../src/rect'

describe('Body', () => {

    let elem, body

    class MyBody extends Body {

        width() { return 10 }
        height() { return 20 }

    }

    class MarginedBody extends Body {

        width() { return 100 }
        height() { return 100 }
        marginX() { return 15 }
        marginY() { return 25 }

    }

    beforeEach(() => {

        elem = $('<div />')

        body = new MyBody(elem)

        body.x = 30
        body.y = 40

    })

    it('has default width=100 and height=100', () => {

        const body = new Body($('<div />'))

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

        it('sets the elem position as absolute', () => {

            body.updateElem()
            expect(body.elem.css('position')).to.equal('absolute')

        })

        it('sets the duration of the transition if given', () => {

            body.updateElem(345)

            expect(body.elem.css('transition-duration')).to.equal('345ms')

        })

    })

    describe('willShow', () => {

        it('calls updateElem', done => {

            body.updateElem = () => done()

            body.willShow()

        })

    })

    describe('actualWidth and actualHeight', () => {

        it('returns the actual width and height, respectively', () => {

            const body = new MarginedBody($('<div />'))

            body.updateElem()

            expect(body.actualWidth()).to.equal(70)
            expect(body.actualHeight()).to.equal(50)

        })

    })

    describe('rightLimit', () => {

        it('returns the right limit x position', () => {

            expect(body.rightLimit()).to.equal(40)

        })

    })

    describe('leftLimit', () => {

        it('returns the left limit x position', () => {

            expect(body.leftLimit()).to.equal(30)

        })

    })

    describe('topLimit', () => {

        it('returns the top limit y position', () => {

            expect(body.topLimit()).to.equal(40)

        })

    })

    describe('bottomLimit', () => {

        it('returns the bottom limit y position', () => {

            expect(body.bottomLimit()).to.equal(60)

        })

    })

    describe('centerX and centerY', () => {

        it('returns the x of the center of the body', () => {

            expect(body.centerX()).to.equal(35)
            expect(body.centerY()).to.equal(50)

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

})