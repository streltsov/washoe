import SearchBar from './components/SearchBar';
import Paper from './components/Paper';
import Card from './components/Card';
import Spinner from './components/Spinner';

import parserMWL from './parsers/mwl';
import {getDocument, showElement, removeShadowDom, existsOnPage} from './utils';
import {removeElement} from './dom-utils';

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.keyCode == 191) {
    event.preventDefault();
    removeElement('.washoe-paper');
    removeElement('.washoe-search-bar');
    document.body.appendChild(SearchBar(onSearchSubmit));
  }
});

browser.runtime.onMessage.addListener(
  msg => !existsOnPage('-card') && showElement(Card(msg.wordData), '-card'),
);

const onSearchSubmit = query => {
  document.body.appendChild(Spinner(`Waiting for "${query}"`));
  getDocument('http://www.learnersdictionary.com/definition/' + query)
    .then(htmlDocument => parserMWL(htmlDocument))
    .then(entries => {
      removeElement('.washoe-spinner');
      document.body.appendChild(Paper(entries));
    })
    .catch(console.error);
};
