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

export class Actor {
    act(goals: g.Goal[]): void {
        for (const goal of goals) {
            console.dir("Acting on goal", goal);
            switch (goal.constructor) {
                case g.IncreaseHarvesters:
                    increaseHarvesters(<g.IncreaseHarvesters>goal)
                    break;
            }
        }
    }
}