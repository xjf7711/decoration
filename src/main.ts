import {fromEvent} from 'rxjs';

console.log('main.ts .... ')
import {AppRoot} from './app-root';
import './styles/index.scss';
import 'normalize.css';

fromEvent(document, 'DOMContentLoaded').subscribe(e => {
  // console.log('document DOMContentLoaded, e is ', e);
  const el = document.querySelector('#app-ref') as HTMLElement;
  console.log('el is ', el);
  if (el) {
    const app = new AppRoot(el);
  }
});
