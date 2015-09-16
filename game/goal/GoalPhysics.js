
import RigidBox from '../physics/RigidBox';
import BODY_TYPES from '../physics/BODY_TYPES';

export default class GoalPhysics extends RigidBox {
  
  constructor() {
    var size = {
      x: 6000,
      y: 100,
      z: 6000
    };

    super(size);

    this.type = BODY_TYPES.GHOST;

  }
}
