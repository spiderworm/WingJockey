
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

  invert() {
    this.set(
      {
        x: -this.x,
        y: -this.y,
        z: -this.z
      }
    );
    return this;
  }

  setLength(len) {
    var current = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2) + Math.pow(this.z,2));
    var fix = len / current;
    this.set(
      {
        x: this.x * fix,
        y: this.y * fix,
        z: this.z * fix
      }
    );
    return this;
  }

}

Vector3.subtract = function(v1, v2) {
  return new Vector3(
    {
      x: v1.x - v2.x,
      y: v1.y - v2.y,
      z: v1.z - v2.z
    }
  );
}
