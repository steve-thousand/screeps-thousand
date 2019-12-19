import Behavior from '@behavior/Behavior';

export class Construct implements Behavior {
  protected room: Room;
  protected x: number;
  protected y: number;
  protected structureType: BuildableStructureConstant;
  constructor(
    room: Room,
    x: number,
    y: number,
    structureType: BuildableStructureConstant
  ) {
    this.room = room;
    this.x = x;
    this.y = y;
    this.structureType = structureType;
  }
  behave(): void {
    this.room.createConstructionSite(this.x, this.y, this.structureType);
  }
}
