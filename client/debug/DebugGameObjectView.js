
import Eventer from '../../shared/Eventer';
import GameObjectCollectionViews from './DebugGameObjectCollectionViews';
import SHAPES from '../../game/physics/SHAPES';
import THREE from 'three';

export default class GameObjectView extends Eventer {
  
  constructor(name, gameObject) {
    super();
    
    this._gameObject = gameObject;

    var geometry = new THREE.Geometry();

    if (gameObject.physics && gameObject.physics.shapes) {

      gameObject.physics.shapes.forEach(function(key, shape) {
        var newGeometry;
        switch(shape.type) {
          case SHAPES.SPHERE:
            var radius = ((shape.size.x + shape.size.y + shape.size.z) / 3) / 2;
            var segments = Math.min(50,Math.ceil(radius / 15));
            newGeometry = new THREE.SphereGeometry(radius, segments, segments);
          break;
          case SHAPES.BOX:
            var segments = {
              x: Math.min(20, Math.ceil(shape.size.x / 25)),
              y: Math.min(20, Math.ceil(shape.size.y / 25)),
              z: Math.min(20, Math.ceil(shape.size.z / 25))
            };
            newGeometry = new THREE.BoxGeometry(
              shape.size.x, shape.size.y, shape.size.z,
              segments.x, segments.y, segments.z
            );
          break;
        }
        if (newGeometry) {
          var matrix = new THREE.Matrix4();
          matrix.setPosition(new THREE.Vector3(shape.position.x, shape.position.y, shape.position.z));
          geometry.merge(newGeometry, matrix);
        }
        newGeometry = null;
      });

    }

    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
    this._three = new THREE.Mesh(geometry, material);
    this._three.name = name;

/*
    var centerMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    var centerGeometry = new THREE.SphereGeometry(10);
    var center = new THREE.Mesh(centerGeometry, centerMaterial);
    center.name = "center";
    this._three.add(center);
*/

    this._views = new GameObjectCollectionViews(gameObject.objects);

    this._views.forEach(function(key, gameObjectView) {
      this._three.add(gameObjectView.three);
    }.bind(this));

    this._views.onAdd(function(key, gameObjectView) {
      this._three.add(gameObjectView.three);
    }.bind(this));

    this._views.onRemove(function(key, gameObjectView) {
      this._three.remove(gameObjectView.three);
    }.bind(this));

  }

  get three() { return this._three; }
  set three(t) {}

  get views() { return this._views; }
  set views(v) {}

  get physics() { return this._gameObject.physics; }
  set physics(p) {}

  tick() {
    var three = this._three;
    var physics = this._gameObject.physics;
    if (physics) {
      if (physics.position) {
        var position = physics.position.get();
        position = new THREE.Vector3(position.x, position.y, position.z);
        if (three.parent) {
          //three.parent.worldToLocal(position);
        }
        three.position.copy(position);
      }
      if (physics.rotation) {
        var rotation = physics.rotation.get();
        rotation = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
        three.quaternion.copy(rotation);
      }
    }

    this._views.forEach(function(key, gameObjectView) {
      gameObjectView.tick();
    });
  }

}
