import { BehaviorDecider } from '@behavior/behaviorDecider';
import { Construct } from '@behavior/construction/constructionBehavior';
import GameState from '@state/gameState';
import Behavior from '@behavior/behavior';
import { Role } from '@roles';

interface StructureReport {
  existing: number;
  constructing: number;
  total: number;
}

export default class ConstructionDecider implements BehaviorDecider<Behavior> {
  decideBehaviors(gameState: GameState): Behavior[] {
    const spawn = gameState.getSpawn();
    const containerReport = this.getStructureReport(
      STRUCTURE_CONTAINER,
      gameState
    );
    const builders = gameState.getCreepsForRole(Role.BUILDER);
    if (builders.length > 0 || containerReport.total == 0) {
      return [
        new Construct(
          spawn.room,
          spawn.pos.x,
          spawn.pos.y + 1,
          STRUCTURE_CONTAINER
        )
      ];
    } else {
      return [];
    }
  }

  getStructureReport(
    structureType: BuildableStructureConstant,
    gameState: GameState
  ): StructureReport {
    const room = gameState.getSpawn().room;
    const structures: Structure[] = room.find(FIND_STRUCTURES, {
      filter: i => i.structureType == STRUCTURE_CONTAINER
    });
    const constructionSites = room.find(FIND_CONSTRUCTION_SITES, {
      filter: (c: ConstructionSite) => c.structureType == structureType
    });
    return {
      existing: structures.length,
      constructing: constructionSites.length,
      total: structures.length + constructionSites.length
    };
  }
}
