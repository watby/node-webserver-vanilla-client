import { RequiredValidator } from './extended/required.validator.js';
import { SelectValidator } from './extended/select.validator.js';
import { PasswordValidator } from './extended/password.validator.js';

export class ValidatorsFactory {
  static getItem(element) {
    switch (element.dataset.validationType) {
      case 'required':
        return new RequiredValidator(element);
      case 'select':
        return new SelectValidator(element);
      case 'password':
        return new PasswordValidator(element);
      default:
        throw new Error('validation type is not recognized');
    }
  }
}
