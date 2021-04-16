import { Queen } from "queen";
import { WorkerService } from "worker";
import { PheromoneService } from "pheromone"

let queen: Queen
const pheromoneService: PheromoneService = new PheromoneService()
const workerService: WorkerService = new WorkerService(pheromoneService)

module.exports.loop = (): void => {
  console.log(`GAME TICK: ${Game.time}`);
  if (queen === undefined) {
    queen = new Queen(Game.spawns.Spawn1)
  }
  queen.makeWorker()

  for (const creep of Object.values(Game.creeps)) {
    if (WorkerService.isWorker(creep)) {
      workerService.move(creep)
    }
    pheromoneService.drawPheromones()
  }
};