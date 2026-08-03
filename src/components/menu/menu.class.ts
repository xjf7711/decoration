import {
  addAttrName,
  addStyleObj,
  defaultProps,
  Div,
  // setStyleObj,
  Span,
  TypeDiv,
} from '@type-dom/framework';
import { IManner, IPlace } from '../../path';
import { House } from '../../views/house';
import { MenuProps } from './menu.interface';

export class Menu extends TypeDiv<MenuProps> {
  className: 'Menu';
  manner?: Div; // 风格
  pos?: Div; // 位置
  declare parent: House; // 挂载的父级
  constructor(params: MenuProps) {
    super(params);
    defaultProps(this, {
      styleObj: {
        position: 'absolute',
        textAlign: 'center',
        bottom: '0',
        color: '#fff',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '10px 0',
        zIndex: 102,
        width: '100vw',
        maxWidth: '440px',
        height: '80px',
      }
    } as MenuProps)
    this.className = 'Menu';
    addAttrName(this, 'menu');
  }

  override setup() {
    const props = this.props;
    this.manner = new Div({
      name: 'manner',
      slot: new Div({
        slot: '风格:',
        attrObj: {
          title: '风格',
        },
        styleObj: {
          padding: '5px 0',
          fontWeight: 'bold',
          cursor: 'default',
          display: 'inline-block',
          width: '12.5%',
        },
      })
    });

    this.pos = new Div({
      name: 'position',
      styleObj: {
        padding: '5px 0'
      },
    });
    this.createFirstPostItem();
    this.addChildren(this.manner, this.pos);
    addStyleObj(this, {
      left: props.left + 'px',
    });
    this.setMannerList(props.styleArr);
    this.setPosList(props.posArr);
  }

  createFirstPostItem() {
    this.pos?.addChild(
      new Span({
        slot: '位置:',
        attrObj: {
          name: 'position',
        },
        styleObj: {
          fontWeight: 'bold',
          cursor: 'default',
        },
      })
    );
  }

  setMannerList(mannerList: IManner[]) {
    for (const manner of mannerList) {
      console.log('manner is ', manner);
      manner.styleObj.width = '12.5%';
      manner.styleObj.display = 'inline-block';
      this.manner?.addChild(new Div({
        slot: manner.name,
        attrObj: {
          title: manner.name,
        },
        styleObj: manner.styleObj,
        onClick: (evt, mannerItem) => {
          console.log('mannerItem click');
          this.parent.mannerClick(manner, mannerItem);
        },
      }));
    }
  }

  setPosList(posList: IPlace[]): void {
    this.pos?.clearChildren();
    this.createFirstPostItem();
    for (const posObj of posList) {
      if (posObj.jpgNameArr.length) {
        const styleObj = posObj.styleObj;
        styleObj.padding = '5px 5px';

        const posItem = new Span({
          slot: posObj.name,
          attrObj: {
            title: posObj.name,
          },
          styleObj: posObj.styleObj,
          onClick: () => {
            console.log('posItem click');
            this.parent.posClick(posObj, posItem);
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

            // this.num = 1;
            // posObj.styleObj.background = undefined;
            // setStyleObj(posItem, {
            //   background: '' // undefined 无效 todo ？？？？
            // });
            // setStyleObj(posItem, {
            //   background: '#409EFF'
            // });
            // this.N = posObj.jpgNameArr.length;
            // this.numPanel.setNum({
            //   num: this.num,
            //   N: this.N
            // });
            // posObj.styleObj.background = '#409EFF';
            // this.classPath = this.mannerChoose.name + '/' + posObj.name;
            // this.path = this.classPath + '/' + posObj.jpgNameArr[this.num - 1];
            // this.model.box.material.map = this.model.textureLoader.load(
            //   'assets/风格/' + this.path,
            //   () => {
            //     // Toast.clear();
            //     // this.loading.close();
            //     this.model.animation();
            //   }
            // );
          },
        });
        this.pos?.addChild(posItem);
      }
    }
  }
}
