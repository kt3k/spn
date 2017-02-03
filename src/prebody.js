const wait = require('./wait')
const Being = require('./being')
const Posture = require('./posture')
const reflow = require('./reflow')
const Point = require('./point')
const Area = require('./area')
const ifNumElse = require('./if-num-else')
const applyIfFunction = require('./apply-if-function')

/**
 * Converts the pixel to the number.
 * @param {string} px The pixel
 * @return {number}
 */
const pxToNum = px => +px.slice(0, -2)

/**
 * Prebody has width, height, position and information about how it put at the postion.
 *
 * Unlike Body, Prebody works as a treat.
 */
class Prebody extends Being {

  /**
   * Gets (or creates if unavailable) the posture of the prebody.
   * @return {Posture}
   */
  getPosture () {
    if (!this.posture) {
      const width = applyIfFunction(this, this.width)
      const height = applyIfFunction(this, this.height)
      const ratioX = applyIfFunction(this, this.ratioX)
      const ratioY = applyIfFunction(this, this.ratioY)
      const marginX = applyIfFunction(this, this.marginX)
      const marginY = applyIfFunction(this, this.marginY)
      const marginTop = applyIfFunction(this, this.marginTop)
      const marginLeft = applyIfFunction(this, this.marginLeft)
      const marginRight = applyIfFunction(this, this.marginRigth)
      const marginBottom = applyIfFunction(this, this.marginBottom)

      this.posture = new Posture({
        width,
        height,
        ratioX,
        ratioY,
        marginX,
        marginY,
        marginLeft,
        marginTop,
        marginRight,
        marginBottom
      })
    }

    return this.posture
  }

  /**
   * Returns the actual width of the elem.
   */
  actualWidth () {
    return this.getPosture().actualWidth()
  }

  /**
   * Returns the actual height of the elem.
   */
  actualHeight () {
    return this.getPosture().actualHeight()
  }

  /**
   * Prepares dom of the body.
   * @override
   */
  willShow () {
    this.updateOffset()
    this.updateRect()

    reflow(this.el)
  }

  /**
   * Gets the right limit in px.
   * @return {Number} x value of the right limit
   */
  rightLimit () {
    return this.getPosture().rightLimit(this.x)
  }

  /**
   * Gets the left limit in px.
   * @return {Number} x value of the left limit
   */
  leftLimit () {
    return this.getPosture().leftLimit(this.x)
  }

  /**
   * Gets the top limit in px.
   */
  topLimit () {
    return this.getPosture().topLimit(this.y)
  }

  /**
   * Gets the bottom limit in px.
   */
  bottomLimit () {
    return this.getPosture().bottomLimit(this.y)
  }

  /**
   * Gets the x of the center.
   * @return {Number}
   */
  centerX () {
    return this.getPosture().centerX(this.x)
  }

  /**
   * Gets the y of the center.
   * @return {Number}
   */
  centerY () {
    return this.getPosture().centerY(this.y)
  }

  /**
   * Updates the elem's offset according to current position.
   * @private
   */
  updateOffset () {
    this.elem.css('top', this.topLimit())
    this.elem.css('left', this.leftLimit())
  }

  /**
   * Updates the elem's width and height.
   * @private
   */
  updateRect () {
    this.elem.width(this.actualWidth())
    this.elem.height(this.actualHeight())
  }

  /**
   * Stops the dom transition and update current state by the dom state.
   * @private
   */
  stop () {
    this.elem.width(this.elem.width())
    this.elem.height(this.elem.height())
    this.elem.css('top', this.elem.css('top'))
    this.elem.css('left', this.elem.css('left'))

    const posture = this.getPosture()

    posture.setActualWidth(this.elem.width())
    posture.setActualHeight(this.elem.height())

    this.x = pxToNum(this.elem.css('left')) + posture.width * posture.ratioX
    this.y = pxToNum(this.elem.css('top')) + posture.height * posture.ratioY
  }

  /**
   * Updates the dom with current state and returns a promise which resolves when the updates finished.
   * @param {number} [duration] The transition duration
   * @return {Promise}
   */
  engage (duration) {
    duration = ifNumElse(duration, this.defaultTransitionDuration())

    this.elem.css('transition-duration', duration + 'ms')

    reflow(this.el)

    this.updateRect()
    this.updateOffset()

    return wait(duration)
  }

  /**
   * Fits to the guiding rect (updates the x, y and posture to fit into the given rect. does not update the dom)
   * @param {Rect} rect
   */
  setRect (rect) {
    const posture = this.getPosture()

    this.x = posture.getXInRect(rect)
    this.y = posture.getYInRect(rect)

    this.posture.fitToRect(rect)
  }

  /**
   * Sets the body at the given point.
   * @param {Point} point The point
   */
  setAt (point) {
    this.x = point.x
    this.y = point.y
  }

  /**
   * Returns the point where this body is at.
   * @return {Point}
   */
  getPoint () {
    return new Point(this.x, this.y)
  }

  /**
   * @param {Area} area The area to fit
   */
  setArea (area) {
    this.getPosture().fitToArea(area)
  }

  /**
   * Gets the area which the body occupies.
   * @return {Area}
   */
  getArea () {
    const posture = this.getPosture()

    return new Area(posture.width, posture.height)
  }
}

module.exports = Prebody
