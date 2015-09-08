
import GameObject from '../GameObject';
import BallPhysics from './BallPhysics';

export default class Ball extends GameObject {
  constructor() {
    var physics = new BallPhysics();
    super(physics);
  }
}
