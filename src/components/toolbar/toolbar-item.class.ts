import {
  Img,
  DivProps,
  TypeDiv,
  addStyleObj,
  addEvents,
} from '@type-dom/framework';
import { Toolbar } from './toolbar.class';

export interface ToolbarItemProps extends DivProps {
  parent: Toolbar,
  name: string,
  src: string,
  width: string,
  height: string
}

export class ToolbarItem extends TypeDiv<ToolbarItemProps> {
  className: 'ToolbarItem';
  img: Img;
  constructor(params: ToolbarItemProps) {
    super(params);
    this.className = 'ToolbarItem';
    addStyleObj(this, {
      fontSize: '25px',
      background: 'rgba(0, 0, 0, 0.5)',
      borderWidth: '0px',
      borderRadius: '25px',
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    });
    this.img = new Img({
      // parent: this,
      attrObj: {
        src: params.src,
        height: params.height,
        width: params.width
      }
    });
    addEvents(this, {
      click: (evt, ele) => {
        console.warn('toolbar-item . evt and ele is ', evt,  ele);
        this.emit('click', evt, this);
      }
    });
    this.addChild(this.img);
  }
}
