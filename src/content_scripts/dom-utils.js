export const styleElement = (element, styles) =>
  Object.keys(styles).forEach(prop => (element.style[prop] = styles[prop]));

export const removeElement = element =>
  document.querySelector(element) && document.querySelector(element).remove();
