'use strict';

browser.runtime.onMessage.addListener(request => {
  if (request.greeting) {
    showCard(request.greeting);
  }
});

browser.runtime.onMessage.addListener(request => {
  if (request.selectedText) {
    showModal(request.selectedText);
  }
});

const addWordToStorage = (word, meaning = '', example = '') =>
  browser.storage.local.set({
    [word]: {
      meaning: meaning,
      example: example,
      box: 1,
      time: new Date().getTime(),
    },
  });

function showCard(word) {
  const body = document.querySelector('body');
  const shadowRoot = document.createElement('div');
  body.appendChild(shadowRoot);
  const shadow = shadowRoot.attachShadow({mode: 'open'});

  const style = document.createElement('style');
  style.textContent = `.wsh-card{padding: 32px;border: 1px solid #ededf0;position: absolute; top: 10px; right: 10px;}`;
  shadow.appendChild(style);

  const card = document.createElement('div');
  card.className = 'wsh-card';
  shadow.appendChild(card);

  const preWordSpan = document.createElement('p');
  preWordSpan.className = 'wsh-pre-word';
  preWordSpan.textContent = 'Do you remember what does this mean:';
  card.appendChild(preWordSpan);

  const wordSpan = document.createElement('span');
  wordSpan.className = 'wsh-word';
  wordSpan.textContent = word;
  card.appendChild(wordSpan);

  const buttons = document.createElement('div');

  const buttonNo = document.createElement('button');
  buttonNo.className = 'wsh-no-button';
  buttonNo.textContent = 'No';
  buttonNo.addEventListener('click', () => console.log('No Button'));
  buttons.appendChild(buttonNo);

  const buttonYes = document.createElement('button');
  buttonYes.className = 'wsh-yes-button';
  buttonYes.textContent = 'Yes';
  buttonYes.addEventListener('click', () => console.log('Yes Button'));
  buttons.appendChild(buttonYes);
  card.appendChild(buttons);
}
