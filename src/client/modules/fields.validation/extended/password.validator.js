import { BaseValidator } from '../base.validator.js';

export class PasswordValidator extends BaseValidator {
  constructor(element) {
    super(element);
  }

  validate() {
    return (
      !this._validationForElementsArray[0].value ||
      !this._validationForElementsArray[1].value ||
      this._validationForElementsArray[0].value ===
        this._validationForElementsArray[1].value
    );
  }
}
