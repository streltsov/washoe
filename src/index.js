import Search from './views/search';
import {showElement, removeShadowDom} from './utils';
import onSearchSubmit from './onSearchSubmit';

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.keyCode == 191) {
    event.preventDefault();
    showElement(Search(onSearchSubmit));
  }

  if (event.keyCode == 27 || (event.ctrlKey && event.keyCode == 219)) {
    event.preventDefault();
    removeShadowDom();
  }
});

//const isWordOnPage = () => Boolean(document.querySelector('.wsh-shadow-root'));
//browser.runtime.onMessage.addListener(request =>
//  request.hasOwnProperty('selectedText')
//    ? showElement(createModal(request.selectedText), modalStyles)
//    : request.hasOwnProperty('wordData') && !isWordOnPage()
//    ? showElement(createCard(request.wordData), cardStyles)
//    : null,
//);
