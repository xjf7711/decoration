import {TypeRoot} from '@type-dom/framework';
import {House} from './views/house';

/**
 * 应用类，挂载全局属性和方法。
 * 根节点，继承 TypeRoot;
 * 因为属性和方法要全局调用，所以全部设置为静态 static; 包括get也设置为静态
 */
export class AppRoot extends TypeRoot {
  className: 'AppRoot';
  static el: HTMLElement;

  constructor(editorEl: HTMLElement) {
    super({el: editorEl});
    this.className = 'AppRoot';
    this.addAttrName('app-root');
    // this.addStyleObj({
    //   padding: '30px',
    //   border: '20px solid #dddddd'
    // });
    AppRoot.el = editorEl;
    this.events = [];
    const house = new House(this);
    this.addChild(house);
    console.log('house.dom is ', house.dom);
    this.render();
    this.mount(editorEl);
    house.initModel();
  }
}
