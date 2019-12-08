import SearchBar from './components/SearchBar';

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.keyCode == 191) {
    event.stopPropagation();
    event.preventDefault();
    //    removeShadowDom();
    //showElement(SearchBar(), '.search-bar');
    document.body.appendChild(SearchBar(console.log));
  }
});

const showElement = (element, classes = '') => {
  const shadowRoot = createElement('div.wsh-shadow-root' + classes);
  const shadow = shadowRoot.attachShadow({mode: 'closed'});
  shadow.appendChild(element);
  document.body.appendChild(shadowRoot);
};

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
