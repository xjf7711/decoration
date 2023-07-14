import { fromEvent } from 'rxjs';
import { AppRoot } from './app-root';
import './styles/index.scss';
fromEvent(document, 'DOMContentLoaded').subscribe(e => {
  // console.log('document DOMContentLoaded, e is ', e);
  const el = document.querySelector('#app-ref') as HTMLElement;
  console.log('el is ', el);
  if (el) {
    const app = new AppRoot(el);
  }
});
