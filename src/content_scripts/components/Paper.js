import {createElement, styleElement} from '../dom-utils';

const paperStyles = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: 'auto',
  maxWidth: '75%',
  maxHeight: '75%',
  backgroundColor: '#39383e',
  borderRadius: '2px',
  padding: '16px',
  overflow: 'auto',
  zIndex: '2147483647',

  scrollbarWidth: 'thin',
  scrollbarColor: '#0a84ff #4a4a4f',
  color: 'white',
};

const meaningStyles = {
  outline: 'none',
  padding: '8px',
};

const meaningFocusedStyles = {
  backgroundColor: '#4b4a4f',
};

const meaningBluredStyles = {
  backgroundColor: 'unset',
};

const Paper = (entries, onEnter) => {
  const paper = createElement('section.washoe-paper');
  styleElement(paper, paperStyles);

  const title = createElement('h1', entries[0].word);
  const meaningsList = createElement('ol');

  entries.forEach(entry => {
    const meaning = createElement('li');
    styleElement(meaning, meaningStyles);

    meaning.addEventListener('focus', () =>
      styleElement(meaning, meaningFocusedStyles),
    );
    meaning.addEventListener('blur', () =>
      styleElement(meaning, meaningBluredStyles),
    );

    const meaningSpan = createElement('strong', entry.meaning);
    meaning.tabIndex = '1';
    meaning.appendChild(meaningSpan);
    meaning.addEventListener('mousedown', event => event.preventDefault());

    meaning.addEventListener('keydown', event => {
      event.preventDefault();
      event.keyCode == 74 && event.target.nextSibling.focus();
      event.keyCode == 75 && event.target.previousSibling.focus();
      event.ctrlKey && event.keyCode == 219 && paper.remove();
      event.keyCode == 27 && paper.remove();
      event.keyCode == 13 && onEnter(entry);
    });

    const examplesList = createElement('ul');
    entry.examples.forEach(ex =>
      examplesList.appendChild(createElement('li', ex)),
    );

    meaning.appendChild(examplesList);
    meaningsList.appendChild(meaning);
  });

  [title, meaningsList].forEach(el => paper.appendChild(el));
  setTimeout(() => meaningsList.querySelector('li').focus(), 0);
  return paper;
};

export default Paper;
