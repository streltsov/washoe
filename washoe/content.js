/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content_scripts/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/content_scripts/components/SearchBar.js":
/*!*****************************************************!*\
  !*** ./src/content_scripts/components/SearchBar.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils */ \"./src/content_scripts/dom-utils.js\");\n\n\nconst styles = {\n  zIndex: '2147483647',\n  position: 'fixed',\n  margin: 'auto',\n  top: '100px',\n  right: 0,\n  left: 0,\n\n  maxWidth: '736px',\n  width: '75%',\n  height: '48px',\n  fontSize: '15px',\n  paddingInlineStart: '48px',\n  paddingInlineEnd: '48px',\n  background: '#38383D',\n  borderRadius: '3px',\n  color: 'rgba(249, 249, 250, 1)',\n\n  border: 'solid 1px #0a84ff',\n  boxShadow: '0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3)',\n};\n\nconst SearchBar = onEnter => {\n  const input = document.createElement('input');\n  input.placeholder = 'Search for a word';\n  Object(_dom_utils__WEBPACK_IMPORTED_MODULE_0__[\"styleElement\"])(input, styles);\n  input.addEventListener(\n    'keydown',\n    event => event.keyCode == 13 && onEnter(event.target.value),\n  );\n  setTimeout(() => input.focus(), 0);\n  return input;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SearchBar);\n\n\n//# sourceURL=webpack:///./src/content_scripts/components/SearchBar.js?");

/***/ }),

/***/ "./src/content_scripts/dom-utils.js":
/*!******************************************!*\
  !*** ./src/content_scripts/dom-utils.js ***!
  \******************************************/
/*! exports provided: styleElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"styleElement\", function() { return styleElement; });\nconst styleElement = (element, styles) =>\n  Object.keys(styles).forEach(prop => (element.style[prop] = styles[prop]));\n\n\n//# sourceURL=webpack:///./src/content_scripts/dom-utils.js?");

/***/ }),

/***/ "./src/content_scripts/main.js":
/*!*************************************!*\
  !*** ./src/content_scripts/main.js ***!
  \*************************************/
/*! exports provided: createElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony import */ var _components_SearchBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/SearchBar */ \"./src/content_scripts/components/SearchBar.js\");\n\n\ndocument.addEventListener('keydown', event => {\n  if (event.ctrlKey && event.keyCode == 191) {\n    event.stopPropagation();\n    event.preventDefault();\n    //    removeShadowDom();\n    //showElement(SearchBar(), '.search-bar');\n    document.body.appendChild(Object(_components_SearchBar__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(console.log));\n  }\n});\n\nconst showElement = (element, classes = '') => {\n  const shadowRoot = createElement('div.wsh-shadow-root' + classes);\n  const shadow = shadowRoot.attachShadow({mode: 'closed'});\n  shadow.appendChild(element);\n  document.body.appendChild(shadowRoot);\n};\n\nconst createElement = (el = 'div', text = '') => {\n  const element = document.createElement(el.split('.')[0]);\n  el.split('.')[1]\n    ? (element.className = el\n        .split('.')\n        .slice(1)\n        .join(' '))\n    : null;\n  element.textContent = text;\n  return element;\n};\n\n\n//# sourceURL=webpack:///./src/content_scripts/main.js?");

/***/ })

/******/ });