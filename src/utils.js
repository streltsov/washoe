export const createElement = (el, cl = '', text = '') => {
  const element = document.createElement(el);
  element.className = cl;
  element.textContent = text;
  return element;
};

export const getDocument = async url => {
  const response = await fetch(url);
  const documentString = await response.text();
  const htmlDocument = await new DOMParser().parseFromString(
    documentString,
    'text/html',
  );
  return htmlDocument;
};

export const removeShadowDom = () =>
  document.querySelector('.wsh-shadow-root').remove();

export const showElement = (element, styles = '') => {
  const shadowRoot = createElement('div', 'wsh-shadow-root');
  const shadow = shadowRoot.attachShadow({mode: 'closed'});
  const style = createElement('style', '', styles);

  [style, element].forEach(el => shadow.appendChild(el));
  document.body.appendChild(shadowRoot);
  element.matches('.modal') ? element.elements[1].focus() : null;
};
