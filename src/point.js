const {UP, LEFT, RIGHT, DOWN} = require('./dirs')

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

  /**
   * Gets the direction to the given point (one of '')
   * @param {Point}
   * @return {Point}
   */
  minus (point) {
    return new Point(this.x - point.x, this.y - point.y)
  }

  /**
   */
  getDir () {
    if (Math.abs(this.x) >= Math.abs(this.y)) {
      if (this.x >= 0) {
        return RIGHT
      }
      return LEFT
    }

    if (this.y > 0) {
      return DOWN
    }
    return UP
  }
}

module.exports = Point
