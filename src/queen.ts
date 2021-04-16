import { WorkerService } from './worker';

export class Queen {
    private spawn: StructureSpawn

    constructor(spawn: StructureSpawn) {
        this.spawn = spawn;
    }

    makeWorker(): boolean {
        const code = this.spawn.spawnCreep([MOVE, WORK, CARRY], WorkerService.createName())
        return code === OK;
    }
}