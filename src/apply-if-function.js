/**
 * @param {any} self The self object
 * @param {any} method The method
 * @param {?Array} args The parameters
 */
module.exports = (self, method, args) => typeof method === 'function' ? method.apply(self, args) : null
