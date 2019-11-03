import {createElement} from '../utils';

const getMeaning = el =>
  el.querySelector('.def_text')
    ? el.querySelector('.def_text').innerText
    : el.querySelector('.un_text')
    ? el.querySelector('.un_text').innerText
    : el.querySelector('.both_text').innerText;

const iterateExamples = el =>
  Array.from(el.querySelectorAll('.vi_content'), el => el.innerText);

const parseMWL = htmlDocument =>
  Array.from(htmlDocument.querySelectorAll('.sense'), el => ({
    meaning: getMeaning(el),
    examples: iterateExamples(el),
  }));

const wrapDef = meaning => {
  const li = createElement('li', 'meaning', meaning);
  li.tabIndex = '1';
  return li;
};
const wrapExam = example => createElement('li', 'example', example);

const wrapItem = el => {
  const item = wrapDef(el.meaning);
  const examples = createElement('ul');
  el.examples.forEach(ex => examples.appendChild(wrapExam(ex)));
  item.appendChild(examples);
  return item;
};

export const showDef = defs => {
  const definitions = document.createElement('ol');
  defs.forEach(el => definitions.appendChild(wrapItem(el)));
  return definitions;
};

export default parseMWL;
