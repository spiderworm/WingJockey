
import RigidSphere from '../../physics/RigidSphere';
import CANNON from 'cannon';

export default class BallPhysics extends RigidSphere {
  constructor() {
    var width = 500;
    super(width);
    this.mass = .5;
    this.position = {x: 0, y: 0, z: 0};

    // TODO: don't access cannon directly
    this._cannon.collisionFilterGroup = 2;
    this._cannon.collisionFilterMask = 2 | 1;
    this._cannon.material = new CANNON.Material({restitution: .000001});
  }
}
