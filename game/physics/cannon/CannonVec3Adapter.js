
import BaseVector3 from '../base/Vector3';

export default class CannonVec3Adapter extends BaseVector3 {
  
  constructor(cannonVec3) {
    super();
    delete this._x;
    delete this._y;
    delete this._z;
    this._cannon = cannonVec3;
  }

  get() {
    return {
      x: this._cannon.x,
      y: this._cannon.y,
      z: this._cannon.z
    };
  }

  set(vals) {
    if(vals.x || vals.x === 0) {
      this._cannon.x = vals.x;
    }
    if(vals.y || vals.y === 0) {
      this._cannon.y = vals.y;
    }
    if(vals.z || vals.z === 0) {
      this._cannon.z = vals.z;
    }
  }

}