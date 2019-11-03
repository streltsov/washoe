export const createElement = (el = 'div', text = '') => {
  const element = document.createElement(el.split('.')[0]);
  el.split('.')[1] ? (element.className = el.split('.').join(' ')) : null;
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
  const shadowRoot = createElement('div.wsh-shadow-root');
  const shadow = shadowRoot.attachShadow({mode: 'closed'});
  const style = createElement('style', '', styles);

  [style, element].forEach(el => shadow.appendChild(el));
  document.body.appendChild(shadowRoot);
  element.matches('.modal') ? element.elements[1].focus() : null;
};
