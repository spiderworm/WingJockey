
export default class Vector3 {
  
  constructor(vals) {
    this._x = this._y = this._z = 0;
    this.set(vals);
  }

  get x() { return this._x; }
  set x(val) { this._x = val; }
  
  get y() { return this._y; }
  set y(val) { this._y = val; }

  get z() { return this._z; }
  set z(val) { this._z = val; }

  get() {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    };
  }

  set(vals) {
    if (vals) {
      if (vals.x || vals.x === 0) {
        this.x = vals.x;
      }
      if (vals.y || vals.y === 0) {
        this.y = vals.y;
      }
      if (vals.z || vals.z === 0) {
        this.z = vals.z;
      }
    }
  }

}
