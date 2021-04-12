import * as g from '../goal'
import { v4 as uuidv4 } from 'uuid';

function increaseHarvesters(goal: g.IncreaseHarvesters) {
    const spawn: StructureSpawn = goal.spawn;
    if (!spawn.spawning) {
        spawn.spawnCreep(["move", "carry", "work"], uuidv4())
    } else {
        console.log(`Spawn ${spawn} can't spawn, already spawning`);
    }
}

function harvest(goal: g.Harvest) {
    const creep: Creep = goal.creep
    const source: Source = goal.source
    const destination: Structure = goal.destination
    
    if(creep.store.getFreeCapacity() > 0) {
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
    else {
        if(creep.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(destination);
        }
    }
}

export class Actor {
    act(goals: g.Goal[]): void {
        for (const goal of goals) {
            switch (goal.constructor) {
                case g.IncreaseHarvesters:
                    increaseHarvesters(<g.IncreaseHarvesters>goal)
                    break;
                case g.Harvest:
                    harvest(<g.Harvest>goal)
                    break;
            }
        }
    }
}