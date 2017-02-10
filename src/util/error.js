/**
 * Creates an error from the given params.
 * @param {number} code The error code
 * @param {string} message The error message
 * @return {Error}
 */
module.exports = ({ code, message }) => {
  const error = new Error(message)

  error.code = code

  return error
}
