
import GameObject from '../GameObject';
import ArenaPhysics from "./ArenaPhysics";
import ArenaWalls from "./walls/ArenaWalls";
import Goal from '../goal/Goal';

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

    this._goal0 = new Goal(this._physics._cannon);
    this._goal1 = new Goal(this._physics._cannon);
    this._goal0.physics.position.set({x: 0, y: ARENA_SIZE.y / 2, z: 0});
    this._goal1.physics.position.set({x: 0, y: -ARENA_SIZE.y / 2, z: 0});
    this.objects.add('goal1',this._goal0);
    this.objects.add('goal2',this._goal1);
  }

  get goal0() { return this._goal0; }
  get goal1() { return this._goal1; }

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
