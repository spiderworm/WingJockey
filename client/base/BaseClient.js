
var PITCH_SENSITIVITY = .5;
var ROLL_SENSITIVITY = .5;

export default class BaseClient {

  constructor(game, view, input, userPlane) {
    this._game = game;
    this._view = view;
    this._input = input;
    this._plane = userPlane;

    var planeControls = userPlane.controls;
    
    setInterval(
      function() {
        var inputState = input.state;
        planeControls.roll *= .25;
        planeControls.roll -= inputState.custom.ROLL / (100 - (99 * PITCH_SENSITIVITY));
        planeControls.pitch *= .25;
        planeControls.pitch += inputState.custom.PITCH / (100 - (99 * ROLL_SENSITIVITY));
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
