
function enablePointerLock() {
  document.body.requestPointerLock();
}

export default class Input {

  constructor() {
    var state = this._state = {
      custom: {},
      mouse: {
        movement: {
          x: 0,
          y: 0
        }
      }
    };
    this._custom = {};

    this._pointerLocked = false;

    document.addEventListener(
      'pointerlockchange',
      function() {
        this._pointerLocked = document.pointerLockElement != null;
      }.bind(this)
    );

    document.body.addEventListener(
      'mousemove',
      function(e) {
        if (this._pointerLocked) {
          var x = this._getKeyState(Input.MOUSE.MOVEMENT.X) + e.movementX;
          this._setKeyState(Input.MOUSE.MOVEMENT.X, x);
          var y = this._getKeyState(Input.MOUSE.MOVEMENT.Y) + e.movementY;
          this._setKeyState(Input.MOUSE.MOVEMENT.Y,y);
        }
      }.bind(this)
    );
  }

  pointerLock(toggle) {

    if (toggle === false) {
      document.body.removeEventListener('click', enablePointerLock);
      document.exitPointerLock();
    } else {
      document.body.addEventListener('click', enablePointerLock);
    }
  }

  get state() { return this.getState(); }
  set state(s) {}

  register(key, controlName) {
    this._custom[controlName] = key;
    this._state.custom[controlName] = this._getKeyState(key);
  }

  getState() {
    var state = JSON.parse(JSON.stringify(this._state));
    return state;
  }

  resetMouseMovement() {
    this._setKeyState(Input.MOUSE.MOVEMENT.X, 0);
    this._setKeyState(Input.MOUSE.MOVEMENT.Y, 0);
  }

  _getKeyState(key) {
    return this._findPathTarget(key).get();
  }

  _setKeyState(key, value) {
    this._findPathTarget(key).set(value);
    for (var id in this._custom) {
      if (this._custom[id] === key) {
        this._findPathTarget('custom.' + id).set(value);
      }
    }
  }

  _findPathTarget(key) {
    var target = new KeyTarget(this._state, key);
    return target;
  }

}


Input.MOUSE = {
  MOVEMENT: {
    X: 'mouse.movement.x',
    Y: 'mouse.movement.y'
  }
};



class KeyTarget {

  constructor(obj, key) {
    var path = key.split('.');

    while (path[0]) {
      if (path.length === 1) {
        this._obj = obj;
        this._key = path[0];
        break;
      } else {
        obj = obj[path[0]];
        if (!obj) {
          break;
        }
        path.shift();
      }
    }

  }

  get() {
    if (this._obj) {
      return this._obj[this._key];
    }
  }

  set(value) {
    if (this._obj) {
      this._obj[this._key] = value;
    }
  }

}