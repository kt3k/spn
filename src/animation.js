const wait = require('./wait')
const reflow = require('./reflow')
const ifNumElse = require('./if-num-else')

const ANIMATION_PROP_NAME = '-webkit-animation'

/**
 * Animation class represents the css animation.
 */
class Animation {
  /**
   * @param {String} name The name of the css animation (keyframes)
   * @param {Number} duration The duration of the animation
   */
  constructor (name, duration) {
    this.name = name
    this.duration = duration
  }

  /**
   * @param {jQuery} elem The dom element
   * @param {number} dur The duration
   * @return {Promise}
   */
  apply (elem, dur) {
    elem.css(ANIMATION_PROP_NAME, '')

    reflow(elem)

    elem.css(ANIMATION_PROP_NAME, this.name + ' ' + ifNumElse(dur, this.duration) + 'ms')

    return wait(this.duration)
  }
}

module.exports = Animation
