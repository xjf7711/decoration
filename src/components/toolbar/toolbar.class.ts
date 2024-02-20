import {fromEvent} from "rxjs";
import {Division, Img, TypeDiv} from "@type-dom/framework";
import {House} from "../../views/house";
import {ToolbarItem} from "./toolbar-item.class";

export interface IToolbar {
  audioBool: boolean
}

export class Toolbar extends TypeDiv {
  className: 'Toolbar';

  constructor(public parent: House, config: IToolbar) {
    super();
    this.className = 'Toolbar';
    this.addAttrName('toolbar');
    this.addStyleObj({
      position: 'absolute',
      right: '20px',
      top: '60px'
    });
    const audioItem = new ToolbarItem(this, {
      name: 'audio',
      src: './UI/关闭声音.png',
      height: '20',
      width: '20'
    });
    fromEvent(audioItem.dom, 'click').subscribe(() => this.parent.audioClick(audioItem.img));
    const screenItem = new ToolbarItem(this, {
      name: 'screen',
      src: './UI/全屏5.png',
      width: '18',
      height: '18'
    });
    fromEvent(screenItem.dom, 'click').subscribe(() => this.parent.screenClick(screenItem.img));
    const rotateItem = new ToolbarItem(this, {
      name: 'rotate',
      src: './UI/停止旋转.png',
      height: '20',
      width: '20'
    });
    fromEvent(rotateItem.dom, 'click').subscribe(() => this.parent.rotateClick(rotateItem.img));
    const questionItem = new ToolbarItem(this, {
      name: 'question',
      src: './UI/帮助5.png',
      height: '22',
      width: '22'
    });
    fromEvent(questionItem.dom, 'click').subscribe(() => this.parent.questionClick());
    this.addChildren(audioItem, screenItem, rotateItem, questionItem);
  }
}
