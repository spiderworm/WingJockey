
import BaseBall from '../base/ball/BaseBall';
import BallPhysics from './BallPhysics';

export default class Ball extends BaseBall {
  constructor() {
    var physics = new BallPhysics();
    super(physics);
  }

  reset() {
    this.physics.reset();
  }
}
