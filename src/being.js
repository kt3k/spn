/**
 * Being represents a dom with visual representation which has the phases, such as show, hide and disappear.
 */
export default class Being {

    /**
     * Returns the animation of showing
     *
     * @abstract
     * @return {Animation}
     */
    showAnim() {}

    /**
     * Returns the animation of hiding
     *
     * @abstract
     * @return {Animation}
     */
    hideAnim() {}

    /**
     * @abstract
     * @return {Promise}
     */
    willShow() {}

    /**
     * @abstract
     * @return {Promise}
     */
    didShow() {}

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
    show(dur) {

        return Promise.resolve(this.willShow())

        .then(() => {

            const anim = this.showAnim()

            return anim != null && anim.apply(this.elem, dur)

        })

        .then(() => this.didShow())

    }

    /**
     * @abstract
     * @return {Promise}
     */
    willHide() {}

    /**
     * @abstract
     * @return {Promise}
     */
    didHide() {}

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
    hide(dur) {

        return Promise.resolve(this.willHide())

        .then(() => {

            const anim = this.hideAnim()

            return anim != null && anim.apply(this.elem, dur)

        })

        .then(() => this.didHide())

    }

    /**
     * Hides the component and then removes it.
     *
     * @param {Number} dur The duration of the animation
     * @return {Promise}
     */
    disappear(dur) {

        return this.hide(dur).then(() => this.elem.remove())

    }

}
