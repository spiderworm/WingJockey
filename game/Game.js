
import BaseGame from './base/BaseGame';
import GameArena from "./arena/Arena";
import GameBall from './ball/Ball';
import Plane from './plane/Plane';
import Timeline from './Timeline';
import Goal from './goal/Goal';

export default class Game extends BaseGame {
  constructor() {
    var arena = new GameArena();

    super(arena);

    this._score = [0,0];

    this._ball = new GameBall();
    arena.objects.add('ball',this._ball);

    this.listenTo(
      arena.goal0,
      Goal.SCORE,
      function() {
        this._teamScored(0);
      }.bind(this)
    );

    this.listenTo(
      arena.goal1,
      Goal.SCORE,
      function() {
        this._teamScored(1);
      }.bind(this)
    );

    arena.goal0.scorers.add('ball', this._ball);
    arena.goal1.scorers.add('ball', this._ball);

    var plane = new Plane();
    var slot = arena.getSlot(0,0);
    plane.physics.position.set(slot.position);
    plane.physics.rotation.set(slot.rotation);
    arena.objects.add('plane',plane);

    this._timeline = new Timeline(this);
  }

  get timeline() { return this._timeline; }
  set timeline(t) {}

  get ball() { return this._ball; }

  _teamScored(teamNum) {
    this._score[teamNum]++;
    console.info('team ' + (teamNum + 1) + ' scored!');
    console.info('SCORE: ' + this._score[0] + ':' + this._score[1]);
    this._resetBall();
  }

  _resetBall() {
    this._ball.reset();
    this._ball.physics.position.set({x: 0, y: 0, z: 0});
  }
}
