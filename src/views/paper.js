import {createElement} from '../utils';
import {showDef} from '../parsers/mwl';

const createPaper = (word, defs) => {
  const paper = createElement('section', 'paper');
  const title = createElement('h1', 'word', word);
  title.tabIndex = '1';
  paper.appendChild(title);
  paper.appendChild(showDef(defs));
  setTimeout(() => title.focus(), 0);
  return paper;
};

export default createPaper;
