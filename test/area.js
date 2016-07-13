const {expect} = require('chai')
const {Area} = require('../src')

describe('Area',  () => {
  let area

  beforeEach(() => {
    area = new Area(100, 200)
  })

  describe('scale', () => {
    it('scales the area by the given scales', () => {
      const area0 = area.scale(0.5)

      expect(area0.width).to.equal(50)
      expect(area0.height).to.equal(100)

      const area1 = area.scale(2, 4)

      expect(area1.width).to.equal(200)
      expect(area1.height).to.equal(800)
    })
  })

  describe('square', () => {
    it('creates an area of square', () => {
      const area0 = Area.square(250)

      expect(area0.width).to.equal(250)
      expect(area0.height).to.equal(250)
    })
  })
})
