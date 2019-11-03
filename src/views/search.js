import {createElement} from '../utils';

const styles = `input{border:1px solid #0a84ff;box-shadow:0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3);border-radius:2px;height:48px;min-width:440px;font-size:24px;padding:0 12px}input::placeholder{color:#737373}section{padding:36px 52px;border:2px solid #d7d7db;border-radius:4px;max-width:min-content;position:fixed;top:100px;right:0;left:0;margin:0 auto;background-color:#f9f9fa}`;

const Search = onSubmit => {
  const container = createElement('section');
  const style = createElement('style', '', styles);
  const input = createElement('input');
  input.placeholder = 'Type word or phrase';
  input.addEventListener('keydown', event =>
    event.keyCode == 13
      ? (container.parentNode.host.remove(), onSubmit(event.target.value))
      : null,
  );
  container.appendChild(style);
  container.appendChild(input);
  setTimeout(() => input.focus(), 0);
  return container;
};

export default Search;
