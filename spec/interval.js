import Interval from '../src/interval'

describe('Interval', () => {

    it('switch high and low when they are given oppositely', () => {

        const interval = new Interval(5, 7)

        expect(interval.high).to.equal(7)
        expect(interval.low).to.equal(5)

    })

})
