
import GameObject from '../GameObject';
import PlanePhysics from './PlanePhysics';
import PlaneControls from './PlaneControls';

export default class Plane extends GameObject {
  constructor() {
    var controls = new PlaneControls();
    var physics = new PlanePhysics(controls);
    super(physics);
    this.controls = controls;
  }
}
