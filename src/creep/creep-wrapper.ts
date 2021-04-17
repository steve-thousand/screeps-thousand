/**
 * YAY! Now we can have different creep wrappers
 */
export abstract class CreepWrapper {

    protected creep: Creep

    constructor(creep: Creep) {
        this.creep = creep
    }

    getRoom(): Room {
        return this.creep.room
    }

    getPosition(): RoomPosition {
        return this.creep.pos;
    }

    say(message: string): void {
        this.creep.say(message);
    }

    getCreep(): Creep {
        return this.creep
    }
}