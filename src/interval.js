import Rect from './rect'
/**
 * Interval model represents the interval on the line.
 */
export default class Interval {

    /**
     * @param {number} high The high of the interval
     * @param {number} low The low of the interval
     */
    constructor(high, low) {

        this.high = high
        this.low = low

    }

    /**
     * Returns the width of the interval.
     *
     * @return {number}
     */
    width() {

        return this.high - this.low

    }

    /**
     * Returns the middle of the interval.
     *
     * @return {number}
     */
    middle() {

        return (this.high + this.low) / 2

    }

    /**
     * Returns a product (a rect) of the intervals.
     *
     * @param {Interval} interval
     * @param {Rect}
     */
    by(interval) {

        return Rect.ofIntervals(this, interval)

    }

    /**
     * @param {number} width
     * @return {Interval}
     */
    cutHigh(width) {

        return new Interval(this.high, this.high - width)

    }

    /**
     * @param {number} width
     * @return {Interval}
     */
    cutLow(width) {

        return new Interval(this.low + width, this.low)

    }

    /**
     * @param {number} scale
     * @return {Interval}
     */
    scaleHigh(scale) {

        return this.cutLow(this.width() * scale)

    }

    /**
     * @param {number} scale
     * @return {Interval}
     */
    scaleLow(scale) {

        return this.cutHigh(this.width() * scale)

    }

    /**
     * Returns an interval which is shifted the given amount.
     *
     * @param {number} shift The amount of shift, n means shift higher position by its size * n
     * @return {Interval}
     */
    shift(n) {

        const shiftWidth = this.width() * n

        return new Interval(this.high + shiftWidth, this.low + shiftWidth)

    }

    /**
     * @param {number} highMargin
     * @param {number} lowMargin
     * @return {Interval}
     */
    margin(highMargin, lowMargin) {

        return new Interval(this.high - highMargin, this.low + lowMargin)

    }

    /**
     * @param {number} size The size of the interval
     * @return {Interval}
     */
    static ofSize(size) {

        return new Interval(size, 0)

    }

}
