import ifNumElse from '../src/if-num-else'

describe('ifNumElse', () => {

    it('returns the first param if it is a number', () => {

        expect(ifNumElse(100, 50)).to.equal(100)
        expect(ifNumElse(0, 50)).to.equal(0)

    })

    it('returns the second param if it is not a number', () => {

        expect(ifNumElse('100', 50)).to.equal(50)
        expect(ifNumElse('0', 50)).to.equal(50)
        expect(ifNumElse('', 50)).to.equal(50)
        expect(ifNumElse(undefined, 50)).to.equal(50)
        expect(ifNumElse(null, 50)).to.equal(50)
        expect(ifNumElse(true, 50)).to.equal(50)
        expect(ifNumElse(false, 50)).to.equal(50)
        expect(ifNumElse([], 50)).to.equal(50)
        expect(ifNumElse({}, 50)).to.equal(50)

    })

})
