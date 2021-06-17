import React, { useState } from 'react';

import { Bundesanstalt, CharBasedInputType, Farbspektrum, Icofont, OptionBasedInputType } from '@kolibri/lib';
import {
  KolAccordion,
  KolButton,
  KolColor,
  KolControlledBreadcrumb,
  KolControlledInput,
  KolControlledNav,
  KolControlledSkipNav,
  KolDetails,
  KolForm,
  KolHeading,
  KolIcofont,
  KolLink,
  KolLogo,
  KolMessage,
  KolModal,
  KolTable,
  KolTag,
  KolVersion,
} from '@kolibri/react';
import { FormControl, InputControl } from '@leanup/form/controls/controls';
import { ValidationHandler } from '@leanup/form/handlers/validation.handler';
import { EmailValidator } from '@leanup/form/handlers/validators/email.validator';
import { NonRequiredValidator } from '@leanup/form/handlers/validators/non-required.validator';
import { DEFAULT_REQUIRED_VALIDATOR } from '@leanup/form/handlers/validators/required.validator';
import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { ShowCaseController } from './controller';

// const DATA = {
//   ansprache: {
//     anrede: null,
//     vorname: '',
//     nachname: '',
//   },
//   alter: null,
// };
// const FORM = FormFactory.createForm('demo', DATA);

type ValidateFunction = (value: any) => boolean;

class DuplicateNameValidator extends NonRequiredValidator {
  private validateFunction: ValidateFunction = () => true;

  public constructor(validateFunction: ValidateFunction, message: string) {
    super(message);
    this.validateFunction = validateFunction;
  }

  public validate(value: any): boolean {
    return this.validateFunction(value);
  }
}

const ANREDE = new InputControl('anrede', {
  label: 'Anrede',
});
const VORNAME = new InputControl('vorname', {
  label: 'Vorname',
  mandatory: true,
  info: 'Geben Sie einfach Ihren Vornamen ein.',
});
const NACHNAME = new InputControl('nachname', {
  label: 'Nachname',
  mandatory: false,
});
const ALTER = new InputControl('alter', {
  label: 'Alter',
});
const EMAIL = new InputControl('email', {
  label: 'E-Mail',
});
const PASSWORT = new InputControl('passwort', {
  label: 'Passwort',
});
const GEBURTSTAG = new InputControl('geburtstag', {
  label: 'Geburtstag',
});
const MODUS = new InputControl('modus', {
  label: 'Modus',
});
const AGB = new InputControl('agb', {
  label: '',
});
const FORM = new FormControl('form');
FORM.addConrol(ANREDE);
FORM.addConrol(VORNAME);
FORM.addConrol(NACHNAME);
FORM.addConrol(ALTER);
FORM.addConrol(EMAIL);
FORM.addConrol(PASSWORT);
FORM.addConrol(GEBURTSTAG);
FORM.addConrol(MODUS);
FORM.addConrol(AGB);

const VORNAME_VALIDATION_HANDLER = new ValidationHandler();
VORNAME_VALIDATION_HANDLER.validators.add(DEFAULT_REQUIRED_VALIDATOR);
VORNAME.setValidationHandler(VORNAME_VALIDATION_HANDLER);

const EMAIL_VALIDATION_HANDLER = new ValidationHandler();
EMAIL_VALIDATION_HANDLER.validators.add([DEFAULT_REQUIRED_VALIDATOR, new EmailValidator()]);
EMAIL.setValidationHandler(EMAIL_VALIDATION_HANDLER);

interface Name {
  name: string;
  color: Farbspektrum;
}

const FARBEN = Object.getOwnPropertyNames(Farbspektrum);

function Liste(): JSX.Element {
  const [names, setNames] = useState<Name[]>([
    {
      name: 'Ulla',
      color: Farbspektrum.Oliv,
    },
    {
      name: 'Sandra',
      color: Farbspektrum.Violett,
    },
    {
      name: 'Christian',
      color: Farbspektrum.Dunkelblau,
    },
    {
      name: 'Dirk',
      color: Farbspektrum.Dunkelrot,
    },
  ]);

  const [modal, setModal] = useState<boolean>(false);

  const randomIndex = Math.round(FARBEN.length * Math.random());

  VORNAME_VALIDATION_HANDLER.validators.add([
    new DuplicateNameValidator((value: string): boolean => {
      const find = names.find((name: Name) => name.name === value);
      if (find !== undefined) {
        return false;
      }
      return true;
    }, `Der eingegebene Vorname ist schon vorhanden.`),
  ]);

  return (
    <>
      {names.map((name: Name, index: number) => {
        return <KolTag key={index} className="my-4 mr-2" _color={name.color} _text={`Hallo ${name.name}!`}></KolTag>;
      })}
      {/* <KolTag className="my-4 mr-2" _color={Farbspektrum['Oliv']} _text="Hallo Christian!"></KolTag>
        <KolTag className="my-4 mr-2" _color={Farbspektrum['Türkis']} _text="Hallo Ulla!"></KolTag>
        <KolTag className="my-4" _color={Farbspektrum['Violett']} _text="Hallo Sandra!"></KolTag> */}
      <br />
      <br />
      <KolForm>
        <KolControlledInput _control={ANREDE} _type={CharBasedInputType.text}></KolControlledInput>
        <KolControlledInput _control={VORNAME} _type={CharBasedInputType.text}></KolControlledInput>
        <KolControlledInput _control={NACHNAME} _type={CharBasedInputType.text}></KolControlledInput>
        <KolControlledInput _control={ALTER} _type={CharBasedInputType.number}></KolControlledInput>
        <KolControlledInput _control={EMAIL} _type={CharBasedInputType.email}></KolControlledInput>
        <KolControlledInput _control={PASSWORT} _type={CharBasedInputType.password}></KolControlledInput>
        <KolControlledInput _control={GEBURTSTAG} _type={CharBasedInputType.date}></KolControlledInput>
        <KolControlledInput _control={MODUS} _type={OptionBasedInputType.select}></KolControlledInput>
        <KolControlledInput _control={AGB} _type={OptionBasedInputType.checkbox}></KolControlledInput>
        <div className="font-sans flex flex-wrap mb-2">
          <div className="w-full md:w-1/4 md:text-right pt-1 mb-2"></div>
          <div className="w-full md:w-3/4 mb-2">
            <KolButton
              _type="submit"
              _icon={Icofont['ui-add']}
              _text="Hinzufügen"
              _on={{
                onClick: () => {
                  if (FORM.valid) {
                    names.push({
                      name: VORNAME.value as string,
                      color: Farbspektrum['Dunkelblau'],
                    });
                    setNames([]);
                    setNames(names);
                    VORNAME.value = '';
                  } else {
                    setModal(true);
                  }
                },
              }}
            ></KolButton>
          </div>
        </div>
        <div className="w-full md:w-1/4 md:text-right pt-1 mb-2"></div>
      </KolForm>
      <KolModal
        _show={modal}
        _headline="Formulareingaben fehlerhaft"
        _onClose={() => {
          setModal(false);
        }}
      >
        <p>
          Das Formular enthält noch ungültige Eingaben. Bitte prüfen Sie ihre Eingaben und versuchen Sie es anschließend
          erneut.
        </p>
      </KolModal>
    </>
  );
}

export class ShowCaseComponent extends ReactComponent<unknown, ShowCaseController> implements GenericComponent {
  public ctrl: ShowCaseController = new ShowCaseController();

  public render(): JSX.Element {
    return (
      <div className="container mx-auto px-4">
        <KolControlledSkipNav
          _points={[
            {
              label: 'Inhalt',
              urlPath: 'hallo',
            },
            {
              label: 'Hauptmenü',
              urlPath: 'hallo',
              target: 'wo-anders',
            },
            {
              label: 'Suche',
              urlPath: 'hallo',
            },
          ]}
        ></KolControlledSkipNav>
        <KolControlledSkipNav
          _points={[
            {
              label: 'Inhalt',
              urlPath: 'hallo',
            },
            {
              label: 'Hauptmenü',
              urlPath: 'hallo',
              target: 'wo-anders',
            },
            {
              label: 'Suche',
              urlPath: 'hallo',
            },
          ]}
        ></KolControlledSkipNav>
        <header className="w-full grid-cols-2 content-center border-b shadow-b-sm pt-4 px-4">
          <KolLink _href="https://itzbund.de" _useCase="image" _target="_blank">
            <KolLogo
              _text={Bundesanstalt['Informationstechnikzentrum Bund']}
              className="block"
              style={{
                width: '150px',
              }}
            ></KolLogo>
          </KolLink>
          <KolLink
            className="float-right"
            _href="https://confluence.swlm.zd.in.bund.de/display/KSB/KoliBri+-+Komponenten-Bibliothek+zur+Barrierefreiheit"
            _useCase="image"
            _target="_blank"
          >
            <KolIcofont _icon={Icofont['woodpecker']} _color="#00828C" _zoom={400}></KolIcofont>
          </KolLink>
        </header>
        <KolControlledNav
          _links={[
            {
              label: 'Menüpunkt 1',
            },
            {
              label: 'Menüpunkt 2',
              children: [
                {
                  label: 'Menüpunkt 2.1',
                  children: [
                    {
                      label: 'Menüpunkt 2.1.1',
                      target: 'wo-anders',
                    },
                    {
                      label: 'Menüpunkt 2.1.2',
                    },
                  ],
                },
                {
                  label: 'Menüpunkt 2.2',
                },
              ],
            },
          ]}
        ></KolControlledNav>
        <KolControlledBreadcrumb
          className="w-full p-2 mb-2 block float-left"
          _crumbs={[
            {
              label: 'Startseite',
              urlSegment: '',
            },
            {
              label: 'Unterseite der Startseite',
              urlSegment: 'unterseite',
              target: 'wo-anders',
            },
            {
              label: 'Unterseite der Unterseite',
              urlSegment: 'unterseite',
            },
          ]}
        ></KolControlledBreadcrumb>
        <main className="mx-2">
          <KolHeading _text="KoliBri Show-Case"></KolHeading>
          <KolDetails>
            <div slot="summary">KolMessage</div>
            <div slot="content" className="grid gap-2 grid-cols-2">
              <div>
                {['success', 'info', 'warning', 'error'].map((messageType: string, index: number) => (
                  <div className="block mb-2" key={`1-${index}`}>
                    <KolMessage
                      className="mb-2"
                      _heading="It's sunrise time"
                      _text="Ich wünsche Euch viel Spaß beim Ausprobieren der @itzbund/kolibri Komponenten-Bibliothek!"
                      _type={messageType as 'success' | 'info' | 'warning' | 'error'}
                    ></KolMessage>
                  </div>
                ))}
              </div>
              <div>
                {['success', 'info', 'warning', 'error'].map((messageType: string, index: number) => (
                  <div className="block mb-2" key={`1-${index}`}>
                    <KolMessage
                      className="mb-2"
                      _text="Ich wünsche Euch viel Spaß beim Ausprobieren der @itzbund/kolibri Komponenten-Bibliothek!"
                      _type={messageType as 'success' | 'info' | 'warning' | 'error'}
                    ></KolMessage>
                  </div>
                ))}
              </div>
            </div>
          </KolDetails>
          <KolAccordion>
            <div slot="header">Eingabefelder</div>
            <div slot="body">
              <Liste></Liste>
            </div>
          </KolAccordion>
          <KolDetails>
            <div slot="summary">KolTable</div>
            <div slot="content">
              <KolTable _caption=""></KolTable>
            </div>
          </KolDetails>
          {/* <KolDetails>
            <div slot="summary">KolModal</div>
            <div slot="content">
              <KolModal _headline="Test" _show={true}>
                KolModal
              </KolModal>
            </div>
          </KolDetails> */}
          <KolDetails>
            <div slot="summary">Interaktives Farbspektrum</div>
            <div slot="content">
              <KolColor className="inline-block"></KolColor>
            </div>
          </KolDetails>
        </main>
        {/* <aside className="bg-purple-200 w-40 h-auto ml-2 border-purple-400 border-l">...</aside> */}
        <footer className="text-center mb-10 p-4">
          <p className="block mb-4">© Informationstechnikzentrum Bund, 2021</p>
          <KolVersion _version="1.0.0-beta.0"></KolVersion>
        </footer>
        <KolTable _caption=""></KolTable>
        {/* <KolModal _show={true}>asdasd</KolModal> */}
      </div>
    );
  }
}
