
export default class GameObject {
  
  constructor(physics) {
    this._physics = physics;
  }

  get physics() {
    return this._physics;
  }

  set physics(vals) {}

}
