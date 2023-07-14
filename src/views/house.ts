import { TypeDiv } from 'type-dom.ts';
import { Dialog } from 'type-dom-ui';
import Model from '../threejs/Model';
import { IPlace, IStyle, path } from '../threejs/path';
import { AppRoot } from '../app-root';

const styleObjArr = path();
export class House extends TypeDiv {
  className: 'House';
  private styleArr = styleObjArr;
  private styleChoose!: IStyle;
  private posArr!: IPlace[];
  private posChoose!: IPlace;
  private width = 400;
  private height = 300;
  private classPath = 'chinese/客餐厅';
  private path = '';
  private audioBoool = false;
  private ScreenBoool = true;
  private rotateBoool = true;
  private N = styleObjArr[0].children[0].jpgNameArr.length;
  private num = 1;
  private model!: Model;
  private loading: any; // ElLoadingComponent;
  private left = 0;
  constructor(public parent: AppRoot) {
    super();
    console.log('house constructor . ');
    this.className = 'House';
    this.setStyleObj({
      width: '100vw',
      height: '100vh',
      textAlign: 'center',
    });
    this.addAttrObj({
      zIndex: 105,
      name: 'house'
    });
    // created
    this.styleArr = styleObjArr;
    this.posArr = styleObjArr[0].children;
    this.styleChoose = this.styleArr[0];
    this.posChoose = styleObjArr[0].children[0];
    // this.loading = Toast.loading({
    //   duration: 0, // 持续展示 toast
    //   forbidClick: true, // 禁用背景点击
    //   loadingType: 'spinner',
    //   // message: 'Loading',
    // });
  }
  initModel() {
    console.log('initModel . ');
    // mounted
    this.width = this.dom.clientWidth; // 0??
    console.log('this.width is ', this.width);
    this.left = this.width > 440 ? (this.width - 440) / 2 : 0;
    this.height = this.dom.clientHeight;
    console.log('this.height is ', this.height);
    this.model = new Model();
    this.model.init(this.dom);
  }
  private audioClick() {
    if (this.audioBoool) {
      this.audioBoool = false;
      this.model.audio.pause();
    } else {
      this.audioBoool = true;
      this.model.audio.play();
    }
  }

  private ScreenClick() {
    if (this.ScreenBoool) {
      this.ScreenBoool = false;
      this.model.events.requestFullScreen();
    } else {
      this.ScreenBoool = true;
      this.model.events.exitFullscreen();
    }
  }

  private questionClick() {
    // Dialog.alert({
    //   title: '旋转操作',
    //   message: '按住左键不放上下左右拖动，可以旋转整个场景',
    // });
    // this.$alert('按住左键不放上下左右拖动，可以旋转整个场景', '旋转操作', {})
  }

  private rotateClick() {
    if (this.rotateBoool) {
      this.rotateBoool = false;
      this.model.rotateBoool = false;
    } else {
      this.rotateBoool = true;
      this.model.rotateBoool = true;
    }
  }

  private nextClick() {
    if (this.num < this.N) {
      this.num += 1;
    } else {
      this.num = 1;
    }
  }

  private upClick() {
    if (this.num > 1) {
      this.num -= 1;
    } else {
      this.num = this.N;
    }
  }

  private styleClick(styleObj: IStyle) {
    // this.loading = Toast.loading({
    //   forbidClick: true,
    //   duration: 0,
    //   loadingType: 'spinner',
    //   // message: 'Loading',
    // });
    // this.$loading({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // });
    this.num = 1;
    this.styleChoose.styleObj.background = null;
    this.posChoose.styleObj.background = null;
    this.styleChoose = styleObj;
    this.styleChoose.styleObj.background = '#409EFF';
    this.posArr = this.styleChoose.children;
    this.posChoose = this.posArr[0];
    this.posArr[0].styleObj.background = '#409EFF';
    this.N = this.posChoose.jpgNameArr.length;
    this.classPath = this.styleChoose.name + '/' + this.posChoose.name;
    this.path = this.classPath + '/' + this.posChoose.jpgNameArr[this.num - 1];
    this.model.box.material.map = this.model.textureLoader.load(
      './风格/' + this.path,
      () => {
        // Toast.clear();
        // this.loading.close();
        this.model.animation();
      },
    );
  }

  private posClick(posObj: IPlace) {
    // console.log('posClick begins .');
    // this.loading = Toast.loading({
    //   duration: 0,
    //   forbidClick: true,
    //   // message: 'Loading',
    //   loadingType: 'spinner',
    // });
    // this.$loading({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // });
    this.num = 1;
    this.posChoose.styleObj.background = null;
    this.posChoose = posObj;
    this.N = this.posChoose.jpgNameArr.length;
    this.posChoose.styleObj.background = '#409EFF';
    this.classPath = this.styleChoose.name + '/' + this.posChoose.name;
    this.path = this.classPath + '/' + this.posChoose.jpgNameArr[this.num - 1];
    this.model.box.material.map = this.model.textureLoader.load(
      './风格/' + this.path,
      () => {
        // Toast.clear();
        // this.loading.close();
        this.model.animation();
      },
    );
  }
}
