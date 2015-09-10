
export default class Eventer {

  constructor() {
    this.__handlers = {};
    this.__props = {};
    this.__myHandlers = [];
  }

  listenTo(eventer, type, callback) {
    var handler = eventer._addEventListener(type, callback);
    this.__myHandlers.push(handler);
    return handler;
  }

  subscribeTo(eventer, prop, callback) {
    var handler = eventer._addPropertyListener(prop, callback);
    this.__myHandlers.push(handler);
    handler.fire(this, [this.getProperty(prop)]);
    return handler;
  }

  stopListeningToAll() {
    while (this.__myHandlers[0]) {
      var handler = this.__myHandlers.shift();
      handler.stop();
    }
  }

  _addEventListener(type, callback) {
    var handlers = this.__getHandlers(type);
    var handler = new Handler(callback);
    handlers.push(handler);
    return handler;
  }

  _addPropertyListener(prop, callback) {
    return this._addEventListener('property:' + prop, callback);
  }

  getProperty(prop) {
    return this.__props[prop];
  }

  setProperty(prop, value) {
    this.__props[prop] = value;
    this.fireEvent('property:' + prop, [value]);
  }

  fireEvent(type, data) {
    var handlers = this.__getHandlers(type);
    handlers.forEach(function(handler) {
      handler.fire(this,data);
    }.bind(this));
  }
  
  __getHandlers(type) {
    if (!this.__handlers[type]) {
      this.__handlers[type] = [];
    }
    return this.__handlers[type];
  }

}

class Handler {
  constructor(callback) {
    this._callback = callback;
    this._stopped = false;
  }
  fire(target,data) {
    if (!this._stopped) {
      this._callback.apply(target,data);
    }
  }
  stop() {
    this._stopped = true;
  }
}
