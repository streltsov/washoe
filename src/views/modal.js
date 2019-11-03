'use strict';

const createModal = word => {
  const modal = createElement('form', 'modal');

  [
    `<input type="submit" value="Done">`,
    `<textarea placeholder='Example (optional)'></textarea>`,
    `<textarea required="true" placeholder='Meaning' autofocus="true"></textarea>`,
    `<textarea required="true" rows="1">${word.toLowerCase()}</textarea>`,
  ].forEach(el => modal.insertAdjacentHTML('afterbegin', el));

  modal.addEventListener('submit', event => {
    event.preventDefault();
    addWordToStorage(...Array.from(modal.elements, el => el.value.trim()));
    removeShadowDom();
  });

  return modal;
};

const modalStyles = `.modal{position:fixed;top:8px;right:8px;display:flex;flex-direction:column;justify-content:space-around;align-items:center;width:min-content;z-index:2147483647;padding:12px 12px 0;background-color:#0c0c0d}textarea:nth-child(1){height: 35px;resize:none}textarea:nth-child(1):invalid,textarea:nth-child(2):invalid{border-color:#d70022;box-shadow:0 0 0 1px #d70022,0 0 0 4px rgba(251,0,34,.3)}input,textarea{color:#fff;border:2px solid #2a2a2e;background-color:#2a2a2e;margin-bottom:12px;width:280px;border-radius:2px;box-sizing:border-box}textarea{padding:8px}input{height:32px}input::-moz-focus-inner{border:0}input:focus,textarea:focus{border-color:#0a84ff!important;box-shadow:0 0 0 1px #0a84ff,0 0 0 4px rgba(10,132,255,.3)!important}`;

const addWordToStorage = (word, meaning, example) =>
  browser.storage.sync.set({
    [word]: {
      meaning,
      example,
      stage: 0,
      time: Date.now(),
    },
  });
