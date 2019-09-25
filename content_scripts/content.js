'use strict';

browser.runtime.onMessage.addListener(request =>
  request.hasOwnProperty('selectedText')
    ? showElement(createModal(request.selectedText), modalStyles)
    : request.hasOwnProperty('wordData') && !isWordOnPage()
    ? showElement(createCard(request.wordData), cardStyles)
    : null,
);

const isWordOnPage = () => Boolean(document.querySelector('.wsh-shadow-root'));
const removeShadowDom = () =>
  document.querySelector('.wsh-shadow-root').remove();

const createElement = (el, cl = null, text = null) => {
  const element = document.createElement(el);
  element.className = cl;
  element.textContent = text;
  return element;
};

const showElement = (element, styles) => {
  const shadowRoot = createElement('div', 'wsh-shadow-root');
  const shadow = shadowRoot.attachShadow({mode: 'closed'});
  const style = createElement('style', null, styles);
  [style, element].forEach(el => shadow.appendChild(el));
  document.body.appendChild(shadowRoot);
  element.matches('.modal') ? element.elements[1].focus() : null;
};
