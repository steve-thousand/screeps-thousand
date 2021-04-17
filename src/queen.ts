import { WorkerService } from './worker';

function getRandomDirection(): DirectionConstant {
    const number = Math.floor(Math.random() * 8) + 1;
    switch (number) {
        case TOP:
            return TOP
        case TOP_RIGHT:
            return TOP_RIGHT
        case RIGHT:
            return RIGHT
        case BOTTOM_RIGHT:
            return BOTTOM_RIGHT
        case BOTTOM:
            return BOTTOM
        case BOTTOM_LEFT:
            return BOTTOM_LEFT
        case LEFT:
            return LEFT
        case TOP_LEFT:
            return TOP_LEFT
        default:
            throw "Invalid direction number: " + number
    }
}

export class Queen {
    private spawn: StructureSpawn

    constructor(spawn: StructureSpawn) {
        this.spawn = spawn;
    }

    makeWorker(): boolean {
        const direction = getRandomDirection();
        if (!this.spawn.spawning) {
            const code = this.spawn.spawnCreep(
                [MOVE, WORK, CARRY],
                WorkerService.createName(),
                {
                    memory: { direction: direction },
                    directions: [direction]
                }
            )
            return code === OK;
        }
        return false;
    }
}