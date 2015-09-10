
import WallsPhysics from './ArenaWallsPhysics';
import GameObject from '../../GameObject';

export default class ArenaWalls extends GameObject {
  constructor(size, wallWidth) {
    var physics = new WallsPhysics(size, wallWidth);
    super(physics);
  }
}
