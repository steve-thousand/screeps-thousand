import Behavior from './behavior';
import { SpawnNewHarvester } from './spawn/spawnBehavior';
import { BasicHarvest } from './creep/creepBehavior';

import GameState from '../state/gameState';
import { Role, RoleDefinitions } from '../creeps/role';

export default class BehaviorDecider {
  decideBehaviors(gameState: GameState): Behavior[] {
    let behaviors: Behavior[] = [];

    const spawn = gameState.getSpawn();

    const harvesters: Creep[] = gameState.getCreepsForRole(
      Role.HARVESTER,
      true
    );

    const harvesterBehaviors: Behavior[] = harvesters.map(
      (harvester: Creep) => {
        const sources: Source[] = spawn.room.find(FIND_SOURCES);
        const closestSource = sources[0];
        return new BasicHarvest(harvester, closestSource, spawn);
      }
    );
    behaviors = behaviors.concat(harvesterBehaviors);

    if (!spawn.spawning) {
      if (spawn.energy > RoleDefinitions.get(Role.HARVESTER).getPrice()) {
        //do we have enough harvesters?
        if (harvesters.length < 3) {
          behaviors.push(new SpawnNewHarvester(spawn));
        }
      }
    }

    return behaviors;
  }
}
