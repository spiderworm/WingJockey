
import BaseThreeView from "../base/BaseThreeView";
import THREE from 'three';
import GameView from './DebugGameView';

export default class DebugView extends BaseThreeView {
  constructor(game) {
    var gameView = new GameView('game',game);

    super(gameView);

    var backgroundGeo = new THREE.SphereGeometry(1000000, 100, 100);
    var backgroundMat = new THREE.MeshBasicMaterial({color: 0x000099, wireframe: true});
    var background = new THREE.Mesh(backgroundGeo, backgroundMat);
    this._scene.add(background);

    setTimeout(function() {
      var planeView = gameView.views.get('arena').views.get('plane');
      this.setCameraHost(planeView, {x: 0, y: -20, z: 0});
      var ballView = gameView.views.get('arena').views.get('ball');
      this.setCameraTarget(ballView, 20);
    }.bind(this), 1000);
  }

}
