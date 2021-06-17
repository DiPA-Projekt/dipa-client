import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { AppComponentWithRouter } from './components/app/component';

const htmlDivElement: HTMLDivElement | null = document.querySelector('div#app');
if (htmlDivElement instanceof HTMLDivElement) {
  ReactDOM.render(
    <Router>
      <AppComponentWithRouter />
    </Router>,
    htmlDivElement
  );
}
