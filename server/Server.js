
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

      var plane = this._game.objects.get('arena').objects.get('plane');
      ws.on('message', function(raw) {
        var messages = JSON.parse(raw);
        messages.forEach(function(message) {
          if (message.type === "controls") {
            plane.controls.pitch = message.data.pitch;
            plane.controls.roll = message.data.roll;
          }
        });
      });
    }.bind(this));

  }

}
