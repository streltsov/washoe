'use strict';

browser.runtime.onMessage.addListener(request => {
  if (request.data) {
    document
      .querySelector('#wsh-card-container')
      .shadowRoot.querySelector(`.${request.data.word.replace(/\s/g, '_')}`)
      ? null
      : showCard(request.data.word, request.data.meaning, request.data.example);
  } else if (request.selectedText) {
    showModal(request.selectedText);
  }

});

const createElement = (el, cl, text) => {
  const element = document.createElement(el);
  element.className = cl;
  element.textContent = text || null;
  return element;
};

const showElement = (element, styles) => {
  const shadowRoot = document.createElement('div');
  const shadow = shadowRoot.attachShadow({mode: 'open'});
  shadowRoot.id = 'wsh-card-container';
  const style = document.createElement('style');
  style.textContent = styles;
  shadow.appendChild(style);
  shadow.appendChild(element);
  document.querySelector('body').appendChild(shadowRoot);
};

