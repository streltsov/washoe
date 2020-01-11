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
  Object.keys(storage).forEach(word => {
    if (isItTimeToReview(storage[word])) {
      sendMessageToActiveTab({word, ...storage[word]});
    }
  });

const sendMessageToActiveTab = async wordData => {
  const [tab] = await browser.tabs.query({currentWindow: true, active: true});
  browser.tabs.sendMessage(tab.id, {wordData});
};

browser.runtime.onMessage.addListener(async () => {
  const tabs = await browser.tabs.query({});
  tabs.forEach(tab => {
    browser.tabs.executeScript(tab.id, {
      code: `document.querySelector('.washoe-card') && document.querySelector('.washoe-card').remove()`,
    });
  });
});

setInterval(() => browser.storage.sync.get().then(checkWords), 6000);
