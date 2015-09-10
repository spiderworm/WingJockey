
import BaseVector4 from '../base/Vector4';

export default class CannonVec4Adapter extends BaseVector4 {
  
  constructor(cannonVec4) {
    super();
    delete this._x;
    delete this._y;
    delete this._z;
    this._cannon = cannonVec4;
  }

  get w() { return this._cannon.w; }
  set w(val) { this._cannon.w = val; }
  
  get x() { return this._cannon.x; }
  set x(val) { this._cannon.x = val; }
  
  get y() { return this._cannon.y; }
  set y(val) { this._cannon.y = val; }

  get z() { return this._cannon.z; }
  set z(val) { this._cannon.z = val; }

}