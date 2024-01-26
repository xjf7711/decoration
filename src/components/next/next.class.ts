import {fromEvent} from "rxjs";
import {TypeDiv} from "@type-dom/framework";
import {ElArrowRightSvg} from "@type-dom/svgs";
import {TdIcon} from "@type-dom/ui";
import {House} from "../../views/house";

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
    const icon = this.createItem<TdIcon>(this, {
      TypeClass: TdIcon,
      config: {
        SvgClass: ElArrowRightSvg,
      }
    });
    icon.addStyleObj({
      fontSize: '25px',
      background: 'rgba(0, 0, 0, 0.5)',
      borderWidth: '0px',
      width: '50px',
      height: '50px',
      color: '#fff'
    });
    fromEvent(icon.dom, 'click').subscribe(() => this.parent.nextClick());
  }
}
