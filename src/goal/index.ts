import * as state from '../state';
import { EnergySourceEvaluator } from './energy';

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

        let harvesterIndex = 0
        const sources: Source[] = gameState.room.find(FIND_SOURCES);

        //first assign harvesters to sources
        const harvestersBySource: Map<Id<Source>, Creep[]> = new Map()
        for (const source of sources) {
            if (harvesterIndex < gameState.harvesters.length) {
                const harvester = gameState.harvesters[harvesterIndex]
                goals.push(new Harvest(harvester, source, gameState.spawn))
                if (!harvestersBySource.has(source.id)) {
                    harvestersBySource.set(source.id, [])
                }
                harvestersBySource.get(source.id).push(harvester)
                harvesterIndex++
            }
        }

        //then determine if we need new ones
        for (const source of sources) {
            let numberOfAssignedHarvesters = 0;
            if (harvestersBySource.has(source.id)) {
                numberOfAssignedHarvesters = harvestersBySource.get(source.id).length
            }
            //TODO harcoded to one exposes mining position... fix that
            const saturation = EnergySourceEvaluator.determineSourceSaturation(source.pos, gameState.spawn.pos, 1, numberOfAssignedHarvesters);
            if (saturation < 1) {
                console.log(`Source ${source.id} is not yet saturated. Adding goal to increase harvesters`)
                goals.push(new IncreaseHarvesters(gameState.spawn))
            }
        }

        return goals;
    }
}