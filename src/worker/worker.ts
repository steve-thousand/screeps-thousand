import { WorkerState, WorkerStateType } from './worker-state'
import { MovementService } from './movement'

//potentially dangerous circular dependency situation
import { CreepWrapper } from '../creep/creep-wrapper'


declare global {
    interface CreepMemory {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
    }
}

/**
 * Typed memory for workers!
 */
class WorkerMemory {
    private creepMemory: CreepMemory

    constructor(creepMemory: CreepMemory) {
        this.creepMemory = creepMemory
    }

    static init(creepMemory: CreepMemory): void {
        creepMemory.worker = true
    }

    getDirection(): DirectionConstant {
        return this.creepMemory.direction
    }

    setDirection(direction: DirectionConstant): void {
        this.creepMemory.direction = direction
    }

    getState(): WorkerState {
        return this.creepMemory.state
    }

    setState(state: WorkerState): void {
        this.creepMemory.state = state
    }
}

export class Worker extends CreepWrapper {

    private workerMemory: WorkerMemory

    constructor(creep: Creep) {
        super(creep)
        this.workerMemory = new WorkerMemory(creep.memory)
    }

    static initMemory(creep: Creep): void {
        //initialize state
        creep.memory.state = {
            type: WorkerStateType.SEEK,
            time: Game.time
        }
        creep.memory.direction = MovementService.generateRandomDirection()
    }

    getState(): WorkerState {
        return this.workerMemory.getState()
    }

    getDirection(): DirectionConstant {
        return this.workerMemory.getDirection()
    }

    moveInDirection(direction: DirectionConstant): void {
        this.workerMemory.setDirection(direction)
        this.creep.move(direction);
    }
}
