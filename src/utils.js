export const createElement = (el = 'div', text = '') => {
  const element = document.createElement(el.split('.')[0]);
  el.split('.')[1]
    ? (element.className = el
        .split('.')
        .slice(1)
        .join(' '))
    : null;
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

export const showElement = (element, classes = '') => {
  const shadowRoot = createElement('div.wsh-shadow-root' + classes);
  const shadow = shadowRoot.attachShadow({mode: 'closed'});
  shadow.appendChild(element);
  document.body.appendChild(shadowRoot);
};

export const existsOnPage = (suffix = '') =>
  Boolean(document.querySelector('.wsh-shadow-root' + suffix));

export const removeShadowDom = (suffix = '') =>
  document
    .querySelectorAll('.wsh-shadow-root' + suffix)
    .forEach(el => el.remove());

export const addWordToStorage = (word, meaning, example) => {
  browser.storage.sync.set({
    [word]: {
      meaning,
      example,
      stage: 0,
      time: Date.now(),
    },
  });
};
