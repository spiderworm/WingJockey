
import FlightArena from "./arena/FlightArena";
import Plane from '../../../../game/plane/Plane';
import Collection from '../../../../shared/Collection';

export default class FlightGame {
  constructor() {
    this._objects = new Collection();

    var arena = this._arena = new FlightArena();
    this.objects.add('arena', arena);

    arena.objects.add('plane',new Plane());
  }

  get objects() { return this._objects; }
  set objects(o) {}

  start() {
    this._arena.start();
  }

  stop() {
    this.objects.get('arena').stop();
  }

}
