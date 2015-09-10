
import Eventer from '../shared/Eventer';

export default class Timeline extends Eventer {

  constructor(game) {
    super();
    this._game = game;
    this._snapshots = {};
    this._latestSnapshot = 0;
    this._time = +new Date();
    this._targetTimeOffset = -100;
    this._updates = [];
    /*
    this.subscribeTo(this._game, 'update', function(time, type, update) {
      this.addUpdate(time, type, update);
    }.bind(this));
    */
  }

  prepareSnapshot() {

    function getSnapshot(gameObject) {
      var snapshot = {};
      if (gameObject.physics) {
        snapshot.physics = {};
        if (gameObject.physics.position) {
          snapshot.physics.position = gameObject.physics.position.get();
        }
        if (gameObject.physics.velocity) {
          snapshot.physics.velocity = gameObject.physics.velocity.get();
        }
      }
      if (gameObject.objects) {
        snapshot.objects = {};
        gameObject.objects.forEach(function(key, obj) {
          snapshot.objects[key] = getSnapshot(obj);
        });
      }
      return snapshot;
    }

    var snapshot = {
      time: +new Date(),
      type: Timeline.SNAPSHOT,
      data: {
        game: getSnapshot(this._game)
      }
    };

    this.setProperty(
      Timeline.SNAPSHOT,
      [snapshot]
    );
  }

  prepareUpdate() {
    var updates = this._updates;
    this._updates = [];
    this.setProperty(Timeline.UPDATE, updates);
  }

  addUpdate(time, type, update) {
    var result = {
      time: time,
      type: type,
      update: update
    };
    this._updates.push(result);
  }

  applyExport(data) {
    data.forEach(function(block) {
      switch (block.type) {
        case Timeline.SNAPSHOT:
          this.addSnapshot(block.time,block.data);
        break;
      }
    }.bind(this));
  }

  addSnapshot(time,data) {
    this._snapshots[time] = data;
    if (time > this._latestSnapshot) {
      this._latestSnapshot = time;
      this.applySnapshot(time);
      this.toNow();
    }
  }

  applySnapshot(time) {

    function doIt(snapshot, gameObject) {
      if (snapshot.physics && gameObject.physics) {
        if (snapshot.physics.position && gameObject.physics.position) {
          gameObject.physics.position.set(snapshot.physics.position);
        }
        if (snapshot.physics.velocity && gameObject.physics.velocity) {
          gameObject.physics.velocity.set(snapshot.physics.velocity);
        }
      }
      if (snapshot.objects) {
        for (var name in snapshot.objects) {
          var childObject = gameObject.objects.get(name);
          if (childObject) {
            doIt(snapshot.objects[name], childObject);
          } else {
            console.info('couldnt find ',name);
          }
        }
      }
    }

    var snapshot = this._snapshots[time];
    if (snapshot) {
      this._time = time;

      doIt(snapshot.game, this._game);
    }
  }

  toNow() {

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
