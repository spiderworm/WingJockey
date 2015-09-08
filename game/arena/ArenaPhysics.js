
import PhysicsWorld from '../physics/World';
import RigidBox from '../physics/RigidBox';
import GameObject from '../GameObject';

export default class ArenaPhysics extends PhysicsWorld {

  constructor() {
    super();
    var floorPhysics = new RigidBox({x: 1000, y: 1000, z: 1});
    var floor = new GameObject(floorPhysics);
    this.add(floorPhysics);
  }

}
