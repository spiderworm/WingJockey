
import WallsPhysics from './FlightArenaWallsPhysics';
import GameObject from '../../../../../game/GameObject';

export default class FlightArenaWalls extends GameObject {
  constructor() {
    var physics = new WallsPhysics();
    super(physics);
  }
}
