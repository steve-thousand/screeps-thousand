import { EnergySourceEvaluator } from "../energy"

describe('EnergySourceEvaluator tests', function () {
    test('Should correctly calculate max expected harvesters', function () {
        //1 tile away, 1 harvestable spot
        expect(EnergySourceEvaluator.calculateMax(1, 1)).toBe(1)

        //1 tile away, 2 harvestable spots
        expect(EnergySourceEvaluator.calculateMax(1, 2)).toBe(2)

        //1 tile away, 3 harvestable spots
        expect(EnergySourceEvaluator.calculateMax(1, 3)).toBe(3)

        //5 tiles away, 1 harvestable spot
        expect(EnergySourceEvaluator.calculateMax(5, 1)).toBe(1)

        //5 tiles away, 2 harvestable spots
        expect(EnergySourceEvaluator.calculateMax(5, 2)).toBe(2)

        //5 tiles away, 3 harvestable spots
        expect(EnergySourceEvaluator.calculateMax(5, 3)).toBe(3)

        //10 tiles away, 1 harvestable spot
        expect(EnergySourceEvaluator.calculateMax(10, 1)).toBe(2)

        //10 tiles away, 2 harvestable spots
        expect(EnergySourceEvaluator.calculateMax(10, 2)).toBe(4)

        //10 tiles away, 3 harvestable spots
        expect(EnergySourceEvaluator.calculateMax(10, 3)).toBe(6)
    })
    test('test', () => {
        expect(EnergySourceEvaluator.determineSourceSaturation({ x: 0, y: 0 }, { x: 5, y: 5 }, 1, 0)).toBe(0)
        expect(EnergySourceEvaluator.determineSourceSaturation({ x: 0, y: 0 }, { x: 5, y: 5 }, 1, 1)).toBe(1)
        expect(EnergySourceEvaluator.determineSourceSaturation({ x: 0, y: 0 }, { x: 5, y: 5 }, 2, 1)).toBe(.5)
        expect(EnergySourceEvaluator.determineSourceSaturation({ x: 0, y: 0 }, { x: 10, y: 5 }, 3, 3)).toBe(.5)
    });
})