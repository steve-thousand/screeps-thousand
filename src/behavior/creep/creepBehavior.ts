import Behavior from '@behavior/behavior';

export default abstract class CreepBehavior implements Behavior {
  protected creep: Creep;
  constructor(creep: Creep) {
    this.creep = creep;
  }

  abstract behave(): void;
}
