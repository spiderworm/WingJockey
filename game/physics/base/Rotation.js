
import Vector4 from './Vector4';

export default class Rotation {
  
  constructor(vector4) {
    this.setVector4(vector4 || new Vector4());
  }

  get() {
    return this._vector4.get();
  }
  
  set(vals) {
    this._vector4.set(vals);
  }

  setVector4(vector4) {
    this._vector4 = vector4;
  }

}
