const {Grid} = require('../src')
const {expect} = require('chai')

describe('Grid', () => {
  let grid

  beforeEach(() => {
    grid = new Grid({
      x: 100,
      y: 200,
      unitWidth: 100,
      unitHeight: 100,
      cellWidth: 50,
      cellHeight: 50
    })
  })

  describe('getX', () => {
    it('gets the x position of the given grid x position', () => {
      expect(grid.getX(-2)).to.equal(-100)
      expect(grid.getX(-1)).to.equal(0)
      expect(grid.getX(0)).to.equal(100)
      expect(grid.getX(1)).to.equal(200)
      expect(grid.getX(2)).to.equal(300)
      expect(grid.getX(3)).to.equal(400)
    })
  })

  describe('getY', () => {
    it('gets the y position of the given grid x position', () => {
      expect(grid.getY(-2)).to.equal(0)
      expect(grid.getY(-1)).to.equal(100)
      expect(grid.getY(0)).to.equal(200)
      expect(grid.getY(1)).to.equal(300)
      expect(grid.getY(2)).to.equal(400)
      expect(grid.getY(3)).to.equal(500)
    })
  })

  describe('shift', () => {
    it('returns the shifted grid', () => {
      expect(grid.shift(1, 2).getX(0)).to.equal(grid.getX(1))
      expect(grid.shift(1, 2).getX(1)).to.equal(grid.getX(2))
      expect(grid.shift(1, 2).getY(0)).to.equal(grid.getY(2))
      expect(grid.shift(1, 2).getY(1)).to.equal(grid.getY(3))
    })
  })

  describe('scaleX', () => {
    it('scales the width with the given scale value', () => {
      expect(grid.scaleX(3).unitWidth).to.equal(300)
      expect(grid.scaleX(3).unitHeight).to.equal(100)
      expect(grid.scaleX(3).cellWidth).to.equal(150)
      expect(grid.scaleX(3).cellHeight).to.equal(50)
    })
  })
  describe('scaleY', () => {
    it('scales the height with the given scale value', () => {
      expect(grid.scaleY(3).unitWidth).to.equal(100)
      expect(grid.scaleY(3).unitHeight).to.equal(300)
      expect(grid.scaleY(3).cellWidth).to.equal(50)
      expect(grid.scaleY(3).cellHeight).to.equal(150)
    })
  })

  describe('scaleCellX', () => {
    it('scales the width of the cell with the given scale value', () => {
      expect(grid.scaleCellX(3).unitWidth).to.equal(100)
      expect(grid.scaleCellX(3).unitHeight).to.equal(100)
      expect(grid.scaleCellX(3).cellWidth).to.equal(150)
      expect(grid.scaleCellX(3).cellHeight).to.equal(50)
    })
  })

  describe('scaleCellY', () => {
    it('scales the height of the cell with the given scale value', () => {
      expect(grid.scaleCellY(3).unitWidth).to.equal(100)
      expect(grid.scaleCellY(3).unitHeight).to.equal(100)
      expect(grid.scaleCellY(3).cellWidth).to.equal(50)
      expect(grid.scaleCellY(3).cellHeight).to.equal(150)
    })
  })
})
