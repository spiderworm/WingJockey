
import BaseVector3 from '../base/Vector3';

export default class CannonVec3Adapter extends BaseVector3 {
  
  constructor(cannonVec3) {
    super();
    delete this._x;
    delete this._y;
    delete this._z;
    this._cannon = cannonVec3;
  }

  get x() { return this._cannon.x; }
  set x(val) { this._cannon.x = val; }
  
  get y() { return this._cannon.y; }
  set y(val) { this._cannon.y = val; }

  get z() { return this._cannon.z; }
  set z(val) { this._cannon.z = val; }

}