import {createElement, styleElement} from '../dom-utils';
import {changeWordStage} from '../utils';

const wrapperStyles = {
  backgroundColor: '#000',
  color: '#fff',
};

const Card = ({word, meaning, examples}) => {
  const wrapper = createElement('div.washoe-card');
  styleElement(wrapper, wrapperStyles);
  const visible = createElement('div', word);
  const hidden = createElement();
  const meaningSpan = createElement('span', meaning);
  const buttons = createElement();
  const againButton = createElement('button', 'Again');
  againButton.addEventListener('click', () => handleButtonClick(word));
  const nextButton = createElement('button', 'Next');
  nextButton.addEventListener('click', () => handleButtonClick(word, 1));
  [againButton, nextButton].forEach(el => buttons.appendChild(el));
  [meaningSpan, buttons].forEach(el => hidden.appendChild(el));
  [visible, hidden].forEach(el => wrapper.appendChild(el));
  return wrapper;
};

const handleButtonClick = (word, next) => {
  changeWordStage(word, next);
  browser.runtime.sendMessage({
    action: 'Remove cards from all tabs',
  });
};

export default Card;
