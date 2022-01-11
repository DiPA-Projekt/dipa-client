import { Component, JSX } from 'solid-js';

import { KolBreadcrumb, KolNav } from '@kolibri/solid';
import { Routes, Route } from 'solid-app-router';
import { DashboardComponent } from '../dashboard/component';

export const AppComponent: Component<JSX.HTMLAttributes<{}>> = () => {
  return (
    <div class="container font-sans grid gap-2">
      <div class="grid grid-cols-2 bg-#326cae px-1 justify-center item-center ">
        <KolNav
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
        <div class="text-xs py-1.5      ">
          <KolNav
            class="inline-block float-right"
            _ariaLabel=""
            _links={[
              {
                _label: 'Hilfe',
                _iconOnly: true,
                _icon: 'question',
              },
              {
                _label: 'Abmelden',
                _icon: 'logout',
                _iconOnly: true,
              },
            ]}
            _orientation="horizontal"
          />
        </div>
      </div>
      <div class="px-0.5 border-0 border-b-1 border-gray-400">
        <KolBreadcrumb
          class="block text-sm px-1"
          _ariaLabel=""
          _links={[
            {
              _label: 'Startseite',
            },
          ]}
        />
      </div>
      <div class="grid grid-cols-[auto_2fr] border">
        <aside class="bg-#326cae"></aside>
        <main class="px-1">
          <Routes>
            <Route path="/" element={<DashboardComponent />} />
          </Routes>
        </main>
      </div>
      <div class="fixed bottom-0 p-1 text-center w-100% border-0 border-t-1 border-gray-400">Copyright 2022</div>
    </div>
  );
};
