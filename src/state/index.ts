export type GameState = {
    spawn: StructureSpawn
    numberOfEnergySources: number
    numberOfHarvesters: number
}

export class GameStateReader {
    read(): GameState {
        return {
            spawn: Game.spawns[0],
            numberOfEnergySources: 5,
            numberOfHarvesters: 0
        }
    }
}