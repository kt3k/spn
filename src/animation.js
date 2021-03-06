import wait from './wait'
import reflow from './reflow'
import { ifNumElse } from './util/index'

const ANIMATION_PROP_NAME = '-webkit-animation'

/**
 * Animation class represents the css animation.
 */
export default class Animation {
  /**
   * @param {String} name The name of the css animation (keyframes)
   * @param {Number} duration The duration of the animation
   */
  constructor (name, duration) {
    this.name = name
    this.duration = duration
  }

  /**
   * @param {HTMLElement} el The dom element
   * @param {number} dur The duration
   * @return {Promise}
   */
  apply (el, dur) {
    const $el = $(el)
    $el.css(ANIMATION_PROP_NAME, '')

    reflow(el)

    $el.css(ANIMATION_PROP_NAME, this.name + ' ' + ifNumElse(dur, this.duration) + 'ms')

    return wait(this.duration)
  }
}
