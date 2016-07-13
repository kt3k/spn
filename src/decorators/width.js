/**
 * Adds the height method to the class.
 * @param {number} width The width
 * @param {Function} Cls The class to decorate
 */
module.exports = width => Cls => {
  Cls.prototype.width = () => width
}
