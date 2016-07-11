/**
 * Adds ratioX method to the class.
 */
exports.x = x => Cls => {
  Cls.prototype.ratioX = () => x
}

/**
 * Adds ratioY method to the class.
 */
exports.y = y => Cls => {
  Cls.prototype.ratioY = () => y
}
