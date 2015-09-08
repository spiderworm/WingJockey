
import Position from './Position';
import BODY_TYPES from '../BODY_TYPES';

export default class Body {  

  constructor() {
    this._position = new Position();
    this._type = BODY_TYPES.RIGID;
  }

  get position() {
    return this._position;
  }

  set position(vals) {
    this._position.set(vals);
  }

  get type() {
    return this._type;
  }

  set type(val) {
    this._type = val;
  }

}
