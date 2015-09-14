
import THREE from 'three';

export default class BaseThreeView {
  constructor(gameView) {

    this._gameView = gameView;

    this._scene = new THREE.Scene();
    this._scene.add(this._gameView.three);

    this._camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1e20
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

  get three() { return this._scene; }
  set three(t) {}

  get scene() { return this._scene; }
  set scene(s) {}

  setCameraTarget(gameObjectView, position, lookAt) {
    position = position || {x: 0, y: 0, z: 0};
    lookAt = lookAt || {x: 0, y: 1, z: 0};
    gameObjectView.three.add(this._camera);
    this._camera.position.set(position.x, position.y, position.z);
    this._camera.lookAt(
      new THREE.Vector3(lookAt.x, lookAt.y, lookAt.z)
    );
  }

  render() {
    this._gameView.tick();
    this._renderer.render(
      this._scene,
      this._camera
    );
  }

}
