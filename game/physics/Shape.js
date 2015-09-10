
import SHAPES from './SHAPES';
import Vector3 from './base/Vector3';

export default class Shape {
  
  constructor(type, size, position, rotation) {
    this.type = type || SHAPES.BOX;
    this.size = new Vector3();
    this.size.set({x: 1, y: 1, z: 1});
    this.size.set(size);
    this.position = new Vector3();
    this.position.set(position);
  }

}