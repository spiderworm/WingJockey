
import Position from './Position';
import Velocity from './Velocity';
import BODY_TYPES from '../BODY_TYPES';
import Collection from '../../../shared/Collection';

export default class Body {  

  constructor() {
    this._position = new Position();
    this._velocity = new Velocity();
    this._type = BODY_TYPES.RIGID;
    this._shapes = new Collection();
  }

  get position() { return this._position; }
  set position(vals) { this._position.set(vals); }

  get velocity() { return this._velocity; }
  set velocity(vals) { this._velocity.set(vals); }

  get type() { return this._type; }
  set type(val) { this._type = val; }

  get shapes() { return this._shapes; }
  set shapes(s) {}

}
