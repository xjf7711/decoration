import { Division, TextNode, TypeDiv } from 'type-dom.ts';
import { House } from '../../views/house';
import { INumPanel } from './num-panel.interface';

export class NumPanel extends TypeDiv {
  className: 'NumPanel';
  constructor(public parent: House, config: INumPanel) {
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
    this.createItem(this, {
      TypeClass: Division,
      propObj: {
        attrObj: {
          name: 'num'
        },
        styleObj: {
          width: '60px',
          textAlign: 'center'
        }
      },
      childNodes: [
        {
          nodeValue: config ? (config.num + ' / ' + config.N) : '0 / 0'
        }
      ]
    });
  }
  setConfig(config: INumPanel) {
    (this.children[0].children[0] as TextNode).setText(config.num + ' / ' + config.N);
  }
}
