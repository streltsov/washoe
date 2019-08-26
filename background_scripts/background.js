'use strict';

const INTERVALS = [12000, 60000, 360000, 1800000, 86400000, 432000000];

const isItTimeToReview = word => Date.now() - word.time > INTERVALS[word.stage];

const checkWords = storage =>
  Object.keys(storage).forEach(
    word =>
      isItTimeToReview(storage[word]) &&
      sendMessage(word, storage[word].meaning, storage[word].example),
  );

setInterval(() => browser.storage.local.get().then(checkWords), 6000);

const sendMessage = (word, meaning = '', example = '') =>
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then(tabs =>
      browser.tabs.sendMessage(tabs[0].id, {
        data: {word: word, meaning: meaning, example: example},
      }),
    );
