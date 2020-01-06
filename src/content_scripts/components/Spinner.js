import {createElement, styleElement} from '../dom-utils';

const spinnerStyles = {
  backgroundColor: '#333',
  color: 'white',

  position: 'fixed',
  margin: 'auto',
  top: '100px',
  right: 0,
  left: 0,
  width: 'max-content',

  padding: '16px',
  margin: 'auto',
};

const Spinner = (text = 'Loading...') => {
  const spinner = createElement('span.washoe-spinner', text);
  styleElement(spinner, spinnerStyles);
  return spinner;
};

export default Spinner;
