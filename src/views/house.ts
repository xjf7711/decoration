import {
  Div,
  Span,
  TypeDiv,
  DivProps,
  InjectionKey,
  // MaybeRef,
  addStyleObj,
  addAttrObj,
  setStyleObj,
  onMounted,
  nextTick,
  provide,
} from '@type-dom/framework';
import { Model } from '../threejs/Model';
import { IPlace, IManner, mannerList } from '../path';
import { Menu } from '../components/menu/menu.class';
import { NumPanel } from '../components/num-panel/num-panel.class';
import { Toolbar } from '../components/toolbar/toolbar.class';
import { ElArrowLeftSvg, ElArrowRightSvg } from '@type-dom/svgs';
import { TdIcon } from '@type-dom/ui';
import { Signal, signal } from '@type-dom/signals';
import { setDomStyle } from '@type-dom/utils';

interface HouseProps extends DivProps {
  // el: HTMLElement;
  name: string;
}

export class House extends TypeDiv<HouseProps> {
  className: 'House';
  mannerItemChoose: Div;
  posItemChoose: Span;
  private readonly styleArr = mannerList;
  private mannerChoose!: IManner;
  private posArr: IPlace[];
  private posChoose: IPlace;
  private width = 400;
  private height = 300;
  private classPath = '中式/客餐厅';
  private path = '';
  private N = mannerList[0].items[0].jpgNameArr.length;
  private num = 1;
  private model!: Model;
  // private loading: any; // ElLoadingComponent;
  private left = 0;
  private readonly menuWrapper: Menu;
  private readonly numPanel: NumPanel;
  private nextRef: Signal<HTMLDivElement>;
  private previewRef: Signal<HTMLDivElement>;

  constructor(params: HouseProps) {
    super(params);
    console.log('house constructor . ');
    this.className = 'House';
    this.nextRef = signal<HTMLDivElement>();
    this.previewRef = signal<HTMLDivElement>();
    addStyleObj(this, {
      width: '100vw',
      height: '100vh',
      textAlign: 'center'
    });
    addAttrObj(this, {
      zIndex: 105,
      name: 'house'
    });
    // created
    // this.styleArr = mannerList;
    this.posArr = mannerList[0].items;

    this.menuWrapper = new Menu({
      left: this.left,
      styleArr: this.styleArr,
      posArr: this.posArr
    });
    this.numPanel = new NumPanel({
      // parent: this,
      num: this.num,
      N: this.N
    });
    this.addChildren(
      this.menuWrapper,
      new Div({
        name: 'next-div',
        refDom: this.nextRef,
        styleObj: {
          position: 'absolute',
          right: '5px',
        },
        slot: new TdIcon({
          slot: new ElArrowRightSvg(),
          styleObj: {
            fontSize: '25px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderWidth: '0px',
            width: '50px',
            height: '50px',
            color: '#fff',
          },
        }),
        onClick: () => {
          console.log('next onClick . ');
          if (this.num < this.N) {
            this.num += 1;
          } else {
            this.num = 1;
          }
          this.resetNum();
        },
      }),
      new Div({
        name: 'preview-div',
        refDom: this.previewRef,
        styleObj: {
          position: 'absolute',
          left: '5px',
        },
        slot: new TdIcon({
          slot: new ElArrowLeftSvg(),
          styleObj: {
            fontSize: '25px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderWidth: '0px',
            width: '50px',
            height: '50px',
            color: '#fff',
          },
          onClick: () => {
            if (this.num > 1) {
              this.num -= 1;
            } else {
              this.num = this.N;
            }
            this.resetNum();
          },
        }),
      }),
      this.numPanel,
      new Toolbar(this)
    );
    this.mannerChoose = mannerList[0];
    this.mannerItemChoose = this.menuWrapper.manner?.children[1] as Div;
    this.posChoose = mannerList[0].items[0];
    this.posItemChoose = this.menuWrapper.pos?.children[1] as Span;
    // this.loading = Toast.loading({
    //   duration: 0, // 持续展示 toast
    //   forbidClick: true, // 禁用背景点击
    //   loadingType: 'spinner',
    //   // message: 'Loading',
    // });
    // 挂载
    // this.mount(params.el);
    // this.initModel();
  }
  override setup() {
    this.model = new Model();
    provide(houseInjectKey, {
      numPanel: this.numPanel,
      model: this.model,
    });
    onMounted(() => {
      nextTick(() => {
        this.mannerItemChoose = this.menuWrapper.manner?.children[1] as Div;
        this.initModel();
      })
    })
  }

  initModel() {
    console.log('initModel . ');
    if (!this.dom) {
      console.warn('this.dom is undefined . ');
      return;
    }
    // mounted
    this.model.init(this.dom);
    this.width = this.dom.clientWidth; // 0??
    console.log('this.width is ', this.width);
    this.left = this.width > 440 ? (this.width - 440) / 2 : 0;
    console.warn('this.left is ', this.left);
    setStyleObj(this.menuWrapper, {
      left: this.left + 'px'
    });
    this.height = this.dom.clientHeight;
    console.log('this.height is ', this.height);
    setDomStyle(this.nextRef.get(), {
      top: this.height / 2 + 'px'
    });
    setDomStyle(this.previewRef.get(), {
      top: this.height / 2 + 'px'
    });
  }

  resetNum() {
    this.path = this.classPath + '/' + this.posChoose.jpgNameArr[this.num - 1];
    console.log('this.path is ', this.path);
    this.numPanel.setNum({
      num: this.num,
      N: this.N
    });
    this.model.box
      .material.map = this.model.textureLoader.load(
      'assets/风格/' + this.path,
      () => {
        // Toast.clear();
        // this.loading.close();
        this.model.animation();
      }
    );
    this.model.animation();
  }

  mannerClick(manner: IManner, mannerItem: Div) {
    console.log('mannerClick . manner is ', manner);
    // this.loading = Toast.loading({
    //   forbidClick: true,
    //   duration: 0,
    //   loadingType: 'spinner',
    //   // message: 'Loading',
    // });
    // this.$loading({
    //   lock: true,
    //   slot: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // });
    this.num = 1;
    this.mannerChoose.styleObj.background = '';
    setStyleObj(this.mannerItemChoose, {
      background: ''
    });
    this.posChoose.styleObj.background = undefined;
    this.mannerChoose = manner;
    this.mannerItemChoose = mannerItem;
    this.mannerChoose.styleObj.background = '#409EFF';
    setStyleObj(mannerItem, {
      background: '#409EFF'
    });
    this.posArr = this.mannerChoose.items;
    this.menuWrapper.setPosList(this.posArr);
    this.menuWrapper.pos?.mount(this.menuWrapper.dom);
    this.posChoose = this.posArr[0];
    this.posItemChoose = this.menuWrapper.pos?.children[1] as Span;
    setStyleObj(this.posItemChoose, {
      background: '#409EFF'
    });
    this.posArr[0].styleObj.background = '#409EFF';
    this.N = this.posChoose.jpgNameArr.length;
    this.numPanel.setNum({
      num: this.num,
      N: this.N
    });
    this.classPath = this.mannerChoose.name + '/' + this.posChoose.name;
    this.path = this.classPath + '/' + this.posChoose.jpgNameArr[this.num - 1];
    this.model.box.material.map = this.model.textureLoader.load(
      'assets/风格/' + this.path,
      () => {
        // Toast.clear();
        // this.loading.close();
        this.model.animation();
      }
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
    //   slot: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // });
    this.num = 1;
    this.posChoose.styleObj.background = undefined;
    this.posChoose = posObj;
    setStyleObj(this.posItemChoose, {
      background: '' // undefined 无效 todo ？？？？
    });
    this.posItemChoose = posItem;
    setStyleObj(posItem, {
      background: '#409EFF'
    });
    this.N = this.posChoose.jpgNameArr.length;
    this.numPanel.setNum({
      num: this.num,
      N: this.N
    });
    this.posChoose.styleObj.background = '#409EFF';
    this.classPath = this.mannerChoose.name + '/' + this.posChoose.name;
    this.path = this.classPath + '/' + this.posChoose.jpgNameArr[this.num - 1];
    this.model.box.material.map = this.model.textureLoader.load(
      'assets/风格/' + this.path,
      () => {
        // Toast.clear();
        // this.loading.close();
        this.model.animation();
      }
    );
  }
}

export interface ButtonGroupContext {
  model: Model;
  numPanel: NumPanel;
}

export const houseInjectKey: InjectionKey<ButtonGroupContext> = Symbol('houseInjectKey');
