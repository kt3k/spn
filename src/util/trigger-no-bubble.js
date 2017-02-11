/**
 * Triggers the given type of event at the given element without bubbling.
 * @param {string} type The event type
 * @param {HTMLElement} el The element
 */
export default (type, el) => {
  el.dispatchEvent(new CustomEvent(type, { bubbles: false }))
}
