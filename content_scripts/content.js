'use strict';

browser.runtime.onMessage.addListener(request => {
  if (request.data) {
    document
      .querySelector('#wsh-card-container')
      .shadowRoot.querySelector(`.wsh-${request.data.word.replace(/\s/g, '_')}`)
      ? null
      : showCard(request.data.word, request.data.meaning, request.data.example);
  }
});

browser.runtime.onMessage.addListener(request => {
  if (request.selectedText) {
    showModal(request.selectedText);
  }
});
