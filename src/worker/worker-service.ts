import { v4 as uuidv4 } from 'uuid'
import { PheromoneService, PheromoneType } from '../pheromone'
import { MovementService } from './movement'
import { Worker } from './worker'

const WORKER_NAME_PREFIX = "worker_";

export class WorkerService {
    private pheromoneService: PheromoneService

    constructor(pheromoneService: PheromoneService) {
        this.pheromoneService = pheromoneService
    }

    static createName(): string {
        return WORKER_NAME_PREFIX + uuidv4();
    }
    move(worker: Worker): void {
        //see if we have found energy
        const position: RoomPosition = worker.getPosition()
        const lookResults: LookAtResultWithPos[] = worker.getRoom().lookForAtArea(
            LOOK_SOURCES,
            position.y - 1,
            position.x - 1,
            position.y + 1,
            position.x + 1,
            true
        )
        for (const lookResult of lookResults) {
            if (lookResult.source) {
                worker.say("ENERGY!")
            }
        }

        //mark this spot
        this.pheromoneService.markSpot(position, PheromoneType.SEEK)

        //move
        const direction: DirectionConstant = MovementService.getNextDirection(worker.getDirection())
        worker.moveInDirection(direction)
    }
}
