
import THREE from 'three';
import Vector3 from '../../game/physics/base/Vector3';

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
      this.tick();
    }

    renderNext.bind(this)();
  }

  get element() { return this._element; }
  set element(e) {}

  get three() { return this._scene; }
  set three(t) {}

  get scene() { return this._scene; }
  set scene(s) {}

  setCameraHost(gameObjectView, position) {
    this._cameraHost = gameObjectView;
    this._hostModeCameraPosition = position;
    if (this._cameraMode === CAMERA_MODES.HOST) {
      this.cameraHostMode();
    } 
  }

  setCameraTarget(gameObjectView, distance) {
    this._cameraTarget = gameObjectView;
    this._targetModeHostDistance = distance;
    if (this._cameraMode === CAMERA_MODES.TARGET) {
      this.cameraTargetMode();
    } 
  }

  toggleCameraMode() {
    if (this._cameraMode === CAMERA_MODES.HOST) {
      this.cameraTargetMode();
    } else {
      this.cameraHostMode();
    }
  }

  cameraHostMode() {
    this._cameraMode = CAMERA_MODES.HOST;
    if (this._cameraTarget) {
      this._cameraHost.three.add(this._camera);
      this._camera.position.copy(this._hostModeCameraPosition);
      this._camera.lookAt({x: 0, y: 0, z: 0});
    }
  }

  cameraTargetMode() {
    this._cameraMode = CAMERA_MODES.TARGET;
    this._scene.add(this._camera);
  }

  tick() {
    this._gameView.tick();

    if (this._cameraMode === CAMERA_MODES.TARGET && 
        this._cameraTarget && this._cameraHost) {
      var v = new THREE.Vector3(
        this._cameraTarget.physics.position.x,
        this._cameraTarget.physics.position.y,
        this._cameraTarget.physics.position.z
      );
      v.sub(new THREE.Vector3(
        this._cameraHost.physics.position.x,
        this._cameraHost.physics.position.y,
        this._cameraHost.physics.position.z
      ));
      v.setLength(-this._targetModeHostDistance);
      v.add(this._cameraHost.three.position);
      this._camera.position.copy(v);
      this._camera.lookAt(this._cameraTarget.three.position);
    }

    this._renderer.render(
      this._scene,
      this._camera
    );
  }

}

var CAMERA_MODES = {
  HOST: 'HOST',
  TARGET: 'TARGET'
};
