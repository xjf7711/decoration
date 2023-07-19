import {fromEvent} from "rxjs";
import {TypeDiv} from "type-dom.ts";
import {House} from "../../views/house";
import {ElArrowLeftSvg} from "type-dom-svgs";
import {TdIcon} from "type-dom-ui/basic/td-icon/td-icon.class";
export class Previous extends TypeDiv {
  className: 'Preview';
  constructor(public parent: House) {
    super();
    this.className = 'Preview';
    this.addStyleObj({
      position: 'absolute',
      left: '5px'
    });
    this.addAttrName('preview');
    const icon = this.createItem(this, {
      TypeClass: TdIcon,
      config: {
        SvgClass: ElArrowLeftSvg,
      }
    }) as TdIcon;
    icon.addStyleObj({
      fontSize: '25px',
      background: 'rgba(0, 0, 0, 0.5)',
      borderWidth: '0px',
      width: '50px',
      height: '50px',
      color: '#fff'
    })
    fromEvent(icon.dom, 'click').subscribe(() => this.parent.previewClick());
  }
}
