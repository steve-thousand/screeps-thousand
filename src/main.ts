import GameStateReader from './state/gameStateReader';
import BehaviorDecider from './behavior/behaviorDecider';
import Actor from './act/Actor';

const gameStateReader = new GameStateReader();
const behaviorDecider = new BehaviorDecider();
const actor = new Actor();

module.exports.loop = function() {
  //review game state
  const gameState = gameStateReader.getGameState();

  //decide what to do
  const behaviors = behaviorDecider.decideBehaviors(gameState);

  //do it
  actor.act(behaviors);
};
