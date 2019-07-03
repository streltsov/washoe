(function createCardContainer() {
  const body = document.querySelector('body');
  const shadowRoot = document.createElement('div');
  shadowRoot.style.position = 'fixed';
  shadowRoot.style.zIndex = '9999';
  shadowRoot.style.top = 0;
  shadowRoot.style.right = 0;
  shadowRoot.style.overflowY = 'auto';
  shadowRoot.style.maxHeight = '100vh';

  const shadow = shadowRoot.attachShadow({mode: 'open'});
  shadowRoot.id = 'wsh-card-container';
  const style = document.createElement('style');
  style.textContent = `.wsh-card{margin: 4px; background-color: #00feef; padding: 24px; border: 1px solid #777;}`;
  shadow.appendChild(style);
  body.appendChild(shadowRoot);
})();

function showCard(word) {
  const cardContainer = document.querySelector('#wsh-card-container')
    .shadowRoot;

  const card = document.createElement('div');
  card.className = `wsh-card wsh-${word.replace(/\s/g, '_')}`;
  cardContainer.appendChild(card);

  const preWordSpan = document.createElement('p');
  preWordSpan.className = 'wsh-pre-word';
  preWordSpan.textContent = 'Do you remember what does this mean:';
  card.appendChild(preWordSpan);

  const wordSpan = document.createElement('span');
  wordSpan.className = 'wsh-word';
  wordSpan.textContent = word;
  card.appendChild(wordSpan);

  const buttons = document.createElement('div');

  const buttonNo = document.createElement('button');
  buttonNo.className = 'wsh-no-button';
  buttonNo.textContent = 'No';
  buttonNo.addEventListener('click', () => {
    browser.storage.local.get().then(storage => {
      browser.storage.local.set({
        [word]: {...storage[word], time: new Date().getTime(), box: 1},
      });
      card.remove();
    });
  });
  buttonNo.addEventListener('click', () => console.log('No Button'));
  buttons.appendChild(buttonNo);

  const buttonYes = document.createElement('button');
  buttonYes.className = 'wsh-yes-button';
  buttonYes.textContent = 'Yes';
  buttonYes.addEventListener('click', () => {
    browser.storage.local.get().then(storage => {
      browser.storage.local.set({
        [word]: {
          ...storage[word],
          time: new Date().getTime(),
          box: ++storage[word].box,
        },
      });
      card.remove();
    });
  });
  buttons.appendChild(buttonYes);
  card.appendChild(buttons);
}
