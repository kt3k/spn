import wait from './wait'
import Being from './being'
import Posture from './posture'
import reflow from './reflow'

/**
 * Body has width, height, position and information about how it put at the postion.
 * @abstract
 */
export default class Body extends Being {

    constructor() {
        super()

        /**
         * @property {Number} x sprite's x coordinate value
         */
        this.x = 0

        /**
         * @property {Number} y sprite's y coordinate value
         */
        this.y = 0

        /**
         * @property {Posture} posture The posture of the rectangle
         */
        this.posture = new Posture({
            width: this.width(),
            height: this.height(),
            ratioX: this.ratioX(),
            ratioY: this.ratioY(),
            marginX: this.marginX(),
            marginY: this.marginY()
        })

    }

    /**
     * Default parameters
     */
    width() { return 100 }
    height() { return 100 }
    ratioX() { return 0 }
    ratioY() { return 0 }
    marginX() { return 0 }
    marginY() { return 0 }

    /**
     * Returns the actual width of the elem.
     */
    actualWidth() {

        return this.posture.actualWidth()

    }

    /**
     * Returns the actual height of the elem.
     */
    actualHeight() {

        return this.posture.actualHeight()

    }

    /**
     * Prepares dom of the body.
     * @override
     */
    willShow() {

        this.updateElem()

    }

    /**
     * Gets the right limit in px.
     * @return {Number} x value of the right limit
     */
    rightLimit() {

        return this.posture.rightLimit(this.x)

    }

    /**
     * Gets the left limit in px.
     * @return {Number} x value of the left limit
     */
    leftLimit() {

        return this.posture.leftLimit(this.x)

    }

    /**
     * Gets the top limit in px.
     */
    topLimit() {

        return this.posture.topLimit(this.y)

    }

    /**
     * Gets the bottom limit in px.
     */
    bottomLimit() {

        return this.posture.bottomLimit(this.y)

    }

    /**
     * Gets the x of the center.
     * @return {Number}
     */
    centerX() {

        return this.posture.centerX(this.x)

    }

    /**
     * Gets the y of the center.
     * @return {Number}
     */
    centerY() {

        return this.posture.centerY(this.y)

    }

    /**
     * Updates the elem's offset according to current position.
     * @private
     */
    updateOffset() {

        this.elem.css('top', this.posture.topLimit(this.y))
        this.elem.css('left', this.posture.leftLimit(this.x))

    }

    /**
     * Updates the elem's width and height.
     * @private
     */
    updateRect() {

        this.elem.width(this.posture.actualWidth())
        this.elem.height(this.posture.actualHeight())

    }

    /**
     * Updates the actual elem dom according to the current posture.
     * Returns a promise which resolves with the transitionDuration milliseconds.
     * @param {Number} [dur] The
     * @return {Promise}
     */
    updateElem(dur) {

        if (dur) {

            this.setTransitionDuration(dur)

        }

        this.updateRect()
        this.updateOffset()

        return wait(this.transitionDuration)

    }

    /**
     * Moves the elem to the given y position.
     * @param {Number} to The y position
     */
    moveToY(to) {

        this.y = to

        return this.updateElem()

    }

    /**
     * Moves the elem to the given x position.
     * @param {Number} to The x position
     */
    moveToX(to) {

        this.x = to

        return this.updateElem()

    }

    /**
     * Sets the transition duration.
     * @param {Number} dur The transition duration
     */
    setTransitionDuration(dur) {

        this.transitionDuration = dur

        this.elem.css('transition-duration', dur + 'ms')

        reflow(this.elem)

    }

    /**
     * Fits to the guiding rect (updates the x, y and posture to fit into the given rect. does not update the dom)
     * @param {Rect} rect
     */
    setRect(rect) {

        this.x = this.posture.getXInRect(rect)
        this.y = this.posture.getYInRect(rect)

        this.posture.fitToRect(rect)

    }

}
