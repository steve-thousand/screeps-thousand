import CreepBehavior from '@behavior/creep/creepBehavior';

export class BuildBehavior extends CreepBehavior {
  protected spawn: StructureSpawn;
  protected where: ConstructionSite;

  constructor(
    creep: Creep,
    spawn: StructureSpawn,
    constructionSite: ConstructionSite
  ) {
    super(creep);
    this.spawn = spawn;
    this.where = constructionSite;
  }

  behave(): void {
    if (this.creep.store[RESOURCE_ENERGY] < this.creep.carryCapacity) {
      if (this.creep.pos.isNearTo(this.spawn)) {
        this.creep.withdraw(this.spawn, RESOURCE_ENERGY);
      } else if (this.creep.pos.isNearTo(this.where)) {
        this.creep.build(this.where);
      }
      this.creep.moveTo(this.spawn);
    } else if (this.creep.pos.isNearTo(this.where)) {
      this.creep.build(this.where);
    } else {
      this.creep.moveTo(this.where);
    }
  }
}
