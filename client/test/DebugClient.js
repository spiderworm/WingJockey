
import Game from "../../game/Game";
import DebugView from "../views/debug/DebugView";

export default class DebugClient {

  constructor() {
    this._game = new Game();
    this._game.start();
    this._view = new DebugView(this._game);

    this._connection = null;
    this.connect();
  }

  get view() { return this._view; }
  set view(v) {}

  connect() {
    if (!this._connection) {
      this._connection = new WebSocket('ws://localhost:3001', ['json']);
      this._connection.addEventListener(
        'message',
        function(e) {
          //console.info('got message',e.data);
        }
      );
    }
  }
}
