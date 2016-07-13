/**
 * Adds the height method to the class.
 * @param {number} height The height
 * @param {Function} Cls The class to decorate
 */
module.exports = height => Cls => {
  Cls.prototype.height = () => height
}
