//turning distribution
const TURN_PROBABILITIES: number[] = [
    -2,
    -2,
    -1,
    -1,
    -1,
    -1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
]

export class MovementService {
    static toDirection(x: number): DirectionConstant {
        x %= 8
        if (x <= 0) {
            x += 8
        }
        switch (x) {
            case TOP:
                return TOP
            case TOP_RIGHT:
                return TOP_RIGHT
            case RIGHT:
                return RIGHT
            case BOTTOM_RIGHT:
                return BOTTOM_RIGHT
            case BOTTOM:
                return BOTTOM
            case BOTTOM_LEFT:
                return BOTTOM_LEFT
            case LEFT:
                return LEFT
            case TOP_LEFT:
                return TOP_LEFT
            default:
                throw "Invalid direction number: " + x
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static getNextDirection(currentDirection: DirectionConstant) {
        //for now let's just have it be some random movement left or right, uneven distribution
        const index = Math.floor(Math.random() * 19);
        return this.toDirection(currentDirection + TURN_PROBABILITIES[index])
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static generateRandomDirection(): DirectionConstant {
        const number = Math.floor(Math.random() * 8) + 1;
        return this.toDirection(number)
    }
}