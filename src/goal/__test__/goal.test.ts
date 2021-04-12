import * as state from '../../state'
import * as goal from '../'
import { mock } from 'jest-mock-extended';

describe('GoalDecider tests', function () {
    test('Should decide to Increase Harvesters', function () {
        const spawn = mock<StructureSpawn>();
        const gameState: state.GameState = {
            spawn: spawn,
            numberOfEnergySources: 5,
            numberOfHarvesters: 3
        };
        const goalDecider = new goal.GoalDecider();
        const goals = goalDecider.decide(gameState)
        expect(goals).toStrictEqual([new goal.IncreaseHarvesters(spawn)])
    })
})