import * as act from '../'
import * as g from '../../goal'
import { mock } from 'jest-mock-extended';

describe('Actor tests', function () {
    describe('IncreaseHarvesters actions', function () {
        test('Should spawn harvesters', function () {
            const spawn: StructureSpawn = mock<StructureSpawn>()
            spawn.spawning = null
            const actor: act.Actor = new act.Actor();
            actor.act([new g.IncreaseHarvesters(spawn)]);
            expect(spawn.spawnCreep).toHaveBeenCalledWith(["move", "carry", "work"], expect.anything())
        })
        test('Should not spawn harvesters', function () {
            const spawn: StructureSpawn = mock<StructureSpawn>()
            spawn.spawning = mock<Spawning>()
            const actor: act.Actor = new act.Actor();
            actor.act([new g.IncreaseHarvesters(spawn)]);
            expect(spawn.spawnCreep).toBeCalledTimes(0)
        })
    });
})