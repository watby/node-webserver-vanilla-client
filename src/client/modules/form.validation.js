import { ValidatorsFactory } from './fields.validation/factory.js';

class FormValidation {
  // _validationItemsArray = [];

  constructor(formElement) {
    this._validationItemsArray = [];

    if (!formElement) {
      throw new Error('form element is not defined');
    }

    formElement.querySelectorAll('[data-validation]').forEach(element => {
      this._validationItemsArray.push(ValidatorsFactory.getItem(element));
    });
  }

  validate() {
    let isValid = true;
    this._validationItemsArray.forEach(item => {
      isValid = !item.validate() ? false : isValid;
    });
    return isValid;
  }
}

export { FormValidation };
