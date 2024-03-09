import { Division, TextNode, TypeDiv } from '@type-dom/framework';
import { INumPanel } from './num-panel.interface';

export class NumPanel extends TypeDiv {
  className: 'NumPanel';
  textNode: TextNode;

  constructor(config: INumPanel) {
    super();
    this.className = 'NumPanel';
    this.addAttrName('num-panel');
    this.addStyleObj({
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
    this.textNode = new TextNode(config ? (config.num + ' / ' + config.N) : '0 / 0')
    this.addChild(new Division({
      attrObj: {
        name: 'num'
      },
      styleObj: {
        width: '60px',
        textAlign: 'center',
        fontSize: '14px',
      },
      childNodes: [
        this.textNode,
      ]
    }))
  }

  setNum(config: Partial<INumPanel>) {
    this.textNode.setText(config.num + ' / ' + config.N)
  }
}
