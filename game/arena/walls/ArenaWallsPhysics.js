
import Body from '../../physics/Body';
import GameObject from '../../GameObject';
import SHAPES from '../../physics/SHAPES';
import Shape from '../../physics/Shape';
import BODY_TYPES from '../../physics/BODY_TYPES';

export default class ArenaWallsPhysics extends Body {

  constructor(size, wallWidth) {
    super();

    this.type = BODY_TYPES.STATIC;

    // TODO: don't access cannon directly
    this._cannon.collisionFilterGroup = 2;
    this._cannon.collisionFilterMask = 2;

    this.shapes.add(
      'ceiling',
      new Shape(
        SHAPES.BOX,
        {
          x: size.x + (2 * wallWidth),
          y: size.y + (2 * wallWidth),
          z: wallWidth 
        },
        {
          x: 0,
          y: 0,
          z: (size.z + wallWidth) / 2
        }
      )
    );


    this.shapes.add(
      'floor',
      new Shape(
        SHAPES.BOX,
        {
          x: size.x + (2 * wallWidth),
          y: size.y + (2 * wallWidth),
          z: wallWidth 
        },
        {
          x: 0,
          y: 0,
          z: -(size.z + wallWidth) / 2
        }
      )
    );

    this.shapes.add(
      'positive x wall',
      new Shape(
        SHAPES.BOX,
        {
          x: wallWidth,
          y: size.y + (2 * wallWidth),
          z: size.z
        },
        {
          x: (size.x + wallWidth) / 2,
          y: 0,
          z: 0
        }
      )
    );

    this.shapes.add(
      'negative x wall',
      new Shape(
        SHAPES.BOX,
        {
          x: wallWidth,
          y: size.y + (2 * wallWidth),
          z: size.z
        },
        {
          x: -(size.x + wallWidth) / 2,
          y: 0,
          z: 0
        }
      )
    );

    this.shapes.add(
      'positive y wall',
      new Shape(
        SHAPES.BOX,
        {
          x: size.x,
          y: wallWidth,
          z: size.z
        },
        {
          x: 0,
          y: (size.y + wallWidth) / 2,
          z: 0
        }
      )
    );

    this.shapes.add(
      'negative y wall',
      new Shape(
        SHAPES.BOX,
        {
          x: size.x,
          y: wallWidth,
          z: size.z
        },
        {
          x: 0,
          y: -(size.y + wallWidth) / 2,
          z: 0
        }
      )
    );

  }

}
