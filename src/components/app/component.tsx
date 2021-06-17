import { User } from 'oidc-client';
import React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';

import { Icofont } from '@kolibri/lib';
import {
  KolControlledBreadcrumb,
  KolControlledNav,
  KolControlledSkipNav,
  KolIcofont,
  KolLink,
  KolTag,
  KolVersion,
} from '@kolibri/react';
import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';
import { DI } from '@leanup/lib/helpers/injector';

import packageJson from '../../../package.json';
import { OIDCService } from '../../services/oidc/service';
import { BibliothekComponent } from '../bibliothek/component';
import { DashboardComponentWithRouter } from '../dashboard/component';
import { ShowCaseComponent } from '../showcase/component';
import { AppController } from './controller';

interface State {
  user: User | null;
}

class AppComponent extends ReactComponent<RouteComponentProps<any>, State> implements GenericComponent {
  private readonly oidcService: OIDCService = DI.get<OIDCService>('OIDCService');

  public ctrl: AppController = new AppController();
  public state: State = {
    user: null,
  };

  public constructor(props: Props) {
    super(props);
    this.oidcService.$user.subscribe({
      next: (user: User | null) => {
        this.setState({
          user: user,
        });
      },
    });
    this.state = {
      user: this.oidcService.getUser(),
    };
  }

  public componentDidMount() {
    this.props.history.listen((location) => {
      console.log(location);
      this.forceUpdate();
    });
  }

  public render(): JSX.Element {
    const crumbs = [
      {
        label: 'Startseite',
        urlSegment: '',
      },
    ];
    if (this.props.location.pathname === '/ausnahmeantrag') {
      crumbs.push({
        label: 'Ausnahmeantrag erstellen',
        urlSegment: 'ausnahmeantrag',
      });
    }

    return (
      <div className="font-sans h-full w-full min-w-64">
        <KolControlledSkipNav
          style={{
            zIndex: 9999999,
            position: 'absolute',
            width: ' 100%',
            display: 'block',
          }}
          _points={[
            {
              label: 'Hauptnavigation',
              urlPath: '#navigation',
            },
            {
              label: 'Inhalt',
              urlPath: '#inhalt',
            },
          ]}
        ></KolControlledSkipNav>
        <header className="bg-primary shadow-md">
          <div className="container m-auto grid grid-cols-3">
            <nav className="col-span-2 md:col-span-1">
              <ul className="flex content-center text-lg text-white">
                <li className="px-4 py-2 border-t-4 border-transparent hover:border-white">
                  <KolLink _href="#/" _useCase="image" _title="Zur Startseite">
                    <KolIcofont _icon={Icofont['home']} />
                  </KolLink>
                </li>
                <li className="px-4 py-2 border-t-4 border-transparent hover:border-white">
                  <KolLink _href="#/">
                    <KolIcofont _icon={Icofont['direction-sign']} />
                    &#160;Intranet
                  </KolLink>
                </li>
                {/* <li className="px-4 py-2 border-t-4 border-transparent hover:border-white">
                  <KolLink _href="#/">
                    <KolIcofont _icon={Icofont['site-map']} />
                    &#160;Standards
                  </KolLink>
                </li> */}
                {/* <li className="px-4 py-2 border-t-4 border-transparent hover:border-white">
                  <KolLink _href="#/">
                    <KolIcofont _icon={Icofont['pixels']} />
                    &#160;Anwendungen
                  </KolLink>
                </li> */}
              </ul>
            </nav>
            <div className="p-4 text-center">
              <KolTag _text="Demo"></KolTag>
            </div>{' '}
            {this.state.user !== null && (
              <div className="col-span-3 md:col-span-1 text-white md:pt-3 mr-4">
                <div className="float-right mr-4">
                  <span className="inline-block py-1 mr-2">
                    Angemeldet als{' '}
                    <b>
                      {this.state.user.profile.given_name} {this.state.user.profile.family_name}
                    </b>
                  </span>
                  <KolLink
                    className="float-right"
                    onClick={() => {
                      this.oidcService
                        .logout()
                        .then(() => {})
                        .catch(() => {});
                    }}
                    _useCase="image"
                    _title="Abmelden"
                  >
                    <KolIcofont _icon={Icofont['logout']} style={{ fontSize: '125%' }}></KolIcofont>
                  </KolLink>
                </div>
              </div>
            )}
          </div>
        </header>
        <div className="w-full p-2 mb-2 flex border-b border-gray-200">
          <KolControlledBreadcrumb _crumbs={crumbs}></KolControlledBreadcrumb>
        </div>
        <main className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
          <aside className="bg-gray-100 shadow-md col-span-1">
            <div className="p-1 border-b border-gray-200 text-center" role="banner">
              <img className="m-auto" width="50%" src="assets/dipa.logo.jfif" alt="DiPA-Logo" />
              {/* <KolLogo
                _text={Bundesanstalt['Informationstechnikzentrum Bund']}
                className="block w-3/5 md:w-4/5 m-auto p-5"
              ></KolLogo> */}
            </div>
            <div role="navigation" id="navigation">
              <KolControlledNav
                style={{
                  whiteSpace: 'nowrap',
                }}
                _accentAlign="right"
                _links={[
                  {
                    label: 'Übersicht',
                    url: '#/',
                    active: this.props.location.pathname === '/',
                  },
                  {
                    label: 'Ausnahmeantrag erstellen',
                    url: '#/ausnahmeantrag',
                    active: this.props.location.pathname === '/ausnahmeantrag',
                  },
                  // {
                  //   label: 'Show-Case',
                  //   url: '#/showcase',
                  //   active: /showcase$/.test(location.hash),
                  // },
                  // {
                  //   label: 'JavaAG-Homepage',
                  //   url: 'https://sp.vzd.zivb.net/sites/80B8/_layouts/OneNote.aspx?id=%2Fsites%2F80B8%2FArchitekturboard%2FJava%20AG',
                  //   target: 'javaag',
                  // },
                  // {
                  //   label: 'KoliBri-Homepage',
                  //   url: 'https://confluence.swlm.zd.in.bund.de/display/KSB/KoliBri+-+Komponenten-Bibliothek+zur+Barrierefreiheit',
                  //   target: 'kolibri',
                  // },
                  // {
                  //   label: 'WindiCSS',
                  //   url: 'https://windicss.org',
                  //   target: 'windicss',
                  // },
                  // {
                  //   label: 'Leanûp-Stack',
                  //   url: 'https://leanupjs.org',
                  //   target: 'leanup',
                  // },
                ]}
              ></KolControlledNav>
            </div>
          </aside>
          <div className="px-2 sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 2xl:col-span-5" id="inhalt">
            <Switch>
              <Route exact path="/">
                <DashboardComponentWithRouter />
              </Route>
              <Route exact path="/ausnahmeantrag">
                <BibliothekComponent />
              </Route>
              <Route exact path="/showcase">
                <ShowCaseComponent />
              </Route>
            </Switch>
          </div>
        </main>
        <footer className="container m-auto text-center border-t my-10 p-4">
          <KolIcofont className="text-gray-500 my-2 block" _icon={Icofont['woodpecker']} _zoom={500}></KolIcofont>
          <KolVersion _version={packageJson.version}></KolVersion>
          {/* <p className="block my-4">© Informationstechnikzentrum Bund, 2021</p> */}
          <p className="block my-4">© Martin Oppitz, 2021</p>
        </footer>
      </div>
    );
  }
}

export const AppComponentWithRouter = withRouter(AppComponent);
