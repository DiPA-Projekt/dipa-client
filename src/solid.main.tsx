import { Router } from 'solid-app-router';
import { render } from 'solid-js/web';

import { AppComponent } from './components/app/component';

const htmlDivElement: HTMLDivElement | null = document.querySelector('div#app');
if (htmlDivElement instanceof HTMLDivElement) {
  render(
    () => (
      <Router>
        <AppComponent className="" />
      </Router>
    ),
    htmlDivElement
  );
}
