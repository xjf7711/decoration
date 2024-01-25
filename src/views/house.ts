import {Division, Img, Span, TypeDiv} from '@type-dom/framework';
import Model from '../threejs/Model';
import { IPlace, IManner, mannerList } from '../threejs/path';
import { AppRoot } from '../app-root';
import {Menu} from "../components/menu/menu.class";
import {Next} from "../components/next/next.class";
import {Previous} from "../components/previous/previous.class";
import {NumPanel} from "../components/num-panel/num-panel.class";
import {Toolbar} from "../components/toolbar/toolbar.class";

const styleObjArr = mannerList;
export class House extends TypeDiv {
  className: 'House';
  private readonly styleArr = styleObjArr;
  private mannerChoose!: IManner;
  private posArr: IPlace[];
  private posChoose: IPlace;
  mannerItemChoose: Division;
  posItemChoose: Span;
  private width = 400;
  private height = 300;
  private classPath = '中式/客餐厅';
  private path = '';
  private audioBoool = false;
  private ScreenBoool = true;
  private rotateBoool = true;
  private N = styleObjArr[0].children[0].jpgNameArr.length;
  private num = 1;
  private model!: Model;
  // private loading: any; // ElLoadingComponent;
  private left = 0;
  private readonly menuWrapper: Menu;
  private readonly nextWrapper: Next;
  private readonly preWrapper: Previous;
  private readonly numPanel: NumPanel;
  private readonly toolbar: Toolbar;
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

    this.menuWrapper = new Menu(this, {
      left: this.left,
      styleArr: this.styleArr,
      posArr: this.posArr
    });
    this.nextWrapper = new Next(this);
    this.preWrapper = new Previous(this);
    this.numPanel = new NumPanel(this, {
      num: this.num,
      N: this.N
    })
    this.toolbar = new Toolbar(this, {
      audioBool: this.audioBoool,
    })
    this.addChildren(
      this.menuWrapper,
      this.nextWrapper,
      this.preWrapper,
      this.numPanel,
      this.toolbar,
    );
    this.mannerChoose = styleObjArr[0];
    this.mannerItemChoose = this.menuWrapper.manner.children[1] as Division;
    this.posChoose = styleObjArr[0].children[0];
    this.posItemChoose = this.menuWrapper.pos.children[1] as Span;
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
    this.menuWrapper.setStyleObj({
      left: this.left + 'px',
    })
    this.height = this.dom.clientHeight;
    console.log('this.height is ', this.height);
    this.nextWrapper.setStyleObj({
      top: this.height / 2 + 'px'
    })
    this.preWrapper.setStyleObj({
      top: this.height / 2 + 'px'
    })
    this.model = new Model();
    this.model.init(this.dom);
  }
  audioClick(audioImg: Img) {
    if (this.audioBoool) {
      this.audioBoool = false;
      audioImg.setAttrObj({
        src: './UI/关闭声音.png'
      })
      this.model.audio.pause();
    } else {
      this.audioBoool = true;
      audioImg.setAttrObj({
        src: './UI/打开声音.png'
      })
      this.model.audio.play();
    }
  }
  screenClick(screenImg: Img) {
    if (this.ScreenBoool) {
      this.ScreenBoool = false;
      screenImg.setAttrObj({
        src: './UI/退出全屏.png'
      })
      this.model.events.requestFullScreen();
    } else {
      this.ScreenBoool = true;
      screenImg.setAttrObj({
        src: './UI/全屏5.png'
      })
      this.model.events.exitFullscreen();
    }
  }
  questionClick() {
    // Dialog.alert({
    //   title: '旋转操作',
    //   message: '按住左键不放上下左右拖动，可以旋转整个场景',
    // });
    // this.$alert('按住左键不放上下左右拖动，可以旋转整个场景', '旋转操作', {})
  }
  rotateClick(rotateImg: Img) {
    if (this.rotateBoool) {
      this.rotateBoool = false;
      rotateImg.setAttrObj({
        src: './UI/旋转.png'
      })
      this.model.rotateBoool = false;
    } else {
      this.rotateBoool = true;
      rotateImg.setAttrObj({
        src: './UI/停止旋转.png'
      })
      this.model.rotateBoool = true;
    }
  }
  resetNum() {
    this.path = this.classPath + '/' + this.posChoose.jpgNameArr[this.num - 1];
    console.log('this.path is ', this.path);
    this.numPanel.setConfig({
      num: this.num,
      N: this.N
    });
    this.model.box
      .material.map = this.model.textureLoader.load(
      './风格/' + this.path,
      () => {
        // Toast.clear();
        // this.loading.close();
        this.model.animation();
      },
    );
    this.model.animation();
  }
  nextClick() {
    console.log('nextClick . ');
    if (this.num < this.N) {
      this.num += 1;
    } else {
      this.num = 1;
    }
    this.resetNum();
  }

  previewClick() {
    if (this.num > 1) {
      this.num -= 1;
    } else {
      this.num = this.N;
    }
    this.resetNum();
  }
  mannerClick(styleObj: IManner, mannerItem: Division) {
    console.log('styleClick . styleObj is ', styleObj);
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
    this.mannerChoose.styleObj.background = '';
    this.mannerItemChoose.setStyleObj({
      background: '',
    })
    this.posChoose.styleObj.background = null;
    this.mannerChoose = styleObj;
    this.mannerItemChoose = mannerItem;
    this.mannerChoose.styleObj.background = '#409EFF';
    mannerItem.setStyleObj({
      background: '#409EFF',
    })
    this.posArr = this.mannerChoose.children;
    this.menuWrapper.setPosList(this.posArr);
    this.menuWrapper.pos.render();
    this.posChoose = this.posArr[0];
    this.posItemChoose = this.menuWrapper.pos.children[1] as Span;
    this.posItemChoose.setStyleObj({
      background: '#409EFF',
    });
    this.posArr[0].styleObj.background = '#409EFF';
    this.N = this.posChoose.jpgNameArr.length;
    this.numPanel.setConfig({
      num: this.num,
      N: this.N
    });
    this.classPath = this.mannerChoose.name + '/' + this.posChoose.name;
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

  posClick(posObj: IPlace, posItem: Span) {
    console.log('posClick begins .');
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
    this.posItemChoose.setStyleObj({
      background: '' // undefined 无效 todo ？？？？
    })
    this.posItemChoose = posItem;
    posItem.setStyleObj({
      background: '#409EFF'
    })
    this.N = this.posChoose.jpgNameArr.length;
    this.numPanel.setConfig({
      num: this.num,
      N: this.N
    });
    this.posChoose.styleObj.background = '#409EFF';
    this.classPath = this.mannerChoose.name + '/' + this.posChoose.name;
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
