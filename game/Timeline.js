
import Eventer from '../shared/Eventer';

export default class Timeline extends Eventer {

  constructor(game) {
    super();
    this._game = game;
    this._updates = {};
    /*
    this.subscribeTo(this._game, 'update', function(time, type, update) {
      this.addUpdate(time, type, update);
    }.bind(this));
    */
  }

  prepareSnapshot() {
    this.setProperty(
      Timeline.SNAPSHOT,
      {
        time: +(new Date()),
        type: Timeline.SNAPSHOT,

        data: {
          game: {
            ball: {
              physics: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0
                },
                velocity: {
                  x: 0,
                  y: 0,
                  z: 0
                }
              }
            }
          }
        }

      }
    );
  }

  prepareUpdate() {
    var updates = this._updates;
    this._updates = {};
    this.setProperty(Timeline.UPDATE, updates);
  }

  addUpdate(time, type, update) {
    var result = {
      time: time,
      type: type,
      update: update
    };
    extend(this._updates, result);
  }

}

Timeline.SNAPSHOT = 'snapshot';
Timeline.UPDATE = 'update';




function extend(target, vals) {
  if (!vals) {
    return;
  }
  for (var prop in vals) {
    if (vals[prop] && typeof vals[prop] === "object") {
      if (!target[prop] || typeof target[prop] !== "object") {
        target[prop] = {};
      }
      extend(target[prop], vals[prop]);
    } else {
      target[prop] = vals[prop];
    }
  }
  var next = [target];
  for(var i=2; i<arguments.length; i++) {
    next.push(arguments[i])
  }
  extend.apply(target,next);
}
