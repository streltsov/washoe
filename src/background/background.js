const INTERVALS = [
  12e4,
  6e5,
  36e5,
  18e6,
  864e5,
  432e6,
  10368e5,
  216e7,
  10368e6,
];
const isItTimeToReview = word => Date.now() - word.time > INTERVALS[word.stage];
const checkWords = storage =>
  Object.keys(storage).forEach(
    word =>
      isItTimeToReview(storage[word]) &&
      sendMessageToActiveTab(
        word,
        storage[word].meaning,
        storage[word].examples,
      ),
  );
const sendMessageToActiveTab = (word, meaning = '', examples = []) =>
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then(tabs =>
      browser.tabs.sendMessage(tabs[0].id, {
        wordData: {word, meaning, examples},
      }),
    );

browser.runtime.onMessage.addListener(() =>
  browser.tabs.query({}).then(tabs =>
    tabs.forEach(tab => {
      browser.tabs.executeScript(tab.id, {
        code: `document.querySelector('.wsh-shadow-root-card').remove()`,
      });
    }),
  ),
);

setInterval(() => browser.storage.sync.get().then(checkWords), 60000);
