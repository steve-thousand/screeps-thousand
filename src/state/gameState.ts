import { Role } from '../creeps/role';

export default class GameState {
  private spawn: StructureSpawn;
  private creepMap = new Map<Role, Creep[]>();

  constructor(spawn: StructureSpawn) {
    this.spawn = spawn;
  }

  getSpawn(): StructureSpawn {
    return this.spawn;
  }

  registerCreep(creep: Creep, role: Role) {
    if (!this.creepMap.has(role) || this.creepMap.get(role) == undefined) {
      this.creepMap.set(role, []);
    }
    this.creepMap.get(role).push(creep);
  }

  getCreepsForRole(role: Role): Creep[] {
    const creepsForRole = this.creepMap.get(role);
    return creepsForRole ? creepsForRole : [];
  }
}
