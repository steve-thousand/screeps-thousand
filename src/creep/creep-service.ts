import { Worker } from '../worker'
import { CreepType } from './creep-type'

export type CreepMap = {
    workers: Worker[]
}

/**
 * Ensure that a creep already has its role initialized
 */
function ensureInitialized(creep: Creep) {
    if (creep.memory.type === undefined) {
        //for now it's easy, there's only one
        creep.memory.type = CreepType.WORKER
        Worker.initMemory(creep)
    }
}

export class CreepService {

    /**
     * Gets us the creeps already divided by their roles
     */
    getCreepMap(creeps: Creep[]): CreepMap {
        const creepMap = {
            workers: [] as Worker[]
        }
        for (const creep of creeps) {
            ensureInitialized(creep)
            switch (creep.memory.type) {
                case CreepType.WORKER:
                    creepMap.workers.push(new Worker(creep))
                    break
                default:
                    console.log(`Unknown creep type ${creep.memory.type} on creep ${creep.name}`)
            }
        }
        return creepMap
    }

}