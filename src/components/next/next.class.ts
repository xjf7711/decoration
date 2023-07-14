import {TypeDiv} from "type-dom.ts";
import {House} from "../../views/house";
import {TdButton} from "type-dom-ui";
import {ElArrowRightSvg} from "type-dom-svgs";
import {TdIcon} from "type-dom-ui/basic/td-icon/td-icon.class";
import {fromEvent} from "rxjs";

export class Next extends TypeDiv {
  className: 'Next';
  constructor(public parent: House) {
    super();
    this.className = 'Next';
    this.addStyleObj({
      position: 'absolute',
      right: '5px'
    });
    this.addAttrName('next');
    const icon = this.createItem(this, {
      TypeClass: TdIcon,
      config: {
        SvgClass: ElArrowRightSvg,
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
    fromEvent(icon.dom, 'click').subscribe(() => this.parent.nextClick());
  }
}
