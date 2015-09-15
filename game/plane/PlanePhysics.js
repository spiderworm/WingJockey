
import Body from '../physics/Body';
import SHAPES from '../physics/SHAPES';
import Shape from '../physics/Shape';
import Vector3 from '../physics/base/Vector3';

var PLANE_MASS = 500;
var PITCH_FORCE = 4 * PLANE_MASS;
var ROLL_FORCE = 4 * PLANE_MASS;
var LIFT_FORCE = 16 * PLANE_MASS;
var PUSH_FORCE = 8000 * PLANE_MASS;
var BOOSTER_FORCE = PUSH_FORCE * 4;

export default class PlanePhysics extends Body {
  constructor(controls) {
    super();

    this.mass = PLANE_MASS;
    this.position = {x: -400, y: 0, z: 0};

    // TODO: don't access cannon directly
    this._cannon.angularDamping = .5;
    this._cannon.linearDamping = .9;
    this._cannon.collisionFilterGroup = 1;
    this._cannon.collisionFilterMask = 2 | 1;

    var shapes = new PlaneBodyShapes();
    for (var name in shapes) {
      this.shapes.add(name, shapes[name]);
    }

    setInterval(
      function() {

        if (controls.gyroscope) {

          this._cannon.linearDamping = .01;

        } else {

          this._cannon.linearDamping = .9;

          if (controls.booster) {

            this.applyForce(
              new Vector3({y: BOOSTER_FORCE})
            );

          } else {

            this.applyForce(
              new Vector3({y: PUSH_FORCE})
            );

          }

          this.applyForce(
            new Vector3({z: LIFT_FORCE})
          );

        }

        if (controls.pitch) {
          this.applyForce(
            new Vector3({z: PITCH_FORCE * controls.pitch}),
            new Vector3({y: 5})
          );
          this.applyForce(
            new Vector3({z: -PITCH_FORCE * controls.pitch}),
            new Vector3({y: -5})
          );
        }

        if (controls.roll) {
          this.applyForce(
            new Vector3({z: ROLL_FORCE * controls.roll}),
            new Vector3({x: 5})
          );
          this.applyForce(
            new Vector3({z: -ROLL_FORCE * controls.roll}),
            new Vector3({x: -5})
          );
        }

      }.bind(this),
      100
    );

  }
}

/*

function calcDrag(velocity, rotation) {

  var rotV = new Vector3({x: 0, y: 1, z: 0});

  var rotV = new Vector3(
    {
      x: (rotV.x * ()) + (rotV.y * ()) + (rotV.z * ()),
      y: (rotV.x * ())
    }
  );
}

*/

var BODY_LENGTH = 4.25;
var BODY_THICKNESS = .7;

var WING_SPAN = 5;
var WING_DEPTH = 1;
var WING_THICKNESS = .1;

var TAIL_WING_SPAN = BODY_THICKNESS + 1;
var TAIL_WING_DEPTH = .5;
var TAIL_WING_THICKNESS = .1;

var RUDDER_SPAN = .5;
var RUDDER_DEPTH = .5;
var RUDDER_THICKNESS = .1;

class PlaneBodyShapes {
  constructor() {

    this.body = new Shape(
      SHAPES.BOX,
      {x: BODY_THICKNESS, y: BODY_LENGTH, z: BODY_THICKNESS}
    );

    this.topWing = new Shape(
      SHAPES.BOX,
      {x: WING_SPAN, y: WING_DEPTH, z: WING_THICKNESS},
      {x: 0, y: (BODY_LENGTH - WING_DEPTH) / 2, z: ((BODY_THICKNESS + WING_THICKNESS) / 2) + .5}
    );

    this.bottomWing = new Shape(
      SHAPES.BOX,
      {x: WING_SPAN, y: WING_DEPTH, z: WING_THICKNESS},
      {x: 0, y: (BODY_LENGTH - WING_DEPTH) / 2, z: -((BODY_THICKNESS + WING_THICKNESS)/2)}
    );

    this.tailWing = new Shape(
      SHAPES.BOX,
      {x: TAIL_WING_SPAN, y: TAIL_WING_DEPTH, z: TAIL_WING_THICKNESS},
      {x: 0, y: -(BODY_LENGTH - TAIL_WING_DEPTH) / 2, z: 0}
    );

    this.rudder = new Shape(
      SHAPES.BOX,
      {x: RUDDER_THICKNESS, y: RUDDER_DEPTH, z: RUDDER_SPAN},
      {x: 0, y: -(BODY_LENGTH - RUDDER_DEPTH) / 2, z: (BODY_THICKNESS + RUDDER_SPAN) / 2}
    );

  }
}
