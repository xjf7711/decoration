import {
  Material,
  BackSide,
  Mesh,
  Clock,
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  SphereGeometry,
  TextureLoader,
  AudioListener,
  Audio,
  AudioLoader,
  AudioBuffer,
  MeshBasicMaterial,
} from 'three';
import BaseThree from './BaseThree';
import Events from './Events';
import { path } from './path';
import { Toast } from 'vant';

export default class Model {
  public rotateBoool = true;
  public audio!: Audio;
  public mesh!: Mesh;
  public textureLoader!: TextureLoader;
  public events!: Events;
  public loaded: boolean = false;
  private FPS = 30;
  private refreshTime = 1 / this.FPS;
  private timeS = 0;
  private clock = new Clock();
  private renderer!: WebGLRenderer;
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  public init($el: HTMLElement) {
    // console.log('model init .');
    const baseObj = new BaseThree();
    baseObj.init($el as HTMLElement);
    this.events = new Events();
    this.events.init(baseObj);

    this.scene = baseObj.scene;
    this.renderer = baseObj.renderer;
    this.camera = baseObj.camera;

    this.initModel();

    // window.onresize = () => this.events.onresizeFun();
  }
  public initModel() {
    // console.log('initModel begins . ');
    const box = new SphereGeometry(250, 50, 50);
    const material = new MeshBasicMaterial({
      color: 0xffffff,
      side: BackSide,
    });
    this.mesh = new Mesh(box, material);
    this.scene.add(this.mesh);
    const listener = new AudioListener();
    this.audio = new Audio(listener);
    this.textureLoader = new TextureLoader();
    const texture = this.textureLoader.load(
      './风格/中式/客餐厅/00125.jpg',
      () => {
        this.loaded = true;
        // vm.loading.close();
        const audioLoader = new AudioLoader();
        audioLoader.load(
          './音乐/琵琶语.mp3',
          (audioBuffer: AudioBuffer) => {
            Toast.clear();
            this.audio.setBuffer(audioBuffer);
            this.audio.setLoop(true);
            this.audio.setVolume(0.3);
          },
          (xhr: ProgressEvent) => {
            // if (xhr.total === xhr.loaded) {
            //   console.log('onProgress xhr.total === xhr.loaded.');
            // }
          },
          () => {
            /**/
          },
        );
        // render()
        this.animation();
      },
    );
    (this.mesh.material as MeshBasicMaterial).map = texture;
    // let width = window.innerWidth;
    // let height = window.innerHeight;
    // let k = width / height;

    // let styleObjArr = path();
  }

  public animation() {
    requestAnimationFrame(() => this.animation());
    const rendTime = this.clock.getDelta();
    this.timeS = this.timeS + rendTime;
    if (this.timeS > this.refreshTime) {
      this.renderer.render(this.scene, this.camera);
      if (this.rotateBoool) {
        this.mesh.rotateY(0.002);
      }
      this.timeS = 0;
    }
  }
}
