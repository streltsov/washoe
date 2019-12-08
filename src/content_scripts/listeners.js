import {
  addWordToStorage,
  removeShadowDom,
  removeShadowRootBindings,
} from './utils';

export const meaningListener = event => {
  event.stopPropagation();
  event.preventDefault();
  event.keyCode == 74 && event.target.nextSibling.focus();
  event.keyCode == 75 && event.target.previousSibling.focus();

  removeShadowRootBindings(event);

  if (event.keyCode == 13) {
    event.preventDefault();
    event.stopPropagation();
    if (!event.target.querySelector('li')) {
      addWordToStorage(
        event.target.offsetParent.querySelector('.title').innerText,
        event.target.firstChild.innerText,
      );
      removeShadowDom('.paper');
    } else {
      event.target.classList.add('selected');
      event.target.querySelector('li').focus();
    }
  }
};

export const exampleListener = event => {
  event.preventDefault();
  event.stopPropagation();
  event.keyCode == 74 && event.target.nextSibling.focus();
  event.keyCode == 75 && event.target.previousSibling.focus();

  if (event.keyCode == 13) {
    addWordToStorage(
      event.target.offsetParent.querySelector('.title').innerText,
      event.target.parentNode.parentNode.firstChild.innerText,
      event.target.innerText,
    );
    removeShadowDom('.paper');
  }

  if (event.keyCode == 27 || (event.ctrlKey && event.keyCode == 219)) {
    event.preventDefault();
    event.stopPropagation();
    event.target.parentElement.parentElement.classList.remove('selected');
    event.target.parentElement.parentElement.focus();
  }
};
