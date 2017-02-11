import { Rect } from './index'
import { Errors } from './const/index'
import { error } from './util/index'

const rePercent = /(-?[0-9]+(\.[0-9]*)?)%$/

/**
 * @param {number|string} value The value of the margin or width
 * @param {number} length The whole length of the internval
 * @return {number}
 */
const calc = (value, length) => {
  if (value == null) {
    return value
  }

  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string' && rePercent.test(value)) {
    const match = value.match(rePercent)
    const percent = +match[1]

    return length * percent / 100
  }

  throw new Error(`The given number is invalid: '${value}' type: ${typeof value}`)
}

/**
 * Interval model represents the interval on the line.
 *
 * Interval is immutable.
 */
export default class Interval {
  /**
   * @param {number} high The high of the interval
   * @param {number} low The low of the interval
   */
  constructor (high, low) {
    if (high < low) {
      [high, low] = [low, high]
    }

    this.high = high
    this.low = low
  }

  /**
   * Returns the width of the interval.
   *
   * @return {number}
   */
  width () {
    return this.high - this.low
  }

  /**
   * Returns the middle of the interval.
   *
   * @return {number}
   */
  middle () {
    return (this.high + this.low) / 2
  }

  /**
   * Returns a product (a rect) of the intervals.
   *
   * @param {Interval} interval
   * @param {Rect}
   */
  by (interval) {
    return Rect.ofIntervals(this, interval)
  }

  /**
   * @param {number} width
   * @return {Interval}
   */
  cutHigh (width) {
    return new Interval(this.high, this.high - width)
  }

  /**
   * @param {number} width
   * @return {Interval}
   */
  cutLow (width) {
    return new Interval(this.low + width, this.low)
  }

  /**
   * Returns an interval which is shifted the given amount.
   *
   * @param {number} shift The amount of shift, n means shift higher position by its size * n
   * @return {Interval}
   */
  shift (n) {
    const shiftWidth = this.width() * n

    return new Interval(this.high + shiftWidth, this.low + shiftWidth)
  }

  /**
   * @param {number} highMargin
   * @param {number} lowMargin
   * @return {Interval}
   */
  margin (highMargin, lowMargin) {
    return new Interval(this.high - highMargin, this.low + lowMargin)
  }

  /**
   * Slices out an interval from the given parameters.
   * @param {number|string} high The higher margin
   * @param {number|string} width The width
   * @param {number|string} low The lower margin
   */
  slice (low, width, high) {
    high = calc(high, this.width())
    width = calc(width, this.width())
    low = calc(low, this.width())

    if (high != null && width != null && low != null) {
      throw error(Errors.INTERVAL_SLICE_ERROR_TOO_MUCH_ARGUMENTS)
    }

    if (high != null && low != null) {
      return this.margin(high, low)
    }

    if (high != null && width != null) {
      return this.margin(high, 0).cutHigh(width)
    }

    if (width != null && low != null) {
      return this.margin(0, low).cutLow(width)
    }

    if (width != null) {
      throw error(Errors.INTERVAL_SLICE_ERROR_ONLY_WIDTH)
    }

    if (high != null) {
      return this.margin(high, 0)
    }

    if (low != null) {
      return this.margin(0, low)
    }

    return this
  }

  /**
   * @param {number} size The size of the interval
   * @return {Interval}
   */
  static ofSize (size) {
    return new Interval(size, 0)
  }
}
