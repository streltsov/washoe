import {createElement, styleElement} from '../dom-utils';

const spinnerImage =
  'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzNweCIgaGVpZ2h0PSI3M3B4IiB2aWV3Qm94PSIwIDAgNzMgNzMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8ZGVmcz4gICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iOTMuMDkyODA5NiUiIHkxPSI1Mi43NzM0Mzc1JSIgeDI9IjY4LjUxMzMzOTglIiB5Mj0iMTE5LjMyNjAwNyUiIGlkPSJsaW5lYXJHcmFkaWVudC0xIj4gICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMEE4NEZGIiBzdG9wLW9wYWNpdHk9IjAiIG9mZnNldD0iMCUiLz4gICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMEE4NEZGIiBvZmZzZXQ9IjY5LjM2OTgxODIlIi8+ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzBBODRGRiIgb2Zmc2V0PSIxMDAlIi8+ICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzI0ODRDNiIgc3RvcC1vcGFjaXR5PSIwLjAwNDc3NzY2OTUxIiBvZmZzZXQ9IjEwMCUiLz4gICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMjQ4NEM2IiBzdG9wLW9wYWNpdHk9IjAiIG9mZnNldD0iMTAwJSIvPiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMyNDg0QzYiIHN0b3Atb3BhY2l0eT0iMCIgb2Zmc2V0PSIxMDAlIi8+ICAgICAgICA8L2xpbmVhckdyYWRpZW50PiAgICAgICAgPHJlY3QgaWQ9InBhdGgtMiIgeD0iMCIgeT0iMCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjYwIi8+ICAgIDwvZGVmcz4gICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+ICAgICAgICA8ZyBpZD0iU2hhcGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC01LjAwMDAwMCwgLTEuMDAwMDAwKSI+ICAgICAgICAgICAgPHBhdGggZD0iTTQxLjgsNzMuOCBDMjEuOSw3My44IDUuOCw1Ny43IDUuOCwzNy44IEM1LjgsMTguMSAyMS42LDIuMiA0MS4xLDEuOCBDNDEuMywxLjggNDEuNCwxLjggNDEuNCwxLjggQzQxLjUsMS44IDQxLjcsMS44IDQxLjgsMS44IEM0NC42LDIuMiA0Ni44LDQuNSA0Ni44LDcuMyBDNDYuOCwxMC4xIDQ0LjYsMTIuNSA0MS44LDEyLjcgQzI4LDEyLjggMTYuOCwyNCAxNi44LDM3LjggQzE2LjgsNTEuNiAyOCw2Mi44IDQxLjgsNjIuOCBDNTUuNiw2Mi44IDY2LjgsNTEuNiA2Ni44LDM3LjggTDc3LjgsMzcuOCBDNzcuOCw1Ny43IDYxLjcsNzMuOCA0MS44LDczLjggWiIgZmlsbD0idXJsKCNsaW5lYXJHcmFkaWVudC0xKSIvPiAgICAgICAgICAgIDxtYXNrIGlkPSJtYXNrLTMiIGZpbGw9IndoaXRlIj4gICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0yIi8+ICAgICAgICAgICAgPC9tYXNrPiAgICAgICAgICAgIDxnIGlkPSJNYXNrIi8+ICAgICAgICAgICAgPHBhdGggZD0iTTQxLjgsNzMuOCBDMjEuOSw3My44IDUuOCw1Ny43IDUuOCwzNy44IEM1LjgsMTguMSAyMS42LDIuMiA0MS4xLDEuOCBDNDEuMywxLjggNDEuNCwxLjggNDEuNCwxLjggQzQxLjUsMS44IDQxLjcsMS44IDQxLjgsMS44IEM0NC42LDIuMiA0Ni44LDQuNSA0Ni44LDcuMyBDNDYuOCwxMC4xIDQ0LjYsMTIuNSA0MS44LDEyLjcgQzI4LDEyLjggMTYuOCwyNCAxNi44LDM3LjggQzE2LjgsNTEuNiAyOCw2Mi44IDQxLjgsNjIuOCBDNTUuNiw2Mi44IDY2LjgsNTEuNiA2Ni44LDM3LjggTDc3LjgsMzcuOCBDNzcuOCw1Ny43IDYxLjcsNzMuOCA0MS44LDczLjggWiIgZmlsbD0iIzBBODRGRiIgbWFzaz0idXJsKCNtYXNrLTMpIi8+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=")';

const wrapperStyles = {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '2px',
  backgroundColor: '#333',
  color: 'white',

  position: 'fixed',
  margin: 'auto',
  top: '100px',
  right: 0,
  left: 0,
  width: 'max-content',

  padding: '16px',
  margin: 'auto',
};

const spinnerStyles = {
  width: '32px',
  height: '32px',
  backgroundSize: 'contain',
  backgroundImage: spinnerImage,
  marginLeft: '8px',
};

const Spinner = (text = 'Loading...') => {
  const wrapper = createElement('div.washoe-spinner');
  styleElement(wrapper, wrapperStyles);
  const label = createElement('span', text);
  const spinner = createElement();
  styleElement(spinner, spinnerStyles);

  let deg = 0;
  setInterval(() => {
    deg = deg == 360 ? 0 : deg + 4;
    spinner.style.transform = 'rotate(' + deg + 'deg)';
  }, 10);

  [label, spinner].forEach(el => wrapper.appendChild(el));
  return wrapper;
};

export default Spinner;
