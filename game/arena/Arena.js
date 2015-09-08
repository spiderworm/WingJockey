
import ArenaPhysics from "./ArenaPhysics";

export default class Arena {
  constructor() {
    this._physics = new ArenaPhysics();
  }

  start() {
    this._physics.start();
  }

  add(gameObject) {
    this._physics.add(gameObject.physics);
  }
}
