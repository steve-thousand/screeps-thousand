import { PheromoneService, PheromoneVisualizer, PheromoneOpacity, Pheromones, PheromoneType, MAX_AGE } from "../pheromone"

describe('PheromoneVisualizer tests', function () {
    test('Just created, should be full strength', function () {
        Game.time = 0
        const strength = PheromoneVisualizer.determineStrength({
            pheromoneType: PheromoneType.SEEK,
            time: 0
        })
        expect(strength).toBe(1)
    })
    test('Half age, should be half-strength', function () {
        Game.time = MAX_AGE / 2
        const strength = PheromoneVisualizer.determineStrength({
            pheromoneType: PheromoneType.SEEK,
            time: 0
        })
        expect(strength).toBe(.5)
    })
    test('Max age, should be 0', function () {
        Game.time = MAX_AGE
        const strength = PheromoneVisualizer.determineStrength({
            pheromoneType: PheromoneType.SEEK,
            time: 0
        })
        expect(strength).toBe(0)
    })
    test('Older than max age, should be 0', function () {
        Game.time = MAX_AGE + 1
        const strength = PheromoneVisualizer.determineStrength({
            pheromoneType: PheromoneType.SEEK,
            time: 0
        })
        expect(strength).toBe(0)
    })
    test('Protection from negative strength', function () {
        Game.time = 0
        const strength = PheromoneVisualizer.determineStrength({
            pheromoneType: PheromoneType.SEEK,
            time: 100
        })
        expect(strength).toBe(0)
    })
    test('Just created, should be full strength', function () {
        Game.time = 0
        const settings = PheromoneVisualizer.getDrawSettings({
            pheromoneType: PheromoneType.SEEK,
            time: 0
        })
        expect(settings).toStrictEqual({
            opacity: PheromoneOpacity.SEEK,
            radius: .5
        })
    })
    test('Half age, should be half-strength', function () {
        Game.time = MAX_AGE / 2
        const settings = PheromoneVisualizer.getDrawSettings({
            pheromoneType: PheromoneType.SEEK,
            time: 0
        })
        expect(settings).toStrictEqual({
            opacity: PheromoneOpacity.SEEK / 2,
            radius: .25
        })
    })
    test('Max age, should be 0', function () {
        Game.time = MAX_AGE
        const settings = PheromoneVisualizer.getDrawSettings({
            pheromoneType: PheromoneType.SEEK,
            time: 0
        })
        expect(settings).toStrictEqual({
            opacity: 0,
            radius: 0
        })
    })
})

describe('PheromonService tests', function () {
    test('getPheromonesAt should return an empty pheromones list for an undefined location', function () {
        const pheromoneService = new PheromoneService()
        const pheromones: Pheromones = pheromoneService.getPheromonesAt(new RoomPosition(0, 0, 'test'))
        expect(Object.keys(pheromones.pheromonesByType).length).toBe(0)
    })
    test('pheromones should persist, and only for the specified position', function () {
        Game.time = 1
        const pheromoneService = new PheromoneService()
        pheromoneService.markSpot(new RoomPosition(1, 2, 'test'), PheromoneType.SEEK)

        let pheromones: Pheromones

        pheromones = pheromoneService.getPheromonesAt(new RoomPosition(0, 0, 'test'))
        expect(Object.keys(pheromones.pheromonesByType).length).toBe(0)

        pheromones = pheromoneService.getPheromonesAt(new RoomPosition(1, 2, 'test'))
        expect(Object.keys(pheromones.pheromonesByType).length).toBe(1)
        expect(pheromones.pheromonesByType[PheromoneType.SEEK]).toStrictEqual({
            pheromoneType: PheromoneType.SEEK,
            time: 1
        })
        expect(pheromones.pheromonesByType[PheromoneType.SEEK]).toBeUndefined
    })
    test('pheromones should be able to be overwritten', function () {
        Game.time = 1

        const pheromoneService = new PheromoneService()
        pheromoneService.markSpot(new RoomPosition(1, 2, 'test'), PheromoneType.SEEK)

        let pheromones: Pheromones

        pheromones = pheromoneService.getPheromonesAt(new RoomPosition(1, 2, 'test'))
        expect(Object.keys(pheromones.pheromonesByType).length).toBe(1)
        expect(pheromones.pheromonesByType[PheromoneType.SEEK]).toStrictEqual({
            pheromoneType: PheromoneType.SEEK,
            time: 1
        })

        Game.time = 5

        pheromoneService.markSpot(new RoomPosition(1, 2, 'test'), PheromoneType.SEEK)

        pheromones = pheromoneService.getPheromonesAt(new RoomPosition(1, 2, 'test'))
        expect(Object.keys(pheromones.pheromonesByType).length).toBe(1)
        expect(pheromones.pheromonesByType[PheromoneType.SEEK]).toStrictEqual({
            pheromoneType: PheromoneType.SEEK,
            time: 5
        })
    })
    test('Drawing pheromones should not fail on empty map', function () {
        const pheromoneService = new PheromoneService()
        pheromoneService.drawPheromones()
    })
    test('Drawing pheromones should work', function () {
        Game.time = 0

        const pheromoneService = new PheromoneService()
        pheromoneService.markSpot(new RoomPosition(1, 2, 'test'), PheromoneType.SEEK)
        const mockCallback = jest.fn((x, y) => x);
        Game.map.visual.circle = mockCallback

        pheromoneService.drawPheromones()
        expect(mockCallback.mock.calls[0][0]).toMatchObject({ x: 1, y: 2, roomName: 'test' });
        expect(mockCallback.mock.calls[0][1]).toMatchObject({ radius: .50, opacity: PheromoneOpacity.SEEK });

        //draw half age later
        Game.time = MAX_AGE / 2

        pheromoneService.drawPheromones()
        expect(mockCallback.mock.calls[1][0]).toMatchObject({ x: 1, y: 2, roomName: 'test' });
        expect(mockCallback.mock.calls[1][1]).toMatchObject({ radius: .25, opacity: PheromoneOpacity.SEEK / 2 });

        //draw full age later
        Game.time = MAX_AGE

        //if it has maxed out we don't draw it
        pheromoneService.drawPheromones()
        expect(mockCallback.mock.calls[2]).toBeUndefined
    })
    test('Drawing multiple pheromones should work', function () {
        Game.time = 0

        const pheromoneService = new PheromoneService()
        pheromoneService.markSpot(new RoomPosition(1, 2, 'test'), PheromoneType.SEEK)

        Game.time = MAX_AGE / 2
        pheromoneService.markSpot(new RoomPosition(2, 4, 'test'), PheromoneType.SEEK)

        const mockCallback = jest.fn((x, y) => x);
        Game.map.visual.circle = mockCallback

        pheromoneService.drawPheromones()
        expect(mockCallback.mock.calls[0][0]).toMatchObject({ x: 1, y: 2, roomName: 'test' });
        expect(mockCallback.mock.calls[0][1]).toMatchObject({ radius: .25, opacity: PheromoneOpacity.SEEK / 2 });
        expect(mockCallback.mock.calls[1][0]).toMatchObject({ x: 2, y: 4, roomName: 'test' });
        expect(mockCallback.mock.calls[1][1]).toMatchObject({ radius: .50, opacity: PheromoneOpacity.SEEK });
    })
})