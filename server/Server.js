
import Game from "../game/Game";
import ServerGameComm from "./ServerGameComm";
import DebugConnection from './connection/DebugConnection';

var WebSocket = require('ws');

export default class Server {
  
  constructor() {
    this._game = new Game();
    this._gameComm = new ServerGameComm(this._game);
    this._game.start();

    var wss = new WebSocket.Server({port: 3001});

    wss.on('connection', function(ws) {
      console.info('connection');
      var connection = new DebugConnection(ws, this._gameComm);
      ws.on('close', function() {
        connection.close();
      });
      ws.on('error', function() {
        connection.close();
      });
    }.bind(this));

  }

}
