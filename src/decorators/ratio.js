/**
 * Adds `ratioX` and `ratioY` methods.
 * @param {number} x The ratioX value
 * @param {number} y The ratioY value
 */
const ratio = ({x, y}) => Cls => {
  if (x) {
    ratio.x(x)(Cls)
  }

  if (y) {
    ratio.y(y)(Cls)
  }

  return Cls
}

/**
 * Adds ratioX method to the class.
 * @param {number} x The ratioX value
 */
ratio.x = x => {
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
ratio.y = y => Cls => {
  Cls.prototype.ratioY = () => y
  return Cls
}

export default ratio
