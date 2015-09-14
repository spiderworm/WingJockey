
import Vector3 from './Vector3';

export default class Position {

  constructor(vector3) {
    this.setVector3(vector3 || new Vector3());
  }

  get x() { return this._vector3.x; }
  set x(v) { this._vector3.x = v; }
  get y() { return this._vector3.y; }
  set y(v) { this._vector3.y = v; }
  get z() { return this._vector3.z; }
  set z(v) { this._vector3.z = v; }

  get() {
    return this._vector3.get();
  }
  
  set(vals) {
    this._vector3.set(vals);
  }

  setVector3(vector3) {
    this._vector3 = vector3;
  }
}
