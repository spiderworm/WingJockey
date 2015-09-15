
import BaseInput from './BaseInput';

var PITCH_SENSITIVITY = .5;
var ROLL_SENSITIVITY = .5;

export default class BaseClient {

  constructor(game, view, input, userPlane) {
    this._game = game;
    this._view = view;
    this._input = input;
    this._plane = userPlane;

    view.cameraTargetMode();

    var planeControls = userPlane.controls;

    input.onOn(BaseInput.TOGGLE_VIEW, function() {
      view.toggleCameraMode();
    });

    input.onOn(BaseInput.TOGGLE_GYROSCOPE, function() {
      planeControls.gyroscopeOn();
    });

    input.onOff(BaseInput.TOGGLE_GYROSCOPE, function() {
      planeControls.gyroscopeOff();
    });

    input.onOn(BaseInput.TOGGLE_BOOSTER, function() {
      planeControls.boosterOn();
    });

    input.onOff(BaseInput.TOGGLE_BOOSTER, function() {
      planeControls.boosterOff();
    });

    setInterval(
      function() {
        var inputState = input.state;

        planeControls.autoPitch(
          inputState.custom[BaseInput.MOUSE_PITCH] / (100 - (99 * ROLL_SENSITIVITY))
        );
        planeControls.autoRoll(
          inputState.custom[BaseInput.MOUSE_ROLL] / (100 - (99 * PITCH_SENSITIVITY))
        );

        input.resetMouseMovement();

      }.bind(this),
      100
    );

  }

  get view() { return this._view; }
  set view(v) {}

  get input() { return this._input; }
  set input(i) {}

  get game() { return this._game; }
  set game(g) {}

  get plane() { return this._plane; }
  set plane(p) {}

}
