
import Input from '../lib/input/Input';

export default class BaseInput extends Input {
  
  constructor(game) {
    super();

    this._game = game;

    this.register(
      Input.KEY.SPACEBAR,
      BaseInput.TOGGLE_GYROSCOPE
    );

    this.register(
      Input.MOUSE.BUTTON2,
      BaseInput.TOGGLE_BOOSTER
    );

    this.register(
      Input.KEY.E,
      BaseInput.TOGGLE_VIEW
    );

    this.register(
      Input.MOUSE.MOVEMENT.Y,
      BaseInput.MOUSE_PITCH
    );

    this.register(
      Input.MOUSE.MOVEMENT.X,
      BaseInput.MOUSE_ROLL
    );

    this.pointerLock(true);
    this.resetMouseMovement();

  }

}

BaseInput.TOGGLE_VIEW = 'TOGGLE_VIEW';
BaseInput.TOGGLE_GYROSCOPE = 'TOGGLE_GYROSCOPE';
BaseInput.TOGGLE_BOOSTER = 'TOGGLE_BOOSTER';
BaseInput.MOUSE_PITCH = 'MOUSE_PITCH';
BaseInput.MOUSE_ROLL = 'MOUSE_ROLL';
BaseInput.MOUSE_MOVEMENT_X = Input.MOUSE.MOVEMENT.X;
BaseInput.MOUSE_MOVEMENT_Y = Input.MOUSE.MOVEMENT.Y;
