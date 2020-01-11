import SearchBar from './components/SearchBar';
import Paper from './components/Paper';
import Card from './components/Card';
import Spinner from './components/Spinner';
import Form from './components/Form';

import parserMWL from './parsers/mwl';
import {
  addWordToStorage,
  getDocument,
  showElement,
  removeShadowDom,
} from './utils';
import {removeElement, isElementExistsOnPage} from './dom-utils';

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.keyCode == 191) {
    event.preventDefault();
    removeElement('.washoe-paper');
    removeElement('.washoe-search-bar');
    document.body.appendChild(SearchBar(onSearchSubmit));
  }
});

browser.runtime.onMessage.addListener(msg => {
  if (!isElementExistsOnPage('.washoe-card')) {
    document.body.appendChild(Card(msg.wordData));
  }
});

const onFormSubmit = event => {
  event.preventDefault();
  const [word, meaning, ...examples] = Array.from(event.originalTarget.elements)
    .map(el => el.value)
    .filter(x => x);
  addWordToStorage({word, meaning, examples});
  removeElement('.washoe-form');
};

const onSearchSubmit = query => {
  document.body.appendChild(Spinner(`Waiting for "${query}"`));
  getDocument('http://www.learnersdictionary.com/definition/' + query)
    .then(htmlDocument => parserMWL(htmlDocument))
    .then(entries => {
      removeElement('.washoe-spinner');
      document.body.appendChild(
        Paper(entries, entry => {
          removeElement('.washoe-paper');
          document.body.appendChild(Form(entry, onFormSubmit));
        }),
      );
    })
    .catch(console.error);
};
