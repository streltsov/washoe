'use strict';

browser.runtime.onMessage.addListener(request => {
  if (request.greeting) {
    document.querySelector(`#wsh-${request.greeting.replace(/\s/g, '_')}`)
      ? null
      : showCard(request.greeting);
  }
});

browser.runtime.onMessage.addListener(request => {
  if (request.selectedText) {
    showModal(request.selectedText);
  }
});
