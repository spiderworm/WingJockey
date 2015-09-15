
import BaseBallPhysics from '../base/ball/BaseBallPhysics';
import CANNON from 'cannon';

export default class BallPhysics extends BaseBallPhysics {
  constructor() {
    super();

    // TODO: don't access cannon directly
    this._cannon.linearDamping = .3;
    this._cannon.angularDamping = .3;

    var force = new CANNON.Vec3();

    setInterval(function() {
      force.z = -(.5 * this.position.z);
      this.applyForce(force);
    }.bind(this), 30);
  }
}
