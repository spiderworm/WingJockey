
import World from "../base/World";
import CANNON from 'cannon';

export default class CannonWorld extends World {

  constructor() {
    super();

    this._cannon = new CANNON.World();
    this._cannon.gravity.set(0,0,-9.82);
    this._cannon.broadphase = new CANNON.NaiveBroadphase();
  }

  tick() {
    var delta = this._nextDelta();
    this._cannon.step(delta / 1000);
  }

  add(cannonBody) {
    this._cannon.addBody(cannonBody._cannon);
    cannonBody.setCannonWorld(this._cannon);
  }

}
