import * as state from '../state';

//for now just a marker interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface
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

/**
 * Tell a creep to harvest
 */
export class Harvest implements Goal {
    creep: Creep
    source: Source
    destination: Structure
    constructor(creep: Creep, source: Source, destination: Structure) {
        this.creep = creep;
        this.source = source;
        this.destination = destination;
    }
}

export class GoalDecider {
    decide(gameState: state.GameState): Goal[] {
        const goals: Goal[] = []

        // energy? enough? NEVER

        // how much energy in the room?
        const numberOfEnergySources: number = gameState.numberOfEnergySources

        //how many harvesters
        const numberOfHarvesters: number = gameState.harvesters.length

        if (numberOfHarvesters < numberOfEnergySources) {
            //need more!
            goals.push(new IncreaseHarvesters(gameState.spawn))
        }

        for(const creep of gameState.harvesters) {
            goals.push(new Harvest(creep, gameState.room.find(FIND_SOURCES)[0], gameState.spawn))
        }

        return goals;
    }
}