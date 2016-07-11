const ifNumElse = require('./if-num-else')
const Rect = require('./rect')

/**
 * Posture is the model of the information about how the Body is placed and arranged to its position.
 *
 * @class
 */
class Posture {
  /**
   * @param {Number} [width=100] The width
   * @param {Number} [height=100] The height
   * @param {Number} [ratioX=0] The ratio of horizontal position of the rectangle. ratioX == 0 means the left limit of the rectangle is x. ratioX == 1 means the right limit of the rectangle is x.
   * @param {Number} [ratioY=0] The ratio of vertical position of the rectangle. ratioY == 0 means the top limit of the rectangle is x. ratioY == 1 means the bottom limit of the rectangle is x.
   * @param {Number} [marginX=0] The horizontal margin
   * @param {Number} [marginY=0] The vertical margin
   * @param {Number} [marginLeft] The left margin
   * @param {Number} [marginTop] The top margin
   * @param {Number} [marginRight] The right margin
   * @param {Number} [marginBottom] The bottom margin
   */
  constructor ({width, height, ratioX, ratioY, marginX, marginY, marginLeft, marginTop, marginRight, marginBottom} = {}) {
    this.width = ifNumElse(width, 100)
    this.height = ifNumElse(height, 100)

    this.ratioX = ifNumElse(ratioX, 0)
    this.ratioY = ifNumElse(ratioY, 0)

    this.marginX = ifNumElse(marginX, 0)
    this.marginY = ifNumElse(marginY, 0)

    this.marginTop = marginTop
    this.marginRight = marginRight
    this.marginBottom = marginBottom
    this.marginLeft = marginLeft
  }

  /**
   * The actual height of the rect.
   *
   * @return {Number}
   */
  actualHeight () {
    return this.height - this.getMarginTop() - this.getMarginBottom()
  }

  /**
   * The actual width of the rect.
   *
   * @return {Number}
   */
  actualWidth () {
    return this.width - this.getMarginLeft() - this.getMarginRight()
  }

  /**
   * Returns the top margin.
   *
   * @return {Number}
   */
  getMarginTop () {
    return ifNumElse(this.marginTop, this.marginY)
  }

  /**
   * Returns the right margin.
   *
   * @return {Number}
   */
  getMarginRight () {
    return ifNumElse(this.marginRight, this.marginX)
  }

  /**
   * Returns the bottom margin.
   *
   * @return {Number}
   */
  getMarginBottom () {
    return ifNumElse(this.marginBottom, this.marginY)
  }

  /**
   * Returns the left margin.
   *
   * @return {Number}
   */
  getMarginLeft () {
    return ifNumElse(this.marginLeft, this.marginX)
  }

  /**
   * The top limit of the rect.
   *
   * @param {Number} y The primary vertical position
   * @return {Number}
   */
  topLimit (y) {
    return y - this.height * this.ratioY + this.getMarginTop()
  }

  /**
   * The bottom limit of the rect.
   *
   * @param {Number} y The primary vertical position
   * @return {Number}
   */
  bottomLimit (y) {
    return this.topLimit(y) + this.actualHeight()
  }

  /**
   * The left limit of the rect.
   *
   * @param {Number} x The primary horizontal position
   * @return {Number}
   */
  leftLimit (x) {
    return x - this.width * this.ratioX + this.getMarginLeft()
  }

  /**
   * The right limit of the rect.
   *
   * @param {Number} x The primary horizontal position
   * @return {Number}
   */
  rightLimit (x) {
    return this.leftLimit(x) + this.actualWidth()
  }

  /**
   * The horizontal center of the rect.
   *
   * @param {Number} x The primary horizontal position
   * @return {Number}
   */
  centerX (x) {
    return (this.leftLimit(x) + this.rightLimit(x)) / 2
  }

  /**
   * The vertical center of the rect.
   *
   * @param {Number} y The primary vertical position
   * @return {Number}
   */
  centerY (y) {
    return (this.topLimit(y) + this.bottomLimit(y)) / 2
  }

  /**
   * Gets the horizontal position when it is placed in the given rect.
   *
   * @param {Rect} rect
   * @return {number}
   */
  getXInRect (rect) {
    return rect.left + rect.width() * this.ratioX
  }

  /**
   * Gets the vertical position when it is placed in the given rect.
   * @param {Rect} rect
   * @return {number}
   */
  getYInRect (rect) {
    return rect.top + rect.height() * this.ratioY
  }

  /**
   * Fits the size to the size of the given rect.
   * @param {Rect} rect
   */
  fitToRect (rect) {
    this.fitToArea(rect.area())
  }

  /**
   * Fits the size to the given area.
   * @param {Area} area The area
   */
  fitToArea (area) {
    this.width = area.width
    this.height = area.height
  }

  /**
   * Scales the rectangle to fit as an inner tangent of the rectangle of the given width and height.
   *
   * @param {Number} width The width of the target outer rectangle
   * @param {Number} height The height of the target outer rectangle
   */
  fitInto (width, height) {
    const tangent = new Rect({
      top: 0,
      left: 0,
      right: this.width,
      bottom: this.height
    }).similarInnerTangent(new Rect({
      top: 0,
      left: 0,
      right: width,
      bottom: height
    }))

    this.width = tangent.width()
    this.height = tangent.height()
  }
}

module.exports = Posture
