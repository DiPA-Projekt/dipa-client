import { InputControl } from '@leanup/form';
import { AbstractController } from '@leanup/lib';

import { BibliothekForm } from './bibliothek.form';
import { KopfdatenForm } from './kopfdaten.form';

export interface Bibliothek {
  kategorie: string;
  scope: string;
  sprache: string;
  version: string;
  name: string;
  lizenz: string;
  beschreibung: string;
  homepage: string;
  vulnerabilities: string;
}

export class BibliothekController extends AbstractController {
  public readonly formKopfdaten = new KopfdatenForm();
  public readonly formBibliothek = new BibliothekForm();
  public readonly list: Bibliothek[] = [];

  public constructor() {
    super({});
    try {
      const list = JSON.parse(localStorage.getItem('list') ?? '') as Bibliothek[];
      if (Array.isArray(list)) {
        this.list = list;
      }
    } catch (e) {}
  }

  public onSubmit = (): void => {
    this.list.push(this.formBibliothek.getData() as Bibliothek);
    (this.formBibliothek.getControl('kategorie') as InputControl).value = null;
    (this.formBibliothek.getControl('scope') as InputControl).value = null;
    (this.formBibliothek.getControl('sprache') as InputControl).value = null;
    (this.formBibliothek.getControl('name') as InputControl).value = null;
    (this.formBibliothek.getControl('version') as InputControl).value = null;
    (this.formBibliothek.getControl('lizenz') as InputControl).value = null;
    (this.formBibliothek.getControl('beschreibung') as InputControl).value = null;
    (this.formBibliothek.getControl('homepage') as InputControl).value = null;
    (this.formBibliothek.getControl('vulnerabilities') as InputControl).value = null;
    localStorage.setItem('list', JSON.stringify(this.list));
  };

  public onEdit = (lib: Bibliothek): void => {
    (this.formBibliothek.getControl('kategorie') as InputControl).value = lib.kategorie;
    (this.formBibliothek.getControl('scope') as InputControl).value = lib.scope;
    (this.formBibliothek.getControl('sprache') as InputControl).value = lib.sprache;
    (this.formBibliothek.getControl('name') as InputControl).value = lib.name;
    (this.formBibliothek.getControl('version') as InputControl).value = lib.version;
    (this.formBibliothek.getControl('lizenz') as InputControl).value = lib.lizenz;
    (this.formBibliothek.getControl('beschreibung') as InputControl).value = lib.beschreibung;
    (this.formBibliothek.getControl('homepage') as InputControl).value = lib.homepage;
    (this.formBibliothek.getControl('vulnerabilities') as InputControl).value = lib.vulnerabilities;
  };

  public removeItem = (item: Bibliothek): void => {
    const index = this.list.indexOf(item);
    if (index >= 0) {
      this.list.splice(index, 1);
    }
    localStorage.setItem('list', JSON.stringify(this.list));
  };
}
