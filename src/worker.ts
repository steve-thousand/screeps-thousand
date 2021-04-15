import { v4 as uuidv4 } from 'uuid'
import { PheromoneService, PheromoneType } from './pheromone'

const WORKER_NAME_PREFIX = "worker_";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateMoveDirection(creep: Creep): DirectionConstant {
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

export class Worker {
    static createName(): string {
        return WORKER_NAME_PREFIX + uuidv4();
    }
    static isWorker(creep: Creep): boolean {
        return creep.name.startsWith(WORKER_NAME_PREFIX)
    }
    static move(creep: Creep): void {
        PheromoneService.markSpot(creep.pos, PheromoneType.SEEK)
        const direction: DirectionConstant = generateMoveDirection(creep);
        creep.move(direction);
    }
}