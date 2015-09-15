
import GameObject from '../GameObject';
import ArenaPhysics from "./ArenaPhysics";
import ArenaWalls from "./walls/ArenaWalls";

var ARENA_SIZE = {
  x: 8000,
  y: 16000,
  z: 8000
};

var ARENA_WALL_WIDTH = 100;

var PLANE_SLOTS = [
  [
    {
      position: {
        x: 0,
        y: 2 * ARENA_SIZE.y / 10,
        z: 0
      },
      rotation: {
        w: 0,
        x: 0,
        y: 0,
        z: 1
      }
    }
  ],
  [
    {
      position: {
        x: 0,
        y: 8 * ARENA_SIZE.y / 10,
        z: 0
      },
      rotation: {
        w: 1,
        x: 0,
        y: 0,
        z: 0
      }
    }
  ]
];

export default class Arena extends GameObject {
  constructor() {
    var physics = new ArenaPhysics();
    super(physics);
    var walls = new ArenaWalls(ARENA_SIZE, ARENA_WALL_WIDTH);
    this.objects.add('walls',walls);
  }

  getSlot(team,position) {
    return PLANE_SLOTS[team][position];
  }

  start() {
    this._physics.start();
  }

  stop() {
    this._physics.stop();
  }
}
