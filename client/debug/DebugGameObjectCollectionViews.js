
import Collection from '../../shared/Collection';

export default class GameObjectCollectionViews extends Collection {

  constructor(gameObjectCollection) {
    super();

    require(['es6!client/debug/DebugGameObjectView'], function(GameObjectView) {

      gameObjectCollection.forEach(function(key, gameObject) {
        var view = new GameObjectView(key, gameObject);
        this.add(key, view);
      }.bind(this));

      gameObjectCollection.onAdd(function(key, gameObject) {
        var view = new GameObjectView(key, gameObject);
        this.add(key, view);
      }.bind(this));

      gameObjectCollection.onRemove(function(key, gameObject) {
        this.remove(key);
      }.bind(this));

    }.bind(this));
  }

}
