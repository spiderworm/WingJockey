
import Eventer from '../shared/Eventer';
import Timeline from '../game/Timeline';

export default class ServerGameComm extends Eventer {
  
  constructor(game) {
    super();
    this._game = game;

    this.subscribeTo(
      game.timeline,
      Timeline.SNAPSHOT,
      function(update) {
        this.fireEvent(
          ServerGameComm.UPDATE,
          [update]
        );
      }.bind(this)
    );

    this.subscribeTo(
      game.timeline,
      Timeline.UPDATE,
      function(update) {
        this.fireEvent(
          ServerGameComm.UPDATE,
          [update]
        );
      }.bind(this)
    );

    setInterval(
      function() {
        game.timeline.prepareSnapshot();
      }.bind(this),
      100
    );
/*
    setInterval(
      function() {
        game.timeline.prepareUpdate();
      }.bind(this),
      30
    );
*/

  }

}

ServerGameComm.UPDATE = 'update';
