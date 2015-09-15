
import Body from '../physics/Body';
import SHAPES from '../physics/SHAPES';
import Shape from '../physics/Shape';
import Vector3 from '../physics/base/Vector3';
import CONSTANTS from './PLANE_CONSTANTS';

export default class PlanePhysics extends Body {
  constructor(controls) {
    super();

    this.mass = CONSTANTS.MASS;
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
              new Vector3({y: CONSTANTS.BOOSTER.FORCE})
            );

          } else {

            this.applyForce(
              new Vector3({y: CONSTANTS.PUSH.FORCE})
            );

          }

          this.applyForce(
            new Vector3({z: CONSTANTS.LIFT.FORCE})
          );

        }

        if (controls.pitch) {
          this.applyForce(
            new Vector3({z: CONSTANTS.PITCH.FORCE * controls.pitch}),
            new Vector3({y: CONSTANTS.PITCH.OFFSET})
          );
          this.applyForce(
            new Vector3({z: -CONSTANTS.PITCH.FORCE * controls.pitch}),
            new Vector3({y: -CONSTANTS.PITCH.OFFSET})
          );
        }

        if (controls.roll) {
          this.applyForce(
            new Vector3({z: CONSTANTS.ROLL.FORCE * controls.roll}),
            new Vector3({x: CONSTANTS.ROLL.OFFSET})
          );
          this.applyForce(
            new Vector3({z: -CONSTANTS.ROLL.FORCE * controls.roll}),
            new Vector3({x: -CONSTANTS.ROLL.OFFSET})
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

class PlaneBodyShapes {
  constructor() {

    this.body = new Shape(
      SHAPES.BOX,
      {x: CONSTANTS.BODY.THICKNESS, y: CONSTANTS.BODY.LENGTH, z: CONSTANTS.BODY.THICKNESS}
    );

    this.topWing = new Shape(
      SHAPES.BOX,
      {x: CONSTANTS.WING.SPAN, y: CONSTANTS.WING.DEPTH, z: CONSTANTS.WING.THICKNESS},
      {x: 0, y: (CONSTANTS.BODY.LENGTH - CONSTANTS.WING.DEPTH) / 2, z: ((CONSTANTS.BODY.THICKNESS + CONSTANTS.WING.THICKNESS) / 2) + .5}
    );

    this.bottomWing = new Shape(
      SHAPES.BOX,
      {x: CONSTANTS.WING.SPAN, y: CONSTANTS.WING.DEPTH, z: CONSTANTS.WING.THICKNESS},
      {x: 0, y: (CONSTANTS.BODY.LENGTH - CONSTANTS.WING.DEPTH) / 2, z: -((CONSTANTS.BODY.THICKNESS + CONSTANTS.WING.THICKNESS)/2)}
    );

    this.tailWing = new Shape(
      SHAPES.BOX,
      {x: CONSTANTS.TAIL.WING.SPAN, y: CONSTANTS.TAIL.WING.DEPTH, z: CONSTANTS.TAIL.WING.THICKNESS},
      {x: 0, y: -(CONSTANTS.BODY.LENGTH - CONSTANTS.TAIL.WING.DEPTH) / 2, z: 0}
    );

    this.rudder = new Shape(
      SHAPES.BOX,
      {x: CONSTANTS.TAIL.RUDDER.THICKNESS, y: CONSTANTS.TAIL.RUDDER.DEPTH, z: CONSTANTS.TAIL.RUDDER.SPAN},
      {x: 0, y: -(CONSTANTS.BODY.LENGTH - CONSTANTS.TAIL.RUDDER.DEPTH) / 2, z: (CONSTANTS.BODY.THICKNESS + CONSTANTS.TAIL.RUDDER.SPAN) / 2}
    );

  }
}
