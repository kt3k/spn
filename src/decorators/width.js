/**
 * Adds the height method to the class.
 * @param {number} width The width
 * @param {Function} Cls The class to decorate
 */
export default width => Cls => {
  Cls.prototype.width = () => width
}
