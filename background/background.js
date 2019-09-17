'use strict';

const INTERVALS = [
  120000,
  600000,
  3600000,
  18000000,
  86400000,
  432000000,
  2160000000,
  10368000000,
];
const isItTimeToReview = word => Date.now() - word.time > INTERVALS[word.stage];
const checkWords = storage =>
  Object.keys(storage).forEach(
    word =>
      isItTimeToReview(storage[word]) &&
      sendMessageToActiveTab(
        word,
        storage[word].meaning,
        storage[word].example,
      ),
  );
const sendMessageToActiveTab = (word, meaning = '', example = '') =>
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then(tabs =>
      browser.tabs.sendMessage(tabs[0].id, {
        wordData: {word, meaning, example},
      }),
    );

setInterval(() => browser.storage.sync.get().then(checkWords), 60000);