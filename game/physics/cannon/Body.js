
import BaseBody from '../base/Body';
import CannonVec3Adapter from './CannonVec3Adapter';
import CANNON from 'cannon';
import SHAPES from '../SHAPES';
import BODY_TYPES from '../BODY_TYPES';

export default class CannonBody extends BaseBody {
  constructor() {
    super();
    this._cannon = new CANNON.Body();
    this._updateVectors();
  }

  get mass() {
    return this._cannon.mass;
  }

  set mass(val) {
    if (val !== this.mass) {
      this._cannon.mass = val;
      this._replaceCannonBody();
    }
  }

  set type(val) {
    if (val !== this.type) {
      this._type = val;
      this._replaceCannonBody();
    }
  }

  addShape(shape, size, position, rotation) {
    var cannonShape;
    switch (shape) {
      case SHAPES.SPHERE:
        cannonShape = new CANNON.Sphere(
          (size.x + size.y + size.z)/3
        );
      break;
      case SHAPES.BOX:
        cannonShape = new CANNON.Box(
          new CANNON.Vec3(size.x, size.y, size.z)
        );
      break;
    }
    if (cannonShape) {
      this._cannon.addShape(cannonShape);
      this._replaceCannonBody();
    }
  }

  setCannonWorld(cannonWorld) {
    this._cannonWorld = cannonWorld;
  }

  _replaceCannonBody() {
    var oldBody = this._cannon;
    var newBody = new CANNON.Body({
      linearDamping: 0,
      damping: 0,
      angularDamping: 0,
      mass: oldBody.mass,
      position: oldBody.position,
      velocity: oldBody.velocity,
      quaternion: oldBody.quaternion,
      angularVelocity: oldBody.angularVelocity
    });
    oldBody.shapes.forEach(function(cannonShape) {
      newBody.addShape(cannonShape);
    });
    if(this._type === BODY_TYPES.GHOST) {
      newBody.collisionFilterMask = 0;
      newBody.collisionResponse = false;
    }
    if(this._cannonWorld) {
      this._cannonWorld.removeBody(oldBody);
      this._cannonWorld.addBody(newBody);
    }
    this._cannon = newBody;
    this._updateVectors();
  }

  _updateVectors() {
    var cannonPosition = new CannonVec3Adapter(this._cannon.position);
    this._position.setVector3(cannonPosition);
  }

}
