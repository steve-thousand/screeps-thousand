import GameState from '@state/gameState';
import EnergyAnalysis from '@state/energy/energyAnalysis';
import { Role } from '@roles';

//how many sources are there? can we score them based on distance?

//do we have enough harvesters directed at the highest scoring n sources?

//shouldn't our harvesting level be correllated to some other things? size of base, etc?
export default class EnergyAnalyzer {
  static analyze(gameState: GameState): EnergyAnalysis {
    const spawn: StructureSpawn = gameState.getSpawn();

    //do we have at least 3 harvesters?
    const harvesters = gameState.getCreepsForRole(Role.HARVESTER, true);
    if (harvesters.length < 3) {
      return new EnergyAnalysis(0);
    } else {
      return new EnergyAnalysis(1);
    }

    // // const sources: Source[] = spawn.room.find(FIND_SOURCES);

    // const spawnPercentFull = spawn.energy / spawn.energyCapacity;

    // energyAnalysis.totalScore = spawnPercentFull;
    // return energyAnalysis;
  }
}
