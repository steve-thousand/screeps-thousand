import { Worker } from '../worker'

describe('Worker tests', function () {
    test('Worker constructor', function () {
        const creep: Creep = new Creep(<Id<Creep>>"test")
        const worker = new Worker(creep)
        expect(worker.getCreep()).toBe(creep)
    })
})