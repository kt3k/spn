/**
 * The model of the size of 2-dimensional rectangles.
 */
class Area {
  /**
   * @param {number} width The width
   * @param {number} height The height
   */
  constructor (width, height) {
    this.width = width
    this.height = height
  }

  /**
   * Returns a scaled area with the given scales.
   * @param {number} scaleX The x scale
   * @param {number} [scaleY] The y scale
   */
  scale (scaleX, scaleY) {
    if (scaleY == null) {
      scaleY = scaleX
    }

    return new Area(this.width * scaleX, this.height * scaleY)
  }

  /**
   * Returns a area of the square of the given side size.
   * @param {number} size The size of a side
   */
  static square (size) {
    return new Area(size, size)
  }
}

module.exports = Area
