import { WorkerState, WorkerStateType } from './worker-state'
import { MovementService } from './movement'

//potentially dangerous circular dependency situation
import { AntWrapper } from '../ant/ant-wrapper'
import { Ant } from '../ant/ant'


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

export class Worker extends AntWrapper {

    private workerMemory: WorkerMemory

    constructor(ant: Ant) {
        super(ant)
        this.workerMemory = new WorkerMemory(ant.memory)
    }

    static initMemory(ant: Ant): void {
        //initialize state
        ant.memory.state = {
            type: WorkerStateType.SEEK,
            time: Game.time
        }
        ant.memory.direction = MovementService.generateRandomDirection()
    }

    getState(): WorkerState {
        return this.workerMemory.getState()
    }

    getDirection(): DirectionConstant {
        return this.workerMemory.getDirection()
    }

    moveInDirection(direction: DirectionConstant): void {
        this.workerMemory.setDirection(direction)
        this.ant.move(direction);
    }
}
