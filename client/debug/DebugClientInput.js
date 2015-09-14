
import Input from '../lib/input/Input';

export default class DebugInput extends Input {
  
  constructor(game) {
    super();

    this._game = game;

    this.register(
      Input.MOUSE.MOVEMENT.Y,
      DebugInput.PITCH
    );

    this.register(
      Input.MOUSE.MOVEMENT.X,
      DebugInput.ROLL
    );

    this.pointerLock(true);
    this.resetMouseMovement();

  }

}

DebugInput.PITCH = 'PITCH';
DebugInput.ROLL = 'ROLL';
