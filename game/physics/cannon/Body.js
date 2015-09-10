
import BaseBody from '../base/Body';
import CannonVec3Adapter from './CannonVec3Adapter';
import CANNON from 'cannon';
import SHAPES from '../SHAPES';
import BODY_TYPES from '../BODY_TYPES';

export default class CannonBody extends BaseBody {
  constructor() {
    super();
    this._cannon = new CANNON.Body();

    this._shapes.forEach(function(key, shape) {
      this.__onAddShape(key, shape);
    }.bind(this));

    this._shapes.onAdd(function(key, shape) {
      this.__onAddShape(key, shape);
    }.bind(this));

    this._shapes.onRemove(function(key, shape) {
      this.__onRemoveShape(key);
    }.bind(this));

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

  setCannonWorld(cannonWorld) {
    this._cannonWorld = cannonWorld;
  }

  __onAddShape(key, shape) {
    var size = shape.size,
        offset = shape.position,
        rotation = shape.rotation,
        shape = shape.type;

    var cannonShape;

    switch (shape) {
      case SHAPES.SPHERE:
        var radius = ((size.x + size.y + size.z)/3)/2;
        console.info(size, radius);
        cannonShape = new CANNON.Sphere(radius);
      break;
      case SHAPES.BOX:
        cannonShape = new CANNON.Box(
          new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)
        );
      break;
    }
    if (cannonShape) {
      offset = new CANNON.Vec3(offset.x, offset.y, offset.z);
      this._cannon.addShape( cannonShape, offset);
      console.info(offset);
      this._replaceCannonBody();
    }
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
    for (var i=0; i<oldBody.shapes.length; i++) {
      newBody.addShape(
        oldBody.shapes[i],
        oldBody.shapeOffsets[i],
        oldBody.shapeOrientations[i]
      );
    }
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
    var cannonVelocity = new CannonVec3Adapter(this._cannon.velocity);
    this._velocity.setVector3(cannonVelocity);
  }

}
