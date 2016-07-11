import { Grid, GridWalker } from '../src'
import { div } from 'dom-gen'

describe('GridWalker', () => {
  let walker, grid, elem

  before(() => {
    $.cc('grid-walker', GridWalker)
  })

  beforeEach(() => {
    elem = div()

    walker = elem.cc.init('grid-walker')

    grid = new Grid({
      x: 100,
      y: 200,
      unitWidth: 300,
      unitHeight: 400,
      cellWidth: 500,
      cellHeight: 600
    })

    walker.setGrid(grid, 1, 2)
  })

  describe('willShow', () => {
    it('calls ', done => {
      walker.fitToGrid = () => done()

      walker.willShow()
    })
  })

  describe('setGrid', () => {
    it('sets the grid and grid positions', () => {
      walker.setGrid(grid, 5, 1)

      expect(walker.grid).to.equal(grid)
      expect(walker.m).to.equal(5)
      expect(walker.n).to.equal(1)
    })
  })

  describe('setGridPosition', () => {
    it('sets the grid position', () => {
      walker.setGridPosition(3, 4)

      expect(walker.m).to.equal(3)
      expect(walker.n).to.equal(4)

      walker.setGridPosition(0, 0)

      expect(walker.m).to.equal(0)
      expect(walker.n).to.equal(0)
    })
  })

  describe('fitToGrid', () => {
    it('fits the posture to the grid', () => {
      walker.fitToGrid()

      expect(walker.posture.width).to.equal(500)
      expect(walker.posture.height).to.equal(500)

      expect(walker.x).to.equal(400)
      expect(walker.y).to.equal(1000)
    })

    it('respects cellRatio{X,Y}', () => {
      walker.cellRatioX = () => 0.5
      walker.cellRatioY = () => 0.5

      walker.fitToGrid()

      expect(walker.posture.width).to.equal(250)
      expect(walker.posture.height).to.equal(250)
    })
  })

  describe('moveToM', () => {
    it('moves to the given horizontal grid position', () => {
      walker.moveToM(0)

      expect(walker.m).to.equal(0)
      expect(walker.x).to.equal(100)

      walker.moveToM(2)

      expect(walker.m).to.equal(2)
      expect(walker.x).to.equal(700)

      walker.moveToM(-2)

      expect(walker.m).to.equal(-2)
      expect(walker.x).to.equal(-500)
    })
  })

  describe('moveToN', () => {
    it('moves to the given vertical position', () => {
      walker.moveToN(0)

      expect(walker.n).to.equal(0)
      expect(walker.y).to.equal(200)

      walker.moveToN(1)

      expect(walker.n).to.equal(1)
      expect(walker.y).to.equal(600)

      walker.moveToN(-1)

      expect(walker.n).to.equal(-1)
      expect(walker.y).to.equal(-200)
    })
  })

  describe('move{Dir}OnGrid', () => {
    it('moves the elem along the grid', () => {
      walker.moveUpOnGrid()

      expect(walker.m).to.equal(1)
      expect(walker.n).to.equal(1)

      walker.moveLeftOnGrid()

      expect(walker.m).to.equal(0)
      expect(walker.n).to.equal(1)

      walker.moveRightOnGrid()

      expect(walker.m).to.equal(1)
      expect(walker.n).to.equal(1)

      walker.moveDownOnGrid()

      expect(walker.m).to.equal(1)
      expect(walker.n).to.equal(2)
    })
  })
})
