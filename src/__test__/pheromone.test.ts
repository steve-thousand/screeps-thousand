import { PheromoneService, Pheromones, PheromoneType } from "../pheromone"

describe('PheromonService tests', function () {
    test('getPheromonesAt should return an empty pheromones list for an undefined location', function () {
        const pheromoneService = new PheromoneService(Game)
        const pheromones: Pheromones = pheromoneService.getPheromonesAt(new RoomPosition(0, 0, 'test'))
        expect(pheromones.pheromonesByType.size).toBe(0)
    })
    test('pheromones should persist, and only for the specified position', function () {
        const pheromoneService = new PheromoneService(Game)
        pheromoneService.markSpot(new RoomPosition(1, 2, 'test'), PheromoneType.SEEK)

        let pheromones: Pheromones

        pheromones = pheromoneService.getPheromonesAt(new RoomPosition(0, 0, 'test'))
        expect(pheromones.pheromonesByType.size).toBe(0)

        pheromones = pheromoneService.getPheromonesAt(new RoomPosition(1, 2, 'test'))
        expect(pheromones.pheromonesByType.size).toBe(1)
        expect(pheromones.pheromonesByType.get(PheromoneType.SEEK)).toStrictEqual({
            pheromoneType: PheromoneType.SEEK,
            tick: 1
        })
        expect(pheromones.pheromonesByType.get(PheromoneType.ENERGY)).toBeUndefined
    })
    test('pheromones should be able to be overwritten', function () {
        const game = Game
        game.time = 1

        const pheromoneService = new PheromoneService(game)
        pheromoneService.markSpot(new RoomPosition(1, 2, 'test'), PheromoneType.SEEK)

        let pheromones: Pheromones

        pheromones = pheromoneService.getPheromonesAt(new RoomPosition(1, 2, 'test'))
        expect(pheromones.pheromonesByType.size).toBe(1)
        expect(pheromones.pheromonesByType.get(PheromoneType.SEEK)).toStrictEqual({
            pheromoneType: PheromoneType.SEEK,
            tick: 1
        })

        game.time = 5

        pheromoneService.markSpot(new RoomPosition(1, 2, 'test'), PheromoneType.SEEK)

        pheromones = pheromoneService.getPheromonesAt(new RoomPosition(1, 2, 'test'))
        expect(pheromones.pheromonesByType.size).toBe(1)
        expect(pheromones.pheromonesByType.get(PheromoneType.SEEK)).toStrictEqual({
            pheromoneType: PheromoneType.SEEK,
            tick: 5
        })
    })
    test('Drawing pheromones should not fail on empty map', function () {
        const pheromoneService = new PheromoneService(Game)
        pheromoneService.drawPheromones(Game.map.visual)
    })
    test('Drawing pheromones should work', function () {
        const pheromoneService = new PheromoneService(Game)
        pheromoneService.markSpot(new RoomPosition(1, 2, 'test'), PheromoneType.SEEK)
        pheromoneService.drawPheromones(Game.map.visual)
    })
})