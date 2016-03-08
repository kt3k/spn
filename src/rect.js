import Grid from './grid'
import ifNumElse from './if-num-else'
import Interval from './interval'

/**
 * Rect model represents the static rectangle in a screen.
 *
 * Rect is immutable.
 */
export default class Rect {

    /**
     * @param {number} top The top position
     * @param {number} right The right position
     * @param {number} bottom The bottom position
     * @param {number} left The left position
     */
    constructor({top, right, bottom, left}) {

        this.horizontal = new Interval(right, left)
        this.vertical = new Interval(bottom, top)

    }

    /**
     * Gets the top position.
     * @return {number}
     */
    get top() {
        return this.vertical.low
    }

    /**
     * Gets the bottom position.
     * @return {number}
     */
    get bottom() {
        return this.vertical.high
    }

    /**
     * Gets the left position.
     * @return {number}
     */
    get left() {
        return this.horizontal.low
    }

    /**
     * Gets the right position.
     * @return {number}
     */
    get right() {
        return this.horizontal.high
    }

    static ofIntervals(horizontal, vertical) {

        return new Rect({
            top: vertical.low,
            bottom: vertical.high,
            left: horizontal.low,
            right: horizontal.high
        })

    }

    /**
     * Gets the width.
     *
     * @return {number}
     */
    width() {

        return this.horizontal.width()

    }

    /**
     * Gets the height.
     *
     * @return {number}
     */
    height() {

        return this.vertical.width()

    }

    /**
     * Gets the horizontal center.
     *
     * @return {number}
     */
    centerX() {

        return this.horizontal.middle()

    }

    /**
     * Gets the vertical center.
     *
     * @return {number}
     */
    centerY() {

        return this.vertical.middle()

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
     * Shifts up by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */
    shiftUp(n = 1) {

        return this.horizontal.by(this.vertical.shift(-n))

    }

    /**
     * Shifts left by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */
    shiftLeft(n = 1) {

        return this.horizontal.shift(-n).by(this.vertical)

    }

    /**
     * Shifts right by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */
    shiftRight(n = 1) {

        return this.horizontal.shift(n).by(this.vertical)

    }

    /**
     * Shifts down by the given number of units.
     *
     * @param {number} n The number to shift
     * @return {Rect}
     */
    shiftDown(n = 1) {

        return this.horizontal.by(this.vertical.shift(n))

    }

    /**
     * Cuts out the given height from the top.
     *
     * @param {number} [height=0] The height
     * @return {Rect}
     */
    cutTop(height) {

        return this.horizontal.by(this.vertical.cutLow(height))

    }

    /**
     * Cuts out the given height from the left.
     *
     * @param {number} [width=0] The width
     * @return {Rect}
     */
    cutLeft(width) {

        return this.horizontal.cutLow(width).by(this.vertical)

    }

    /**
     * Cuts out the given height from the right.
     *
     * @param {number} [width=0] The width
     * @return {Rect}
     */
    cutRight(width) {

        return this.horizontal.cutHigh(width).by(this.vertical)

    }

    /**
     * Cuts out the given height from the bottom.
     *
     * @param {number} [height=0] The height
     * @return {Rect}
     */
    cutBottom(height) {

        return this.horizontal.by(this.vertical.cutHigh(height))

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

        let horizontal = rect.horizontal
        let vertical = rect.vertical

        if (rect.width() / rect.height() > this.width() / this.height()) {

            const horizontalMargin = (rect.width() - this.width() * rect.height() / this.height()) / 2
            horizontal = horizontal.margin(horizontalMargin, horizontalMargin)

        } else {

            const verticalMargin = (rect.height() - this.height() * rect.width() / this.width()) / 2
            vertical = vertical.margin(verticalMargin, verticalMargin)

        }

        return horizontal.by(vertical)

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

        return this.horizontal.margin(ifNumElse(right, 0), ifNumElse(left, 0))
            .by(this.vertical.margin(ifNumElse(bottom, 0), ifNumElse(top, 0)))

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
     * Gets the best (biggest) available rect inside this rect of the given horizontal and vertical ratio.
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

        return Interval.ofSize(width).by(Interval.ofSize(height))

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
