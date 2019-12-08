export const styleElement = (element, styles) =>
  Object.keys(styles).forEach(prop => (element.style[prop] = styles[prop]));
