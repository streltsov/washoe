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
