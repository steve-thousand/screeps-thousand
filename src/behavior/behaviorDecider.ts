import Behavior from './behavior';
import { SpawnNewHarvester } from './spawn/spawnBehavior';

import GameState from '../state/gameState';
import { Role, RoleDefinitions } from '../creeps/role';

export default class BehaviorDecider {
  decideBehaviors(gameState: GameState): Behavior[] {
    const behaviors: Behavior[] = [];

    const spawn = gameState.getSpawn();

    if (!spawn.spawning) {
      if (spawn.energy > RoleDefinitions.get(Role.HARVESTER).getPrice()) {
        //do we have enough harvesters?
        const harvesters: Creep[] = gameState.getCreepsForRole(Role.HARVESTER);
        if (harvesters.length < 3) {
          behaviors.push(new SpawnNewHarvester(spawn));
        }
      }
    }

    return behaviors;
  }
}
