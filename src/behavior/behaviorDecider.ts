import Behavior from '@behavior/behavior';
import SpawnDecider from '@behavior/spawn/spawnDecider';
import CreepDecider from '@behavior/creep/creepDecider';

import GameState from '@state/gameState';
import ConstructionDecider from '@behavior/construction/constructionDecider';

export interface BehaviorDecider<T extends Behavior> {
  decideBehaviors(gameState: GameState): T[];
}

const spawnDecider = new SpawnDecider();
const constructionDecider = new ConstructionDecider();
const creepDecider = new CreepDecider();

export default class AllBehaviorDecider implements BehaviorDecider<Behavior> {
  decideBehaviors(gameState: GameState): Behavior[] {
    let behaviors: Behavior[] = [];

    behaviors = behaviors
      .concat(spawnDecider.decideBehaviors(gameState))
      .concat(constructionDecider.decideBehaviors(gameState))
      .concat(creepDecider.decideBehaviors(gameState));

    return behaviors;
  }
}
