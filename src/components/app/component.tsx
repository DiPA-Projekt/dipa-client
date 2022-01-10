import { Component, JSX } from 'solid-js';

import { KolBreadcrumb, KolNav } from '@kolibri/solid';
import { Routes, Route } from 'solid-app-router';
import { DashboardComponent } from '../dashboard/component';

export const AppComponent: Component<JSX.HTMLAttributes<{}>> = () => {
  return (
    <div class="container font-sans">
      <KolNav
        class="block w-auto p-2"
        _ariaLabel=""
        _links={[
          {
            _label: 'Test',
            _icon: 'home',
          },
          { _label: 'Test', _icon: 'inbox', _active: true },
        ]}
        _orientation="horizontal"
      />
      <KolBreadcrumb
        class="block text-sm mx-2 px-1 border-0 border-b-1"
        _ariaLabel=""
        _links={[
          {
            _label: 'Startseite',
          },
        ]}
      />
      <div class="grid grid-cols-2">
        <aside></aside>
        <main>
          <Routes>
            <Route path="/" element={<DashboardComponent />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
