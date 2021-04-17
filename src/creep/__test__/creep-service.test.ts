import { CreepType } from '../creep-type';
import { CreepMap, CreepService } from '../creep-service'
import { WorkerStateType } from '../../worker/worker-state'

function newCreep(id: string, memory = {}): Creep {
    const creep = new Creep(<Id<Creep>>id);
    creep.memory = memory
    return creep
}

describe('CreepService', function () {
    test('Workers should be correctly returned', function () {
        const creepService = new CreepService()
        const creepMap: CreepMap = creepService.getCreepMap([
            newCreep("", { type: CreepType.WORKER })
        ])
        expect(creepMap.workers.length).toBe(1)
    })
    test('Workers should be automatically initialized', function () {
        Game.time = 5

        const creepService = new CreepService()
        const creepMap: CreepMap = creepService.getCreepMap([
            newCreep("")
        ])
        const worker = creepMap.workers[0]
        expect(worker.getCreep().memory.type).toBe(CreepType.WORKER)
        expect(worker.getCreep().memory.state).toStrictEqual({
            type: WorkerStateType.SEEK,
            time: 5
        })
        expect(worker.getCreep().memory.direction).toBeDefined
    })
})