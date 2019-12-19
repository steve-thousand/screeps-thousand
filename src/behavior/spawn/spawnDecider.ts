import { BehaviorDecider } from '@behavior/behaviorDecider';
import SpawnBehavior, { SpawnNewCreep } from '@behavior/spawn/spawnBehavior';
import GameState from '@state/gameState';
import { Role, RoleDefinitions } from '@roles';

export default class SpawnDecider implements BehaviorDecider<SpawnBehavior> {
  decideBehaviors(gameState: GameState): SpawnBehavior[] {
    const energyAnalysis = gameState.getEnergyAnalysis();
    const spawn = gameState.getSpawn();

    //should we spawn a harvester?
    if (energyAnalysis.totalScore < 0.7) {
      //bad energy score! we need more energy
      if (!spawn.spawning) {
        const roleDefinition = RoleDefinitions.get(Role.HARVESTER);
        if (spawn.energy > roleDefinition.getPrice()) {
          //do we have enough harvesters?
          if (gameState.getCreepsForRole(Role.HARVESTER, true).length < 3) {
            return [new SpawnNewCreep(spawn, roleDefinition)];
          }
        }
      }
    } else {
      if (
        gameState.getCreepsForRole(Role.BUILDER).length <= 1 &&
        spawn.energy > RoleDefinitions.get(Role.BUILDER).getPrice()
      ) {
        return [new SpawnNewCreep(spawn, RoleDefinitions.get(Role.BUILDER))];
      }

      if (gameState.getCreepsForRole(Role.UPGRADER).length == 0) {
        return [new SpawnNewCreep(spawn, RoleDefinitions.get(Role.UPGRADER))];
      }
    }

    return [];
  }
}
