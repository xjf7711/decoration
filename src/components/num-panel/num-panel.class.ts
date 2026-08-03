import { addAttrName, addStyleObj, Div, TypeDiv } from '@type-dom/framework';
import { INumPanel } from './num-panel.interface';

export class NumPanel extends TypeDiv {
  className: 'NumPanel';
  // override textNode: TextNode;

  constructor(params: INumPanel) {
    super();
    this.className = 'NumPanel';
    addAttrName(this, 'num-panel');
    addStyleObj(this, {
      color: '#00ffff',
      width: '60px',
      height: '60px',
      borderRadius: '30px',
      left: '5px',
      top: '55px',
      fontSize: '18px',
      background: 'rgba(0, 0, 0, 0.5)',
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    });
    // this.textNode = new TextNode(params ? (params.num + ' / ' + params.N) : '0 / 0');
    this.addChild(new Div({
      attrObj: {
        name: 'num'
      },
      styleObj: {
        width: '60px',
        textAlign: 'center',
        fontSize: '14px'
      },
      slot: params ? (params.num + ' / ' + params.N) : '0 / 0'
    }));
  }

  setNum(config: Partial<INumPanel>) {
    this.textNode?.setText(config.num + ' / ' + config.N);
  }
}
