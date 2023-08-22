(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Expand = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /**
   * ExpandJS
   *
   * @author Fabian Esser <post@faesslich.de>
   * @github https://github.com/faesslich/expand
   * @description Expand - the lightweight pure JS carousel/slider
   * @version 1.1.0
   */
  var DEFAULT_SETTINGS = {
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
    pauseOnHover: false,
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
  var Expand = /*#__PURE__*/function () {
    function Expand(options, dataOptions) {
      var _this = this;
      _classCallCheck(this, Expand);
      _defineProperty(this, "resizeHandler", function () {
        var _this$config = _this.config,
          arrows = _this$config.arrows,
          useCssFile = _this$config.useCssFile,
          activeClass = _this$config.activeClass,
          pagination = _this$config.pagination;
        _this.slidesAmount();
        _this.selectorWidth = _this.selector.offsetWidth;
        if (_this.curSlide + _this.visibleSlides > _this.innerItems.length) {
          _this.curSlide = _this.innerItems.length <= _this.visibleSlides ? 0 : _this.innerItems.length - _this.visibleSlides;
        }
        _this.sliderContainerCreate();
        if (arrows) {
          _this.arrowsVisibility();
          _this.arrowsInit();
        }
        if (useCssFile && activeClass) {
          _this.activeClass();
        }
        if (pagination) {
          _this.paginationVisibility();
          _this.paginationInit();
          _this.paginationUpdate();
        }
      });
      _defineProperty(this, "clickHandler", function (e) {
        // prevent clicking link on dragging
        // (note: if subitems inside slide, you need to set `pointer-events: none` via css.)
        if (_this.drag.preventClick) {
          e.preventDefault();
        }
        _this.drag.preventClick = false;
      });
      this.config = _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_SETTINGS), options), dataOptions);
      var _this$config2 = this.config,
        selector = _this$config2.selector,
        loop = _this$config2.loop,
        startIndex = _this$config2.startIndex,
        visibleSlides = _this$config2.visibleSlides;
      this.selector = typeof selector === 'string' ? document.querySelector(selector) : selector;

      // Create global references
      this.selectorWidth = this.selector.offsetWidth;
      this.innerItems = _toConsumableArray(this.selector.children);
      this.curSlide = loop ? startIndex % this.innerItems.length : Math.max(0, Math.min(startIndex, this.innerItems.length - visibleSlides)) || 0;
      this.bindAndAttachEventHandlers();
      this.slidesAmount();
      this.init();
      this.addAriaRoles();
    }
    _createClass(Expand, [{
      key: "bindAndAttachEventHandlers",
      value: function bindAndAttachEventHandlers() {
        var _this2 = this;
        var events = ['resize', 'click', 'touchstart', 'touchend', 'touchmove', 'mousedown', 'mouseup', 'mouseleave', 'mousemove'];
        events.forEach(function (event) {
          var handlerName = "".concat(event, "Handler");
          if (_this2[handlerName]) {
            _this2[handlerName] = _this2[handlerName].bind(_this2);
            var targetElement = event === 'resize' ? window : _this2.selector;
            targetElement.addEventListener(event, _this2[handlerName], {
              passive: false
            });
          }
        });

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
          };
        }
      }
    }, {
      key: "init",
      value: function init() {
        var _this$config3 = this.config,
          autoplay = _this$config3.autoplay,
          pauseOnHover = _this$config3.pauseOnHover,
          arrows = _this$config3.arrows,
          keyboard = _this$config3.keyboard,
          useCssFile = _this$config3.useCssFile,
          activeClass = _this$config3.activeClass,
          pagination = _this$config3.pagination;
        this.selector.classList.add('expand-outer');
        this.sliderContainerCreate();
        if (autoplay) {
          this.autoPlay();
        }
        if (autoplay && pauseOnHover) {
          this.attachHoverListeners();
        }
        if (arrows) {
          this.arrowsVisibility();
          this.arrowsInit();
        }
        if (keyboard) {
          this.keyboardNavigation();
        }
        if (useCssFile && activeClass) {
          this.activeClass();
        }
        if (pagination) {
          this.paginationVisibility();
          this.paginationInit();
          this.paginationUpdate();
        }
        this.config.onInit.call(this);
      }
    }, {
      key: "addAriaRoles",
      value: function addAriaRoles() {
        this.selector.setAttribute('role', 'region');
        this.selector.setAttribute('aria-label', 'Slider');
        var slides = this.selector.querySelectorAll(this.config.itemSelector);
        slides.forEach(function (slide) {
          slide.setAttribute('role', 'group');
          slide.setAttribute('aria-label', 'Slide');
        });
      }
    }, {
      key: "sliderContainerCreate",
      value: function sliderContainerCreate() {
        this.slideItemWrapper = this.createSliderOuterWrapper();
        this.slidesCollection = this.getSlidesCollection();
        this.createSliderInnerWrapper();

        // Add fragment to the frame
        this.selector.innerHTML = '';
        this.slideItemWrapper.appendChild(this.sliderInnerWrapper);
        this.sliderInnerWrapper.appendChild(this.slidesCollection);
        this.selector.appendChild(this.slideItemWrapper);

        // Go to currently active slide after initial build
        this.slideToCurrent();
      }
    }, {
      key: "addClassesBasedOnConfig",
      value: function addClassesBasedOnConfig(element, classes) {
        var _this$config4 = this.config,
          useCssFile = _this$config4.useCssFile,
          rtl = _this$config4.rtl,
          pagination = _this$config4.pagination;
        if (useCssFile) {
          var _element$classList;
          (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(classes));
          if (rtl) {
            element.classList.add('-rtl');
          }
          if (pagination) {
            element.classList.add('-is-pagination');
          }
        }
      }
    }, {
      key: "createSliderInnerWrapper",
      value: function createSliderInnerWrapper() {
        var _this$config5 = this.config,
          centerMode = _this$config5.centerMode,
          centerModeRange = _this$config5.centerModeRange;
        this.sliderInnerWrapper = document.createElement('div');
        this.sliderInnerWrapper.classList.add('expand-js--container');
        this.sliderInnerWrapper.style.width = "".concat(this.getCalculatedItemWidth(), "px");
        this.isTransition();
        if (centerMode) {
          this.sliderInnerWrapper.classList.add('-is-center-mode');
          if (centerModeRange) {
            this.sliderInnerWrapper.classList.add('-is-center-range');
          }
        }
      }
    }, {
      key: "createSliderOuterWrapper",
      value: function createSliderOuterWrapper() {
        var slideItemWrapper = document.createElement('div');
        slideItemWrapper.classList.add('expand-js');
        this.addClassesBasedOnConfig(slideItemWrapper, ['-hidden']);
        if (!this.config.useCssFile) {
          slideItemWrapper.style.overflow = 'hidden';
          slideItemWrapper.style.direction = this.config.rtl ? 'rtl' : 'ltr';
        }
        return slideItemWrapper;
      }
    }, {
      key: "getSlidesCollection",
      value: function getSlidesCollection() {
        var _this3 = this;
        var slides = document.createDocumentFragment();
        var appendClonedItems = function appendClonedItems(start, end) {
          for (var i = start; i < end; i++) {
            var element = _this3.createSliderItem(_this3.innerItems[i].cloneNode(true));
            slides.appendChild(element);
          }
        };
        if (this.config.loop) {
          appendClonedItems(this.innerItems.length - this.visibleSlides, this.innerItems.length);
        }
        this.innerItems.forEach(function (item) {
          var element = _this3.createSliderItem(item);
          slides.appendChild(element);
        });
        if (this.config.loop) {
          appendClonedItems(0, this.visibleSlides);
        }
        return slides;
      }
    }, {
      key: "getCalculatedItemWidth",
      value: function getCalculatedItemWidth() {
        var widthItem = this.selectorWidth / this.visibleSlides;
        var itemWidthCalc = this.config.loop ? 2 * this.visibleSlides + this.innerItems.length : this.innerItems.length;
        return widthItem * itemWidthCalc;
      }
    }, {
      key: "createSliderItem",
      value: function createSliderItem(item) {
        var _this$config6 = this.config,
          useCssFile = _this$config6.useCssFile,
          itemSelector = _this$config6.itemSelector,
          rtl = _this$config6.rtl,
          gap = _this$config6.gap,
          loop = _this$config6.loop;
        var itemContainer = document.createElement('div');
        if (useCssFile) {
          itemContainer.classList.add(itemSelector.replace('.', ''));
          if (rtl) {
            itemContainer.classList.add('f-right');
          }
        } else {
          itemContainer.style.cssFloat = rtl ? 'right' : 'left';
        }
        var baseWidthPercentage = loop ? 100 / (this.innerItems.length + this.visibleSlides * 2) : 100 / this.innerItems.length;
        itemContainer.style.width = gap ? "calc(".concat(baseWidthPercentage, "% - ").concat(gap, "px)") : "".concat(baseWidthPercentage, "%");
        itemContainer.appendChild(item);
        return itemContainer;
      }
    }, {
      key: "slidesAmount",
      value: function slidesAmount() {
        var visibleSlides = this.config.visibleSlides;
        if (typeof visibleSlides === 'number') {
          this.visibleSlides = visibleSlides;
          return;
        }
        if (_typeof(visibleSlides) === 'object') {
          this.visibleSlides = Object.keys(visibleSlides).filter(function (key) {
            return window.innerWidth >= Number(key);
          }).sort(function (a, b) {
            return b - a;
          }).map(function (key) {
            return visibleSlides[key];
          })[0] || 1;
        }
      }
    }, {
      key: "slide",
      value: function slide() {
        var _this4 = this;
        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'next';
        var countSlides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var cb = arguments.length > 2 ? arguments[2] : undefined;
        var delay = arguments.length > 3 ? arguments[3] : undefined;
        if (this.innerItems.length <= this.visibleSlides) return;
        countSlides = this.config.slidesToSlide > 1 ? this.config.slidesToSlide : countSlides;
        var curSlideCheck = this.curSlide;
        var calculateCloneIndex = function calculateCloneIndex() {
          return direction === 'next' ? _this4.curSlide - _this4.innerItems.length : _this4.curSlide + _this4.innerItems.length;
        };
        var adjustCurSlide = function adjustCurSlide(value) {
          _this4.curSlide = direction === 'next' ? Math.min(_this4.curSlide + value, _this4.innerItems.length - _this4.visibleSlides) : Math.max(_this4.curSlide - value, 0);
        };
        if (this.config.loop) {
          var isCloneSlide = direction === 'next' ? this.curSlide + countSlides > this.innerItems.length - this.visibleSlides : this.curSlide - countSlides < 0;
          if (isCloneSlide) {
            this.isNotTransition();
            var cloneIndex = calculateCloneIndex();
            var newPos = cloneIndex + this.visibleSlides;
            var offset = (this.config.rtl ? 1 : -1) * newPos * (this.selectorWidth / this.visibleSlides) + (this.config.gap || 0);
            var dragDistance = this.config.draggable ? this.drag.endXAxis - this.drag.startXAxis : 0;
            this.sliderInnerWrapper.style.transform = "translate3d(".concat(offset + dragDistance, "px, 0, 0)");
            this.curSlide = direction === 'next' ? cloneIndex + countSlides : cloneIndex - countSlides;
          } else {
            adjustCurSlide(countSlides);
          }
        } else {
          adjustCurSlide(countSlides);
        }
        if (curSlideCheck !== this.curSlide) {
          this.slideToCurrent(this.config.loop);
          this.config.onChange.call(this);
          this.callbackHandler(cb, delay);
        }
        if (direction === 'next' && this.config.autoplay) {
          clearInterval(this.myTimer);
          this.autoPlay();
        }
      }
    }, {
      key: "isNotTransition",
      value: function isNotTransition() {
        this.sliderInnerWrapper.style.transition = "all 0ms ".concat(this.config.easeMode);
      }
    }, {
      key: "isTransition",
      value: function isTransition() {
        this.sliderInnerWrapper.style.transition = "all ".concat(this.config.duration, "ms ").concat(this.config.easeMode);
      }
    }, {
      key: "goToSlide",
      value: function goToSlide(index, cb, delay) {
        var _this$config7 = this.config,
          loop = _this$config7.loop,
          onChange = _this$config7.onChange;
        if (this.innerItems.length <= this.visibleSlides) {
          return;
        }
        var curSlideCheck = this.curSlide;
        if (index < 0) {
          this.curSlide = loop ? this.innerItems.length + index : 0;
        } else if (index > this.innerItems.length - 1) {
          this.curSlide = loop ? index - this.innerItems.length : this.innerItems.length - 1;
        } else {
          this.curSlide = index;
        }
        if (curSlideCheck !== this.curSlide) {
          this.slideToCurrent();
          onChange.call(this);
          this.callbackHandler(cb, delay);
        }
      }
    }, {
      key: "slideToCurrent",
      value: function slideToCurrent(isTransition) {
        var _this5 = this;
        var curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
        var offset = (this.config.rtl ? 1 : -1) * curSlide * (this.selectorWidth / this.visibleSlides) + (this.config.gap ? this.config.gap : 0);
        if (isTransition) {
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              _this5.isTransition();
              _this5.sliderInnerWrapper.style.transform = "translate3d(".concat(offset + _this5.config.gap, "px, 0, 0)");
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
    }, {
      key: "callbackHandler",
      value: function callbackHandler(callback, delay) {
        var _this6 = this;
        if (callback) {
          delay ? setTimeout(function () {
            return callback.call(_this6);
          }, delay) : callback.call(this);
        }
      }
    }, {
      key: "updateAfterDrag",
      value: function updateAfterDrag() {
        var _this$config8 = this.config,
          rtl = _this$config8.rtl,
          multipleDrag = _this$config8.multipleDrag,
          slidesToSlide = _this$config8.slidesToSlide,
          triggerDistance = _this$config8.triggerDistance;
        if (!this.innerItems) {
          console.error("this.innerItems is undefined!");
          return;
        }
        var movement = (rtl ? -1 : 1) * (this.drag.endXAxis - this.drag.startXAxis);
        var moveDistance = Math.abs(movement);
        var slideableSlides = multipleDrag ? Math.ceil(moveDistance / (this.selectorWidth / this.visibleSlides)) : slidesToSlide;
        var slideToNegativeClone = movement > 0 && this.curSlide - slideableSlides < 0;
        var slideToPositiveClone = movement < 0 && this.curSlide + slideableSlides > this.innerItems.length - this.visibleSlides;
        var shouldSlide = moveDistance > triggerDistance && this.innerItems.length > this.visibleSlides;
        if (shouldSlide) {
          this.slide(movement > 0 ? 'prev' : 'next', slideableSlides);
        }
        this.slideToCurrent(slideToNegativeClone || slideToPositiveClone);
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
    }, {
      key: "remove",
      value: function remove(index, cb, delay) {
        if (index < this.curSlide || this.curSlide + this.visibleSlides - 1 === index) {
          this.curSlide -= 1;
        }
        this.innerItems.splice(index, 1);

        // Build a frame and slide to the current slide
        this.sliderContainerCreate();
        this.callbackHandler(cb, delay);
      }
    }, {
      key: "insertElem",
      value: function insertElem(item, index, cb, delay) {
        this.innerItems.splice(index, 0, item);
        this.sliderContainerCreate();
        this.callbackHandler(cb, delay);
      }
    }, {
      key: "prependElem",
      value: function prependElem(item, cb, delay) {
        this.insertElem(item, 0);
        this.callbackHandler(cb, delay);
      }
    }, {
      key: "appendElem",
      value: function appendElem(item, cb, delay) {
        this.insertElem(item, this.innerItems.length + 1);
        this.callbackHandler(cb, delay);
      }
    }, {
      key: "autoPlay",
      value: function autoPlay() {
        var _this7 = this;
        clearInterval(this.myTimer);
        this.myTimer = setInterval(function () {
          _this7.slide('next');
        }, this.config.autoplayDuration);
      }
    }, {
      key: "determineVisibility",
      value: function determineVisibility(configProperty) {
        if (typeof configProperty === 'boolean') {
          return configProperty;
        }
        if (_typeof(configProperty) === 'object') {
          return Object.keys(configProperty).sort(function (a, b) {
            return b - a;
          }).find(function (key) {
            return window.innerWidth >= Number(key);
          }) || true;
        }
        return false;
      }
    }, {
      key: "paginationInit",
      value: function paginationInit() {
        var _this8 = this;
        var _this$config9 = this.config,
          pagination = _this$config9.pagination,
          paginationContainer = _this$config9.paginationContainer,
          configPaginationItemSelector = _this$config9.paginationItemSelector,
          paginationType = _this$config9.paginationType;
          _this$config9.paginationItemActiveClass;
        if (this.paginationVisible && pagination) {
          var paginationCount = Math.ceil(this.innerItems.length / this.visibleSlides);
          var paginationItemSelector = configPaginationItemSelector || "".concat(paginationContainer, "--item");
          this.paginationContainer = document.createElement('div');
          this.paginationContainer.classList.add(paginationContainer);
          var _loop = function _loop() {
            var jumpTo = i * _this8.visibleSlides;
            var paginationItem = document.createElement('span');
            paginationItem.classList.add(paginationItemSelector);
            if (paginationType === 'dots') {
              paginationItem.classList.add("".concat(paginationItemSelector, "--dots"));
            }
            paginationItem.dataset.pagination = i + 1;
            paginationItem.innerHTML = paginationType !== 'dots' ? paginationItem.dataset.pagination : '';
            paginationItem.addEventListener('click', function () {
              return _this8.goToSlide(jumpTo);
            });
            _this8.paginationContainer.appendChild(paginationItem);
          };
          for (var i = 0; i < paginationCount; i++) {
            _loop();
          }
          this.selector.appendChild(this.paginationContainer);
        }
      }
    }, {
      key: "paginationUpdate",
      value: function paginationUpdate() {
        var _this9 = this;
        if (this.paginationVisible && this.config.pagination) {
          var paginationItemSelector = this.config.paginationItemSelector || "".concat(this.config.paginationContainer, "--item");
          var paginationItems = this.selector.querySelectorAll(".".concat(paginationItemSelector));
          var activePaginationItem = Math.floor(this.curSlide / this.visibleSlides) + 1;
          paginationItems.forEach(function (item) {
            item.classList.toggle(_this9.config.paginationItemActiveClass, Number(item.dataset.pagination) === activePaginationItem);
          });
        }
      }
    }, {
      key: "paginationVisibility",
      value: function paginationVisibility() {
        this.paginationVisible = this.determineVisibility(this.config.paginationVisible);
      }
    }, {
      key: "arrowsInit",
      value: function arrowsInit() {
        var _this10 = this;
        var _this$config10 = this.config,
          arrows = _this$config10.arrows,
          prevArrowClass = _this$config10.prevArrowClass,
          prevArrowInner = _this$config10.prevArrowInner,
          nextArrowClass = _this$config10.nextArrowClass,
          nextArrowInner = _this$config10.nextArrowInner;
        if (this.arrowsVisible && arrows) {
          this.prevSelector = document.createElement('button');
          this.prevSelector.className = prevArrowClass;
          this.prevSelector.innerHTML = prevArrowInner;
          this.prevSelector.addEventListener('click', function () {
            return _this10.slide('prev');
          });
          this.nextSelector = document.createElement('button');
          this.nextSelector.className = nextArrowClass;
          this.nextSelector.innerHTML = nextArrowInner;
          this.nextSelector.addEventListener('click', function () {
            return _this10.slide('next');
          });
          this.selector.append(this.prevSelector, this.nextSelector);
        }
      }
    }, {
      key: "arrowsVisibility",
      value: function arrowsVisibility() {
        this.arrowsVisible = this.determineVisibility(this.config.arrowsVisible);
      }
    }, {
      key: "keyboardNavigation",
      value: function keyboardNavigation() {
        document.addEventListener('keydown', this.handleKeyboardEvent.bind(this));
      }
    }, {
      key: "handleKeyboardEvent",
      value: function handleKeyboardEvent(e) {
        if (e.key === 'ArrowLeft') {
          this.slide('prev');
        }
        if (e.key === 'ArrowRight') {
          this.slide('next');
        }
      }
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
          }

          // centered mode
          if (this.config.centerMode) {
            this.centerMode(itemSelector);
          }
        }
      }
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
    }, {
      key: "mousedownHandler",
      value: function mousedownHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        this.pointerDown = true;
        this.drag.startXAxis = e.pageX;
      }
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
    }, {
      key: "touchstartHandler",
      value: function touchstartHandler(e) {
        e.stopPropagation();
        this.drag.startXAxis = e.touches[0].pageX;
        this.drag.startYAxis = e.touches[0].pageY;
        this.pointerDown = true;
      }
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
    }, {
      key: "attachHoverListeners",
      value: function attachHoverListeners() {
        var _this11 = this;
        this.selector.addEventListener('mouseenter', function () {
          clearInterval(_this11.myTimer);
        });
        this.selector.addEventListener('mouseleave', function () {
          _this11.autoPlay();
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var restore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var cb = arguments.length > 1 ? arguments[1] : undefined;
        var delay = arguments.length > 2 ? arguments[2] : undefined;
        window.removeEventListener('resize', this.resizeHandler);
        this.selector.removeEventListener('click', this.clickHandler);
        this.selector.removeEventListener('mouseup', this.mouseupHandler);
        this.selector.removeEventListener('mousedown', this.mousedownHandler);
        this.selector.removeEventListener('mouseleave', this.mouseleaveHandler);
        this.selector.removeEventListener('mousemove', this.mousemoveHandler);
        this.selector.removeEventListener('touchstart', this.touchstartHandler);
        this.selector.removeEventListener('touchend', this.touchendHandler);
        this.selector.removeEventListener('touchmove', this.touchmoveHandler);

        // restore to initial markup
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
    }]);
    return Expand;
  }();

  return Expand;

}));
