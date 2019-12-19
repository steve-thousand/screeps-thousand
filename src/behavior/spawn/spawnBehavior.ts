import Behavior from '../behavior';
import { RoleDefinition } from '@roles';

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

export class SpawnNewCreep extends SpawnBehavior {
  private roleDefinition: RoleDefinition;
  private name: string;

  constructor(
    spawn: StructureSpawn,
    roleDefinition: RoleDefinition,
    name?: string
  ) {
    super(spawn);
    this.roleDefinition = roleDefinition;
    this.name = name ? name : roleDefinition.getName() + new Date().getTime();
  }

  spawnIt() {
    this.spawn.createCreep(this.roleDefinition.getBodyParts(), this.name, {
      role: this.roleDefinition.getRole()
    });
  }
}
