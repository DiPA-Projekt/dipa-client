import { Component } from 'solid-js';

import { KolBreadcrumb, KolNav } from '@kolibri/solid';

import { AppController } from './controller';

export const AppComponent: Component = () => {
  const ctrl = new AppController();
  return (
    <div className="container m-0 p-0 font-sans">
      <div className="w-auto p-2">
        <KolNav
          _links={[
            {
              _label: 'Test',
              _icon: 'home',
            },
            { _label: 'Test', _icon: 'inbox', _active: true },
          ]}
          _orientation="horizontal"
        />
      </div>
      <div className="mx-2 border-0 border-y-1">
        <KolBreadcrumb
          _ariaLabel=""
          _links={[
            {
              _label: 'Startseite',
            },
          ]}
        />
      </div>
    </div>
  );
};
