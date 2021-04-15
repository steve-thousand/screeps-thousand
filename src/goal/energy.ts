const CAPACITY_PER_CARRY = 50
const ENERGY_HARVEST_PER_WORK = 2

type Position = {
    x: number,
    y: number
}

/**
 * Code to determine if we are harvesting a source as well as we can.
 */
export class EnergySourceEvaluator {

    /**
     * TODO so far we consider all creeps equal
     * @param source position of source
     * @param spawn position of spawn
     * @param harvestPositions how many positions are available to harvest from
     * @param assignedCreeps how many creeps are assigned to the source
     */
    static determineSourceSaturation(
        source: Position,
        spawn: Position,
        harvestPositions: number,
        assignedCreeps: number
    ): number {

        if (assignedCreeps === 0) {
            return 0
        }

        const distance = this.distance(source, spawn);

        //so what is the ideal foo? how bad is foo? maybe we don't know
        return assignedCreeps / this.calculateMax(distance, harvestPositions)
    }

    private static distance(source: Position, spawn: Position): number {
        return Math.max(Math.abs(source.x - spawn.x), Math.abs(source.y - spawn.y));
    }

    static calculateTimeToHarvest(distance: number): number {
        //assuming 1 move per tick, 2 work per tick, 1 carry
        //time it takes to retrieve:
        let time = 0
        time += distance
        time += CAPACITY_PER_CARRY / ENERGY_HARVEST_PER_WORK
        time += distance // TODO: fatigue
        return time
    }

    static calculateMax(distance: number, harvestPositions: number): number {
        //rough.
        //distance makes value go up, requiring more harvesters
        //more harvest spots also makes it go up, because it can handle more harvesters
        return Math.ceil(distance / 5) * harvestPositions
    }
}