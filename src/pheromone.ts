export enum PheromoneType {
    SEEK = 0,
    ENERGY = 1, //ant has found/is carrying energy
}

export type Pheromone = {
    pheromoneType: PheromoneType,
    tick: number
}

export type Pheromones = {
    pheromonesByType: Map<PheromoneType, Pheromone>
}

function toKey(roomPosition: RoomPosition): string {
    return JSON.stringify(roomPosition);
}

export class PheromoneService {

    private game: Game
    private pheromoneMap: Map<string, Pheromones> = new Map()

    constructor(game: Game) {
        this.game = game
    }

    markSpot(roomPosition: RoomPosition, pheromoneType: PheromoneType): void {
        const pheromones: Pheromones = this.getPheromonesAt(roomPosition)
        pheromones?.pheromonesByType.set(pheromoneType, {
            pheromoneType: pheromoneType,
            tick: this.game.time
        })
        const key: string = toKey(roomPosition);
        this.pheromoneMap.set(key, pheromones)
    }
    getPheromonesAt(roomPosition: RoomPosition): Pheromones {
        const key: string = toKey(roomPosition);
        return this.pheromoneMap.get(key) ?? {
            pheromonesByType: new Map()
        };
    }
    drawPheromones(mapVisual: MapVisual): void {
        this.pheromoneMap.forEach((value: Pheromones, key: string) => {
            const roomPosition: RoomPosition = <RoomPosition>JSON.parse(key);
            mapVisual.circle(new RoomPosition(
                roomPosition.x, roomPosition.y, roomPosition.roomName
            ), {})
        });
    }
}