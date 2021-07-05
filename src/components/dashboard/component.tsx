import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { Icofont } from '@kolibri/lib/';
import { KolButton, KolCard, KolHeading, KolIcofont, KolLink } from '@kolibri/react';
import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { DashboardController } from './controller';

class DashboardComponent extends ReactComponent<RouteComponentProps<any>, {}> implements GenericComponent {
  public ctrl: DashboardController = new DashboardController();

  public state = {};

  public render(): JSX.Element {
    return (
      <>
        <KolHeading>Übersicht</KolHeading>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-2 2xl:grid-cols-3 gap-2">
          <KolCard _headline="Web Component Standard" _hasFooter={false}>
            <div slot="content">
              <p className="pb-1">
                Diese Webanwendung basiert zum größten Teil aus{' '}
                <KolLink _target="mozilla" _href="https://developer.mozilla.org/de/docs/Web/Web_Components">
                  <abbr className="italic font-semibold">Web Components</abbr>
                </KolLink>
                , also sogenannten{' '}
                <KolLink
                  _target="mozilla"
                  _href="https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements"
                >
                  <abbr className="italic font-semibold">Custom Elements</abbr>
                </KolLink>
                . Die Web Components wurden innerhalb einer React-Anwendung wiederverwendet und zu einer Webanwendung
                zusammenfügt. Um die Web Components vor äußeren Einflüssen bestmöglich zu schützen, werden diese im{' '}
                <KolLink
                  _target="mozilla"
                  _href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM"
                >
                  <abbr className="italic font-semibold">Shadow-DOM</abbr>-Modus (EN)
                </KolLink>{' '}
                verwendet.
              </p>
              <p className="py-1">
                Zum Styling der Anwendung wurde der{' '}
                <KolLink _target="tailwindcss" _href="https://tailwindcss.com">
                  <abbr className="italic font-semibold">Tailwindcss</abbr>-Ansatz (EN)
                </KolLink>{' '}
                mittels{' '}
                <KolLink _target="windicss" _href="https://windicss.org">
                  <abbr className="italic font-semibold">WindiCSS</abbr> (EN)
                </KolLink>{' '}
                verwendet.
              </p>
              <p className="pt-1">
                Zum Entwickeln, Testen und Bauen der Anwendung wurde der{' '}
                <KolLink _target="leanupjs" _href="https://leanupjs.org">
                  <abbr className="italic font-semibold">Leanûp</abbr>-Stack (EN)
                </KolLink>{' '}
                verwendet.
              </p>
            </div>
          </KolCard>
          <KolCard _headline="KoliBri - Barrierefreiheit">
            <div slot="content">
              <p className="pb-1">
                <b>
                  "KoliBri" steht für <u>Ko</u>
                  mponenten-Bib
                  <u>li</u>
                  othek für die <u>B</u>
                  ar
                  <u>ri</u>
                  erefreiheit.
                </b>
              </p>
              <p className="pt-1">
                KoliBri sorgt für einen technologischen Durchstich bei der Entwicklung von barrierefreien und
                standardkonformen Komponenten zur Umsetzung von webbasierte Benutzeroberflächen.
                <br />
                Bei der Realisierung wird unter anderem darauf geachtet, dass die Bibliothek{' '}
                <KolLink _target="bitvtest" _href="https://www.bitvtest.de/bitv_test.html">
                  <abbr className="italic font-semibold">BIK BITV</abbr>-Test
                </KolLink>{' '}
                konform ist, den{' '}
                <KolLink _target="w3c" _href="https://www.w3.org/">
                  <abbr className="italic font-semibold">W3C</abbr>-Standard
                </KolLink>{' '}
                einhält, sich an unterschiedliche{' '}
                <KolLink _target="triplecore" _href="https://de.wikipedia.org/wiki/Corporate_Design">
                  <abbr className="italic font-semibold">Coporate Designs</abbr> (CD)
                </KolLink>{' '}
                anpassen lässt und insbesondere eine gute{' '}
                <KolLink _target="triplecore" _href="https://triplecore.io/blog/was-ist-developer-experience/">
                  <abbr className="italic font-semibold">Developer-Experience</abbr> (DX)
                </KolLink>{' '}
                aufweist.
              </p>
            </div>
          </KolCard>
          <KolCard _headline="Ausnahmeantrag erstellen" _hasFooter>
            <div slot="content">
              <p className="pb-1">
                <b>Das Antragsformular dient der Vereinfachung der Ausnahmeantragserstellung.</b>
              </p>
              <p className="pt-1">
                Über das Formular werden alle erforderlichen Angaben zu den Bibliotheken abgefragt und in eine Liste
                übernommen. Abschließend kann ein standardisierter CSV-Export generiert und an die Arbeitsgemeinschaft
                gesendet werden.
              </p>
            </div>
            <div slot="footer">
              <KolButton
                className="content-end"
                _label="Ausnahmeantag erstellen"
                _icon={Icofont['library']}
                _on={{
                  onClick: () => {
                    this.props.history.push('/ausnahmeantrag');
                  },
                }}
              ></KolButton>
            </div>
          </KolCard>
          <KolCard _headline="OpenID Connect" _hasFooter>
            <div slot="content">
              <p className="pb-1">
                <b>
                  OpenID Connect (OIDC) ist eine Authentifizierungsschicht, die auf dem Autorisierungsframework OAuth
                  2.0 basiert.
                </b>
              </p>
              <p className="pt-1">Mit den folgenden Aktionen kann der OpenID-Connect-Mechanismus ausprobiert werden.</p>
            </div>
            <div slot="footer" className="grid grid-cols-1">
              <KolButton
                className="content-end"
                _label="Einloggen*"
                _icon={Icofont['login']}
                _on={{
                  onClick: () => {
                    this.ctrl.login();
                  },
                }}
              ></KolButton>

              <KolButton
                className="content-end"
                _label="Benutzerdaten"
                _icon={Icofont['user']}
                _on={{
                  onClick: () => {
                    this.ctrl.getUser();
                  },
                }}
              ></KolButton>
              <KolButton
                className="content-end"
                _label="Token erneuern"
                _icon={Icofont['refresh']}
                _on={{
                  onClick: () => {
                    this.ctrl.renewToken();
                  },
                }}
              ></KolButton>
              <KolButton
                className="content-end"
                _label="Logout"
                _icon={Icofont['logout']}
                _on={{
                  onClick: () => {
                    console.log(this.ctrl.logout());
                  },
                }}
              ></KolButton>
              <p>
                <small>* Der eingeloggte Nutzer wird nach dem Einloggen oben rechts sichtbar.</small>
              </p>
            </div>
          </KolCard>
        </div>
      </>
    );
  }
}

export const DashboardComponentWithRouter = withRouter(DashboardComponent);
