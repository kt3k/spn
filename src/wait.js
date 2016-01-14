/**
 * Returns a promise which resolves in the given milliseconds.
 *
 * @param {number} n The time in milliseconds
 * @param {object} result The value to resolve
 * @return {Promise}
 */
export function wait(n, result) {

    return new Promise(resolve => setTimeout(() => resolve(result), n))

}
