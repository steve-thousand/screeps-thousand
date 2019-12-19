import CreepBehavior from '@behavior/creep/creepBehavior';

export class BasicHarvest extends CreepBehavior {
  private source: Source;
  private dropOff: Structure;
  constructor(creep: Creep, source: Source, dropOff: Structure) {
    super(creep);
    this.source = source;
    this.dropOff = dropOff;
  }

  behave() {
    //is it full? let's drop it off!
    if (this.creep.store[RESOURCE_ENERGY] >= this.creep.store.getCapacity()) {
      //are we at drop off point?
      if (this.creep.pos.isNearTo(this.dropOff)) {
        //then drop it off!
        this.creep.transfer(this.dropOff, RESOURCE_ENERGY);
      } else {
        //go to drop off
        this.creep.moveTo(this.dropOff);
      }
    } else if (this.creep.pos.isNearTo(this.source)) {
      this.creep.harvest(this.source);
    } else {
      this.creep.moveTo(this.source);
    }
  }
}
