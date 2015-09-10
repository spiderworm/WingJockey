
import Eventer from './Eventer';

export default class Collection extends Eventer {
  
  get(key) {
    return this.getProperty(key);
  }

  add(key, value) {
    this.remove(key);
    this.setProperty(key,value);
    this.fireEvent('add', [key, value]);
  }

  remove(key) {
    if (Object.keys(this.__props).indexOf(key) !== -1) {
      var value = this.__props[key];
      delete this.__props[key];
      this.fireEvent('remove', [key, value]);
    }
  }

  forEach(callback) {
    for (var key in this.__props) {
      callback.call(this,key,this.__props[key]);
    }
  }

  onAdd(callback) {
    return this._addEventListener('add',callback);
  }

  onRemove(callback) {
    return this._addEventListener('remove',callback);
  }
}