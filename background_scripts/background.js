'use strict';

function sendMessageToTabs(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(tab.id, {greeting: 'It Works!'});
  }
}

const sendMessage = () =>
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then(sendMessageToTabs);

const check = () => {
  browser.storage.local.get().then(storage => {
    Object.keys(storage).forEach(word => {
      switch (storage[word].box) {
        case 1:
          new Date().getTime() - storage[word].time > 120000 && null //Action
          break;
        case 2:
          new Date().getTime() - storage[word].time > 600000 && null //Action
          break;
        case 3:
          new Date().getTime() - storage[word].time > 3600000 && null //Action
          break;
      }
    });
  });
};

//setInterval(check, 4000);
