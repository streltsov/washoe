'use strict';

browser.runtime.onMessage.addListener(request =>
  request.hasOwnProperty('selectedText')
    ? showElement(createModal(request.selectedText), modalStyles)
    : request.hasOwnProperty('wordData') && !isWordOnPage()
    ? showElement(createCard(request.wordData), cardStyles)
    : null,
);

const isWordOnPage = () => Boolean(document.querySelector('#wsh-shadow-root'));
const removeShadowDom = () =>
  document.querySelector('#wsh-shadow-root').remove();

const createElement = (el, cl, text) => {
  const element = document.createElement(el);
  element.className = cl;
  element.textContent = text || null;
  return element;
};

const showElement = (element, styles) => {
  const shadowRoot = document.createElement('div');
  const shadow = shadowRoot.attachShadow({mode: 'closed'});
  shadowRoot.id = 'wsh-shadow-root';
  const style = document.createElement('style');
  style.textContent = styles;
  shadow.appendChild(style);
  shadow.appendChild(element);
  document.querySelector('body').appendChild(shadowRoot);
};
