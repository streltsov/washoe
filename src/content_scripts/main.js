import SearchBar from './components/SearchBar';
import Paper from './components/Paper';
import Card from './components/Card';
import parserMWL from './parsers/mwl';
import {getDocument, showElement, removeShadowDom, existsOnPage} from './utils';
import {removeElement} from './dom-utils';

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.keyCode == 191) {
    event.stopPropagation();
    event.preventDefault();
    removeElement('.washoe-search-bar');
    document.body.appendChild(SearchBar(onSearchSubmit));
  }
});

browser.runtime.onMessage.addListener(
  msg => !existsOnPage('-card') && showElement(Card(msg.wordData), '-card'),
);

const onSearchSubmit = query =>
  getDocument('http://www.learnersdictionary.com/definition/' + query)
    .then(parserMWL)
    .then(entries => showElement(Paper(entries), '.paper'))
    .catch(console.error);
