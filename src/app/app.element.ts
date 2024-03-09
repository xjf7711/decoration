import { House } from '../views/house';
import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'decoration-app';
    this.style.display = 'block';
    this.style.width = '100vw';
    this.style.height = '100vh';
    const house = new House({
      el: this,
      name: title,
    });
    console.log('house.dom is ', house.dom);
    const buff: string[] = [];
    house.dump(buff);
    console.log('appRoot.dump() buff.join("") is ', buff.join(''));
  }
}

customElements.define('decoration-app', AppElement);
