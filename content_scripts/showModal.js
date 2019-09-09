'use strict';

const createModal = word => {
  const modal = createElement('div', 'modal');

  const wordInput = createElement('input', 'word-input');
  wordInput.value = word.toLowerCase();
  wordInput.placeholder = 'Word';

  const meaningTextArea = createElement('textarea', 'meaning-textarea');
  meaningTextArea.placeholder = 'Meaning';

  const exampleTextArea = createElement('textarea', 'example-textarea');
  exampleTextArea.placeholder = 'Example';

  const addButton = createElement('button', 'add-button', 'Add');
  addButton.addEventListener('click', () => {
    addWordToStorage(
      wordInput.value.toLowerCase(),
      meaningTextArea.value.toLowerCase(),
      exampleTextArea.value,
    );
    modal.remove();
  });

  [wordInput, meaningTextArea, exampleTextArea, addButton].forEach(el =>
    modal.appendChild(el),
  );
  return modal;
};

const addWordToStorage = (word, meaning = '', example = '') =>
  browser.storage.local.set({
    [word]: {
      meaning: meaning,
      example: example,
      stage: 0,
      time: new Date().getTime(),
    },
  });
