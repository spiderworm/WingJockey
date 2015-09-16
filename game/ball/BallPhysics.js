
import BaseBallPhysics from '../base/ball/BaseBallPhysics';
import CANNON from 'cannon';

export default class BallPhysics extends BaseBallPhysics {
  constructor() {
    super();

    // TODO: don't access cannon directly
    this._cannon.linearDamping = .01;
    this._cannon.angularDamping = .01;

    var force = new CANNON.Vec3();

    setInterval(function() {
      //force.z = -(.5 * this.position.z);
      //this.applyForce(force);
    }.bind(this), 30);
  }

  reset() {
    this.position = {x: 0, y: 0, z: 0};
    this.rotation = {w: 1, x: 0, y: 0, z: 0};
    this.velocity = {x: 0, y: 0, z: 0};
    this.angularVelocity = {x: 0, y: 0, z: 0};
  }
}
