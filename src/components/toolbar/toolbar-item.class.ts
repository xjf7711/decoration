import { Img, ITypeConfig, TypeDiv } from '@type-dom/framework';
import { Toolbar } from './toolbar.class';

export interface IToolbarItemConfig extends ITypeConfig {
  parent: Toolbar,
  name: string,
  src: string,
  width: string,
  height: string
}

export class ToolbarItem extends TypeDiv {
  className: 'ToolbarItem';
  img: Img;

  constructor(config: IToolbarItemConfig) {
    super();
    this.className = 'ToolbarItem';
    this.addStyleObj({
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
    this.setConfig(config);
    this.img = new Img({ parent: this });
    this.img.addAttrObj({
      src: config.src,
      height: config.height,
      width: config.width
    });
    this.addChild(this.img);
  }
}
