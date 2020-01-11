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

export const removeShadowRootBindings = event => {
  if (event.keyCode == 27 || (event.ctrlKey && event.keyCode == 219)) {
    event.preventDefault();
    event.stopPropagation();
    removeShadowDom();
  }
};

export const removeShadowDom = (suffix = '') =>
  document
    .querySelectorAll('.wsh-shadow-root' + suffix)
    .forEach(el => el.remove());

export const addWordToStorage = ({word, meaning, examples}) => {
  browser.storage.sync.set({
    [word]: {
      meaning,
      examples,
      stage: 0,
      time: Date.now(),
    },
  });
};
