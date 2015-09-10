
import Vector3 from './Vector3';

export default class Velocity {

  constructor(vector3) {
    this.setVector3(vector3 || new Vector3());
  }

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
