
import BaseThreeView from '../../../base/BaseThreeView';
import DebugGameView from '../../../debug/DebugGameView';
import THREE from 'three';
import CONSTANTS from './CONSTANTS';

export default class FlightGameView extends BaseThreeView {

  constructor(game) {
    var gameView = new DebugGameView('game',game);
    super(gameView);

    var backgroundGeo = new THREE.SphereGeometry(CONSTANTS.ARENA.DIAMETER/2, 100, 100);
    var backgroundMat = new THREE.MeshBasicMaterial({color: 0x000099, wireframe: true});
    var background = new THREE.Mesh(backgroundGeo, backgroundMat);
    this.three.add(background);

    setTimeout(function() {
      var arenaView = gameView.views.get('arena');
      var wallsView = arenaView.views.get('walls');
      var planeView = arenaView.views.get('plane');
      this.setCameraHost(planeView, {x: 0, y: -20, z: 0});
      this.setCameraTarget(wallsView, 20);
    }.bind(this), 1000);
  }
}
