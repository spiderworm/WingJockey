
import Body from "./Body";
import SHAPES from './SHAPES';
import Shape from './Shape';
import BODY_TYPES from './BODY_TYPES';

export default class RigidBox extends Body {
  constructor(size) {
    super();
    this.type = BODY_TYPES.RIGID;
    this.shapes.add(
      SHAPES.BOX,
      new Shape(
        SHAPES.BOX,
        size
      )
    );
  }
}
