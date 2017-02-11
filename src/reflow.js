export let x = 0 // dummy variable for preventing lint error and unwanted optimization of uglify

/**
 * Reflows the given element
 *
 * @param {HTMLElement} el The element
 */
export default el => {
  x = el.offsetHeight
}
