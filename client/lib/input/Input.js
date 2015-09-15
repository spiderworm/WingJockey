
import Eventer from '../../../shared/Eventer';

function enablePointerLock() {
  document.body.requestPointerLock();
}

export default class Input extends Eventer {

  constructor() {
    super();
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

    document.addEventListener('keydown', function(e) {
      //console.info('keydown',e.keyCode);
      if (KEY_CODES[e.keyCode]) {
        this._setKeyState(KEY_CODES[e.keyCode], true);
      }
    }.bind(this));

    document.addEventListener('keyup', function(e) {
      if (KEY_CODES[e.keyCode]) {
        this._setKeyState(KEY_CODES[e.keyCode], false);
      }
    }.bind(this));

    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    }.bind(this));

    document.addEventListener('mousedown', function(e) {
      switch(e.button) {
        case 1: this._setKeyState(Input.MOUSE.BUTTON1, true); break;
        case 2: this._setKeyState(Input.MOUSE.BUTTON2, true); break;
        case 3: this._setKeyState(Input.MOUSE.BUTTON3, true); break;
      }
    }.bind(this));

    document.addEventListener('mouseup', function(e) {
      switch(e.button) {
        case 1: this._setKeyState(Input.MOUSE.BUTTON1, false); break;
        case 2: this._setKeyState(Input.MOUSE.BUTTON2, false); break;
        case 3: this._setKeyState(Input.MOUSE.BUTTON3, false); break;
      }
    }.bind(this));
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

  onOn(key, callback) {
    this._addEventListener('on:' + key, callback);
  }

  onOff(key, callback) {
    this._addEventListener('off:' + key, callback);
  }

  getState() {
    var state = JSON.parse(JSON.stringify(this._state));
    return state;
  }

  resetMouseMovement() {
    this._setKeyState(Input.MOUSE.MOVEMENT.X, 0);
    this._setKeyState(Input.MOUSE.MOVEMENT.Y, 0);
  }

  modifyState(key, value) {
    this._setKeyState(key, value);
  }

  _getKeyState(key) {
    return this._findPathTarget(key).get();
  }

  _setKeyState(key, value) {
    this._findPathTarget(key).set(value);
    if (value === true) {
      this.fireEvent('on:' + key);
    } else if (value === false) {
      this.fireEvent('off:' + key);
    }
    for (var id in this._custom) {
      if (this._custom[id] === key) {
        this._findPathTarget('custom.' + id).set(value);
        if (value === true) {
          this.fireEvent('on:' + id);
        } else if (value === false) {
          this.fireEvent('off:' + id);
        }
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
  },
  BUTTON2: 'mouse.button2'
};

Input.KEY = {
  SPACEBAR: 'key.spacebar',
  A: 'key.a',
  B: 'key.b',
  C: 'key.c',
  D: 'key.d',
  E: 'key.e'
};

var KEY_CODES = {
  32: Input.KEY.SPACEBAR,
  65: Input.KEY.A,
  69: Input.KEY.E
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