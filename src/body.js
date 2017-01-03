const wait = require('./wait')
const Being = require('./being')
const Posture = require('./posture')
const reflow = require('./reflow')
const Point = require('./point')
const Area = require('./area')
const ifNumElse = require('./if-num-else')

/**
 * Body has width, height, position and information about how it put at the postion.
 * @abstract
 */
class Body extends Being {
  constructor () {
    super()

    /**
     * @deprecated
     */
    this.transitionDuration = this.defaultTransitionDuration()

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
  width () { return 100 }
  height () { return 100 }
  ratioX () { return 0 }
  ratioY () { return 0 }
  marginX () { return 0 }
  marginY () { return 0 }
  defaultTransitionDuration () { return 500 }

  /**
   * Returns the actual width of the elem.
   */
  actualWidth () {
    return this.posture.actualWidth()
  }

  /**
   * Returns the actual height of the elem.
   */
  actualHeight () {
    return this.posture.actualHeight()
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
    return this.posture.rightLimit(this.x)
  }

  /**
   * Gets the left limit in px.
   * @return {Number} x value of the left limit
   */
  leftLimit () {
    return this.posture.leftLimit(this.x)
  }

  /**
   * Gets the top limit in px.
   */
  topLimit () {
    return this.posture.topLimit(this.y)
  }

  /**
   * Gets the bottom limit in px.
   */
  bottomLimit () {
    return this.posture.bottomLimit(this.y)
  }

  /**
   * Gets the x of the center.
   * @return {Number}
   */
  centerX () {
    return this.posture.centerX(this.x)
  }

  /**
   * Gets the y of the center.
   * @return {Number}
   */
  centerY () {
    return this.posture.centerY(this.y)
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

    this.posture.setActualWidth(this.elem.width())
    this.posture.setActualHeight(this.elem.height())

    this.x = Body.pxToNum(this.elem.css('left')) + this.posture.width * this.posture.ratioX
    this.y = Body.pxToNum(this.elem.css('top')) + this.posture.height * this.posture.ratioY
  }

  /**
   * Converts the pixel to the number.
   * @param {string} px The pixel
   * @return {number}
   */
  static pxToNum (px) {
    return +px.slice(0, -2)
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
   * Updates the actual elem dom according to the current posture.
   * Returns a promise which resolves with the transitionDuration milliseconds.
   * @deprecated
   * @param {Number} [dur] The
   * @return {Promise}
   */
  updateElem (dur) {
    if (dur) {
      this.setTransitionDuration(dur)
    }

    this.updateRect()
    this.updateOffset()

    return wait(this.transitionDuration)
  }

  /**
   * Moves the elem to the given y position.
   * @deprecated
   * @param {Number} to The y position
   */
  moveToY (to) {
    this.y = to

    return this.updateElem()
  }

  /**
   * Moves the elem to the given x position.
   * @deprecated
   * @param {Number} to The x position
   */
  moveToX (to) {
    this.x = to

    return this.updateElem()
  }

  /**
   * Sets the transition duration.
   * @deprecated
   * @param {number} dur The transition duration
   */
  setTransitionDuration (dur) {
    this.transitionDuration = dur

    this.elem.css('transition-duration', dur + 'ms')

    reflow(this.el)
  }

  /**
   * Fits to the guiding rect (updates the x, y and posture to fit into the given rect. does not update the dom)
   * @param {Rect} rect
   */
  setRect (rect) {
    this.x = this.posture.getXInRect(rect)
    this.y = this.posture.getYInRect(rect)

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
    this.posture.fitToArea(area)
  }

  /**
   * Gets the area which the body occupies.
   * @return {Area}
   */
  getArea () {
    return new Area(this.posture.width, this.posture.height)
  }
}

module.exports = Body
