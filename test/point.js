const Point = require('../src/point')

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
})
