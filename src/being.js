const wait = require('./wait')
const { applyIfFunction, ifNumElse, triggerNoBubble } = require('./util')

const SHOWING_CLASS = 'showing'
const SHOWN_CLASS = 'shown'
const SHOWING_EVENT = 'showing'
const SHOWN_EVENT = 'shown'
const HIDING_EVENT = 'hiding'
const HIDDEN_EVENT = 'hidden'

/**
 * @param {Object} instance The instance
 * @param {Function} beforeMethod The method before the main
 * @param {Function} afterMethod The method after the main
 * @param {Function} main The main function
 * @return {Promise}
 */
const applyBeforeAfter = (instance, beforeMethod, afterMethod, main) => (
  Promise.resolve(applyIfFunction(instance, beforeMethod))
    .then(main)
    .then(() => applyIfFunction(instance, afterMethod))
)

/**
 * @param {HTMLElement} el The element
 * @param {string} beforeEvent The event before the func
 * @param {string} afterEvent The event after the func
 * @param {Function} func The function
 * @return {Promise}
 */
const triggerNoBubbleBeforeAfter = (el, beforeEvent, afterEvent, func) => {
  triggerNoBubble(beforeEvent, el)

  return func().then(() => triggerNoBubble(afterEvent, el))
}

/**
 * @param {HTMLElement} el The element
 * @param {string} beforeClass The class which toogled before the func
 * @param {string} afterClass The class which toogled after the func
 * @param {boolean} toggleState True for adding, false for removing
 * @param {Function} func The function
 * @return {Promise}
 */
const toggleClassBeforeAfter = (el, beforeClass, afterClass, toggleState, func) => {
  el.classList.toggle(beforeClass, toggleState)

  return func().then(() => el.classList.toggle(afterClass, toggleState))
}

/**
 * Being represents a dom with visual representation which has the phases, such as show, hide and disappear.
 */
class Being {

  /**
   * Shows the element using the animation returned by showAnim.
   *
   * This invokes `willShow` before and `didShow` after.
   * This appends `showing` class before and `shown` class after.
   * This emits `showing` event before and `shown` event after.
   *
   * @param {number} dur The duration of the animation
   * @return {Promise}
   */
  show (dur) {
    return toggleClassBeforeAfter(this.el, SHOWING_CLASS, SHOWN_CLASS, true, () => triggerNoBubbleBeforeAfter(this.el, SHOWING_EVENT, SHOWN_EVENT, () => this.__show(dur)))
  }

  __show (dur) {
    return applyBeforeAfter(this, this.willShow, this.didShow, () => {
      const anim = applyIfFunction(this, this.showAnim)

      return Promise.all([
        wait(ifNumElse(this.constructor.SHOW_DURATION, 0)),
        anim && anim.apply(this.el, dur)
      ])
    })
  }

  /**
   * Hides the element using the animation returned by hideAnim.
   *
   * This invokes `willHide` before and `didHide` after.
   * This removes `shown` class before and `showing` class after.
   * This emits `hiding` event before and `hidden` event after.
   *
   * @param {number} dur The duration of the animation
   * @return {Promise}
   */
  hide (dur) {
    return toggleClassBeforeAfter(this.el, SHOWN_CLASS, SHOWING_CLASS, false, () => triggerNoBubbleBeforeAfter(this.el, HIDING_EVENT, HIDDEN_EVENT, () => this.__hide(dur)))
  }

  __hide (dur) {
    return applyBeforeAfter(this, this.willHide, this.didHide, () => {
      const anim = applyIfFunction(this, this.hideAnim)

      return Promise.all([
        wait(ifNumElse(this.constructor.SHOW_DURATION, 0)),
        anim && anim.apply(this.el, dur)
      ])
    })
  }

  /**
   * Hides the component and then removes it.
   *
   * @param {Number} dur The duration of the animation
   * @return {Promise}
   */
  disappear (dur) {
    return this.hide(dur).then(() => this.$el.remove())
  }
}

module.exports = Being
