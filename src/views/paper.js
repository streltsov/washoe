import {createElement} from '../utils';

export const styles = `section{position:fixed;top:0;bottom:0;left:0;right:0;margin:auto;max-width:75%;max-height:75%;background-color:#f9f9fa;border:2px solid #d7d7db;padding:16px;overflow:auto;z-index:99999999}ol>li{font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:18px;font-stretch:normal;letter-spacing:0.2px;line-height:22px;padding-bottom:16px}ul>li{font-style:italic}:focus{outline:none}::-moz-focus-inner{border:0}`;

const Paper = defs => {
  const paper = createElement('section');
  const style = createElement('style', '', styles);
  const meaningsList = createElement('ol');

  defs.forEach(def => {
    const meaning = createElement('li', '', def.meaning);
    const examplesList = createElement('ul');
    def.examples.forEach(ex => {
      const example = createElement('li', '', ex);
      examplesList.appendChild(example);
    });
    meaning.appendChild(examplesList);
    meaningsList.appendChild(meaning);
  });

  paper.appendChild(style);
  paper.appendChild(meaningsList);
  setTimeout(() => title.focus(), 0);
  return paper;
};

export default Paper;
