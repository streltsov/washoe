'use strict';

browser.runtime.onMessage.addListener(request => {
  if (request.data) {
    document
      .querySelector('#wsh-card-container')
      .shadowRoot.querySelector(`.${request.data.word.replace(/\s/g, '_')}`)
      ? null
      : showCard(request.data.word, request.data.meaning, request.data.example);
  } else if (request.selectedText) {
    showModal(request.selectedText);
  }
});
