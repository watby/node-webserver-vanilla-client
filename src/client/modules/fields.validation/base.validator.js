export class BaseValidator {
  // _validationElement;
  // _validationType;
  // _validationForElementsArray = [];
  // _isValid;

  constructor(validationElement) {
    this._validationForElementsArray = [];
    this._validationElement = validationElement;
    this._validationType = validationElement.dataset.validationType;
    this._validationForElementsArray = this._validationElement.dataset.validationFor
      .split(',')
      .map(validationForItem => {
        return this._validationElement
          .closest('form')
          .querySelector(`[name=${validationForItem}]`);
      });
    this.initEventHandler();
  }

  initEventHandler() {
    this._validationForElementsArray.forEach(element => {
      element.addEventListener('blur', () => {
        const isValid = this.validate();
        if (isValid) {
          this.hideErrorMessage();
        } else {
          this.showErrorMessage();
        }
      });
    });
  }

  showErrorMessage() {
    this._validationElement.classList.remove('hidden');
  }

  hideErrorMessage() {
    this._validationElement.classList.add('hidden');
  }
}
