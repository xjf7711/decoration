import {
  Audio,
  // AudioBuffer,
  AudioListener,
  AudioLoader,
  BackSide,
  Clock,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  TextureLoader,
  WebGLRenderer
} from 'three';
import BaseThree from './BaseThree';
import Events from './Events';

// import {Toast} from 'vant';

interface IBox extends Mesh {
  mesh: SphereGeometry;
  material: MeshBasicMaterial;
}

export class Model {
  public rotateBoool = true;
  public audio!: Audio;
  public box!: IBox;
  public textureLoader!: TextureLoader;
  public events!: Events;
  public loaded = false;
  private FPS = 30;
  private refreshTime = 1 / this.FPS;
  private timeS = 0;
  private clock = new Clock();
  private renderer!: WebGLRenderer;
  private scene!: Scene;
  private camera!: PerspectiveCamera;

  public init($el: HTMLElement) {
    console.log('model init .');
    const baseObj = new BaseThree();
    baseObj.init($el);
    this.events = new Events();
    this.events.init(baseObj);

    this.scene = baseObj.scene;
    this.renderer = baseObj.renderer;
    this.camera = baseObj.camera;

    this.initModel();

    // window.onresize = () => this.events.onresizeFun();
  }

  public initModel() {
    console.log('initModel begins . ');
    const boxGeo = new SphereGeometry(250, 50, 50);
    const material = new MeshBasicMaterial({
      color: 0xffffff,
      side: BackSide
    });
    this.box = new Mesh(boxGeo, material) as unknown as IBox;
    this.scene.add(this.box);
    const listener = new AudioListener();
    this.audio = new Audio(listener);
    this.textureLoader = new TextureLoader();
    this.box.material.map = this.textureLoader.load(
      'assets/风格/中式/客餐厅/00125.jpg',
      () => {
        this.loaded = true;
        // vm.loading.close();
        const audioLoader = new AudioLoader();
        audioLoader.load(
          'assets/音乐/琵琶语.mp3',
          (audioBuffer: AudioBuffer) => {
            // Toast.clear();
            this.audio.setBuffer(audioBuffer);
            this.audio.setLoop(true);
            this.audio.setVolume(0.3);
          },
          (xhr: ProgressEvent) => {
            if (xhr.total === xhr.loaded) {
              console.log('onProgress xhr.total === xhr.loaded.');
            }
          },
          () => {
            /**/
          }
        );
        // render()
        this.animation();
      }
    );
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
        this.box.rotateY(0.002);
      }
      this.timeS = 0;
    }
  }
}
