import { Queen } from "queen";
import { Worker } from "worker";
import { PheromoneService } from "pheromone"

let queen: Queen

module.exports.loop = (): void => {
  console.log(`GAME TICK: ${Game.time}`);
  if (queen === undefined) {
    queen = new Queen(Game.spawns.Spawn1)
  }
  queen.makeWorker()

  for (const creep of Object.values(Game.creeps)) {
    if (Worker.isWorker(creep)) {
      Worker.move(creep)
    }
    PheromoneService.drawPheromones(Game.rooms.Room1)
  }
};