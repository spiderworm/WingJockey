
import GameObject from '../../../../../game/GameObject';
import FlightArenaPhysics from "./FlightArenaPhysics";
import FlightArenaWalls from "./FlightArenaWalls";
import BallPhysics from '../../../../../game/base/ball/BaseBallPhysics';
import Ball from '../../../../../game/base/ball/BaseBall';
import CONSTANTS from '../CONSTANTS';

export default class Arena extends GameObject {
  constructor() {
    var physics = new FlightArenaPhysics();
    super(physics);
    var walls = new FlightArenaWalls();
    this.objects.add('walls',walls);

    for (var x=-CONSTANTS.ARENA.DIAMETER/2; x<=CONSTANTS.ARENA.DIAMETER/2; x+=CONSTANTS.ARENA.BALLS.SPACING) {
      for (var y=-CONSTANTS.ARENA.DIAMETER/2; y<=CONSTANTS.ARENA.DIAMETER/2; y+=CONSTANTS.ARENA.BALLS.SPACING) {
        var bp = new BallPhysics();
        var b = new Ball(bp);
        b.physics.position.set({x: x, y: y, z: CONSTANTS.ARENA.BALLS.HEIGHT});
        this.objects.add('ball:'+x+','+y, b);
      }
    }
  }

  start() {
    this._physics.start();
  }

  stop() {
    this._physics.stop();
  }
}
