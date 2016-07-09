import {LayoutFactory, Rect, Grid} from '../src'

import {expect} from 'chai'

describe('LayoutFactory', () => {
  let factory

  beforeEach(() => {
    factory = new LayoutFactory()
  })

  describe('grid', () => {
    it('creates a grid of the given params', () => {
      const grid = factory.grid({
        x: 1,
        y: 2,
        unitWidth: 3,
        unitHeight: 4,
        cellWidth: 5,
        cellHeight: 6
      })

      expect(grid).to.be.instanceof(Grid)
      expect(grid.x).to.equal(1)
      expect(grid.y).to.equal(2)
      expect(grid.unitWidth).to.equal(3)
      expect(grid.unitHeight).to.equal(4)
      expect(grid.cellWidth).to.equal(5)
      expect(grid.cellHeight).to.equal(6)
    })
  })

  describe('rect', () => {
    it('creates a rect of the given params', () => {
      const rect = factory.rect({
        top: 1,
        left: 2,
        right: 3,
        bottom: 4
      })

      expect(rect).to.be.instanceof(Rect)
      expect(rect.top).to.equal(1)
      expect(rect.left).to.equal(2)
      expect(rect.right).to.equal(3)
      expect(rect.bottom).to.equal(4)
    })
  })
})
