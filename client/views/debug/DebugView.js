
import THREE from 'three';
import GameView from './GameView';

export default class DebugView {
  constructor(game) {

    this._gameView = new GameView('game',game);

    this._scene = new THREE.Scene();
    this._scene.add(this._gameView.three);
    window.scene = this._scene;

    this._camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      99999999999
    );
    this._camera.position.y = 1000;
    this._camera.up.set( 0, 0, 1 );
    this._scene.add(this._camera);

    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setSize( window.innerWidth, window.innerHeight );

    this._element = this._renderer.domElement;

    function renderNext() {
      requestAnimationFrame( renderNext.bind(this) );
      this.render();
    }

    renderNext.bind(this)();
  }

  get element() { return this._element; }
  set element(e) {}

  render() {
    this._gameView.tick();

    var arena = this._gameView.views.get('arena');
    if (arena) {
      var ball = arena.views.get('ball');
      if (ball) {
        this._camera.lookAt( ball.three.position );
      }
    }

    //console.info(this._gameView.views.get('arena').views.get('ball').three.position);
    this._renderer.render(
      this._scene,
      this._camera
    );
  }

}
