export type GameState = {
    spawn: StructureSpawn
    room: Room
    numberOfEnergySources: number
    harvesters: Creep[],
    creeps: { [creepName: string]: Creep }
}

export class GameStateReader {
    read(): GameState {
        const harvesters: Creep[] = []
        for (const creep of Object.values(Game.creeps)) {
            let work = false
            let carry = false
            for (const bodyDef of creep.body) {
                if (bodyDef.type === WORK) {
                    work = true
                } else if (bodyDef.type === CARRY) {
                    carry = true
                }
            }
            if(work && carry) {
                harvesters.push(creep)
            }
        }
        return {
            spawn: Game.spawns["Spawn1"],
            room: Game.rooms["sim"],
            numberOfEnergySources: 5,
            harvesters: harvesters,
            creeps: Game.creeps
        }
    }
}