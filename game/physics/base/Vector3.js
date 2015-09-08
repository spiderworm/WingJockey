
export default class Vector3 {
  
  constructor() {
    this._x = this._y = this._z = 0;
  }

  get() {
    return {
      x: this._x,
      y: this._y,
      z: this._z
    };
  }

  set(vals) {
    if (vals.x || vals.x === 0) {
      this._x = vals.x;
    }
    if (vals.y || vals.y === 0) {
      this._y = vals.y;
    }
    if (vals.z || vals.z === 0) {
      this._z = vals.z;
    }
  }

}
