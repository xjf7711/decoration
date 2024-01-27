import {fromEvent} from "rxjs";
import {Division, Img, TypeDiv} from "@type-dom/framework";
import {House} from "../../views/house";
import {ToolbarItem} from "./toolbar-item.class";
export interface IToolbar {
  audioBool: boolean
}
export class Toolbar extends TypeDiv {
  className: 'Toolbar';
  private audioItem: ToolbarItem;
  private screenItem: ToolbarItem;
  private questionItem: ToolbarItem;
  private rotateItem: ToolbarItem;
  constructor(public parent: House, config: IToolbar) {
    super();
    this.className = 'Toolbar';
    this.addAttrName('toolbar');
    this.addStyleObj({
      position: 'absolute',
      right: '20px',
      top: '60px'
    });
    this.audioItem = new ToolbarItem(this, {
      name: 'audio',
      src: './UI/关闭声音.png',
      height: '20',
      width: '20'
    });
    this.screenItem = new ToolbarItem(this, {
      name: 'screen',
      src: './UI/全屏5.png',
      width: '18',
      height: '18'
    });
    this.rotateItem = new ToolbarItem(this, {
      name: 'rotate',
      src: './UI/停止旋转.png',
      height: '20',
      width: '20'
    });
    this.questionItem = new ToolbarItem(this, {
      name: 'question',
      src: './UI/帮助5.png',
      height: '22',
      width: '22'
    });
    this.addChildren(this.audioItem, this.screenItem, this.rotateItem, this.questionItem);
  }
  initEvents() {
    fromEvent(this.audioItem.dom, 'click').subscribe(() => this.parent.audioClick(this.audioItem.img));
    fromEvent(this.screenItem.dom, 'click').subscribe(() => this.parent.screenClick(this.screenItem.img));
    fromEvent(this.rotateItem.dom, 'click').subscribe(() => this.parent.rotateClick(this.rotateItem.img));
    fromEvent(this.questionItem.dom, 'click').subscribe(() => this.parent.questionClick());
  }
}
