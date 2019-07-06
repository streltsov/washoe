(function createCardContainer() {
  const body = document.querySelector('body');
  const shadowRoot = document.createElement('div');
  shadowRoot.style.position = 'fixed';
  shadowRoot.style.zIndex = '9999';
  shadowRoot.style.top = 0;
  shadowRoot.style.right = 0;
  shadowRoot.style.display = 'flex';
  shadowRoot.style.flexDirection = 'column';
  shadowRoot.style.alignItems = 'flex-end';
  shadowRoot.style.userSelect = 'none';

  const shadow = shadowRoot.attachShadow({mode: 'open'});
  shadowRoot.id = 'wsh-card-container';
  const style = document.createElement('style');
  style.textContent = `
    .modal {
      display: flex;
      flex-direction: column;
      width: 455px;
      padding: 12px;
      margin: 4px;
      box-sizing: border-box;
      font-weight: 400;
      color: #0c0c0d;
      background-color: #f9f9fa;
      border-radius: 2px;
      border: 1px solid #e1e1e2;
    }
    .word-input {
      margin-bottom: 12px;
    }
    .meaning-textarea,
    .example-textarea {
      resize: none;
      height: 100%;
      padding: 8px;
    }
    .meaning-textarea::placeholder,
    .example-textarea::placeholder {
      font-size: 14px;
    }
    .add-button {
      margin-top: 12px;
    }
    .card-scene {
      margin: 4px;
    }
    .card-scene,
    .card {
      width: 300px;
      height: 112px;
    }
    .card {
      position: relative;
      transition: transform 1s;
      transform-style: preserve-3d;
      font-family: 'Fira Sans', sans-serif;
      font-weight: 400;
      color: #0c0c0d;
      border-radius: 2px;
      border: 1px solid #e1e1e2;
    }
    .card span {
      display: block;
      text-align: center;
    }
    .card button {
      min-width: 132px;
    }
    .no-button {
      margin: 0 4px;
    }
    .yes-button {
      margin: 0 4px;
    }
    .card__front {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .buttons {
      display: flex;
      justify-content: center;
    }
    
    .card__front,
    .card__back {
      backface-visibility: hidden;
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: #f9f9fa;
    }
    
    .card__back {
      transform: rotateY(-180deg);
    }
    .flipped .card {
      transform: rotateY(-180deg);
    }
    .flipped,
    .flipped .card {
      animation: expand 1s;
      animation-fill-mode: forwards;
    }
    @keyframes expand {
      100% {
        width: 455px;
        height: 200px;
      }
    }
  `;

  shadow.appendChild(style);
  body.appendChild(shadowRoot);
})();

function showCard(word, meaning, example) {
  const cardContainer = document.querySelector('#wsh-card-container')
    .shadowRoot;

  const cardScene = document.createElement('div');
  cardScene.className = `card-scene ${word.replace(/\s/g, '_')}`;
  cardContainer.appendChild(cardScene);

  const card = document.createElement('div');
  card.className = 'card';
  cardScene.appendChild(card);

  const cardFront = document.createElement('div');
  cardFront.className = 'card__front';
  card.appendChild(cardFront);

  const cardBack = document.createElement('div');
  cardBack.className = 'card__back';
  card.appendChild(cardBack);

  const wordSpan = document.createElement('span');
  wordSpan.className = 'word';
  wordSpan.textContent = word;
  cardFront.appendChild(wordSpan);

  const buttons = document.createElement('div');

  const buttonYes = document.createElement('button');
  buttonYes.className = 'yes-button';
  buttonYes.textContent = 'I remember';
  buttonYes.addEventListener('click', () => {
    browser.storage.local.get().then(storage => {
      browser.storage.local.set({
        [word]: {
          ...storage[word],
          time: new Date().getTime(),
          box: ++storage[word].box,
        },
      });
      cardScene.remove();
    });
  });
  buttons.appendChild(buttonYes);

  buttons.className = 'buttons';
  const buttonNo = document.createElement('button');
  buttonNo.className = 'no-button';
  buttonNo.textContent = 'I forgot';
  buttonNo.addEventListener('click', () => {
    browser.storage.local.get().then(storage => {
      browser.storage.local.set({
        [word]: {...storage[word], time: new Date().getTime(), box: 1},
      });
      cardScene.classList.add('flipped');
    });
  });
  buttons.appendChild(buttonNo);

  cardFront.appendChild(buttons);

  const wordSpanForBack = document.createElement('span');
  wordSpanForBack.className = 'word';
  wordSpanForBack.textContent = word;
  cardBack.appendChild(wordSpanForBack);

  const meaningSpan = document.createElement('span');
  meaningSpan.textContent = meaning[0] === ':' ? meaning : ':' + meaning;
  meaningSpan.className = 'meaning';
  cardBack.appendChild(meaningSpan);

  if (example) {
    const exampleSpan = document.createElement('span');
    exampleSpan.textContent = '«' + example + '»';
    exampleSpan.className = 'example';
    cardBack.appendChild(exampleSpan);
  }

  const buttonGotIt = document.createElement('button');
  buttonGotIt.textContent = 'Got it!';
  buttonGotIt.className = 'got-it-button';
  buttonGotIt.addEventListener('click', () => cardScene.remove());
  cardBack.appendChild(buttonGotIt);
}
