
import GameArena from "./arena/Arena";
import GameBall from './ball/Ball';

export default class Game {
  constructor() {
    this._arena = new GameArena();
    this._ball = new GameBall();
    this._arena.add(this._ball);
    setInterval(
      function() {
        console.info( this._ball.physics.position.get() );
      }.bind(this),
      500
    );
  }

  start() {
    this._arena.start();
  }
}
