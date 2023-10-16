import {fromEvent} from "rxjs";
import {StyleCursor, Division, Span, TextNode, TypeDiv} from "type-dom.ts";
import {House} from "../../views/house";
import {IMenuConfig} from "./menu.interface";
import {IManner} from "../../threejs/path";

export class Menu extends TypeDiv {
  className: 'Menu';
  manner: Division; // 风格
  pos: Division; // 位置
  constructor(public parent: House, config?: IMenuConfig) {
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
      height: '80px',
    });
    this.manner = new Division(this);
    this.manner.addAttrName('manner');
    this.createItem<Division>(this.manner, {
      TypeClass: Division,
      propObj: {
        attrObj: {
          title: '风格'
        },
        styleObj: {
          padding: '5px 0',
          fontWeight: 'bold',
          cursor: StyleCursor.default,
          display: 'inline-block',
          width: '12.5%',
        }
      },
      childNodes: [
        {
          nodeValue: '风格:'
        }
      ]
    });
    this.pos = new Division(this);
    this.pos.addAttrName('position');
    this.pos.addStyleObj({
      padding: '5px 0'
    })
    this.createFirstPostItem();
    this.addChildren(this.manner, this.pos);
    config && this.setConfig(config);
  }
  createFirstPostItem() {
    this.createItem(this.pos, {
      TypeClass: Span,
      propObj: {
        attrObj: {
          name: 'position'
        },
        styleObj: {
          fontWeight: 'bold',
          cursor: StyleCursor.default
        }
      },
      childNodes: [
        {
          nodeValue: '位置:'
        }
      ]
    });
  }
  setConfig(config: IMenuConfig) {
    this.addStyleObj({
      left: config.left + 'px'
    })
    this.setMannerList(config.styleArr);
    this.setPosList(config.posArr);
  }
  setMannerList(mannerList: IManner[]) {
    for (const manner of mannerList) {
      console.log('manner is ', manner);
      manner.styleObj.width = '12.5%';
      manner.styleObj.display = 'inline-block';
      const mannerItem = this.createItem<Division>(this.manner, {
        TypeClass: Division,
        propObj: {
          attrObj: {
            title: manner.name,
          },
          styleObj: manner.styleObj
        },
        childNodes: [
          {
            nodeValue: manner.name,
          }
        ]
      });
      fromEvent(mannerItem.dom, 'click').subscribe(() => this.parent.mannerClick(manner, mannerItem));
    }
  }
  setPosList(posList: any[]) {
    this.pos.clearChildNodes();
    this.pos.clearChildDom();
    this.createFirstPostItem();
    for (const pos of posList) {
      if (pos.jpgNameArr.length) {
        const styleObj = pos.styleObj;
        styleObj.padding = '5px 5px';
        const posItem = this.createItem<Span>(this.pos, {
          TypeClass: Span,
          propObj: {
            attrObj: {
              title: pos.name,
            },
            styleObj: pos.styleObj
          },
          childNodes: [
            {
              nodeValue: pos.name,
            }
          ]
        });
        fromEvent(posItem.dom, 'click').subscribe(() => this.parent.posClick(pos, posItem));
      }
    }
  }
}
