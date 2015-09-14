
import Collection from '../../shared/Collection';

export default class BaseGame {
  constructor(arena) {
    this._arena = arena;
    this._objects = new Collection();
    this._objects.add('arena', arena);
  }

  get objects() { return this._objects; }
  set objects(o) {}

  get arena() { return this._arena; }
  set arena(a) {}

  start() {
    this._arena.start();
  }

  stop() {
    this._arena.stop();
  }

}
