import { fromEvent } from 'rxjs';
import { TypeDiv } from '@type-dom/framework';
import { ElArrowLeftSvg } from '@type-dom/svgs';
import { TdIcon } from '@type-dom/ui';
import { House } from '../../views/house';

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
    const icon = new TdIcon({
      svgObj: new ElArrowLeftSvg(),
      styleObj: {
        fontSize: '25px',
        background: 'rgba(0, 0, 0, 0.5)',
        borderWidth: '0px',
        width: '50px',
        height: '50px',
        color: '#fff'
      }
    });
    this.addChild(icon);
    fromEvent(icon.dom, 'click').subscribe(() => this.parent.previewClick());
  }
}
