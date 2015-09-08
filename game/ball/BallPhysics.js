
import RigidSphere from '../physics/RigidSphere';

export default class BallPhysics extends RigidSphere {
  constructor() {
    var width = 10;
    super(10);
    this.mass = 5;
    this.position = {x: 0, y: 0, z: 20};
  }
}
