import { BehaviorDecider } from '@behavior/behaviorDecider';
import CreepBehavior from '@behavior/creep/creepBehavior';
import { BasicHarvest } from '@behavior/creep/harvest/harvester';
import GameState from '@state/gameState';
import { Role } from '@roles';
import { BuildBehavior } from './builder/builder';

export default class CreepDecider implements BehaviorDecider<CreepBehavior> {
  decideBehaviors(gameState: GameState): CreepBehavior[] {
    return []
      .concat(
        this.harvesters(
          gameState.getCreepsForRole(Role.HARVESTER, true),
          gameState.getSpawn()
        )
      )
      .concat(
        this.builders(
          gameState.getCreepsForRole(Role.BUILDER, true),
          gameState.getSpawn()
        )
      );
  }

  private harvesters(
    harvesters: Creep[],
    spawn: StructureSpawn
  ): CreepBehavior[] {
    return harvesters.map((harvester: Creep) => {
      const sources: Source[] = spawn.room.find(FIND_SOURCES);
      const closestSource = sources[0];
      return new BasicHarvest(harvester, closestSource, spawn);
    });
  }

  private builders(builders: Creep[], spawn: StructureSpawn): CreepBehavior[] {
    const constructionSites = spawn.room.find(FIND_CONSTRUCTION_SITES);
    if (constructionSites.length > 0) {
      return builders.map(
        (creep: Creep) => new BuildBehavior(creep, spawn, constructionSites[0])
      );
    } else {
      return [];
    }
  }
}
