
export default class PlaneControls {

  constructor() {
    this.gyroscope = false;
    this._pitch = 0;
    this._roll = 0;
    this._autoPitch = 0;
    this._autoRoll = 0;
    this._autoPitchCorrect = 0;
    this._autoRollCorrect = 0;

    setInterval(function() {
      this.pitch -= this._autoPitchCorrect * .75;
      this._autoPitchCorrect *= .25;
      var pitchBefore = this.pitch;
      this.pitch += this._autoPitch;
      this._autoPitchCorrect += this.pitch - pitchBefore;
      this._autoPitch *= .35;


      this.roll += this._autoRollCorrect * .75;
      this._autoRollCorrect *= .25;
      var rollBefore = this.roll;
      this.roll -= this._autoRoll;
      this._autoRollCorrect -= this.roll - rollBefore;
      this._autoRoll *= .35;
    }.bind(this),30);
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

  gyroscopeOn() {
    this.gyroscope = true;
  }

  gyroscopeOff() {
    this.gyroscope = false;
  }

  boosterOn() {
    this.booster = true;
  }

  boosterOff() {
    this.booster = false;
  }

  autoPitch(v) {
    this._autoPitch += v;
  }

  autoRoll(v) {
    this._autoRoll += v;
  }

}
