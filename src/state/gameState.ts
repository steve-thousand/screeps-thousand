import { Role } from '@roles';
import EnergyAnalysis from '@state/energy/energyAnalysis';

export default class GameState {
  private spawn: StructureSpawn;
  private creepMap = new Map<Role, Creep[]>();
  private energyAnalysis: EnergyAnalysis;

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

  /**
   * Get existing creeps, for the given role, and optionally select for those that are available (not spawning);
   * @param role desired role
   * @param available spawning or not
   */
  getCreepsForRole(role: Role, available?: boolean): Creep[] {
    let creepsForRole = this.creepMap.get(role);
    creepsForRole = creepsForRole ? creepsForRole : [];
    if (available !== undefined) {
      creepsForRole = creepsForRole.filter((creep: Creep) => {
        return creep.spawning !== available;
      });
    }
    return creepsForRole;
  }

  getEnergyAnalysis() {
    return this.energyAnalysis;
  }

  setEnergyAnalysis(energyAnalysis: EnergyAnalysis) {
    this.energyAnalysis = energyAnalysis;
  }
}
