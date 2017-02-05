let x = 0 // dummy variable for preventing lint error and unwanted optimization of uglify

/**
 * Reflows the given element
 *
 * @param {HTMLElement} el The element
 */
module.exports = el => {
  x = el.offsetHeight
}

module.exports.x = x
