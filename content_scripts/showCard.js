const createCard = (word, meaning, example) => {
  const container = createElement('section', 'container');

  const visible = createElement('div', 'visible');
  const wordSpot = createElement('span', 'word', word);
  visible.appendChild(wordSpot);

  const hidden = createElement('div', 'hidden');
  const meaningSpot = createElement('span', 'meaning', meaning);
  const exampleSpot = createElement('span', 'example', example);
  const buttons = createElement('div', 'buttons');
  ['again', 'good', 'easy'].forEach(el =>
    buttons.appendChild(createElement('button', el, el)),
  );
  buttons.addEventListener('click', handleButtonClick);

  [meaningSpot, exampleSpot, buttons].forEach(el => hidden.appendChild(el));
  [visible, hidden].forEach(el => container.appendChild(el));
  visible.addEventListener('click', () => hidden.classList.add('show-hidden'));
  return container;
};

const cardStyles = `.container{display:flex;flex-direction:column;font-family:sans-serif;background:black;color:white;position:fixed;bottom:0;left:0;width:100%;animation-name:fade-in;animation-duration:3s}.word{margin-right:12px}.visible{display:flex;justify-content:center;align-items:center;min-height:52px}.hidden{display:flex;flex-direction:column;justify-content:space-around;align-items:center;height:0;overflow:hidden}.meaning,.example,.buttons{width:100%;max-width:66%}.buttons{display:flex;justify-content:space-around;}.buttons button{background-color:#2a2a2e;color:#fff;border:none;min-width:132px;height:32px}.buttons button:hover{background-color:#38383d}.show-hidden{animation-name:show-up;animation-duration:2s;animation-fill-mode:forwards}@keyframes fade-in{from{opacity:0}to{opacity:1}}@keyframes show-up{from{height:0}to{height:200px}}`;


const handleButtonClick = event => console.log(event.target.className);
