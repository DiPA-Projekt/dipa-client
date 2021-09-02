import { FormControl, InputControl } from '@leanup/form';
import { ValidationHandler } from '@leanup/form';
import { EmailValidator } from '@leanup/form';
import { DEFAULT_REQUIRED_VALIDATOR } from '@leanup/form';

export class KopfdatenForm extends FormControl {
  public constructor() {
    super('kopfdaten');
    this.addControl(
      new InputControl('akz', {
        label: 'AKZ',
        mandatory: true,
      })
    );
    this.addControl(
      new InputControl('projekt', {
        label: 'Projektbezeichnung',
        mandatory: true,
      })
    );
    this.addControl(
      new InputControl('ansprechpartner', {
        label: 'Ansprechpartner',
        mandatory: true,
      })
    );
    this.addControl(
      new InputControl('email', {
        label: 'E-Mail-Adresse',
        mandatory: true,
        value: 'info@',
      })
    );

    const validationHandler = new ValidationHandler();
    validationHandler.validators.add([DEFAULT_REQUIRED_VALIDATOR]);
    this.getControl('akz')?.setValidationHandler(validationHandler);
    this.getControl('projekt')?.setValidationHandler(validationHandler);
    this.getControl('ansprechpartner')?.setValidationHandler(validationHandler);

    const eMailValidationHandler = new ValidationHandler();
    eMailValidationHandler.validators.add([DEFAULT_REQUIRED_VALIDATOR, new EmailValidator()]);
    this.getControl('email')?.setValidationHandler(eMailValidationHandler);
  }
}
