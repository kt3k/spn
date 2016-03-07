import Grid from './grid'
import ifNumElse from './if-num-else'

/**
 * Rect model represents the static rectangle in a screen.
 */
export default class Rect {

    /**
     * @param {number} top The top position
     * @param {number} right The right position
     * @param {number} bottom The bottom position
     * @param {number} left The left position
     */
    constructor({top, right, bottom, left}) {

        this.top = top
        this.right = right
        this.bottom = bottom
        this.left = left

    }

    /**
     * Gets the width.
     *
     * @return {Number}
     */
    width() {

        return this.right - this.left

    }

    /**
     * Gets the height.
     *
     * @return {Number}
     */
    height() {

        return this.bottom - this.top

    }

    /**
     * Gets the horizontal center.
     */
    centerX() {

        return (this.left + this.right) / 2

    }

    /**
     * Gets the vertical center.
     */
    centerY() {

        return (this.top + this.bottom) / 2

    }

    /**
     * Returns a new rect whose parameters are overrided by the given object.
     *
     * @param {number} [top] The top
     * @param {number} [left] The left
     * @param {number} [right] The right
     * @param {number} [bottom] The bottom
     * @return {Rect}
     */
    override({top, left, right, bottom}) {

        return new Rect({
            top: ifNumElse(top, this.top),
            left: ifNumElse(left, this.left),
            right: ifNumElse(right, this.right),
            bottom: ifNumElse(bottom, this.bottom)
        })

    }

    /**
     * Returns a new rect which scales the top side
     *
     * @param {number} scale The scale rate
     * @return {Rect}
     */
    scaleTop(scale) {

        return this.cutBottom(this.height() * scale)

    }

    /**
     * Returns a new rect which scales the left side
     *
     * @param {number} scale The scale rate
     * @return {Rect}
     */
    scaleLeft(scale) {

        return this.cutRight(this.width() * scale)

    }

    /**
     * Returns a new rect which scales the right side
     *
     * @param {number} scale The scale rate
     * @return {Rect}
     */
    scaleRight(scale) {

        return this.cutLeft(this.width() * scale)

    }

    /**
     * Returns a new rect which scales the bottom side
     *
     * @param {number} scale The scale rate
     * @return {Rect}
     */
    scaleBottom(scale) {

        return this.cutTop(this.height() * scale)

    }

    /**
     * Returns a shifted rect by the given horizontal and vertical numbers.
     *
     * @protected
     * @param {number} [m=0] The horizontal number
     * @param {number} [n=0] The vertical number
     * @return {Rect}
     */
    shift(m, n) {

        const width = this.width()
        const height = this.height()

        return this.override({
            top: this.top + n * height,
            left: this.left + m * width,
            right: this.right + m * width,
            bottom: this.bottom + n * height
        })

    }

    /**
     * Shifts up by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */
    shiftUp(n = 1) {

        return this.shift(0, -n)

    }

    /**
     * Shifts left by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */
    shiftLeft(n = 1) {

        return this.shift(-n, 0)

    }

    /**
     * Shifts right by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */
    shiftRight(n = 1) {

        return this.shift(n, 0)

    }

    /**
     * Shifts down by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */
    shiftDown(n = 1) {

        return this.shift(0, n)

    }

    /**
     * Cuts out the given height from the top.
     *
     * @param {number} [height=0] The height
     * @return {Rect}
     */
    cutTop(height) {

        return this.override({bottom: this.top + height})

    }

    /**
     * Cuts out the given height from the left.
     *
     * @param {number} [width=0] The width
     * @return {Rect}
     */
    cutLeft(width) {

        return this.override({right: this.left + width})

    }

    /**
     * Cuts out the given height from the right.
     *
     * @param {number} [width=0] The width
     * @return {Rect}
     */
    cutRight(width) {

        return this.override({left: this.right - width})

    }

    /**
     * Cuts out the given height from the bottom.
     *
     * @param {number} [height=0] The height
     * @return {Rect}
     */
    cutBottom(height) {

        return this.override({top: this.bottom - height})

    }

    /**
     * Return the next rect which shares the top side of the given height
     *
     * @param {number} height The height
     * @return {Rect}
     */
    extCutTop(height) {

        return this.shiftUp().cutBottom(height)

    }

    /**
     * Return the next rect which shares the left side of the given width
     *
     * @param {number} width The width
     * @return {Rect}
     */
    extCutLeft(width) {

        return this.shiftLeft().cutRight(width)

    }

    /**
     * Return the next rect which shares the right side of the given width
     *
     * @param {number} width The width
     * @return {Rect}
     */
    extCutRight(width) {

        return this.shiftRight().cutLeft(width)

    }

    /**
     * Return the next rect which shares the bottom side of the given height
     *
     * @param {number} height The height
     * @return {Rect}
     */
    extCutBottom(height) {

        return this.shiftDown().cutTop(height)

    }

    /**
     * Returns a dual grid
     *
     * @return {Grid}
     */
    toGrid() {

        return new Grid({
            x: this.centerX(),
            y: this.centerY(),
            unitWidth: this.width(),
            unitHeight: this.height()
        })

    }

    /**
     * Returns the similar rect which is an inner tangent of (and at the center of) the given rect.
     *
     * @param {Rect} rect The target rect
     * @return {Rect}
     */
    similarInnerTangent(rect) {

        let horizontalMargin, verticalMargin

        if (rect.width() / rect.height() > this.width() / this.height()) {

            const width = this.width() * rect.height() / this.height()
            horizontalMargin = (rect.width() - width) / 2
            verticalMargin = 0

        } else {

            const height = this.height() * rect.width() / this.width()
            horizontalMargin = 0
            verticalMargin = (rect.height() - height) / 2

        }

        return new Rect({
            top: rect.top + verticalMargin,
            left: rect.left + horizontalMargin,
            right: rect.right - horizontalMargin,
            bottom: rect.bottom - verticalMargin
        })

    }

    /**
     * Excludes the margin of the given sides.
     *
     * @param {number} top The top margin
     * @param {number} left The left margin
     * @param {number} right The right margin
     * @param {number} bottom The bottom margin
     */
    margin({top, left, right, bottom}) {

        return new Rect({
            top: this.top + ifNumElse(top, 0),
            left: this.left + ifNumElse(left, 0),
            right: this.right - ifNumElse(right, 0),
            bottom: this.bottom - ifNumElse(bottom, 0)
        })
    }

    /**
     * Retruns the rect of the size of the current window.
     *
     * @return {Rect}
     */
    static windowAsRect() {

        return Rect.ofSize($(window).width(), $(window).height())

    }

    /**
     * Gets the best (biggest) available rect inside this rect of the given horizontal and vertial ratio.
     *
     * @param {number} horizontal The horizontal ratio
     * @param {number} vertical The vertical ratio
     * @return {Rect}
     */
    getBestRect({horizontal, vertical}) {

        return Rect.ofSize(horizontal, vertical).similarInnerTangent(this)

    }

    /**
     * Creates the rect of the give size.
     *
     * @param {number} width The width
     * @param {number} height The height
     */
    static ofSize(width, height) {

        return new Rect({
            top: 0,
            left: 0,
            right: width,
            bottom: height
        })

    }

    /**
     * Returns a dual grid
     *
     * @return {Grid}
     */
    dual() {

        return this.toGrid()

    }

}
