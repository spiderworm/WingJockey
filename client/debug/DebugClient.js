
import BaseClient from '../base/BaseClient';
import Game from "../../game/Game";
import DebugView from "./DebugView";
import BaseInput from "../base/BaseInput";
import THREE from 'three';

export default class DebugClient extends BaseClient {

  constructor() {
    var game = new Game();
    game.start();
    var view = new DebugView(game);
    var input = new BaseInput(game);
    var plane = game.objects.get('arena').objects.get('plane');

    super(game, view, input, plane);

    window.game = game;
    window.world = game.objects.get('arena').physics._cannon;
    window.scene = view.scene;
    window.plane = plane;
    window.ball = game.objects.get('arena').objects.get('ball');
    window.camera = view._camera;

    window.testObject = (function() {
      var mat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
      var geo = new THREE.SphereGeometry(1000);
      return new THREE.Mesh(geo, mat);
    })();
  }

  get view() { return this._view; }
  set view(v) {}

}
