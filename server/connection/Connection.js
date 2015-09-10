
import Eventer from "../../shared/Eventer";
import User from "../../game/user/User";
import ServerGameComm from '../ServerGameComm';

export default class Connection extends Eventer {
  constructor(websocket, serverGameComm) {
    super();
    this._socket = websocket;
    this._gameComm = serverGameComm;
    this._user = new User();

    this.listenTo(
      serverGameComm,
      ServerGameComm.UPDATE,
      function(update) {
        var json = JSON.stringify(update);
        this._socket.send(json);
      }.bind(this)
    );
  }

  close() {
    this.stopListeningToAll();
  }
}
