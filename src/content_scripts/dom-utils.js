export const createElement = (el = 'div', text = '') => {
  const element = document.createElement(el.split('.')[0]);
  el.split('.')[1]
    ? (element.className = el
        .split('.')
        .slice(1)
        .join(' '))
    : null;
  element.textContent = text;
  return element;
};

export const styleElement = (element, styles) =>
  Object.keys(styles).forEach(prop => (element.style[prop] = styles[prop]));

export const removeElement = element =>
  document.querySelector(element) && document.querySelector(element).remove();
