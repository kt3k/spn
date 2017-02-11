import Animation from '../animation'

/**
 * Adds `hideAnim` and `showAnim` methods to the decorated class with the given params.
 * @param {Array} show The show animation params
 * @param {Array} hide The hide animation params
 */
const animation = ({show, hide}) => Cls => {
  if (show) {
    const [name, dur] = show
    animation.show(name, dur)(Cls)
  }

  if (hide) {
    const [name, dur] = hide
    animation.hide(name, dur)(Cls)
  }

  return Cls
}

/**
 * Adds `hideAnim` method with the given params to the decorated class.
 * @param {string} name The animation name (of css animation which is available in the page context)
 * @param {number} [dur=500] The duration of the animation
 */
animation.hide = (name, dur = 500) => Cls => {
  Cls.prototype.hideAnim = () => new Animation(name, dur)
  return Cls
}

/**
 * Adds `showAnim` method with the given params to the decorated class.
 * @param {string} name The animation name (of css animation which is available in the page context)
 * @param {number} [dur=500] The duration of the animation
 */
animation.show = (name, dur = 500) => {
  const d = Cls => {
    Cls.prototype.showAnim = () => new Animation(name, dur)
    return Cls
  }

  return d
}

export default animation
