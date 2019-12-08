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
    word: htmlDocument.querySelector('#ld_entries_v2_mainh').innerText,
    meaning: getMeaning(el),
    examples: iterateExamples(el),
  }));

export default parseMWL;
