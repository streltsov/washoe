import {styleElement} from '../dom-utils';

const styles = {
  zIndex: '2147483647',
  position: 'fixed',
  margin: 'auto',
  top: '100px',
  right: 0,
  left: 0,

  maxWidth: '736px',
  width: '75%',
  height: '48px',
  fontSize: '15px',
  paddingInlineStart: '48px',
  paddingInlineEnd: '48px',
  background: '#38383D',
  borderRadius: '3px',
  color: 'rgba(249, 249, 250, 1)',

  border: 'solid 1px #0a84ff',
  boxShadow: '0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3)',
};

const SearchBar = onEnter => {
  const input = document.createElement('input');
  input.placeholder = 'Search for a word';
  styleElement(input, styles);
  input.addEventListener(
    'keydown',
    event => event.keyCode == 13 && onEnter(event.target.value),
  );
  setTimeout(() => input.focus(), 0);
  return input;
};

export default SearchBar;
