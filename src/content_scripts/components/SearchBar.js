import {styleElement} from '../dom-utils';

const styles = {
  position: 'absolute',
  margin: 'auto',
  top: 100,
  left: 0,
  right: 0,
};

const SearchBar = onEnter => {
  const input = document.createElement('input');
  styleElement(input, styles);
  input.addEventListener(
    'keydown',
    event => event.keyCode == 13 && onEnter(event.target.value),
  );
  setTimeout(() => input.focus(), 0);
  return input;
};

export default SearchBar;
