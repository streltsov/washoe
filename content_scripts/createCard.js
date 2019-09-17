'use strict';

const createCard = ({word, meaning, example}) => {
  const container = createElement('section', 'container');

  const visible = createElement('div', 'visible');
  const wordSpot = createElement('span', 'word', word);
  visible.appendChild(wordSpot);

  const hidden = createElement('div', 'hidden');
  const meaningSpot = createElement('span', 'meaning', `:${meaning}`);
  hidden.appendChild(meaningSpot);

  if (example) {
    const exampleSpot = createElement(
      'span',
      'example',
      `For Example: ${example}`,
    );
    hidden.appendChild(exampleSpot);
  }

  const buttons = createElement('div', 'buttons');
  ['Again', 'Next'].forEach(el =>
    buttons.appendChild(createElement('button', el.toLowerCase(), el)),
  );
  buttons.addEventListener('click', event =>
    handleButtonClick(word, event.target.className),
  );
  hidden.appendChild(buttons);

  [visible, hidden].forEach(el => container.appendChild(el));
  visible.addEventListener('click', () => hidden.classList.add('show-hidden'));
  return container;
};

const cardStyles = `.container{display:flex;flex-direction:column;font-family:sans-serif;background-color:#0c0c0d;color:#f9f9fa;position:fixed;bottom:0;left:0;width:100%;z-index:999999;animation-name:fade-in;animation-duration:3s}.visible{display:flex;justify-content:center;align-items:center;min-height:48px}.hidden{display:flex;flex-direction:column;justify-content:space-around;align-items:center;height:0;overflow:hidden}.meaning,.example,.buttons{width:100%;max-width:40ch}.example{font-style:italic;}.buttons{display:flex;justify-content:space-around;}.buttons button{background-color:#2a2a2e;color:#fff;border:none;min-width:132px;height:32px}.buttons button:hover{background-color:#38383d}.show-hidden{animation-name:show-up;animation-duration:.7s;animation-fill-mode:forwards}@keyframes fade-in{from{opacity:0}to{opacity:1}}@keyframes show-up{from{height:0}to{height:200px}}`;

const handleButtonClick = (word, button) => {
  browser.storage.sync.get().then(storage => {
    browser.storage.sync.set({
      [word]: {
        ...storage[word],
        time: Date.now(),
        stage: button == 'next' ? ++storage[word].stage : 0,
      },
    });
  });
  removeShadowDom();
};
