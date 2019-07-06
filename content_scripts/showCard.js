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
    .wsh-card-scene {
      margin: 4px;
    }
    .wsh-card-scene,
    .wsh-card {
        width: 300px;
        height: 112px;
        }
    .wsh-card {
        position: relative;
        transition: transform 1s;
        transform-style: preserve-3d;

        font-family: 'Fira Sans', sans-serif;
        font-size: 16px;
        font-weight: 400;
        color: #0c0c0d;
        border-radius: 2px;
        border: 1px solid #e1e1e2;
    }
    .wsh-card span {
      display: block;
      text-align: center;
    }
    .wsh-card button {
      background-color: rgba(12, 12, 13, 0.1);
      border: none;
      border-radius: 2px;
      height: 32px;
      min-width: 132px;
      padding: 0 8px;
    }
    .wsh-card button:hover {
      background-color: rgba(12, 12, 13, 0.2);
    }
    .wsh-card button:active {
      background-color: rgba(12, 12, 13, 0.3);
    }
    .wsh-card button:focus {
      box-shadow: 0 0 0 1px #0a84ff inset, 0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3)
    }
    .wsh-card button::-moz-focus-inner {
      border: 0;
    }

    .wsh-word {
      background-color: #ededf0;
      padding: 8px 0;
    }

    .wsh-no-button {
      margin: 0 4px;
    }
    .wsh-yes-button {
      margin: 0 4px;
    }
    .wsh-card__front {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
}
    .wsh-buttons {
      display: flex;
      justify-content: center;
    }

    .wsh-card__front,
    .wsh-card__back {
        backface-visibility: hidden;
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: #f9f9fa;
    }

    .wsh-card__back {
        transform: rotateY( -180deg );
    }
    .flipped .wsh-card {
        transform: rotateY(-180deg);
    }
    .flipped,
    .flipped .wsh-card {
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
  cardScene.className = `wsh-card-scene wsh-${word.replace(/\s/g, '_')}`;
  cardContainer.appendChild(cardScene);

  const card = document.createElement('div');
  card.className = 'wsh-card';
  cardScene.appendChild(card);

  const cardFront = document.createElement('div');
  cardFront.className = 'wsh-card__front';
  card.appendChild(cardFront);

  const cardBack = document.createElement('div');
  cardBack.className = 'wsh-card__back';
  card.appendChild(cardBack);

  const wordSpan = document.createElement('span');
  wordSpan.className = 'wsh-word';
  wordSpan.textContent = word;
  cardFront.appendChild(wordSpan);

  const buttons = document.createElement('div');
  
  const buttonYes = document.createElement('button');
  buttonYes.className = 'wsh-yes-button';
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

  buttons.className = 'wsh-buttons';
  const buttonNo = document.createElement('button');
  buttonNo.className = 'wsh-no-button';
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
  wordSpanForBack.className = 'wsh-word';
  wordSpanForBack.textContent = word;
  cardBack.appendChild(wordSpanForBack);

  const meaningSpan = document.createElement('span');
  meaningSpan.textContent = meaning[0] === ':' ? meaning : ':' + meaning;
  meaningSpan.className = 'wsh-meaning';
  cardBack.appendChild(meaningSpan);

  if (example) {
    const exampleSpan = document.createElement('span');
    exampleSpan.textContent = '«' + example + '»';
    exampleSpan.className = 'wsh-example';
    cardBack.appendChild(exampleSpan);
  }

  const buttonGotIt = document.createElement('button');
  buttonGotIt.textContent = 'Got it!';
  buttonGotIt.className = 'wsh-got-it-button';
  buttonGotIt.addEventListener('click', () => cardScene.remove());
  cardBack.appendChild(buttonGotIt);
}
