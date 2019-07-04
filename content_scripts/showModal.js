'use strict';

const showModal = word => {
  const body = document.querySelector('body');
  const modal = document.createElement('div');
  const wordInput = document.createElement('input');
  wordInput.id = 'wsh-word-input';
  wordInput.value = word.toLowerCase();
  const meaningInput = document.createElement('input');
  meaningInput.id = 'wsh-meaning-input';
  const exampleInput = document.createElement('input');
  exampleInput.id = 'wsh-example-input';
  const addButton = document.createElement('button');
  addButton.textContent = 'Add';
  addButton.addEventListener('click', () => {
    addWordToStorage(wordInput.value, meaningInput.value, exampleInput.value);
    modal.remove();
  });

  modal.appendChild(wordInput);
  modal.appendChild(meaningInput);
  modal.appendChild(exampleInput);
  modal.appendChild(addButton);
  body.appendChild(modal);
};

const addWordToStorage = (word, meaning = '', example = '') =>
  browser.storage.local.set({
    [word]: {
      meaning: meaning,
      example: example,
      box: 1,
      time: new Date().getTime(),
    },
  });
