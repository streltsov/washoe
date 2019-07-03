'use strict';

function sendMessageToTabs(tabs, word) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(tab.id, {greeting: word});
  }
}

const sendMessage = word =>
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then(tabs => sendMessageToTabs(tabs, word));

const check = () => {
  browser.storage.local.get().then(storage => {
    Object.keys(storage).forEach(word => {
      isItTimeToReview(storage[word]) ? sendMessage(word) : null;
    });
  });
};

const isItTimeToReview = word => {
  let spacedTime;
  switch (word.box) {
    case 1:
      spacedTime = 120000;
      break;
    case 2:
      spacedTime = 600000;
      break;
    case 3:
      spacedTime = 3600000;
      break;
    case 4:
      spacedTime = 18000000;
      break;
    case 5:
      spacedTime = 86400000;
      break;
    case 6:
      spacedTime = 432000000;
      break;
  }
  return new Date().getTime() - word.time > spacedTime;
};
setInterval(check, 60000);
