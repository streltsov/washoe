import SearchBar from './components/SearchBar';

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.keyCode == 191) {
    event.stopPropagation();
    event.preventDefault();
    removeShadowDom();
    showElement(SearchBar(onSearchSubmit), '.search-bar');
  }
});

