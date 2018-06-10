(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash.debounce"));
	else if(typeof define === 'function' && define.amd)
		define("dyna-ui-dom-observer", ["lodash.debounce"], factory);
	else if(typeof exports === 'object')
		exports["dyna-ui-dom-observer"] = factory(require("lodash.debounce"));
	else
		root["dyna-ui-dom-observer"] = factory(root["lodash.debounce"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DynaDomObserver_1 = __webpack_require__(1);
exports.DynaDomObserver = DynaDomObserver_1.DynaDomObserver;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var debounce = __webpack_require__(2);
var EChangeType;
(function (EChangeType) {
    EChangeType["ATTR_CHANGE"] = "ATTR_CHANGE";
    EChangeType["SUB_NODES_CHANCES"] = "SUB_NODES_CHANCES";
})(EChangeType = exports.EChangeType || (exports.EChangeType = {}));
var defaultConfig = {
    rootNode: document.body,
    detectChanges: [
        EChangeType.ATTR_CHANGE,
        EChangeType.SUB_NODES_CHANCES,
    ],
    debounceTime: 300,
    onChange: function (mutations) { return undefined; },
};
// dev help: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
var DynaDomObserver = /** @class */ (function () {
    function DynaDomObserver(config) {
        this.config = config;
        this.collectedMutations = [];
        this.config = __assign({}, defaultConfig, this.config);
        this.handleDomChange = debounce(this.handleDomChange.bind(this), this.config.debounceTime, { leading: true, maxWait: this.config.debounceTime });
        this.initDomObserverForChanges();
    }
    DynaDomObserver.prototype.dispose = function () {
        this.domObserver.disconnect();
    };
    DynaDomObserver.prototype.initDomObserverForChanges = function () {
        var _this = this;
        this.domObserver = new MutationObserver(function (mutations, observer) {
            if (mutations.length) {
                _this.collectedMutations = _this.collectedMutations.concat(mutations);
                _this.handleDomChange();
            }
        });
        this.domObserver.observe(this.config.rootNode, {
            attributes: this.config.detectChanges.indexOf(EChangeType.ATTR_CHANGE) > -1,
            childList: this.config.detectChanges.indexOf(EChangeType.SUB_NODES_CHANCES) > -1,
            subtree: this.config.detectChanges.indexOf(EChangeType.SUB_NODES_CHANCES) > -1,
        });
    };
    DynaDomObserver.prototype.handleDomChange = function () {
        var mutations = this.collectedMutations.concat();
        this.collectedMutations = [];
        this.config.onChange(mutations);
    };
    return DynaDomObserver;
}());
exports.DynaDomObserver = DynaDomObserver;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("lodash.debounce");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});