import { Queen } from "queen";
import { AntService, AntMap } from "ant";
import { WorkerService } from "worker";
import { PheromoneService } from "pheromone"

let queen: Queen
const antService: AntService = new AntService()
const pheromoneService: PheromoneService = new PheromoneService()
const workerService: WorkerService = new WorkerService(pheromoneService)

module.exports.loop = (): void => {
  console.log(`GAME TICK: ${Game.time}`);
  if (queen === undefined) {
    queen = new Queen(Game.spawns.Spawn1)
  }
  queen.makeWorker()

  const antMap: AntMap = antService.getAntMap()

  for (const worker of antMap.workers) {
    try {
      workerService.move(worker)
    } catch (e) {
      console.log(e)
    }
  }
  pheromoneService.drawPheromones()
};