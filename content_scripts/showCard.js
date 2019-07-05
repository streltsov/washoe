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
    .wsh-card-scene {
      margin: 4px;
    }
    .wsh-card-scene,
    .wsh-card {
        width: 300px;
        height: 120px;
        }
    .wsh-card {
        position: relative;
        transition: transform 1s;
        transform-style: preserve-3d;
    }
    .wsh-card__front,
    .wsh-card__back {
        backface-visibility: hidden;
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: #fff;
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
  const buttonNo = document.createElement('button');
  buttonNo.className = 'wsh-no-button';
  buttonNo.textContent = 'No';
  buttonNo.addEventListener('click', () => {
    browser.storage.local.get().then(storage => {
      browser.storage.local.set({
        [word]: {...storage[word], time: new Date().getTime(), box: 1},
      });
      cardScene.classList.add('flipped');
    });
  });
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
      cardScene.remove();
    });
  });
  buttons.appendChild(buttonYes);
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
