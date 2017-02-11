
/**
 * The decorator for adding `margin*` methods.
 */
export default ({x, y, left, right, top, bottom}) => Cls => {
  const prototype = Cls.prototype

  if (x) { prototype.marginX = () => x }
  if (y) { prototype.marginY = () => y }
  if (left) { prototype.marginLeft = () => left }
  if (right) { prototype.marginRight = () => right }
  if (top) { prototype.marginTop = () => top }
  if (bottom) { prototype.marginBottom = () => bottom }

  return Cls
}
