
import DebugClient from './DebugClient';

var PITCH_SENSITIVITY = 1;
var ROLL_SENSITIVITY = 1;


export default class ConnectedDebugClient extends DebugClient {

  constructor() {

    super();
    this.game.start();

    setInterval(
      function() {
        if (this._connection) {
          this._connection.send(
            JSON.stringify(
              [
                {
                  type: 'controls',
                  data: {
                    roll: plane.controls.roll,
                    pitch: plane.controls.pitch
                  }
                }
              ]
            )
          );
        }
      }.bind(this),
      100
    );

    this._connection = null;
    this.connect();
  }

  connect() {
    if (!this._connection) {
      this._connection = new WebSocket('ws://localhost:3001', ['json']);
      this._connection.addEventListener(
        'message',
        function(e) {
          this.game.timeline.applyExport(JSON.parse(e.data));
          //console.info('got message',e.data);
        }.bind(this)
      );
    }
  }

}
