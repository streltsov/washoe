import {createElement, styleElement} from '../dom-utils';
import {changeWordStage} from '../utils';

const wrapperStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundColor: '#000',
  color: '#fff',
};

const Card = ({word, meaning, examples, stage}) => {
  console.log('Stage: ', stage);
  const wrapper = createElement('div.washoe-card');
  styleElement(wrapper, wrapperStyles);

  if (stage % 2) {
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
  } else {
    const visible = createElement('div', meaning);
    const form = createElement('form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const [answer] = Array.from(
        event.originalTarget.elements,
        el => el.value,
      );

      if (answer == word) {
        handleButtonClick(word);
      }
    });
    const input = createElement('input');
    form.appendChild(input);
    visible.appendChild(form);
    [visible].forEach(el => wrapper.appendChild(el));
  }

  return wrapper;
};

const handleButtonClick = (word, next) => {
  changeWordStage(word, next);
  browser.runtime.sendMessage({
    action: 'Remove cards from all tabs',
  });
};

export default Card;
