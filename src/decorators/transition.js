/**
 * Sets defaultTransitionDuration method to the class.
 * @param {number} duration The transition duration
 * @param {Function} Cls The class to decorate
 */
export const duration = duration => Cls => {
  Cls.prototype.defaultTransitionDuration = () => duration
}
