/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/comparison-slider.js":
/*!*************************************!*\
  !*** ./src/js/comparison-slider.js ***!
  \*************************************/
/***/ (() => {

eval("function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n// Before/After Comparison Slider Component\nvar ComparisonSlider = /*#__PURE__*/function () {\n  function ComparisonSlider(element) {\n    _classCallCheck(this, ComparisonSlider);\n    this.container = element;\n    this.handle = this.container.querySelector('.comparison-slider__handle');\n    this.afterImage = this.container.querySelector('.comparison-slider__image--after');\n    if (!this.handle || !this.afterImage) return;\n    this.isActive = false;\n    this.currentX = null;\n    this.init();\n  }\n  return _createClass(ComparisonSlider, [{\n    key: \"init\",\n    value: function init() {\n      // Mouse events\n      this.handle.addEventListener('mousedown', this.startDrag.bind(this));\n      document.addEventListener('mousemove', this.drag.bind(this));\n      document.addEventListener('mouseup', this.endDrag.bind(this));\n\n      // Touch events\n      this.handle.addEventListener('touchstart', this.startDrag.bind(this));\n      document.addEventListener('touchmove', this.drag.bind(this));\n      document.addEventListener('touchend', this.endDrag.bind(this));\n\n      // Click on container to move handle\n      this.container.addEventListener('click', this.moveToClick.bind(this));\n    }\n  }, {\n    key: \"startDrag\",\n    value: function startDrag(e) {\n      e.preventDefault();\n      this.isActive = true;\n      this.container.classList.add('comparison-slider--dragging');\n      document.body.style.cursor = 'col-resize';\n    }\n  }, {\n    key: \"drag\",\n    value: function drag(e) {\n      if (!this.isActive) return;\n      e.preventDefault();\n      var rect = this.container.getBoundingClientRect();\n      var x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;\n      var position = (x - rect.left) / rect.width * 100;\n      position = Math.max(0, Math.min(100, position));\n      this.updatePosition(position);\n    }\n  }, {\n    key: \"endDrag\",\n    value: function endDrag() {\n      this.isActive = false;\n      this.container.classList.remove('comparison-slider--dragging');\n      document.body.style.cursor = '';\n    }\n  }, {\n    key: \"moveToClick\",\n    value: function moveToClick(e) {\n      if (e.target === this.handle || this.isActive) return;\n      var rect = this.container.getBoundingClientRect();\n      var x = e.clientX;\n      var position = (x - rect.left) / rect.width * 100;\n      position = Math.max(0, Math.min(100, position));\n      this.updatePosition(position);\n    }\n  }, {\n    key: \"updatePosition\",\n    value: function updatePosition(position) {\n      this.handle.style.left = \"\".concat(position, \"%\");\n      this.afterImage.style.clipPath = \"inset(0 0 0 \".concat(position, \"%)\");\n    }\n  }]);\n}(); // Initialize all comparison sliders on page load\ndocument.addEventListener('DOMContentLoaded', function () {\n  var sliders = document.querySelectorAll('.comparison-slider');\n  sliders.forEach(function (slider) {\n    return new ComparisonSlider(slider);\n  });\n});\n\n//# sourceURL=webpack://setify/./src/js/comparison-slider.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// Import comparison slider functionality\n__webpack_require__(/*! ./comparison-slider.js */ \"./src/js/comparison-slider.js\");\n\n// Initialize everything when DOM is ready\ndocument.addEventListener('DOMContentLoaded', function () {\n  console.log('Setify website loaded');\n});\n\n//# sourceURL=webpack://setify/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;