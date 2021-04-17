import { Queen } from "queen";
import { CreepService, CreepMap } from "creep";
import { WorkerService } from "worker";
import { PheromoneService } from "pheromone"

let queen: Queen
const creepService: CreepService = new CreepService()
const pheromoneService: PheromoneService = new PheromoneService()
const workerService: WorkerService = new WorkerService(pheromoneService)

module.exports.loop = (): void => {
  console.log(`GAME TICK: ${Game.time}`);
  if (queen === undefined) {
    queen = new Queen(Game.spawns.Spawn1)
  }
  queen.makeWorker()

  const creepMap: CreepMap = creepService.getCreepMap(Object.values(Game.creeps))

  for (const worker of creepMap.workers) {
    try {
      workerService.move(worker)
    } catch (e) {
      console.log(e)
    }
  }
  pheromoneService.drawPheromones()
};