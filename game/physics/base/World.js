
export default class World {  

  constructor() {
    this._lastTime = 0;
    this._running = false;
  }

  tick() {
    throw new Error('must be implemented by subclass');
  }

  add(body) {
    throw new Error('must be implemented by subclass');
  }

  start() {
    if (!this._running) {
      this._running = true;
      this._interval = setInterval(this.tick.bind(this),1000/60);
      this._lastTime = +(new Date());
    }
  }

  _nextDelta() {
    var time = +(new Date());
    var delta = time - this._lastTime;
    this._lastTime = time;
    return delta;
  }

}
