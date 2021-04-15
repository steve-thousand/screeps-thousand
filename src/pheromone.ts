export enum PheromoneType {
    SEEK = 0,
    ENERGY = 1, //ant has found/is carrying energy
}

type Pheromone = {
    pheromoneType: PheromoneType,
    tick: number
}

type Pheromones = {
    pheromonesByType: Map<PheromoneType, Pheromone>
}

const pheromoneMap: Map<RoomPosition, Pheromones> = new Map()

export class PheromoneService {
    static markSpot(roomPosition: RoomPosition, pheromoneType: PheromoneType): void {
        const pheromones: Pheromones = PheromoneService.getPheromonesAt(roomPosition)
        pheromones?.pheromonesByType.set(pheromoneType, {
            pheromoneType: pheromoneType,
            tick: Game.time
        })
        pheromoneMap.set(roomPosition, pheromones)
    }
    static getPheromonesAt(roomPosition: RoomPosition): Pheromones {
        return pheromoneMap.get(roomPosition) ?? {
            pheromonesByType: new Map()
        };
    }
    static drawPheromones(room: Room): void {
        pheromoneMap.forEach((value: Pheromones, key: RoomPosition) => {
            Game.map.visual.circle(key, { radius: 10 })
        });
    }
}