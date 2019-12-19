import Behavior from '@behavior/behavior';

export default class Actor {
  act(behaviors: Behavior[]) {
    behaviors.forEach((behavior: Behavior) => {
      behavior.behave();
    });
  }
}
