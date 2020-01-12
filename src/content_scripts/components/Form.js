import {createElement, styleElement} from '../dom-utils';

const styles = {
  backgroundColor: '#2a2a2e',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
};

const fieldStyles = {
  border: '1px solid rgba(249,249,250,0.2)',
  borderRadius: '2px',
  backgroundColor: '#202023',
  color: 'rgb(249, 249, 250)',
  padding: '5px 8px',
  width: '100%',
  resize: 'none',
  boxSizing: 'border-box',
};
const fieldStylesOnHover = {
  border: '1px solid #0a84ff',
  boxShadow: '0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3)',
};

const exampleFieldWrapperStyles = {
  display: 'flex',
};

const buttonStyles = {
  backgroundColor: 'rgba(249,249, 250, 0.1)',
  color: 'rgb(249,249,250)',
  border: 'none',
  height: '32px',
};
const buttonStylesOnHover = {
  backgroundColor: 'rgba(249,249, 250, 0.15)',
};

const removeExampleButtonStyles = {
  alignSelf: 'center',
  width: '54px',
  height: '54px',
};

const labelStyles = {
  color: 'rgb(249,249,250)',
  display: 'block',
  margin: '8px 0 4px 0',
};

const exampleField = example => {
  // Wrapper
  const wrapper = createElement();
  styleElement(wrapper, {...exampleFieldWrapperStyles, marginBottom: '4px'});

  // Field
  const field = createElement('textarea', example);
  styleElement(field, fieldStyles);

  // Button
  const button = createElement('button', '-');
  styleElement(button, buttonStyles);
  styleElement(button, removeExampleButtonStyles);
  button.type = 'button';
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
  form.addEventListener('keydown', event => {
    ((event.ctrlKey && event.keyCode == 219) || event.keyCode == 27) && // Remove Form on Ctrl + [ or on Esc
      (event.preventDefault(), form.remove());
  });

  // Word
  const wordField = createElement('input');
  styleElement(wordField, fieldStyles);
  wordField.value = word.trim();

  // Meaning
  const meaningFieldWrapper = createElement();
  const meaningField = createElement('textarea', meaning);
  styleElement(meaningField, fieldStyles);
  const meaningLabel = createElement('label', 'Meaning');
  styleElement(meaningLabel, labelStyles);
  meaningFieldWrapper.appendChild(meaningLabel);
  meaningFieldWrapper.appendChild(meaningField);

  //Examples
  const examplesArea = createElement('div');
  const examplesLabel = createElement('label', 'Examples');
  styleElement(examplesLabel, labelStyles);
  examplesArea.appendChild(examplesLabel);
  examples.map(exampleField).forEach(el => examplesArea.appendChild(el));

  // Add Button
  const addButton = createElement('button', '+');
  addButton.type = 'button';
  styleElement(addButton, buttonStyles);
  addButton.addEventListener('click', () => {
    const newExampleField = exampleField('');
    setTimeout(() => newExampleField.querySelector('textarea').focus(), 0);
    examplesArea.appendChild(newExampleField);
  });

  // Submit
  const submit = createElement('input');
  styleElement(submit, {...buttonStyles, marginTop: '20px'});
  submit.type = 'submit';

  [wordField, meaningFieldWrapper, examplesArea, addButton, submit].forEach(
    field => form.appendChild(field),
  );
  setTimeout(() => wordField.focus(), 0);
  return form;
};

export default Form;
