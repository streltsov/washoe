'use strict';

browser.runtime.onMessage.addListener(request =>
  request.hasOwnProperty('selectedText')
    ? showModal(request.selectedText)
    : request.hasOwnProperty('wordData')
    ? showCard(request.wordData)
    : null,
);

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

