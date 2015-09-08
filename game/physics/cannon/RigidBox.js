
import CannonBody from "./Body";
import CANNON from 'cannon';
import SHAPES from '../SHAPES';
import BODY_TYPES from '../BODY_TYPES';

export default class CannonRigidSphere extends CannonBody {
  constructor(size) {
    super();
    this.type = BODY_TYPES.RIGID;
    this.addShape(SHAPES.BOX, size);
  }
}
