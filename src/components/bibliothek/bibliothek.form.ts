import { FormControl, InputControl } from '@leanup/form';
import { FormatHandler } from '@leanup/form';
import { AbstractFormatter } from '@leanup/form';
import { IbanFormatter } from '@leanup/form';
import { ValidationHandler } from '@leanup/form';
import { AbstractValidator } from '@leanup/form';
import { DigitsValidator } from '@leanup/form';
import { PatternValidator } from '@leanup/form';
import { DEFAULT_REQUIRED_VALIDATOR } from '@leanup/form';

export const KATEGORIE_OPTIONS = [
  {
    value: '',
    label: 'Keine Auswahl',
  },
  {
    value: 'unit-test',
    label: 'Unit-Test',
  },
  {
    value: 'e2e-test',
    label: 'E2E-Test',
  },
  {
    value: 'framework',
    label: 'Framework',
  },
  {
    value: 'lib',
    label: 'Bibliothek',
  },
  {
    value: 'bundler',
    label: 'Bundler',
  },
  {
    value: 'date',
    label: 'Datum',
  },
];

export const SCOPE_OPTIONS = [
  {
    value: '',
    label: 'Keine Auswahl',
  },
  {
    value: 'dev',
    label: 'Entwicklung',
  },
  {
    value: 'test',
    label: 'Test',
  },
  {
    value: 'prod',
    label: 'Produktion',
  },
];

export const TECHNOLOGIE_OPTIONS = [
  {
    value: '',
    label: 'Keine Auswahl',
  },
  {
    value: 'java',
    label: 'Java',
  },
  {
    value: 'js',
    label: 'JavaScript',
  },
  {
    value: 'python',
    label: 'Python',
  },
];

class IbanValidator extends AbstractValidator {
  private readonly regExp = /^[A-Z]{2,2}\d{20,20}$/i;

  public valid(value: any): boolean {
    return this.regExp.test(value);
  }
}

class UpperFormatter extends AbstractFormatter {
  public format(value: unknown): unknown {
    return value;
  }

  public parse(value: unknown): unknown {
    if (typeof value === 'string') {
      value = value.toLocaleUpperCase();
    }
    return value;
  }
}

export class BibliothekForm extends FormControl {
  public constructor() {
    super('bibliothek');
    this.addControl(
      new InputControl('kategorie', {
        label: 'Kategorie',
        mandatory: true,
      })
    );
    this.addControl(
      new InputControl('scope', {
        label: 'Scope',
        mandatory: true,
      })
    );
    this.addControl(
      new InputControl('sprache', {
        label: 'Sprache',
        mandatory: true,
        info: 'z.B. Java, JavaScript usw.',
      })
    );
    this.addControl(
      new InputControl('name', {
        label: 'Name',
        placeholder: 'Spring Cloud',
        mandatory: true,
      })
    );
    this.addControl(
      new InputControl('version', {
        label: 'Major-Version',
        placeholder: '2020',
        mandatory: true,
      })
    );
    this.addControl(
      new InputControl('homepage', {
        label: 'Homepage',
        placeholder: 'https://spring.io/projects/spring-cloud',
        mandatory: true,
      })
    );
    this.addControl(
      new InputControl('vulnerabilities', {
        label: 'Die Bibliothek beinhaltet keine Vulnerabilities.',
      })
    );
    this.addControl(
      new InputControl('lizenz', {
        label: 'Lizenz',
        placeholder: 'Apache-2.0',
        mandatory: true,
      })
    );
    this.addControl(
      new InputControl('beschreibung', {
        label: 'Beschreibung',
      })
    );
    this.addControl(
      new InputControl('iban', {
        label: 'IBAN-Format',
        value: 'DE10100610060500500500',
      })
    );

    const validationHandler = new ValidationHandler();
    validationHandler.validators.add([DEFAULT_REQUIRED_VALIDATOR]);
    this.getControl('kategorie')?.setValidationHandler(validationHandler);
    this.getControl('scope')?.setValidationHandler(validationHandler);
    this.getControl('sprache')?.setValidationHandler(validationHandler);
    this.getControl('name')?.setValidationHandler(validationHandler);
    this.getControl('version')?.setValidationHandler(validationHandler);
    this.getControl('lizenz')?.setValidationHandler(validationHandler);

    const digitValHandler = new ValidationHandler();
    digitValHandler.validators.add([
      DEFAULT_REQUIRED_VALIDATOR,
      new DigitsValidator('Die Version muss eine Zahl sein.'),
    ]);
    this.getControl('version')?.setValidationHandler(digitValHandler);

    const homepageValHandler = new ValidationHandler();
    homepageValHandler.validators.add([
      DEFAULT_REQUIRED_VALIDATOR,
      new PatternValidator(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
      ),
    ]);
    this.getControl('homepage')?.setValidationHandler(homepageValHandler);

    const ibanFormatter = new FormatHandler();
    ibanFormatter.formatters.add([new UpperFormatter(), new IbanFormatter()]);
    (this.getControl('iban') as InputControl).setFormatHandler(ibanFormatter);

    const ibanValidationHandler = new ValidationHandler();
    ibanValidationHandler.validators.add(new IbanValidator('IBAN hat nicht das richtige Format.'));
    (this.getControl('iban') as InputControl)?.setValidationHandler(ibanValidationHandler);
  }
}
