import { AntType } from '../ant-type';
import { AntMap, AntService } from '../ant-service'
import { WorkerStateType } from '../../worker/worker-state'

function newCreep(id: string, memory = {}): Creep {
    const creep = new Creep(<Id<Creep>>id);
    creep.memory = memory
    return creep
}

describe('AntService', function () {
    test('Workers should be correctly returned', function () {
        Game.creeps.creep1 = newCreep("", { type: AntType.WORKER })
        const antService = new AntService()
        const antMap: AntMap = antService.getAntMap()
        expect(antMap.workers.length).toBe(1)
    })
    test('Workers should be automatically initialized', function () {
        Game.time = 5

        Game.creeps.creep1 = newCreep("")
        const antService = new AntService()
        const antMap: AntMap = antService.getAntMap()
        const worker = antMap.workers[0]
        expect(worker.getCreep().memory.type).toBe(AntType.WORKER)
        expect(worker.getCreep().memory.state).toStrictEqual({
            type: WorkerStateType.SEEK,
            time: 5
        })
        expect(worker.getCreep().memory.direction).toBeDefined
    })
})