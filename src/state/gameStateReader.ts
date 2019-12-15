import GameState from './gameState';
import { Role } from '../creeps/role';

export default class GameStateReader {
  getGameState(): GameState {
    const gameState = new GameState(Game.spawns.Spawn1);

    Object.values(Game.creeps).forEach((creep: Creep) => {
      if (creep.memory['role'] == Role.HARVESTER) {
        gameState.registerCreep(creep, Role.HARVESTER);
      }
    });

    return gameState;
  }
}
