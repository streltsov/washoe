import {createElement} from '../utils';
import {meaningListener, exampleListener} from '../listeners';

const styles = `section{position:fixed;top:0;bottom:0;left:0;right:0;margin:auto;max-width:75%;max-height:75%;background-color:#f9f9fa;border:2px solid #d7d7db;border-radius:2px;padding:16px;overflow:auto;z-index:99999999}ol > li{font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:18px;font-stretch:normal;letter-spacing:0.2px;line-height:22px;padding-bottom:16px}ol > li:focus,ul > li:focus{border:1px solid #0a84ff;border-radius:2px;box-shadow:0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3)}.selected{border:1px solid #30e60b;border-radius:2px;box-shadow:0 0 0 1px #30e60b, 0 0 0 4px rgba(48, 230, 11, 0.3)}ul > li{font-style:italic;width:max-content}:focus{outline:none}::-moz-focus-inner{border:0}`;

const Paper = entries => {
  const paper = createElement('section');
  const style = createElement('style', styles);
  const title = createElement('h1.title', entries[0].word);
  const meaningsList = createElement('ol');

  entries.forEach(entry => {
    const meaning = createElement('li');
    const meaningSpan = createElement('span.meaning', entry.meaning);
    meaning.tabIndex = '1';
    meaning.appendChild(meaningSpan);
    meaning.addEventListener('keydown', meaningListener);
    meaning.addEventListener('mousedown', event => event.preventDefault());

    const examplesList = createElement('ul');
    entry.examples.forEach(ex => {
      const example = createElement('li', ex);
      example.tabIndex = '1';
      example.addEventListener('keydown', exampleListener);
      example.addEventListener('mousedown', event => event.preventDefault());
      examplesList.appendChild(example);
    });

    meaning.appendChild(examplesList);
    meaningsList.appendChild(meaning);
  });

  [style, title, meaningsList].forEach(el => paper.appendChild(el));
  setTimeout(() => meaningsList.querySelector('li').focus(), 0);
  return paper;
};

export default Paper;
