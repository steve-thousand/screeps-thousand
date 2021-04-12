import * as state from "./state";
import * as goal from './goal';
import * as act from './act';

const gameStateReader: state.GameStateReader = new state.GameStateReader();
const goalDecider: goal.GoalDecider = new goal.GoalDecider();
const actor: act.Actor = new act.Actor();

module.exports.loop = (): void => {
  console.log(`GAME TICK: ${Game.time}`);
  const gameState: state.GameState = gameStateReader.read();
  const goals: goal.Goal[] = goalDecider.decide(gameState)
  actor.act(goals);
};