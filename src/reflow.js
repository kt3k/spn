/**
 * Reflows the given element
 *
 * @param {jQuery|HTMLElement} elem The element
 */
function reflow(elem) {

    let offsetHeight = $(elem).get(0).offsetHeight

    offsetHeight = offsetHeight + 1

    return elem

}

module.exports = reflow
