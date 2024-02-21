import { Img, TypeDiv } from "@type-dom/framework";
import {Toolbar} from "./toolbar.class";
export interface IToolbarItemConfig {
  name: string,
  src: string,
  width: string,
  height: string
}

export class ToolbarItem extends TypeDiv {
  className: 'ToolbarItem';
  img: Img;
  constructor(public parent: Toolbar, config: IToolbarItemConfig) {
    super();
    this.className = 'ToolbarItem';
    this.addAttrName(config.name);
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
    this.img = new Img(this);
    this.img.addAttrObj({
      src: config.src,
      height: config.height,
      width: config.width
    })
    this.addChild(this.img);
  }
}
