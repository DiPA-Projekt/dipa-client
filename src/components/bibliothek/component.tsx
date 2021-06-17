import React from 'react';

import { CharBasedInputType, Icofont, OptionBasedInputType } from '@kolibri/lib';
import {
  KolAccordion,
  KolButton,
  KolControlledInput,
  KolDetails,
  KolForm,
  KolHeading,
  KolIndentedText,
  KolModal,
  KolSpin,
  KolToastMessage,
} from '@kolibri/react';
import { InputControl } from '@leanup/form/controls/controls';
import { GenericComponent } from '@leanup/lib/components/generic';
import { ReactComponent } from '@leanup/lib/components/react';

import { KATEGORIE_OPTIONS, SCOPE_OPTIONS, TECHNOLOGIE_OPTIONS } from './bibliothek.form';
import { Bibliothek, BibliothekController } from './controller';

interface State {
  libSubmitDisabled: boolean;
  antragSubmitDisabled: boolean;
  libTouched: boolean;
  showLibSuccessMsg: boolean;
  antragTouched: boolean;
  antragShowModal: boolean;
  showLibRemovedMsg: boolean;
  showAntragFormError: boolean;
  submitLoader: boolean;
}

export class BibliothekComponent extends ReactComponent<unknown, State> implements GenericComponent {
  public ctrl: BibliothekController = new BibliothekController();

  public state = {
    libSubmitDisabled: true,
    antragSubmitDisabled: true,
    libTouched: false,
    showLibSuccessMsg: false,
    antragTouched: false,
    showLibRemovedMsg: false,
    antragShowModal: false,
    showAntragFormError: false,
    submitLoader: false,
  };

  public render(): JSX.Element {
    return (
      <>
        <KolHeading _text="Ausnahmeantrag erstellen"></KolHeading>
        <div className="grid grid-cols-1">
          <KolForm>
            <KolHeading _text="Bibliotheken" _level={2}></KolHeading>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              <KolControlledInput
                _control={this.ctrl.formBibliothek.getControl('kategorie') as InputControl}
                _options={KATEGORIE_OPTIONS}
                _type={OptionBasedInputType.select}
                _touched={this.state.libTouched}
              ></KolControlledInput>
              <KolControlledInput
                _control={this.ctrl.formBibliothek.getControl('scope') as InputControl}
                _options={SCOPE_OPTIONS}
                _type={OptionBasedInputType.select}
                _touched={this.state.libTouched}
              ></KolControlledInput>
              <KolControlledInput
                _control={this.ctrl.formBibliothek.getControl('sprache') as InputControl}
                _options={TECHNOLOGIE_OPTIONS}
                _type={OptionBasedInputType.select}
                _touched={this.state.libTouched}
              ></KolControlledInput>
              <KolControlledInput
                _control={this.ctrl.formBibliothek.getControl('name') as InputControl}
                _type={CharBasedInputType.text}
                _touched={this.state.libTouched}
              ></KolControlledInput>
              <KolControlledInput
                _control={this.ctrl.formBibliothek.getControl('version') as InputControl}
                _type={CharBasedInputType.text}
                _touched={this.state.libTouched}
                _maxlength={5}
              ></KolControlledInput>
              <KolControlledInput
                _control={this.ctrl.formBibliothek.getControl('lizenz') as InputControl}
                _type={CharBasedInputType.text}
                _touched={this.state.libTouched}
              ></KolControlledInput>
              <KolControlledInput
                className="md:col-span-2"
                _control={this.ctrl.formBibliothek.getControl('homepage') as InputControl}
                _type={CharBasedInputType.text}
                _touched={this.state.libTouched}
              ></KolControlledInput>
              <KolControlledInput
                className="md:col-span-2 xl:col-span-3 2xl:col-span-4"
                _control={this.ctrl.formBibliothek.getControl('beschreibung') as InputControl}
                _type={CharBasedInputType['textarea']}
                _touched={this.state.libTouched}
              ></KolControlledInput>
              <KolControlledInput
                className="md:col-span-2 xl:col-span-3 2xl:col-span-4"
                _control={this.ctrl.formBibliothek.getControl('vulnerabilities') as InputControl}
                _type={OptionBasedInputType.checkbox}
                _touched={this.state.libTouched}
              ></KolControlledInput>
              <KolControlledInput
                _control={this.ctrl.formBibliothek.getControl('iban') as InputControl}
                _type={CharBasedInputType.text}
                _touched={this.state.libTouched}
                _maxlength={37}
              ></KolControlledInput>
            </div>
            <div className="my-4">
              <KolButton
                _label="Bibliothek hinzufügen"
                _icon={Icofont['long-arrow-right']}
                _iconAlign="left"
                // _disabled={this.state.libSubmitDisabled}
                _on={{
                  onClick: () => {
                    this.setState({
                      libTouched: true,
                      submitLoader: true,
                    });
                    this.ctrl.formBibliothek.disabled = true;
                    setTimeout(() => {
                      if (this.ctrl.formBibliothek.valid) {
                        this.ctrl.onSubmit();
                        this.setState({
                          libTouched: false,
                          showLibSuccessMsg: true,
                        });
                        setTimeout(() => {
                          this.state.showLibSuccessMsg = false;
                        });
                      }
                      this.setState({
                        submitLoader: false,
                      });
                      this.ctrl.formBibliothek.disabled = false;
                    }, 1000);
                  },
                }}
              ></KolButton>
              {this.state.submitLoader && <KolSpin className="ml-4" />}
            </div>
          </KolForm>
          <KolToastMessage
            _show={this.state.showLibSuccessMsg}
            _type="success"
            _text="Die Bibliothek-Daten wurden erfolgreich hinzugefügt."
          ></KolToastMessage>
          <pre>{JSON.stringify(this.ctrl.formBibliothek.getData(), null, 2)}</pre>
          <KolHeading _text="Ausnahmeantrag erstellen"></KolHeading>
          <KolHeading _level={3} _text="Liste der Bibliotheken"></KolHeading>
          <dl>
            {this.ctrl.list.map((item: Bibliothek, index: number) => {
              return (
                <div key={index}>
                  <dt>{item.name}</dt>
                  <dt>
                    <KolButton
                      _icon={Icofont['edit']}
                      _iconOnly
                      _label="Bearbeiten"
                      // _disabled={this.state.libSubmitDisabled}
                      _on={{
                        onClick: () => {
                          this.ctrl.onEdit(item);
                          this.forceUpdate();
                        },
                      }}
                    ></KolButton>
                    {` `}
                    <KolButton
                      _icon={Icofont['trash']}
                      _iconOnly
                      _label="Entfernen"
                      // _disabled={this.state.libSubmitDisabled}
                      _on={{
                        onClick: () => {
                          this.ctrl.removeItem(item);
                          this.setState({
                            showLibRemovedMsg: true,
                          });
                          setTimeout(() => {
                            this.state.showLibRemovedMsg = false;
                          });
                        },
                      }}
                    ></KolButton>
                  </dt>
                </div>
              );
            })}
          </dl>
          <KolToastMessage
            _show={this.state.showLibRemovedMsg}
            _type="success"
            _text="Die Bibliothek-Daten wurden erfolgreich aus der Liste entfernt."
          ></KolToastMessage>
          {/* <div className="border border-dashed border-pink-500 my-4 p-1">
          <pre className="text-pink-800">
            <b>Hinweis:</b> Die Tabelle ist noch nicht Bestandteil der barrierefreien KoliBri-Bibliothek.
          </pre>
          <table className="w-full border">
            <caption></caption>
            <thead>
              <tr className="border-b bg-gray-700 text-white">
                <th className="py-2">Kategorie</th>
                <th>Technologie</th>
                <th>Bibliothek</th>
                <th>Version</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {this.ctrl.list.map((item: Bibliothek, index: number) => {
                return (
                  <tr className="border-b" key={`lib-${index}`}>
                    <td className="px-2 py-1 text-center">{item.kategorie}</td>
                    <td className="px-2 py-1 text-center">{item.sprache}</td>
                    <td className="px-2 py-1 text-center">
                      <strong>{item.name}</strong>
                    </td>
                    <td className="px-2 py-1 text-center">
                      {item.version ? (
                        <KolTag _icon={Icofont['infinite']} _text={item.version} _color={Farbspektrum.Rot}></KolTag>
                      ) : null}
                    </td>
                    <td className="px-2 py-1 text-center"></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
          <hr className="my-4" />
          <KolForm>
            <KolHeading _level={2} _text="Kopfdaten"></KolHeading>
            <div slot="content" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              <KolControlledInput
                _control={this.ctrl.formKopfdaten.getControl('akz') as InputControl}
                _type={CharBasedInputType.text}
                _touched={this.state.antragTouched}
              ></KolControlledInput>
              <KolControlledInput
                _control={this.ctrl.formKopfdaten.getControl('projekt') as InputControl}
                _type={CharBasedInputType.text}
                _touched={this.state.antragTouched}
              ></KolControlledInput>
              <KolControlledInput
                _control={this.ctrl.formKopfdaten.getControl('ansprechpartner') as InputControl}
                _type={CharBasedInputType.text}
                _touched={this.state.antragTouched}
              ></KolControlledInput>
              <KolControlledInput
                _control={this.ctrl.formKopfdaten.getControl('email') as InputControl}
                _type={CharBasedInputType.text}
                _touched={this.state.antragTouched}
              ></KolControlledInput>
            </div>
            <div className="my-4">
              {this.state.showAntragFormError && (
                <div className="mb-4">
                  <KolToastMessage
                    _type="error"
                    _text="Um einen Antrag generieren zu können, müssen Sie mindestens eine Bibliothek zum Antrag hinzufügen."
                  ></KolToastMessage>
                </div>
              )}
              <KolButton
                _label="Antrag generieren"
                _icon={Icofont['file-excel']}
                _iconAlign="left"
                // _disabled={this.state.disableAntragSubmit}
                _on={{
                  onClick: () => {
                    this.setState({
                      showAntragFormError: false,
                      antragTouched: true,
                      submitLoader: true,
                    });
                    this.ctrl.formKopfdaten.disabled = true;
                    setTimeout(() => {
                      let antragShowModal = this.state.antragShowModal;
                      if (this.ctrl.formKopfdaten.valid && this.ctrl.list.length > 0) {
                        // this.ctrl.genAntrag();
                        this.setState({
                          antragTouched: false,
                        });
                        antragShowModal = true;
                      }
                      console.log(this.ctrl.list.length === 0 && this.state.antragTouched);
                      this.setState({
                        antragShowModal,
                        showAntragFormError: this.ctrl.list.length === 0 && this.state.antragTouched,
                        submitLoader: false,
                      });
                      this.ctrl.formKopfdaten.disabled = false;
                    }, 2500);
                  },
                }}
              ></KolButton>
              {this.state.submitLoader && <KolSpin className="ml-4" />}
            </div>
          </KolForm>
          <pre>{JSON.stringify(this.ctrl.formKopfdaten.getData(), null, 2)}</pre>
          <KolModal
            _show={this.state.antragShowModal}
            _headline="Hinweis"
            _onClose={() => {
              console.log('_onClose');
              this.setState({
                antragShowModal: false,
              });
            }}
          >
            <p slot="content">Die Funktonalität zur Generierung einer Excel-Datei ist noch nicht implementiert.</p>
          </KolModal>
          <KolHeading _level={2} _text="Hilfe"></KolHeading>
          <KolHeading _level={3} _text="Accordeons"></KolHeading>
          <KolAccordion className="mb-4">
            <div slot="header">Accordeon 1</div>
            <div slot="body">...</div>
          </KolAccordion>
          <KolAccordion>
            <div slot="header">Accordeon 2</div>
            <div slot="body">...</div>
          </KolAccordion>
          <KolHeading _level={3} _text="Details"></KolHeading>
          <KolDetails>
            <div slot="summary">Details 1</div>
            <div slot="content">...</div>
          </KolDetails>
          <KolDetails>
            <div slot="summary">Details 2</div>
            <div slot="content">...</div>
          </KolDetails>
          <KolHeading _level={3} _text="Eingerückter Text"></KolHeading>
          <KolIndentedText>Ich bin ein eingerückter Text.</KolIndentedText>
        </div>
      </>
    );
  }
}
