var Expand;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 837:
/***/ ((module, exports) => {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * ExpandJS
 *
 * @author Fabian Esser <post@faesslich.de>
 * @github https://github.com/faesslich/expand
 * @description Expand - the lightweight pure JS carousel/slider
 * @version 0.9.0
 */
var Expand = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param options
   * @param dataOptions
   */
  function Expand(options, dataOptions) {
    var _this = this;

    _classCallCheck(this, Expand);

    var eventHandlers = ['resizeHandler', 'clickHandler', 'touchstartHandler', 'touchendHandler', 'touchmoveHandler', 'mousedownHandler', 'mouseupHandler', 'mouseleaveHandler', 'mousemoveHandler'];
    this.config = Expand.settingsOverride(options, dataOptions);
    this.selector = typeof this.config.selector === 'string' ? document.querySelector(this.config.selector) : this.config.selector; // Create global references

    this.selectorWidth = this.selector.offsetWidth;
    this.innerItems = [].slice.call(this.selector.children);
    this.curSlide = this.config.loop ? this.config.startIndex % this.innerItems.length : Math.max(0, Math.min(this.config.startIndex, this.innerItems.length - this.visibleSlides)) || 0; // Event handler binding

    eventHandlers.forEach(function (method) {
      _this[method] = _this[method].bind(_this);
    });
    this.slidesAmount();
    this.init();
  }
  /**
   * Overrides default settings with custom ones.
   * @param options
   * @param dataOptions
   * @returns {
   * {
   * useCssFile: boolean, centerModeRange: boolean, prevArrowInner: string, nextArrowInner: string, arrows: boolean,
   * autoplayDuration: number, prevArrowClass: string, duration: number, startIndex: number, nextArrowClass: string,
   * multipleDrag: boolean, draggable: boolean, activeClass: boolean, onInit: function(), loop: boolean,
   * gap: number, selector: string, visibleSlides: number, slidesToSlide: number, keyboard: boolean,
   * onChange: function(), cssCustomPath: string, triggerDistance: number, centerMode: boolean,
   * itemSelector: string, rtl: boolean, autoplay: boolean, easeMode: string, arrowsVisible: boolean,
   * pagination: boolean, paginationVisible: boolean, paginationType: string, paginationContainer: string,
   * paginationItemSelector: string, paginationItemActiveClass: string
   * }
   * }
   */


  _createClass(Expand, [{
    key: "attachEvents",
    value:
    /**
     * Attaches listeners to required events.
     */
    function attachEvents() {
      // If element is draggable / swipeable
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

        window.addEventListener('resize', this.resizeHandler, {
          passive: false
        });
        this.selector.addEventListener('click', this.clickHandler, {
          passive: false
        });
        this.selector.addEventListener('touchstart', this.touchstartHandler, {
          passive: false
        });
        this.selector.addEventListener('touchend', this.touchendHandler, {
          passive: false
        });
        this.selector.addEventListener('touchmove', this.touchmoveHandler, {
          passive: false
        });
        this.selector.addEventListener('mousedown', this.mousedownHandler, {
          passive: false
        });
        this.selector.addEventListener('mouseup', this.mouseupHandler, {
          passive: false
        });
        this.selector.addEventListener('mouseleave', this.mouseleaveHandler, {
          passive: false
        });
        this.selector.addEventListener('mousemove', this.mousemoveHandler, {
          passive: false
        });
      }
    }
    /**
     * Builds the markup and attaches listeners to required events.
     */

  }, {
    key: "init",
    value: function init() {
      this.attachEvents();
      this.selector.classList.add('expand-outer'); // Build container and slide to current item

      this.sliderContainerCreate(); // trigger autoplay if enabled

      if (this.config.autoplay) {
        this.autoPlay();
      } // add arrows to slider


      if (this.config.arrows) {
        this.arrowsVisibility();
        this.arrowsInit();
      } // add keyboard navigation to slider


      if (this.config.keyboard) {
        this.keyboardNavigation();
      } // add active classes to slider


      if (this.config.useCssFile && this.config.activeClass) {
        this.activeClass();
      } // add pagination to slider


      if (this.config.pagination) {
        this.paginationVisibility();
        this.paginationInit();
        this.paginationUpdate();
      }

      this.config.onInit.call(this);
    }
    /**
     * Build container and slide to current item
     */

  }, {
    key: "sliderContainerCreate",
    value: function sliderContainerCreate() {
      this.slideItemWrapper = this.createSliderOuterWrapper();
      this.slidesCollection = this.getSlidesCollection();
      this.createSliderInnerWrapper(); // Add fragment to the frame

      this.selector.innerHTML = '';
      this.slideItemWrapper.appendChild(this.sliderInnerWrapper);
      this.sliderInnerWrapper.appendChild(this.slidesCollection);
      this.selector.appendChild(this.slideItemWrapper); // Go to currently active slide after initial build

      this.slideToCurrent();
    }
    /**
     * Create frame and apply styling
     */

  }, {
    key: "createSliderInnerWrapper",
    value: function createSliderInnerWrapper() {
      this.sliderInnerWrapper = document.createElement('div');
      this.sliderInnerWrapper.classList.add('expand-js--container');
      this.sliderInnerWrapper.style.width = this.getCalculatedItemWidth() + 'px';
      this.isTransition();

      if (this.config.centerMode) {
        this.sliderInnerWrapper.classList.add('-is-center-mode');

        if (this.config.centerModeRange) {
          this.sliderInnerWrapper.classList.add('-is-center-range');
        }
      }
    }
    /**
     *
     * @returns {HTMLDivElement}
     */

  }, {
    key: "createSliderOuterWrapper",
    value: function createSliderOuterWrapper() {
      var slideItemWrapper = document.createElement('div');
      slideItemWrapper.classList.add('expand-js'); // inline css or with classes for more customizability

      if (this.config.useCssFile) {
        slideItemWrapper.classList.add('-hidden');

        if (this.config.rtl) {
          slideItemWrapper.classList.add('-rtl');
        }

        if (this.config.pagination) {
          slideItemWrapper.classList.add('-is-pagination');
        }
      } else {
        slideItemWrapper.style.overflow = 'hidden';
        slideItemWrapper.style.direction = this.config.rtl ? 'rtl' : 'ltr'; // rtl or ltr
      }

      return slideItemWrapper;
    }
    /**
     * Create a document fragment to put slides into it
     * @returns {DocumentFragment}
     */

  }, {
    key: "getSlidesCollection",
    value: function getSlidesCollection() {
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
      }

      return slides;
    }
    /**
     * calculate width for each item
     * @returns {number}
     */

  }, {
    key: "getCalculatedItemWidth",
    value: function getCalculatedItemWidth() {
      var widthItem = this.selectorWidth / this.visibleSlides;
      var itemWidthCalc = this.config.loop ? 2 * this.visibleSlides + this.innerItems.length : this.innerItems.length;
      return Number(widthItem * itemWidthCalc);
    }
    /**
     * Expand Slider item creation
     * @param item
     * @returns {*}
     */

  }, {
    key: "createSliderItem",
    value: function createSliderItem(item) {
      var itemContainer = document.createElement('div');

      if (this.config.useCssFile) {
        itemContainer.classList.add(this.config.itemSelector.replace('.', ''));

        if (this.config.rtl) {
          itemContainer.classList.add('f-right');
        }
      } else {
        itemContainer.style.cssFloat = this.config.rtl ? 'right' : 'left';
      }

      if (this.config.gap) {
        itemContainer.style.width = "calc(".concat(this.config.loop ? 100 / (this.innerItems.length + this.visibleSlides * 2) : 100 / this.innerItems.length, "% - ").concat(this.config.gap, "px)");
      } else {
        itemContainer.style.width = "".concat(this.config.loop ? 100 / (this.innerItems.length + this.visibleSlides * 2) : 100 / this.innerItems.length, "%");
      }

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
          if (window.innerWidth >= Number(key)) {
            _this2.visibleSlides = _this2.config.visibleSlides[Number(key)];
          }
        });
      }
    }
    /**
     * Previous slide
     * @param countSlides
     * @param cb
     * @param delay
     */

  }, {
    key: "prevSlide",
    value: function prevSlide() {
      var countSlides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var cb = arguments.length > 1 ? arguments[1] : undefined;
      var delay = arguments.length > 2 ? arguments[2] : undefined;

      // early return when there is nothing to slide
      if (this.innerItems.length <= this.visibleSlides) {
        return;
      }

      if (this.config.slidesToSlide > 1) {
        countSlides = this.config.slidesToSlide;
      }

      var curSlideCheck = this.curSlide;

      if (this.config.loop) {
        var isCloneSlide = this.curSlide - countSlides < 0;

        if (isCloneSlide) {
          var cloneIndex = this.curSlide + this.innerItems.length;
          var cloneIndexOffset = this.visibleSlides;
          var newPos = cloneIndex + cloneIndexOffset;
          var offset = (this.config.rtl ? 1 : -1) * newPos * (this.selectorWidth / this.visibleSlides) + (this.config.gap ? this.config.gap : 0);
          var dragDistance = this.config.draggable ? this.drag.endXAxis - this.drag.startXAxis : 0;
          this.isNotTransition();
          this.sliderInnerWrapper.style.transform = "translate3d(".concat(offset + dragDistance, "px, 0, 0)");
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
        this.callbackHandler(cb, delay);
      }
    }
    /**
     * Next slide
     * @param countSlides
     * @param cb
     * @param delay
     */

  }, {
    key: "nextSlide",
    value: function nextSlide() {
      var countSlides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var cb = arguments.length > 1 ? arguments[1] : undefined;
      var delay = arguments.length > 2 ? arguments[2] : undefined;

      // early return when there is nothing to slide
      if (this.innerItems.length <= this.visibleSlides) {
        return;
      }

      if (this.config.slidesToSlide > 1) {
        countSlides = this.config.slidesToSlide;
      }

      var curSlideCheck = this.curSlide;

      if (this.config.loop) {
        var isCloneSlide = this.curSlide + countSlides > this.innerItems.length - this.visibleSlides;

        if (isCloneSlide) {
          this.isNotTransition();
          var cloneIndex = this.curSlide - this.innerItems.length;
          var cloneIndexOffset = this.visibleSlides;
          var newPos = cloneIndex + cloneIndexOffset;
          var offset = (this.config.rtl ? 1 : -1) * newPos * (this.selectorWidth / this.visibleSlides) + (this.config.gap ? this.config.gap : 0);
          var dragDistance = this.config.draggable ? this.drag.endXAxis - this.drag.startXAxis : 0;
          this.sliderInnerWrapper.style.transform = "translate3d(".concat(offset + dragDistance, "px, 0, 0)");
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
        this.callbackHandler(cb, delay);
      }
    }
    /**
     * Disable transition on slideItem.
     */

  }, {
    key: "isNotTransition",
    value: function isNotTransition() {
      this.sliderInnerWrapper.style.transition = "all 0ms ".concat(this.config.easeMode);
    }
    /**
     * Enable transition on slideItem.
     */

  }, {
    key: "isTransition",
    value: function isTransition() {
      this.sliderInnerWrapper.style.transition = "all ".concat(this.config.duration, "ms ").concat(this.config.easeMode);
    }
    /**
     * Go to specific slide method
     * @param index
     * @param cb
     * @param delay
     */

  }, {
    key: "goToSlide",
    value: function goToSlide(index, cb, delay) {
      if (this.innerItems.length <= this.visibleSlides) {
        return;
      }

      var curSlideCheck = this.curSlide;
      this.curSlide = this.config.loop ? index % this.innerItems.length : Math.min(Math.max(index, 0), this.innerItems.length - this.visibleSlides);

      if (curSlideCheck !== this.curSlide) {
        this.slideToCurrent();
        this.config.onChange.call(this);
        this.callbackHandler(cb, delay);
      }
    }
    /**
     * Jump to active slide
     * @param isTransition
     */

  }, {
    key: "slideToCurrent",
    value: function slideToCurrent(isTransition) {
      var _this3 = this;

      var curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
      var offset = (this.config.rtl ? 1 : -1) * curSlide * (this.selectorWidth / this.visibleSlides) + (this.config.gap ? this.config.gap : 0);

      if (isTransition) {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            _this3.isTransition();

            _this3.sliderInnerWrapper.style.transform = "translate3d(".concat(offset + _this3.config.gap, "px, 0, 0)");
          });
        });
      } else {
        this.sliderInnerWrapper.style.transform = "translate3d(".concat(offset, "px, 0, 0)");
      }

      if (this.config.useCssFile && this.config.activeClass) {
        this.activeClass();
      }

      if (this.config.pagination) {
        this.paginationUpdate();
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
      var slideableSlides = this.config.multipleDrag ? Math.ceil(moveDistance / (this.selectorWidth / this.visibleSlides)) : this.config.slidesToSlide;
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

      if (this.config.arrows) {
        this.arrowsVisibility();
        this.arrowsInit();
      }

      if (this.config.useCssFile && this.config.activeClass) {
        this.activeClass();
      }

      if (this.config.pagination) {
        this.paginationVisibility();
        this.paginationInit();
        this.paginationUpdate();
      }
    }
    /**
     * small method to react on stopping with dragging
     */

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
     * @param index
     * @param cb
     * @param delay
     */

  }, {
    key: "remove",
    value: function remove(index, cb, delay) {
      var lowerIndex = index < this.curSlide;
      var lastItem = this.curSlide + this.visibleSlides - 1 === index;

      if (lowerIndex || lastItem) {
        this.curSlide -= 1;
      }

      this.innerItems.splice(index, 1); // build a frame and slide to a curSlide

      this.sliderContainerCreate();
      this.callbackHandler(cb, delay);
    }
    /**
     * Insert item method
     * @param item
     * @param index
     * @param cb
     * @param delay
     */

  }, {
    key: "insertElem",
    value: function insertElem(item, index, cb, delay) {
      this.innerItems.splice(index, 0, item);
      this.sliderContainerCreate();
      this.callbackHandler(cb, delay);
    }
    /**
     * Prepend item method
     * @param item
     * @param cb
     * @param delay
     */

  }, {
    key: "prependElem",
    value: function prependElem(item, cb, delay) {
      this.insertElem(item, 0);
      this.callbackHandler(cb, delay);
    }
    /**
     * Append item method
     * @param item
     * @param cb
     * @param delay
     */

  }, {
    key: "appendElem",
    value: function appendElem(item, cb, delay) {
      this.insertElem(item, this.innerItems.length + 1);
      this.callbackHandler(cb, delay);
    }
    /**
     * Autoplay method
     */

  }, {
    key: "autoPlay",
    value: function autoPlay() {
      var _this4 = this;

      setInterval(function () {
        return _this4.nextSlide();
      }, this.config.autoplayDuration);
    }
    /**
     * init pagination
     */

  }, {
    key: "paginationInit",
    value: function paginationInit() {
      var _this5 = this;

      if (this.paginationVisible === true && this.config.pagination) {
        var availableItems = this.innerItems.length;
        var visibleSlides = this.visibleSlides;
        var paginationCount = Math.ceil(availableItems / visibleSlides);
        this.paginationContainer = document.createElement('div');
        this.paginationContainer.classList.add(this.config.paginationContainer);
        this.paginationItemSelector = this.config.paginationItemSelector ? this.config.paginationItemSelector : this.config.paginationContainer + '--item';

        var _loop = function _loop(i) {
          var jumpTo = (i + 1) * visibleSlides - visibleSlides > _this5.innerItems.length ? _this5.innerItems.length : (i + 1) * visibleSlides - visibleSlides;
          _this5.paginationItem = document.createElement('span');

          _this5.paginationItem.classList.add(_this5.paginationItemSelector);

          if (_this5.config.paginationType === 'dots') {
            _this5.paginationItem.classList.add(_this5.paginationItemSelector + '--dots');
          }

          _this5.paginationItem.dataset.pagination = '' + (i + 1);

          if (_this5.config.paginationType !== 'dots') {
            _this5.paginationItem.innerHTML = _this5.paginationItem.dataset.pagination;
          }

          _this5.paginationItem.addEventListener('click', function () {
            return _this5.goToSlide(jumpTo);
          });

          _this5.paginationContainer.appendChild(_this5.paginationItem);
        };

        for (var i = 0; i < paginationCount; i += 1) {
          _loop(i);
        }

        this.selector.appendChild(this.paginationContainer);
      }
    }
    /**
     * update pagination based on current slide
     */

  }, {
    key: "paginationUpdate",
    value: function paginationUpdate() {
      if (this.paginationVisible === true && this.config.pagination) {
        this.paginationItemSelector = this.config.paginationItemSelector ? this.config.paginationItemSelector : this.config.paginationContainer + '--item';
        var paginationItems = this.selector.querySelectorAll('.' + this.paginationItemSelector);
        var getPaginationItem = Math.ceil(this.curSlide / this.visibleSlides) + 1;

        for (var i = 0; i < paginationItems.length; i += 1) {
          paginationItems[i].classList.remove(this.config.paginationItemActiveClass);

          if (getPaginationItem === Number(paginationItems[i].dataset.pagination)) {
            paginationItems[i].classList.add(this.config.paginationItemActiveClass);
          }
        }
      }
    }
    /**
     * sets visibility of pagination based on viewport
     * (boolean or object value for responsive changes)
     */

  }, {
    key: "paginationVisibility",
    value: function paginationVisibility() {
      var _this6 = this;

      if (typeof this.config.paginationVisible === 'boolean') {
        this.paginationVisible = this.config.paginationVisible;
      } else if (_typeof(this.config.paginationVisible) === 'object') {
        this.paginationVisible = true;
        Object.keys(this.config.paginationVisible).forEach(function (key) {
          if (window.innerWidth >= Number(key)) {
            _this6.paginationVisible = _this6.config.paginationVisible[Number(key)];
          }
        });
      }
    }
    /**
     * add arrows
     */

  }, {
    key: "arrowsInit",
    value: function arrowsInit() {
      var _this7 = this;

      if (this.arrowsVisible === true && this.config.arrows) {
        this.prevSelector = document.createElement('button');
        this.prevSelector.setAttribute('class', this.config.prevArrowClass);
        this.prevSelector.innerHTML = this.config.prevArrowInner;
        this.selector.appendChild(this.prevSelector);
        this.nextSelector = document.createElement('button');
        this.nextSelector.setAttribute('class', this.config.nextArrowClass);
        this.nextSelector.innerHTML = this.config.nextArrowInner;
        this.selector.appendChild(this.nextSelector);
        this.prevSelector.addEventListener('click', function () {
          return _this7.prevSlide();
        });
        this.nextSelector.addEventListener('click', function () {
          return _this7.nextSlide();
        });
      }
    }
    /**
     * sets visibility of arrows based on viewport
     * (boolean or object value for responsive changes)
     */

  }, {
    key: "arrowsVisibility",
    value: function arrowsVisibility() {
      var _this8 = this;

      if (typeof this.config.arrowsVisible === 'boolean') {
        this.arrowsVisible = this.config.arrowsVisible;
      } else if (_typeof(this.config.arrowsVisible) === 'object') {
        this.arrowsVisible = true;
        Object.keys(this.config.arrowsVisible).forEach(function (key) {
          if (window.innerWidth >= Number(key)) {
            _this8.arrowsVisible = _this8.config.arrowsVisible[Number(key)];
          }
        });
      }
    }
    /**
     * add keyboard navigation
     */

  }, {
    key: "keyboardNavigation",
    value: function keyboardNavigation() {
      var _this9 = this;

      document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
          _this9.prevSlide();
        }

        if (e.key === 'ArrowRight') {
          _this9.nextSlide();
        }
      });
    }
    /**
     * add active class to visible slides
     */

  }, {
    key: "activeClass",
    value: function activeClass() {
      var curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
      var classCount = this.visibleSlides;
      var availableItems = this.selector.querySelectorAll(this.config.itemSelector);
      var itemSelector = this.config.itemSelector.replace('.', '');
      var activeClass = itemSelector + '-active';

      if (availableItems) {
        for (var i = 0; i < availableItems.length; i += 1) {
          availableItems[i].classList.remove(activeClass);
        }

        for (var j = 0; j < classCount; j += 1) {
          availableItems[curSlide + j].classList.add(activeClass);
        } // centered mode


        if (this.config.centerMode) {
          this.centerMode(itemSelector);
        }
      }
    }
    /**
     * add center classes to items in the middle of visible slides
     * @param itemSelector
     */

  }, {
    key: "centerMode",
    value: function centerMode(itemSelector) {
      var curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
      var classCount = this.visibleSlides;
      var availableItems = this.selector.querySelectorAll('.' + itemSelector);
      var centeredItem = Math.ceil(classCount / 2);
      var centerClass = itemSelector + '-center';
      var halfCenterClass = itemSelector + '-half-center';
      var quarterCenterClass = itemSelector + '-quarter-center';

      if (availableItems) {
        for (var i = 0; i < availableItems.length; i += 1) {
          availableItems[i].classList.remove(centerClass);
          availableItems[i].classList.remove(halfCenterClass);
          availableItems[i].classList.remove(quarterCenterClass);
        }
      }

      for (var j = 0; j < classCount; j += 1) {
        if (availableItems[curSlide + j]) {
          availableItems[curSlide + centeredItem - 1].classList.add(centerClass);

          if (classCount % 2 === 0) {
            availableItems[curSlide + centeredItem].classList.add(centerClass);

            if (classCount >= 6 && this.config.centerModeRange) {
              availableItems[curSlide + centeredItem - 2].classList.add(halfCenterClass);
              availableItems[curSlide + centeredItem + 1].classList.add(halfCenterClass);
            }
          } else if (classCount >= 5 && classCount % 2 !== 0 && this.config.centerModeRange) {
            availableItems[curSlide + centeredItem - 2].classList.add(halfCenterClass);
            availableItems[curSlide + centeredItem].classList.add(halfCenterClass);

            if (classCount >= 7) {
              availableItems[curSlide + centeredItem - 3].classList.add(quarterCenterClass);
              availableItems[curSlide + centeredItem + 1].classList.add(quarterCenterClass);
            }
          }
        }
      }
    }
    /**
     * callback handler
     * @param callback
     * @param delay
     */

  }, {
    key: "callbackHandler",
    value: function callbackHandler(callback, delay) {
      var _this10 = this;

      if (delay && callback) {
        setTimeout(function () {
          callback.call(_this10);
        }, delay);
      } else if (!delay && callback) {
        callback.call(this);
      }
    }
    /**
     * click event handler
     * @param e
     */

  }, {
    key: "clickHandler",
    value: function clickHandler(e) {
      // prevent clicking link on dragging
      // (note: if subitems inside slide, you need to set `pointer-events: none` via css.)
      if (this.drag.preventClick) {
        e.preventDefault();
      }

      this.drag.preventClick = false;
    }
    /**
     * mousedown event handler
     * @param e
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
     * @param e
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
     * @param e
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
        this.sliderInnerWrapper.style.transition = "all 0ms ".concat(this.config.easeMode);
        var curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
        var currentOffset = curSlide * (this.selectorWidth / this.visibleSlides);
        var dragOffset = this.drag.endXAxis - this.drag.startXAxis;
        var offset = this.config.rtl ? currentOffset + dragOffset + (this.config.gap ? this.config.gap : 0) : currentOffset - dragOffset - (this.config.gap ? this.config.gap : 0);
        this.sliderInnerWrapper.style.transform = "translate3d(".concat((this.config.rtl ? 1 : -1) * offset, "px, 0, 0)");
      }
    }
    /**
     * mouseleave event handler
     * @param e
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
     * @param e
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
     * @param e
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
     * @param e
     */

  }, {
    key: "touchmoveHandler",
    value: function touchmoveHandler(e) {
      e.stopPropagation();

      if (this.drag.dragOff === null) {
        this.drag.dragOff = Math.abs(this.drag.startYAxis - e.touches[0].pageY) < Math.abs(this.drag.startXAxis - e.touches[0].pageX);
      }

      if (this.pointerDown && this.drag.dragOff) {
        var curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
        var currentOffset = curSlide * (this.selectorWidth / this.visibleSlides);
        var dragOffset = this.drag.endXAxis - this.drag.startXAxis;
        var offset = this.config.rtl ? currentOffset + dragOffset + (this.config.gap ? this.config.gap : 0) : currentOffset - dragOffset - (this.config.gap ? this.config.gap : 0);
        e.preventDefault();
        this.drag.endXAxis = e.touches[0].pageX;
        this.sliderInnerWrapper.style.transition = "0 all ".concat(this.config.easeMode, " ");
        this.sliderInnerWrapper.style.transform = "translate3d(".concat((this.config.rtl ? 1 : -1) * offset, "px, 0, 0)");
      }
    }
    /**
     * destroy method
     * @param restore
     * @param cb
     * @param delay
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var restore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var cb = arguments.length > 1 ? arguments[1] : undefined;
      var delay = arguments.length > 2 ? arguments[2] : undefined;
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

      this.callbackHandler(cb, delay);
    }
  }], [{
    key: "settingsOverride",
    value: function settingsOverride(options, dataOptions) {
      var defaults = {
        selector: '.expand-js-outer',
        itemSelector: '.expand-js--item',
        visibleSlides: 1,
        useCssFile: true,
        cssCustomPath: '',
        startIndex: 0,
        draggable: true,
        multipleDrag: true,
        triggerDistance: 100,
        loop: true,
        rtl: false,
        duration: 500,
        easeMode: 'ease-out',
        slidesToSlide: 1,
        activeClass: true,
        centerMode: false,
        centerModeRange: false,
        pagination: false,
        paginationVisible: true,
        paginationType: '',
        paginationContainer: 'expand-pagination',
        paginationItemSelector: '',
        paginationItemActiveClass: 'active',
        autoplay: false,
        autoplayDuration: 3000,
        arrows: false,
        arrowsVisible: true,
        prevArrowClass: 'expand-js--prev',
        nextArrowClass: 'expand-js--next',
        prevArrowInner: '‹',
        nextArrowInner: '›',
        gap: 0,
        keyboard: false,
        onInit: function onInit() {},
        onChange: function onChange() {}
      };
      return _objectSpread(_objectSpread(_objectSpread({}, defaults), options), dataOptions);
    }
  }]);

  return Expand;
}();

window.Expand = Expand;
exports["default"] = Expand;
module.exports = exports["default"];

/***/ }),

/***/ 835:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(837);
/******/ 	var __webpack_exports__ = __webpack_require__(835);
/******/ 	Expand = __webpack_exports__;
/******/ 	
/******/ })()
;