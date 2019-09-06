import { Form } from './form.js';

function onFormSubmit({ title, values }) {
  console.clear();
  console.log(`%c Message from the form '${title}' is being sent...`, 'color: green');
  console.log('form values:', values);
}

function onFormReject({ title }) {
  console.clear();
  console.log(
    `%c Message from the form '${title}' cannot be sent because the form is NOT VALID, check form values and try again...`,
    'color: blue'
  );
}

const FORM_SELECTOR = 'message-form';

export class MessageForm {
  init() {
    new Form(FORM_SELECTOR).init(onFormSubmit, onFormReject);
  }
}
