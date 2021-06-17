import { FormControl, InputControl } from '@leanup/form/controls/controls';
import { ValidationHandler } from '@leanup/form/handlers/validation.handler';
import { EmailValidator } from '@leanup/form/handlers/validators/email.validator';
import { DEFAULT_REQUIRED_VALIDATOR } from '@leanup/form/handlers/validators/required.validator';

export class KopfdatenForm extends FormControl {
  public constructor() {
    super('kopfdaten');
    this.addConrol(
      new InputControl('akz', {
        label: 'AKZ',
        mandatory: true,
      })
    );
    this.addConrol(
      new InputControl('projekt', {
        label: 'Projektbezeichnung',
        mandatory: true,
      })
    );
    this.addConrol(
      new InputControl('ansprechpartner', {
        label: 'Ansprechpartner',
        mandatory: true,
      })
    );
    this.addConrol(
      new InputControl('email', {
        label: 'E-Mail-Adresse',
        mandatory: true,
        value: 'info@',
      })
    );

    const validationHandler = new ValidationHandler();
    validationHandler.validators.add([DEFAULT_REQUIRED_VALIDATOR]);
    this.getControl('akz').setValidationHandler(validationHandler);
    this.getControl('projekt').setValidationHandler(validationHandler);
    this.getControl('ansprechpartner').setValidationHandler(validationHandler);

    const eMailValidationHandler = new ValidationHandler();
    eMailValidationHandler.validators.add([DEFAULT_REQUIRED_VALIDATOR, new EmailValidator()]);
    this.getControl('email').setValidationHandler(eMailValidationHandler);
  }
}
