import {DIRS} from '../src'

describe('DIRS', () => {

    describe('TOP', () => {

        it('is 0', () => {

            expect(DIRS.TOP).to.equal(0)

        })

    })

    describe('UP', () => {

        it('is 0', () => {

            expect(DIRS.UP).to.equal(0)

        })

    })

    describe('LEFT', () => {

        it('is 1', () => {

            expect(DIRS.LEFT).to.equal(1)

        })

    })

    describe('RIGHT', () => {

        it('is 2', () => {

            expect(DIRS.RIGHT).to.equal(2)

        })

    })

    describe('BOTTOM', () => {

        it('is 3', () => {

            expect(DIRS.BOTTOM).to.equal(3)

        })

    })

    describe('DOWN', () => {

        it('is 3', () => {

            expect(DIRS.DOWN).to.equal(3)

        })

    })

})
