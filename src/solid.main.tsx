import { render } from 'solid-js/web';

import { AppComponent } from './components/app/component';

const htmlDivElement: HTMLDivElement | null = document.querySelector('div#app');
if (htmlDivElement instanceof HTMLDivElement) {
  render(() => <AppComponent />, htmlDivElement);
}
