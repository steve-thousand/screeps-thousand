import Behavior from '../behavior';
import { Role, RoleDefinitions } from '../../creeps/role';
// const uuidv1 = require('uuid/v1');

class RoleDefinition {
  private bodyParts: BodyPartConstant[];
  static calculatePrice(roleDefinition: RoleDefinition): number {
    return roleDefinition.bodyParts
      .map((a: BodyPartConstant) => {
        return BODYPART_COST[a];
      })
      .reduce((a, b) => {
        return a + b;
      });
  }
}

export default abstract class SpawnBehavior implements Behavior {
  protected spawn: StructureSpawn;
  constructor(spawn: StructureSpawn) {
    this.spawn = spawn;
  }
  behave() {
    this.spawnIt();
  }
  abstract spawnIt(): void;
}

export class SpawnNewHarvester extends SpawnBehavior {
  private name: string;

  constructor(spawn: StructureSpawn, name?: string) {
    super(spawn);
    this.name = name
      ? name
      : RoleDefinitions.get(Role.HARVESTER).getName() + new Date().getTime();
  }

  spawnIt() {
    console.log('Harvester deficit, creating harvester');
    this.spawn.createCreep([WORK, MOVE, CARRY], this.name, {
      role: Role.HARVESTER
    });
  }
}
