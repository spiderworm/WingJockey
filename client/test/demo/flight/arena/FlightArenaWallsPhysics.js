
import Body from '../../../../../game/physics/Body';
import SHAPES from '../../../../../game/physics/SHAPES';
import Shape from '../../../../../game/physics/Shape';

import CONSTANTS from '../CONSTANTS';

export default class ArenaWallsPhysics extends Body {

  constructor(size, wallWidth) {
    super();

    // TODO: don't access cannon directly
    this._cannon.collisionFilterGroup = 2;
    this._cannon.collisionFilterMask = 2;

    this.shapes.add(
      'floor',
      new Shape(
        SHAPES.BOX,
        {
          x: CONSTANTS.ARENA.DIAMETER,
          y: CONSTANTS.ARENA.DIAMETER,
          z: CONSTANTS.ARENA.FLOOR.THICKNESS
        },
        {
          x: 0,
          y: 0,
          z: CONSTANTS.ARENA.FLOOR.HEIGHT - (CONSTANTS.ARENA.FLOOR.THICKNESS/2)
        }
      )
    );

    for (var x=-CONSTANTS.ARENA.DIAMETER/2; x<=CONSTANTS.ARENA.DIAMETER/2; x+=CONSTANTS.ARENA.BUILDINGS.SPACING) {
      for (var y=-CONSTANTS.ARENA.DIAMETER/2; y<=CONSTANTS.ARENA.DIAMETER/2; y+=CONSTANTS.ARENA.BUILDINGS.SPACING) {
        this.shapes.add(
          'building:' + x + ',' + y,
          new Shape(
            SHAPES.BOX,
            {
              x: CONSTANTS.ARENA.BUILDINGS.WIDTH,
              y: CONSTANTS.ARENA.BUILDINGS.WIDTH,
              z: CONSTANTS.ARENA.BUILDINGS.HEIGHT
            },
            {
              x: x,
              y: y,
              z: CONSTANTS.ARENA.FLOOR.HEIGHT + (CONSTANTS.ARENA.BUILDINGS.HEIGHT / 2)
            }
          )
        );
      }
    }

  }

}
