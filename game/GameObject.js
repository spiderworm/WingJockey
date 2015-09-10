
import Eventer from '../shared/Eventer';
import Collection from '../shared/Collection';

export default class GameObject extends Eventer {
  
  constructor(physics) {
    super();
    this._physics = physics;
    this._objects = new Collection();

    this.objects.onAdd(function(key,gameObject) {
      this._physics.add(gameObject.physics);
    }.bind(this));
  }

  get physics() { return this._physics; }
  set physics(vals) {}

  get objects() { return this._objects; }
  set objects(o) {}

}
