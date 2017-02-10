const Point = require('../src/point')
const {UP, LEFT, RIGHT, DOWN} = require('../src/const/dirs')

const {expect} = require('chai')

describe('Point', () => {
  describe('up, left, right and down', () => {
    it('return the points translated each direction', () => {
      const point = new Point(0, 0)

      expect(point.up(100).x).to.equal(0)
      expect(point.up(100).y).to.equal(-100)
      expect(point.left(100).x).to.equal(-100)
      expect(point.left(100).y).to.equal(0)
      expect(point.right(100).x).to.equal(100)
      expect(point.right(100).y).to.equal(0)
      expect(point.down(100).x).to.equal(0)
      expect(point.down(100).y).to.equal(100)
    })
  })

  describe('minus', () => {
    it('returns the vector from this point to the given point', () => {
      const point0 = new Point(50, 150)
      const point1 = new Point(100, 200)

      const point2 = point0.minus(point1)

      expect(point2.x).to.equal(-50)
      expect(point2.y).to.equal(-50)
    })
  })

  describe('getDir', () => {
    it('returns the direction of the point from the origin', () => {
      const point = new Point(0, 0)

      expect(point.up(100).getDir()).to.equal(UP)
      expect(point.left(100).getDir()).to.equal(LEFT)
      expect(point.right(100).getDir()).to.equal(RIGHT)
      expect(point.down(100).getDir()).to.equal(DOWN)
    })
  })
})
