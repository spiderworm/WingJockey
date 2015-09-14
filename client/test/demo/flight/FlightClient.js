
import BaseClient from '../../../base/BaseClient';
import FlightGame from "./FlightGame";
import FlightView from "./FlightView";
import FlightInput from "./FlightInput";
import CONSTANTS from "./CONSTANTS";
import THREE from 'three';


export default class FlightClient extends BaseClient {

  constructor() {
    var game = new FlightGame();
    var view = new FlightView(game);
    var input = new FlightInput(game);
    var plane = game.objects.get('arena').objects.get('plane');
    plane.physics.position.set({x: CONSTANTS.PLANE.START.X, y: CONSTANTS.PLANE.START.Y, z: CONSTANTS.PLANE.START.Z});

    super(game, view, input, plane);

    window.game = game;
    window.world = game.objects.get('arena').physics._cannon;
    window.plane = plane;
    window.scene = view._scene;
    window.camera = view._camera;

    window.testObject = (function() {
      var mat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
      var geo = new THREE.SphereGeometry(1000);
      return new THREE.Mesh(geo, mat);
    })();

    game.start();
  }

}
