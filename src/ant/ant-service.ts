import { Worker } from '../worker'
import { AntType } from './ant-type'

export type AntMap = {
    workers: Worker[]
}

/**
 * Ensure that a creep already has its role initialized
 */
function ensureInitialized(creep: Creep) {
    if (creep.memory.type === undefined) {
        //for now it's easy, there's only one
        creep.memory.type = AntType.WORKER
        Worker.initMemory(creep)
    }
}

export class AntService {

    /**
     * Gets us the ants already divided by their roles
     */
    getAntMap(): AntMap {
        const creepMap = {
            workers: [] as Worker[]
        }
        for (const creep of Object.values(Game.creeps)) {
            ensureInitialized(creep)
            switch (creep.memory.type) {
                case AntType.WORKER:
                    creepMap.workers.push(new Worker(creep))
                    break
                default:
                    console.log(`Unknown creep type ${creep.memory.type} on creep ${creep.name}`)
            }
        }
        return creepMap
    }

}