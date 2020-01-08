import {createElement, styleElement} from '../dom-utils';

const styles = {
  backgroundColor: '#333',
  display: 'flex',
  flexDirection: 'column',
  width: 'max-content',
  padding: '16px',
  border: '2px solid aqua',
};

const exampleFieldWrapperStyles = {
  display: 'flex',
  margin: '4px',
};

const exampleField = example => {
  // Wrapper
  const wrapper = createElement();
  styleElement(wrapper, exampleFieldWrapperStyles);

  // Field
  const field = createElement('textarea', example);

  // Button
  const button = createElement('button', '-');
  button.addEventListener('click', () => wrapper.remove());

  wrapper.appendChild(field);
  wrapper.appendChild(button);
  return wrapper;
};

const Form = ({word = '', meaning = '', examples = ['']}, onSubmit) => {
  // Form
  const form = createElement('form.washoe-form');
  styleElement(form, styles);
  form.addEventListener('submit', onSubmit);

  // Word
  const wordField = createElement('input');
  wordField.value = word.trim();

  // Meaning
  const meaningField = createElement('textarea', meaning);

  //Examples
  const examplesArea = createElement('div');
  examples.map(exampleField).forEach(el => examplesArea.appendChild(el));

  // Add Button
  const addButton = createElement('button', '+');
  addButton.addEventListener('click', () => {
    const newExampleField = exampleField('');
    setTimeout(() => newExampleField.querySelector('textarea').focus(), 0);
    examplesArea.appendChild(newExampleField);
  });

  // Submit
  const submit = createElement('input');
  submit.type = 'submit';

  [wordField, meaningField, examplesArea, addButton, submit].forEach(field =>
    form.appendChild(field),
  );

  return form;
};

export default Form;
