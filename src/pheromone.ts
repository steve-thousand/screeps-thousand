declare global {
    interface Memory {
        pheromoneMap: PheromoneMap
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
    time: number
}

export type Pheromones = {
    pheromonesByType: { [key: number]: Pheromone }
}

export type PheromoneMap = { [key: string]: Pheromones }

function toKey(roomPosition: RoomPosition): string {
    return JSON.stringify(roomPosition);
}

export const MAX_AGE = 100

export enum PheromoneOpacity {
    SEEK = .08,
    ENERGY = .25
}

export class PheromoneVisualizer {
    static determineStrength(pheromone: Pheromone): number {
        const age = Game.time - pheromone.time
        if (age > MAX_AGE || age < 0) {
            return 0;
        }
        return (MAX_AGE - age) / MAX_AGE
    }
    private static getOpacity(pheromoneType: PheromoneType): number {
        switch (pheromoneType) {
            case PheromoneType.SEEK:
                return PheromoneOpacity.SEEK
            case PheromoneType.ENERGY:
                return PheromoneOpacity.ENERGY
            default:
                return .10
        }
    }
    static getDrawSettings(pheromone: Pheromone): MapCircleStyle {
        const strength = PheromoneVisualizer.determineStrength(pheromone);
        const opacity: number = this.getOpacity(pheromone.pheromoneType);
        return { opacity: strength <= 0 ? 0 : (opacity * strength), radius: strength <= 0 ? 0 : (.5 * strength) }
    }
}

export class PheromoneService {

    markSpot(roomPosition: RoomPosition, pheromoneType: PheromoneType): void {
        const pheromones: Pheromones = this.getPheromonesAt(roomPosition)
        pheromones.pheromonesByType[pheromoneType] = {
            pheromoneType: pheromoneType,
            time: 0 + Game.time
        }
        const key: string = toKey(roomPosition);
        const pheromoneMap = this.getPheromoneMap()
        pheromoneMap[key] = pheromones
        this.setPheromoneMap(pheromoneMap)
    }
    getPheromonesAt(roomPosition: RoomPosition): Pheromones {
        const key: string = toKey(roomPosition);
        const pheromones: PheromoneMap = this.getPheromoneMap();
        if (!pheromones[key]) {
            pheromones[key] = {
                pheromonesByType: {}
            }
        }
        return pheromones[key]
    }
    drawPheromones(): void {
        const pheromoneMap: PheromoneMap = this.getPheromoneMap()
        for (const key of Object.keys(pheromoneMap)) {
            const roomPosition: RoomPosition = <RoomPosition>JSON.parse(key);
            const pheromones: Pheromones = pheromoneMap[key]
            if (PheromoneType.SEEK in pheromones.pheromonesByType) {
                const pheromone = pheromones.pheromonesByType[PheromoneType.SEEK]
                const drawSettings = PheromoneVisualizer.getDrawSettings(pheromone);
                if (drawSettings.radius !== undefined && drawSettings.radius > 0) {
                    Game.map.visual.circle(
                        new RoomPosition(roomPosition.x, roomPosition.y, roomPosition.roomName),
                        drawSettings
                    )
                }
            }
        }
    }
    private setPheromoneMap(map: PheromoneMap): void {
        Memory.pheromoneMap = map
    }
    private getPheromoneMap(): PheromoneMap {
        if (!("pheromoneMap" in Memory)) {
            Memory.pheromoneMap = {}
        }
        return Memory.pheromoneMap
    }
}