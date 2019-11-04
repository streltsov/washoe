import SearchBar from './components/SearchBar';
import Paper from './components/Paper';
import Card from './components/Card';
import parserMWL from './parsers/mwl';
import {getDocument, showElement, removeShadowDom, existsOnPage} from './utils';

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.keyCode == 191) {
    event.preventDefault();
    removeShadowDom();
    showElement(SearchBar(onSearchSubmit), '.search-bar');
  }

  if (event.keyCode == 27 || (event.ctrlKey && event.keyCode == 219)) {
    event.preventDefault();
    removeShadowDom();
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
