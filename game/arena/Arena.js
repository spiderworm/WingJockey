
import GameObject from '../GameObject';
import ArenaPhysics from "./ArenaPhysics";
import ArenaWalls from "./walls/ArenaWalls";

var ARENA_SIZE = {
  x: 1000,
  y: 500,
  z: 500
};

var ARENA_WALL_WIDTH = 1;

export default class Arena extends GameObject {
  constructor() {
    var physics = new ArenaPhysics();
    super(physics);
    var walls = new ArenaWalls(ARENA_SIZE, ARENA_WALL_WIDTH);
    this.objects.add('walls',walls);
  }

  start() {
    this._physics.start();
  }
}
