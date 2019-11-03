import SearchBar from './components/SearchBar';
import Paper from './components/Paper';
import parserMWL from './parsers/mwl';
import {getDocument, showElement, removeShadowDom} from './utils';

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.keyCode == 191) {
    event.preventDefault();
    showElement(SearchBar(onSearchSubmit));
  }

  if (event.keyCode == 27 || (event.ctrlKey && event.keyCode == 219)) {
    event.preventDefault();
    removeShadowDom();
  }
});

const onSearchSubmit = query =>
  getDocument('http://www.learnersdictionary.com/definition/' + query)
    .then(parserMWL)
    .then(entries => showElement(Paper(entries)))
    .catch(console.error);
