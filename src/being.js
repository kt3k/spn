const applyIfFunction = require('./apply-if-function')
const wait = require('./wait')
const ifNumElse = require('./if-num-else')
const triggerNoBubble = require('./trigger-no-bubble')

/**
 * Being represents a dom with visual representation which has the phases, such as show, hide and disappear.
 */
class Being {
  /**
   * Shows the element using the animation returned by showAnim.
   * 表示時アニメーション (showAnim) に従ってアニメーションさせる。
   *
   * This invokes `willShow` before and `didShow` after.
   * 事前に willShow hook, 事後に didShow hook を呼び出す。
   *
   * @param {Number} dur The duration of the animation
   * @return {Promise}
   */
  show (dur) {
    this.el.classList.add('showing')

    triggerNoBubble('showing', this.el)

    return this.__show(dur)

      .then(() => triggerNoBubble('shown', this.el))

      .then(() => this.el.classList.add('shown'))
  }

  __show (dur) {
    return Promise.resolve(applyIfFunction(this, this.willShow))

      .then(() => {
        const anim = applyIfFunction(this, this.showAnim)

        return Promise.all([
          wait(ifNumElse(this.constructor.SHOW_DURATION, 0)),
          anim && anim.apply(this.el, dur)
        ])
      })

      .then(() => applyIfFunction(this, this.didShow))
  }

  /**
   * Hides the element using the animation returned by hideAnim.
   * 非表示時アニメーション (hideAnim) に従ってアニメーションさせる。
   *
   * This invokes `willHide` before and `didHide` after.
   * 事前に willHide hook, 事後に didHide hook を呼び出す。
   *
   * @param {Number} dur The duration of the animation
   * @return {Promise}
   */
  hide (dur) {
    this.el.classList.remove('shown')

    triggerNoBubble('hiding', this.el)

    return this.__hide(dur)

      .then(() => triggerNoBubble('hidden', this.el))

      .then(() => this.el.classList.remove('showing'))
  }

  __hide (dur) {
    return Promise.resolve(applyIfFunction(this, this.willHide))

      .then(() => {
        const anim = applyIfFunction(this, this.hideAnim)

        return Promise.all([
          wait(ifNumElse(this.constructor.SHOW_DURATION, 0)),
          anim && anim.apply(this.el, dur)
        ])
      })

      .then(() => applyIfFunction(this, this.didHide))
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
