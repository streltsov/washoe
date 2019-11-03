import {createElement} from '../utils';

const styles = `section{position:fixed;top:0;bottom:0;left:0;right:0;margin:auto;max-width:75%;max-height:75%;background-color:#f9f9fa;border:2px solid #d7d7db;border-radius:2px;padding:16px;overflow:auto;z-index:99999999}ol>li{font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:18px;font-stretch:normal;letter-spacing:0.2px;line-height:22px;padding-bottom:16px}ol>li:focus{border:1px solid #0a84ff;box-shadow:0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3);border-radius:2px;}ul>li{font-style:italic}:focus{outline:none}::-moz-focus-inner{border:0}`;

const Paper = (entries, onEntrySelect = x => x) => {
  const paper = createElement('section');
  const style = createElement('style', styles);
  const meaningsList = createElement('ol');

  entries.forEach(entry => {
    const meaning = createElement('li', entry.meaning);
    meaning.tabIndex = '1';
    const examplesList = createElement('ul');

    entry.examples.forEach(ex => {
      const example = createElement('li', ex);
      examplesList.appendChild(example);
    });

    meaning.appendChild(examplesList);
    meaningsList.appendChild(meaning);
  });

  paper.addEventListener('keydown', event => {
    event.keyCode == 74 ? event.target.nextSibling.focus() : null;
    event.keyCode == 75 ? event.target.previousSibling.focus() : null;
    event.keyCode == 13 ? onEntrySelect(event.target) : null;
  });

  paper.appendChild(style);
  paper.appendChild(meaningsList);
  setTimeout(() => meaningsList.querySelector('li').focus(), 0);
  return paper;
};

export default Paper;
