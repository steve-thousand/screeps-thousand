import { Ant } from "./ant";

/**
 * YAY! Now we can have different creep wrappers
 */
export abstract class AntWrapper {

    protected ant: Ant

    constructor(ant: Ant) {
        this.ant = ant
    }

    getRoom(): Room {
        return this.ant.room
    }

    getPosition(): RoomPosition {
        return this.ant.pos;
    }

    say(message: string): void {
        this.ant.say(message);
    }

    getCreep(): Creep {
        return this.ant
    }
}