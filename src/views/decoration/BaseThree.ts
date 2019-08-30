import { Scene, PerspectiveCamera, WebGLRenderer, Clock } from 'three';
import OrbitControls from '@/threejs/controls/OrbitControls';

export default class BaseThree {
  public scene!: Scene;
  public camera!: PerspectiveCamera;
  public renderer!: WebGLRenderer;

  public $el!: HTMLElement;
  public width: number = 400;
  public height: number = 300;
  public init($el: HTMLElement) {
    // console.log('BaseThree init .');
    this.$el = $el;
    this.width = this.$el.clientWidth;
    this.height = this.$el.clientHeight;
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.renderScene();
    this.initControl();
  }

  public initScene() {
    this.scene = new Scene();
  }
  public initCamera() {
    const camera = new PerspectiveCamera(60, this.width / this.height, 1, 1000);
    camera.zoom = 1;
    camera.updateProjectionMatrix();
    camera.position.set(-0.87, 0.03, 0.4);
    camera.lookAt(this.scene.position);
    this.camera = camera;
  }
  public initRenderer() {
    const renderer = new WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(this.width, this.height);
    this.$el.appendChild(renderer.domElement);
    this.renderer = renderer;
  }
  public initControl() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enablePan = false;
    controls.maxDistance = 80;
  }
  public renderScene() {
    this.renderer.render(this.scene, this.camera);
  }
}
