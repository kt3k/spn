const applyIfFunction = require('./apply-if-function')
const wait = require('./wait')

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
    this.$el.addClass('showing')

    return Promise.resolve(applyIfFunction(this, this.willShow))

      .then(() => {
        const anim = applyIfFunction(this, this.showAnim)

        return anim && anim.apply(this.el, dur)
      })

      .then(() => typeof this.constructor.SHOW_DURATION === 'number' && wait(this.constructor.SHOW_DURATION))

      .then(() => applyIfFunction(this, this.didShow))

      .then(() => this.$el.addClass('shown'))
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
    this.$el.removeClass('shown')

    return Promise.resolve(applyIfFunction(this, this.willHide))

      .then(() => {
        const anim = applyIfFunction(this, this.hideAnim)

        return anim && anim.apply(this.el, dur)
      })

      .then(() => typeof this.constructor.SHOW_DURATION === 'number' && wait(this.constructor.SHOW_DURATION))

      .then(() => applyIfFunction(this, this.didHide))

      .then(() => this.$el.removeClass('showing'))
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
