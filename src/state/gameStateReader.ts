import GameState from '@state/gameState';
import EnergyAnalyzer from '@state/energy/energyAnalyzer';

export default class GameStateReader {
  getGameState(): GameState {
    const gameState = new GameState(Game.spawns.Spawn1);

    Object.values(Game.creeps).forEach((creep: Creep) => {
      if (creep.my) {
        gameState.registerCreep(creep, creep.memory['role']);
      }
    });

    gameState.setEnergyAnalysis(EnergyAnalyzer.analyze(gameState));

    return gameState;
  }
}
