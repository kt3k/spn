/**
 * The model of the positions of points in 2-dimensional space.
 */
class Point {
  /**
   * @param {number} x The x
   * @param {number} y The y
   */
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  /**
   * Returns the point above the given distance.
   * @param {number} distance The distance
   */
  up (distance) {
    return new Point(this.x, this.y - distance)
  }

  /**
   * Returns the point left of the given distance.
   * @param {number} distance The distance
   */
  left (distance) {
    return new Point(this.x - distance, this.y)
  }

  /**
  * Returns the point right of the given distance.
  * @param {number} distance The distance
   */
  right (distance) {
    return new Point(this.x + distance, this.y)
  }

  /**
  * Returns the point below the given distance.
  * @param {number} distance The distance
   */
  down (distance) {
    return new Point(this.x, this.y + distance)
  }
}

module.exports = Point
