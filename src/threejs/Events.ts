import { WebGLRenderer, PerspectiveCamera } from 'three';
import BaseThree from './BaseThree';

export default class Events {
  private $el!: HTMLElement;
  private renderer!: WebGLRenderer;
  private camera!: PerspectiveCamera;

  public init(baseObj: BaseThree) {
    // console.log('Events init . ');
    this.$el = baseObj.$el;
    // console.log('this.$el is ', this.$el);
    this.camera = baseObj.camera;
    this.renderer = baseObj.renderer;
    window.onresize = () => this.onresizeFun();
  }

  public onresizeFun() {
    // console.log('onresizeFun begins. ');
    const width = this.$el.clientWidth;
    const height = this.$el.clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  public requestFullScreen() {
    // console.log('requestFullScreen begins .');
    const de = document.documentElement;
    if (de.requestFullscreen) {
      de.requestFullscreen();
    }
    // else if (de.mozRequestFullScreen) {
    //   de.mozRequestFullScreen()
    // } else if (de.webkitRequestFullScreen) {
    //   de.webkitRequestFullScreen()
    // }
  }

  public exitFullscreen() {
    const de = document;
    if (de.exitFullscreen) {
      de.exitFullscreen();
    }
    // else if (de.mozCancelFullScreen) {
    //   de.mozCancelFullScreen()
    // } else if (de.webkitCancelFullScreen) {
    //   de.webkitCancelFullScreen()
    // }
  }
}
