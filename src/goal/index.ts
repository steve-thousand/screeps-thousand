import * as state from '../state';

//for now just a marker interface
export interface Goal { }

/**
 * Pretty self-explanatory. We don't have enough harvesters.
 */
export class IncreaseHarvesters implements Goal {
    spawn: StructureSpawn
    constructor(spawn: StructureSpawn) {
        this.spawn = spawn;
    }
}

export class GoalDecider {
    decide(gameState: state.GameState): Goal[] {
        const goals: Goal[] = []

        // energy? enough? NEVER

        // how much energy in the room?
        const numberOfEnergySources: number = gameState.numberOfEnergySources

        //how many harvesters
        const numberOfHarvesters: number = gameState.numberOfHarvesters

        if (numberOfHarvesters < numberOfEnergySources) {
            //need more!
            goals.push(new IncreaseHarvesters(gameState.spawn))
        }

        return goals;
    }
}