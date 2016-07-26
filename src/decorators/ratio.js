/**
 * Adds ratioX method to the class.
 */
exports.x = x => {

  const d = Cls => {
    Cls.prototype.ratioX = () => x
  }

  d.y = y => Cls => {
    d(Cls)
    exports.y(y)(Cls)
  }

  return d
}

/**
 * Adds ratioY method to the class.
 */
exports.y = y => Cls => {
  Cls.prototype.ratioY = () => y
}
