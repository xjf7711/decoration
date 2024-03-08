import { fromEvent } from 'rxjs';
import { StyleCursor, Division, Span, TypeDiv } from '@type-dom/framework';
import { IManner, IPlace } from '../../assets/path';
import { House } from '../../views/house';
import { IMenuConfig } from './menu.interface';

export class Menu extends TypeDiv {
  className: 'Menu';
  manner: Division; // 风格
  pos: Division; // 位置
  parent!: House; // 挂载的父级
  constructor(config: IMenuConfig) {
    super();
    this.className = 'Menu';
    this.addAttrName('menu');
    this.addStyleObj({
      position: 'absolute',
      textAlign: 'center',
      bottom: '0',
      color: '#fff',
      background: 'rgba(0, 0, 0, 0.5)',
      padding: '10px 0',
      zIndex: 102,
      width: '100vw',
      maxWidth: '440px',
      height: '80px'
    });
    this.manner = new Division();
    this.manner.addAttrName('manner');
    this.manner.addChild(
      new Division({
        text: '风格:',
        attrObj: {
          title: '风格'
        },
        styleObj: {
          padding: '5px 0',
          fontWeight: 'bold',
          cursor: StyleCursor.default,
          display: 'inline-block',
          width: '12.5%'
        }
      })
    );
    this.pos = new Division();
    this.pos.addAttrName('position');
    this.pos.addStyleObj({
      padding: '5px 0'
    });
    this.setConfig(config); // 设置配置,要先挂载parent
    this.createFirstPostItem();
    this.addChildren(this.manner, this.pos);
    this.addStyleObj({
      left: config.left + 'px'
    });
    this.setMannerList(config.styleArr);
    this.setPosList(config.posArr);
  }

  createFirstPostItem() {
    this.pos.addChild(new Span({
      text: '位置:',
      attrObj: {
        name: 'position'
      },
      styleObj: {
        fontWeight: 'bold',
        cursor: StyleCursor.default
      }
    }))
  }

  setMannerList(mannerList: IManner[]) {
    for (const manner of mannerList) {
      console.log('manner is ', manner);
      manner.styleObj.width = '12.5%';
      manner.styleObj.display = 'inline-block';
      const mannerItem = new Division({
        text: manner.name,
        attrObj: {
          title: manner.name
        },
        styleObj: manner.styleObj
      });
      this.manner.addChild(mannerItem);
      fromEvent(mannerItem.dom, 'click').subscribe(() => this.parent.mannerClick(manner, mannerItem));
    }
  }

  setPosList(posList: IPlace[]): void  {
    this.pos.clearChildren();
    this.createFirstPostItem();
    for (const pos of posList) {
      if (pos.jpgNameArr.length) {
        const styleObj = pos.styleObj;
        styleObj.padding = '5px 5px';

        const posItem = new Span({
          text: pos.name,
          attrObj: {
            title: pos.name
          },
          styleObj: pos.styleObj,
        });
        this.pos.addChild(posItem);
        fromEvent(posItem.dom, 'click').subscribe(() => this.parent.posClick(pos, posItem));
      }
    }
  }
}
