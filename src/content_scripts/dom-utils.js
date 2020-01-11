export const createElement = (el = 'div', text = '') => {
  const [tagName, ...classNames] = el.match(/[^\.]+/g);
  const element = document.createElement(tagName);
  element.className = classNames.join(' ');
  element.textContent = text;
  return element;
};

export const isElementExistsOnPage = element =>
  Boolean(document.querySelector(element));

export const styleElement = (element, styles) =>
  Object.keys(styles).forEach(prop => (element.style[prop] = styles[prop]));

export const removeElement = element =>
  document.querySelector(element) && document.querySelector(element).remove();
