/**
 * Reflows the given element
 *
 * @param {jQuery|HTMLElement} elem The element
 */
export function reflow(elem) {

    let offsetHeight = $(elem).get(0).offsetHeight

    offsetHeight = offsetHeight + 1

    return elem

}
