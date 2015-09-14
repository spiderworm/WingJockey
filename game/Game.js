
import BaseGame from './base/BaseGame';
import GameArena from "./arena/Arena";
import GameBall from './ball/Ball';
import Plane from './plane/Plane';
import Timeline from './Timeline';

export default class Game extends BaseGame {
  constructor() {
    var arena = new GameArena();

    super(arena);

    arena.objects.add('ball',new GameBall());

    var plane = new Plane();
    var slot = arena.getSlot(0,0);
    plane.physics.position.set(slot.position);
    plane.physics.rotation.set(slot.rotation);
    arena.objects.add('plane',plane);

    this._timeline = new Timeline(this);
  }

  get timeline() { return this._timeline; }
  set timeline(t) {}
}
