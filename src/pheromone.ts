declare global {
    interface Memory {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
    }
}

export enum PheromoneType {
    SEEK = 0,
    ENERGY = 1, //ant has found/is carrying energy
}

export type Pheromone = {
    pheromoneType: PheromoneType,
    tick: number
}

export type Pheromones = {
    pheromonesByType: { [key: number]: Pheromone }
}

function toKey(roomPosition: RoomPosition): string {
    return JSON.stringify(roomPosition);
}

export class PheromoneService {

    private game: Game
    private memory: Memory

    constructor(game: Game, memory: Memory) {
        this.game = game
        this.memory = memory
    }

    markSpot(roomPosition: RoomPosition, pheromoneType: PheromoneType): void {
        const pheromones: Pheromones = this.getPheromonesAt(roomPosition)
        pheromones.pheromonesByType[pheromoneType] = {
            pheromoneType: pheromoneType,
            tick: this.game.time
        }
        const key: string = toKey(roomPosition);
        const pheromoneMap = this.getPheromoneMap()
        pheromoneMap[key] = pheromones
        this.setPheromoneMap(pheromoneMap)
    }
    getPheromonesAt(roomPosition: RoomPosition): Pheromones {
        const key: string = toKey(roomPosition);
        const pheromones: { [key: string]: Pheromones } = this.getPheromoneMap();
        if (!pheromones[key]) {
            pheromones[key] = {
                pheromonesByType: {}
            }
        }
        return pheromones[key]
    }
    drawPheromones(mapVisual: MapVisual): void {
        for (const key of Object.keys(this.getPheromoneMap())) {
            const roomPosition: RoomPosition = <RoomPosition>JSON.parse(key);
            mapVisual.circle(new RoomPosition(
                roomPosition.x, roomPosition.y, roomPosition.roomName
            ), {})
        }
    }
    private setPheromoneMap(map: { [key: string]: Pheromones }): void {
        this.memory.pheromoneMap = map
    }
    private getPheromoneMap(): { [key: string]: Pheromones } {
        if (!("pheromoneMap" in this.memory)) {
            this.memory.pheromoneMap = {}
        }
        return this.memory.pheromoneMap
    }
}