import {createElement} from '../utils';

const styles = `
section{
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    max-width:75%;
    max-height:75%;
    background-color:#f9f9fa;
    border:2px solid #d7d7db;
    border-radius:2px;
    padding:16px;
    overflow:auto;
    z-index:99999999
}
ol>li{
    font-family:'Open Sans',Helvetica,Arial,sans-serif;
    font-size:18px;
    font-stretch:normal;
    letter-spacing:0.2px;
    line-height:22px;
    padding-bottom:16px
}
ol>li:focus,
ul>li:focus{
    border:1px solid #0a84ff;
    border-radius:2px;
    box-shadow:0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3);
}
.selected {
    border:1px solid #30e60b;
    border-radius:2px;
    box-shadow:0 0 0 1px #30e60b, 0 0 0 4px rgba(48, 230, 11, 0.3)
}
ul>li{
    font-style:italic;
    width: max-content;
}
:focus{
    outline:none
}
::-moz-focus-inner{
    border:0
}

`;
const Paper = (entries, onChoose = x => x) => {
  const onMeaningSelect = node => {
    node.classList.add('selected');
    node.querySelectorAll('li').forEach(li => (li.tabIndex = '1'));
    node.querySelector('li').focus();
  };

  const meaningListener = event => {
    event.keyCode == 74 && event.target.nextSibling.focus();
    event.keyCode == 75 && event.target.previousSibling.focus();
    event.keyCode == 13 && onMeaningSelect(event.target);
  };

  const exampleListener = event => {
    event.stopPropagation();
    event.keyCode == 74 && event.target.nextSibling.focus();
    event.keyCode == 75 && event.target.previousSibling.focus();
    event.keyCode == 13 && console.log(event.target);
    if (event.keyCode == 27 || (event.ctrlKey && event.keyCode == 219)) {
      event.preventDefault();
      const meaning = event.target.parentElement.parentElement;
      meaning.classList.remove('selected');
      meaning.focus();
    }
  };

  const paper = createElement('section');
  const style = createElement('style', styles);
  const meaningsList = createElement('ol');

  entries.forEach(entry => {
    const meaning = createElement('li', entry.meaning);
    meaning.tabIndex = '1';
    meaning.addEventListener('keydown', meaningListener);

    const examplesList = createElement('ul');

    entry.examples.forEach(ex => {
      const example = createElement('li', ex);
      example.addEventListener('keydown', exampleListener);
      examplesList.appendChild(example);
    });

    meaning.appendChild(examplesList);
    meaningsList.appendChild(meaning);
  });

  paper.appendChild(style);
  paper.appendChild(meaningsList);
  setTimeout(() => meaningsList.querySelector('li').focus(), 0);
  return paper;
};

export default Paper;
