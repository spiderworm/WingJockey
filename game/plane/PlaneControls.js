
export default class PlaneControls {

  constructor() {
    this._pitch = 0;
    this._roll = 0;
  }

  get pitch() { return this._pitch; }
  set pitch(val) {
    if (val > 1) {
      val = 1;
    }
    if (val < -1) {
      val = -1;
    }
    this._pitch = val;
  }

  get roll() { return this._roll; }
  set roll(val) {
    if (val > 1) {
      val = 1;
    }
    if (val < -1) {
      val = -1;
    }
    this._roll = val;
  }

}
