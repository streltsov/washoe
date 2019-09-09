'use strict';

const createModal = word => {
  const modal = createElement('div', 'modal');
  const wordInput = createElement('input', 'word-input');
  wordInput.value = word.toLowerCase();
  const meaning = createElement('input', 'meaning');
  const example = createElement('input', 'example');

  const addButton = createElement('button', 'add-button', 'Add');
  addButton.addEventListener('click', () => {
    addWordToStorage(
      wordInput.value.trim().toLowerCase(),
      meaning.value.trim(),
      example.value.trim(),
    );
    removeShadowDom();
  });
  [wordInput, meaning, example, addButton].forEach(el => modal.appendChild(el));
  return modal;
};

const modalStyles = `.modal{display:flex;justify-content:space-around;align-items:center;width:100%;background-color:#0c0c0d;position:fixed;top:0;left:0;min-height:52px}input{background-color:#2a2a2e;color:#fff;border:none;margin:0 4px;height:32px}button{background-color:#2a2a2e;color:#fff;border:none;height:32px}`;

const addWordToStorage = (word, meaning = '', example = '') =>
  browser.storage.sync.set({
    [word]: {
      meaning,
      example,
      stage: 0,
      time: new Date().getTime(),
    },
  });
