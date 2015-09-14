
import Body from "./Body";
import SHAPES from './SHAPES';
import BODY_TYPES from './BODY_TYPES';
import Shape from './Shape';

export default class RigidSphere extends Body {
  constructor(width) {
    super();
    this.type = BODY_TYPES.RIGID;
    this.shapes.add(
      SHAPES.SPHERE,
      new Shape(
        SHAPES.SPHERE,
        {x: width, y: width, z: width}
      )
    );
  }
}
