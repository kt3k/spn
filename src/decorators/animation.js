const Animation = require('../animation').default

exports.show = (name, dur) => Cls => {
    Cls.prototype.showAnim = () => new Animation(name, dur)
}

exports.hide = (name, dur) => Cls => {
    Cls.prototype.hideAnim = () => new Animation(name, dur)
}
