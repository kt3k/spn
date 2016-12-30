/**
 * Adds `ratioX` and `ratioY` methods.
 * @param {number} x The ratioX value
 * @param {number} y The ratioY value
 */
module.exports = ({x, y}) => Cls => {
  if (x) {
    module.exports.x(x)(Cls)
  }

  if (y) {
    module.exports.y(y)(Cls)
  }

  return Cls
}

/**
 * Adds ratioX method to the class.
 * @param {number} x The ratioX value
 */
module.exports.x = x => {
  const d = Cls => {
    Cls.prototype.ratioX = () => x
    return Cls
  }

  return d
}

/**
 * Adds ratioY method to the class.
 * @param {number} y The ratioY value
 */
module.exports.y = y => Cls => {
  Cls.prototype.ratioY = () => y
  return Cls
}
