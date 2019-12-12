(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Expand", [], factory);
	else if(typeof exports === 'object')
		exports["Expand"] = factory();
	else
		root["Expand"] = factory();
})(window, function() {
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
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Expand; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Expand =
/*#__PURE__*/
function () {
  /**
   * Constructor
   */
  function Expand(options) {
    var _this = this;

    _classCallCheck(this, Expand);

    var eventHandlers = ['resizeHandler', 'clickHandler', 'touchstartHandler', 'touchendHandler', 'touchmoveHandler', 'mousedownHandler', 'mouseupHandler', 'mouseleaveHandler', 'mousemoveHandler'];
    this.config = Expand.settingsOverride(options);
    this.selector = typeof this.config.selector === 'string' ? document.querySelector(this.config.selector) : this.config.selector; // Create global references

    this.selectorWidth = this.selector.offsetWidth;
    this.innerItems = [].slice.call(this.selector.children);
    this.curSlide = this.config.loop ? this.config.startIndex % this.innerItems.length : Math.max(0, Math.min(this.config.startIndex, this.innerItems.length - this.visibleSlides)); // Event handler binding

    eventHandlers.forEach(function (method) {
      _this[method] = _this[method].bind(_this);
    });
    this.slidesAmount();
    this.init();
  }
  /**
   * Overrides default settings with custom ones.
   */


  _createClass(Expand, [{
    key: "attachEvents",

    /**
     * Attaches listeners to required events.
     */
    value: function attachEvents() {
      // If element is draggable / swipable
      if (this.config.draggable) {
        this.pointerDown = false;
        this.drag = {
          startXAxis: 0,
          endXAxis: 0,
          startYAxis: 0,
          endYAxis: 0,
          dragOff: null,
          preventClick: false
        }; // add event handlers

        window.addEventListener('resize', this.resizeHandler);
        this.selector.addEventListener('click', this.clickHandler);
        this.selector.addEventListener('touchstart', this.touchstartHandler);
        this.selector.addEventListener('touchend', this.touchendHandler);
        this.selector.addEventListener('touchmove', this.touchmoveHandler);
        this.selector.addEventListener('mousedown', this.mousedownHandler);
        this.selector.addEventListener('mouseup', this.mouseupHandler);
        this.selector.addEventListener('mouseleave', this.mouseleaveHandler);
        this.selector.addEventListener('mousemove', this.mousemoveHandler);
      }
    }
    /**
     * Builds the markup and attaches listeners to required events.
     */

  }, {
    key: "init",
    value: function init() {
      this.attachEvents();
      this.selector.classList.add('expand-js'); // inline css or with classes for more customizability

      if (this.config.useCssFile) {
        this.selector.classList.add('-hidden');

        if (this.config.rtl) {
          this.selector.classList.add('-rtl');
        }
      } else {
        this.selector.style.overflow = 'hidden';
        this.selector.style.direction = this.config.rtl ? 'rtl' : 'ltr'; // rtl or ltr
      } // Build container and slide to current item


      this.sliderContainerCreate();
      this.config.onInit.call(this);
    }
    /**
     * Build container and slide to current item
     */

  }, {
    key: "sliderContainerCreate",
    value: function sliderContainerCreate() {
      var widthItem = this.selectorWidth / this.visibleSlides;
      var itemWidthCalc = this.config.loop ? 2 * this.visibleSlides + this.innerItems.length : this.innerItems.length; // Create frame and apply styling

      this.slideItem = document.createElement('div');
      this.slideItem.classList.add('expand-js--container');
      this.slideItem.style.width = "".concat(widthItem * itemWidthCalc, "px");
      this.isTransition(); // Create a document fragment to put slides into it

      var slides = document.createDocumentFragment(); // Loop through the slides, add styling and add them to document fragment

      if (this.config.loop) {
        for (var i = this.innerItems.length - this.visibleSlides; i < this.innerItems.length; i += 1) {
          var element = this.createSliderItem(this.innerItems[i].cloneNode(true));
          slides.appendChild(element);
        }
      }

      for (var _i = 0; _i < this.innerItems.length; _i += 1) {
        var _element = this.createSliderItem(this.innerItems[_i]);

        slides.appendChild(_element);
      }

      if (this.config.loop) {
        for (var _i2 = 0; _i2 < this.visibleSlides; _i2 += 1) {
          var _element2 = this.createSliderItem(this.innerItems[_i2].cloneNode(true));

          slides.appendChild(_element2);
        }
      } // Add fragment to the frame


      this.selector.innerHTML = '';
      this.slideItem.appendChild(slides);
      this.selector.appendChild(this.slideItem); // Go to currently active slide after initial build

      this.slideToCurrent();
    }
  }, {
    key: "createSliderItem",
    value: function createSliderItem(item) {
      var itemContainer = document.createElement('div');

      if (this.config.useCssFile) {
        itemContainer.classList.add('expand-js--item');

        if (this.config.rtl) {
          itemContainer.classList.add('f-right');
        } else {
          itemContainer.classList.add('f-left');
        }
      } else {
        itemContainer.style.cssFloat = this.config.rtl ? 'right' : 'left';
      }

      itemContainer.style.width = "".concat(this.config.loop ? 100 / (this.innerItems.length + this.visibleSlides * 2) : 100 / this.innerItems.length, "%");
      itemContainer.appendChild(item);
      return itemContainer;
    }
    /**
     * sets amount of visible slides based on viewport (fixed number or object value for responsive changes)
     */

  }, {
    key: "slidesAmount",
    value: function slidesAmount() {
      var _this2 = this;

      if (typeof this.config.visibleSlides === 'number') {
        this.visibleSlides = this.config.visibleSlides;
      } else if (_typeof(this.config.visibleSlides) === 'object') {
        this.visibleSlides = 1;
        Object.keys(this.config.visibleSlides).forEach(function (key) {
          if (window.innerWidth >= key) {
            _this2.visibleSlides = _this2.config.visibleSlides[key];
          }
        });
      }
    }
    /**
     * Previous slide
     */

  }, {
    key: "prevSlide",
    value: function prevSlide() {
      var countSlides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      // early return if no slides
      if (this.innerItems.length <= this.visibleSlides) {
        return;
      }

      var curSlideCheck = this.curSlide;

      if (this.config.loop) {
        var isCloneSlide = this.curSlide - countSlides < 0;

        if (isCloneSlide) {
          var cloneIndex = this.curSlide + this.innerItems.length;
          var cloneIndexOffset = this.visibleSlides;
          var newPos = cloneIndex + cloneIndexOffset;
          var offset = (this.config.rtl ? 1 : -1) * newPos * (this.selectorWidth / this.visibleSlides);
          var dragDistance = this.config.draggable ? this.drag.endXAxis - this.drag.startXAxis : 0;
          this.isNotTransition();
          this.slideItem.style.transform = "translate3d(".concat(offset + dragDistance, "px, 0, 0)");
          this.curSlide = cloneIndex - countSlides;
        } else {
          this.curSlide -= countSlides;
        }
      } else {
        this.curSlide = Math.max(this.curSlide - countSlides, 0);
      }

      if (curSlideCheck !== this.curSlide) {
        this.slideToCurrent(this.config.loop);
        this.config.onChange.call(this);
      }
    }
    /**
     * Next slide
     */

  }, {
    key: "nextSlide",
    value: function nextSlide() {
      var countSlides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      // early return when there is nothing to slide
      if (this.innerItems.length <= this.visibleSlides) {
        return;
      }

      var curSlideCheck = this.curSlide;

      if (this.config.loop) {
        var isCloneSlide = this.curSlide + countSlides > this.innerItems.length - this.visibleSlides;

        if (isCloneSlide) {
          this.isNotTransition();
          var cloneIndex = this.curSlide - this.innerItems.length;
          var cloneIndexOffset = this.visibleSlides;
          var newPos = cloneIndex + cloneIndexOffset;
          var offset = (this.config.rtl ? 1 : -1) * newPos * (this.selectorWidth / this.visibleSlides);
          var dragDistance = this.config.draggable ? this.drag.endXAxis - this.drag.startXAxis : 0;
          this.slideItem.style.transform = "translate3d(".concat(offset + dragDistance, "px, 0, 0)");
          this.curSlide = cloneIndex + countSlides;
        } else {
          this.curSlide += countSlides;
        }
      } else {
        this.curSlide = Math.min(this.curSlide + countSlides, this.innerItems.length - this.visibleSlides);
      }

      if (curSlideCheck !== this.curSlide) {
        this.slideToCurrent(this.config.loop);
        this.config.onChange.call(this);
      }
    }
    /**
     * Disable transition on slideItem.
     */

  }, {
    key: "isNotTransition",
    value: function isNotTransition() {
      this.slideItem.style.webkitTransition = "all 0ms ".concat(this.config.easeMode);
      this.slideItem.style.transition = "all 0ms ".concat(this.config.easeMode);
    }
    /**
     * Enable transition on slideItem.
     */

  }, {
    key: "isTransition",
    value: function isTransition() {
      this.slideItem.style.webkitTransition = "all ".concat(this.config.duration, "ms ").concat(this.config.easeMode);
      this.slideItem.style.transition = "all ".concat(this.config.duration, "ms ").concat(this.config.easeMode);
    }
    /**
     * Go to specific slide method
     */

  }, {
    key: "goToSlide",
    value: function goToSlide(index) {
      if (this.innerItems.length <= this.visibleSlides) {
        return;
      }

      var curSlideCheck = this.curSlide;
      this.curSlide = this.config.loop ? index % this.innerItems.length : Math.min(Math.max(index, 0), this.innerItems.length - this.visibleSlides);

      if (curSlideCheck !== this.curSlide) {
        this.slideToCurrent();
        this.config.onChange.call(this);
      }
    }
    /**
     * Jump to active slide
     */

  }, {
    key: "slideToCurrent",
    value: function slideToCurrent(isTransition) {
      var _this3 = this;

      var curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
      var offset = (this.config.rtl ? 1 : -1) * curSlide * (this.selectorWidth / this.visibleSlides);

      if (isTransition) {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            _this3.isTransition();

            _this3.slideItem.style.transform = "translate3d(".concat(offset, "px, 0, 0)");
          });
        });
      } else {
        this.slideItem.style.transform = "translate3d(".concat(offset, "px, 0, 0)");
      }
    }
    /**
     * Get new position after dragging
     */

  }, {
    key: "updateAfterDrag",
    value: function updateAfterDrag() {
      var movement = (this.config.rtl ? -1 : 1) * (this.drag.endXAxis - this.drag.startXAxis);
      var moveDistance = Math.abs(movement);
      var slideableSlides = this.config.multipleDrag ? Math.ceil(moveDistance / (this.selectorWidth / this.visibleSlides)) : 1;
      var slideToNegativeClone = movement > 0 && this.curSlide - slideableSlides < 0;
      var slideToPositiveClone = movement < 0 && this.curSlide + slideableSlides > this.innerItems.length - this.visibleSlides;

      if (movement > 0 && moveDistance > this.config.triggerDistance && this.innerItems.length > this.visibleSlides) {
        this.prevSlide(slideableSlides);
      } else if (movement < 0 && moveDistance > this.config.triggerDistance && this.innerItems.length > this.visibleSlides) {
        this.nextSlide(slideableSlides);
      }

      this.slideToCurrent(slideToNegativeClone || slideToPositiveClone);
    }
    /**
     * dynamic item sizes for browser scaling
     */

  }, {
    key: "resizeHandler",
    value: function resizeHandler() {
      this.slidesAmount();

      if (this.curSlide + this.visibleSlides > this.innerItems.length) {
        this.curSlide = this.innerItems.length <= this.visibleSlides ? 0 : this.innerItems.length - this.visibleSlides;
      }

      this.selectorWidth = this.selector.offsetWidth;
      this.sliderContainerCreate();
    }
  }, {
    key: "stopDragging",
    value: function stopDragging() {
      this.drag = {
        startXAxis: 0,
        endXAxis: 0,
        startYAxis: 0,
        dragOff: null,
        preventClick: this.drag.preventClick
      };
    }
    /**
     * Remove item method
     */

  }, {
    key: "remove",
    value: function remove(index) {
      var lowerIndex = index < this.curSlide;
      var lastItem = this.curSlide + this.visibleSlides - 1 === index;

      if (lowerIndex || lastItem) {
        this.curSlide -= 1;
      }

      this.innerItems.splice(index, 1); // build a frame and slide to a curSlide

      this.sliderContainerCreate();
    }
    /**
     * Insert item method
     */

  }, {
    key: "insert",
    value: function insert(item, index) {
      this.innerItems.splice(index, 0, item);
      this.sliderContainerCreate();
    }
    /**
     * Prepend item method
     */

  }, {
    key: "prepend",
    value: function prepend(item) {
      this.insert(item, 0);
    }
    /**
     * Append item method
     */

  }, {
    key: "append",
    value: function append(item) {
      this.insert(item, this.innerItems.length + 1);
    }
    /**
     * click event handler
     */

  }, {
    key: "clickHandler",
    value: function clickHandler(e) {
      // prevent clicking link on dragging
      // (note: if subitems inside slide, you need zo set `pointer-events: none` via css.)
      if (this.drag.preventClick) {
        e.preventDefault();
      }

      this.drag.preventClick = false;
    }
    /**
     * mousedown event handler
     */

  }, {
    key: "mousedownHandler",
    value: function mousedownHandler(e) {
      e.preventDefault();
      e.stopPropagation();
      this.pointerDown = true;
      this.drag.startXAxis = e.pageX;
    }
    /**
     * mouseup event handler
     */

  }, {
    key: "mouseupHandler",
    value: function mouseupHandler(e) {
      e.stopPropagation();
      this.pointerDown = false;
      this.selector.style.cursor = '-webkit-grab';
      this.isTransition();

      if (this.drag.endXAxis) {
        this.updateAfterDrag();
      }

      this.stopDragging();
    }
    /**
     * mousemove event handler
     */

  }, {
    key: "mousemoveHandler",
    value: function mousemoveHandler(e) {
      e.preventDefault();

      if (this.pointerDown) {
        if (e.target.nodeName === 'A') {
          this.drag.preventClick = true;
        }

        this.drag.endXAxis = e.pageX;
        this.selector.style.cursor = '-webkit-grabbing';
        this.slideItem.style.webkitTransition = "all 0ms ".concat(this.config.easeMode);
        this.slideItem.style.transition = "all 0ms ".concat(this.config.easeMode);
        var curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
        var currentOffset = curSlide * (this.selectorWidth / this.visibleSlides);
        var dragOffset = this.drag.endXAxis - this.drag.startXAxis;
        var offset = this.config.rtl ? currentOffset + dragOffset : currentOffset - dragOffset;
        this.slideItem.style.transform = "translate3d(".concat((this.config.rtl ? 1 : -1) * offset, "px, 0, 0)");
      }
    }
    /**
     * mouseleave event handler
     */

  }, {
    key: "mouseleaveHandler",
    value: function mouseleaveHandler(e) {
      if (this.pointerDown) {
        this.pointerDown = false;
        this.selector.style.cursor = '-webkit-grab';
        this.drag.endXAxis = e.pageX;
        this.drag.preventClick = false;
        this.isTransition();
        this.updateAfterDrag();
        this.stopDragging();
      }
    }
    /**
     * touchstart event handler
     */

  }, {
    key: "touchstartHandler",
    value: function touchstartHandler(e) {
      e.stopPropagation();
      this.drag.startXAxis = e.touches[0].pageX;
      this.drag.startYAxis = e.touches[0].pageY;
      this.pointerDown = true;
    }
    /**
     * touchend event handler
     */

  }, {
    key: "touchendHandler",
    value: function touchendHandler(e) {
      e.stopPropagation();
      this.pointerDown = false;
      this.isTransition();

      if (this.drag.endXAxis) {
        this.updateAfterDrag();
      }

      this.stopDragging();
    }
    /**
     * touchmove event handler
     */

  }, {
    key: "touchmoveHandler",
    value: function touchmoveHandler(e) {
      e.stopPropagation();

      if (this.drag.dragOff === null) {
        this.drag.dragOff = Math.abs(this.drag.startYAxis - e.touches[0].pageY) < Math.abs(this.drag.startXAxis - e.touches[0].pageX);
      }

      if (this.pointerDown && this.drag.dragOff) {
        e.preventDefault();
        this.drag.endXAxis = e.touches[0].pageX;
        this.slideItem.style.webkitTransition = "0 all ".concat(this.config.easeMode, " ");
        this.slideItem.style.transition = "0 all ".concat(this.config.easeMode, " ");
        var curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
        var currentOffset = curSlide * (this.selectorWidth / this.visibleSlides);
        var dragOffset = this.drag.endXAxis - this.drag.startXAxis;
        var offset = this.config.rtl ? currentOffset + dragOffset : currentOffset - dragOffset;
        this.slideItem.style.transform = "translate3d(".concat((this.config.rtl ? 1 : -1) * offset, "px, 0, 0)");
      }
    }
    /**
     * destroy method
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var restore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // remove listeners
      window.removeEventListener('resize', this.resizeHandler);
      this.selector.removeEventListener('click', this.clickHandler);
      this.selector.removeEventListener('mouseup', this.mouseupHandler);
      this.selector.removeEventListener('mousedown', this.mousedownHandler);
      this.selector.removeEventListener('mouseleave', this.mouseleaveHandler);
      this.selector.removeEventListener('mousemove', this.mousemoveHandler);
      this.selector.removeEventListener('touchstart', this.touchstartHandler);
      this.selector.removeEventListener('touchend', this.touchendHandler);
      this.selector.removeEventListener('touchmove', this.touchmoveHandler); // restore to initial markup

      if (restore) {
        var slides = document.createDocumentFragment();

        for (var i = 0; i < this.innerItems.length; i += 1) {
          slides.appendChild(this.innerItems[i]);
        }

        this.selector.innerHTML = '';
        this.selector.appendChild(slides).removeAttribute('style');
      }
    }
  }], [{
    key: "settingsOverride",
    value: function settingsOverride(options) {
      var settings = {
        selector: '.expand-js',
        visibleSlides: 1,
        useCssFile: 0,
        cssCustomPath: '',
        startIndex: 0,
        draggable: true,
        multipleDrag: true,
        triggerDistance: 20,
        loop: false,
        rtl: false,
        duration: 200,
        easeMode: 'ease-out',
        onInit: function onInit() {},
        onChange: function onChange() {}
      };
      return _objectSpread({}, settings, {}, options);
    }
  }]);

  return Expand;
}();



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "expand.min.css";

/***/ })
/******/ ]);
});