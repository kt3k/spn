const Animation = require('../animation')

exports.show = (name, dur) => {
  const d = Cls => {
    Cls.prototype.showAnim = () => new Animation(name, dur)
  }

  d.hide = (name, dur) => Cls => {
    d(Cls)
    exports.hide(name, dur)(Cls)
  }

  return d
}

exports.hide = (name, dur) => Cls => {
  Cls.prototype.hideAnim = () => new Animation(name, dur)
}
