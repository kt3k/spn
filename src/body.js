const wait = require('./wait')
const reflow = require('./reflow')
const Prebody = require('./prebody')

/**
 * Body has width, height, position and information about how it put at the postion.
 * @abstract
 */
class Body extends Prebody {
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

    this.getPosture()
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
   * Placeholder willShow method.
   */
  willShow() {
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
}

module.exports = Body
