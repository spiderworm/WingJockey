
import GameArena from "./arena/Arena";
import GameBall from './ball/Ball';
import Timeline from './Timeline';
import Collection from '../shared/Collection';

export default class Game {
  constructor() {
    this._timeline = new Timeline(this);
    this._objects = new Collection();

    var arena = this._arena = new GameArena();
    arena.objects.add('ball',new GameBall());
    this.objects.add('arena', arena);
  }

  get timeline() {
    return this._timeline;
  }

  set timeline(t) {}

  get objects() { return this._objects; }
  set objects(o) {}

  start() {
    this._arena.start();
  }

}
