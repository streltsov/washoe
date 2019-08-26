'use strict';

const showModal = word => {
  const cardContainer = document.querySelector('#wsh-card-container')
    .shadowRoot;

  const modal = document.createElement('div');
  modal.className = 'modal';

  const wordInput = document.createElement('input');
  wordInput.value = word.toLowerCase();
  wordInput.className = 'word-input';
  wordInput.placeholder = 'Word';

  const meaningTextArea = document.createElement('textarea');
  meaningTextArea.className = 'meaning-textarea';
  meaningTextArea.placeholder = 'Meaning';

  const exampleTextArea = document.createElement('textarea');
  exampleTextArea.className = 'example-textarea';
  exampleTextArea.placeholder = 'Example';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add';
  addButton.className = 'add-button';
  addButton.addEventListener('click', () => {
    addWordToStorage(
      wordInput.value.toLowerCase(),
      meaningTextArea.value.toLowerCase(),
      exampleTextArea.value,
    );
    modal.remove();
  });

  modal.appendChild(wordInput);
  modal.appendChild(meaningTextArea);
  modal.appendChild(exampleTextArea);
  modal.appendChild(addButton);
  cardContainer.insertBefore(modal, cardContainer.firstChild);
  meaningTextArea.focus();
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
