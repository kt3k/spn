/**
 * Shorthand for `typeof num === 'number' ? num : defaultValue`.
 * @param {object} num The number or anthing
 * @param {number} defaultValue The default value
 * @return {number}
 */
export default (num, defaultValue) => typeof num === 'number' ? num : defaultValue
