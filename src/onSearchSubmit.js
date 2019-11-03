import {getDocument, showElement} from './utils';
import createPaper from './views/paper';
import parserMWL from './parsers/mwl';

const onSearchSubmit = query => {
  getDocument('http://www.learnersdictionary.com/definition/' + query)
    .then(parserMWL)
    .then(defs => showElement(createPaper(defs)))
    .catch(console.error);
};

export default onSearchSubmit;
