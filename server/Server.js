
import Game from "../game/Game";

export default class Server {
  
  constructor() {
    this._game = new Game();
    this._game.start();
  }

}
