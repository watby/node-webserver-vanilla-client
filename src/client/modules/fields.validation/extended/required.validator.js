import { BaseValidator } from '../base.validator.js';

export class RequiredValidator extends BaseValidator {
  constructor(element) {
    super(element);
  }

  validate() {
    return (
      this._validationForElementsArray[0] &&
      this._validationForElementsArray[0].value.length > 0
    );
  }
}
