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
