/**
 * ExpandJS
 *
 * @author Fabian Esser <post@faesslich.de>
 * @github https://github.com/faesslich/expand
 * @description Expand - the lightweight pure JS carousel/slider
 * @version 1.1.0
 */
const DEFAULT_SETTINGS = {
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
  onInit: () => {},
  onChange: () => {}
};

export default class Expand {

  constructor(options, dataOptions) {
    this.config = { ...DEFAULT_SETTINGS, ...options, ...dataOptions };
    const { selector, loop, startIndex, visibleSlides } = this.config;
    this.selector = (typeof selector === 'string') ? document.querySelector(selector) : selector;

    // Create global references
    this.selectorWidth = this.selector.offsetWidth;
    this.innerItems = [...this.selector.children];
    this.curSlide = loop
        ? startIndex % this.innerItems.length
        : Math.max(0, Math.min(startIndex, this.innerItems.length - visibleSlides)) || 0;

    this.bindAndAttachEventHandlers();
    this.slidesAmount();
    this.init();
    this.addAriaRoles();
  }

  bindAndAttachEventHandlers() {
    const events = ['resize', 'click', 'touchstart', 'touchend', 'touchmove', 'mousedown', 'mouseup', 'mouseleave', 'mousemove'];

    events.forEach(event => {
      const handlerName = `${event}Handler`;
      if (this[handlerName]) {
        this[handlerName] = this[handlerName].bind(this);
        const targetElement = event === 'resize' ? window : this.selector;
        targetElement.addEventListener(event, this[handlerName], { passive: false });
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

  init() {
    const { autoplay, pauseOnHover, arrows, keyboard, useCssFile, activeClass, pagination } = this.config;

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

  addAriaRoles() {
    this.selector.setAttribute('role', 'region');
    this.selector.setAttribute('aria-label', 'Slider');

    const slides = this.selector.querySelectorAll(this.config.itemSelector);
    slides.forEach(slide => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-label', 'Slide');
    });
  }

  sliderContainerCreate() {
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

  addClassesBasedOnConfig(element, classes) {
    const { useCssFile, rtl, pagination } = this.config;

    if (useCssFile) {
      element.classList.add(...classes);

      if (rtl) {
        element.classList.add('-rtl');
      }

      if (pagination) {
        element.classList.add('-is-pagination');
      }
    }
  }

  createSliderInnerWrapper() {
    const { centerMode, centerModeRange } = this.config;

    this.sliderInnerWrapper = document.createElement('div');
    this.sliderInnerWrapper.classList.add('expand-js--container');
    this.sliderInnerWrapper.style.width = `${this.getCalculatedItemWidth()}px`;
    this.isTransition();

    if (centerMode) {
      this.sliderInnerWrapper.classList.add('-is-center-mode');

      if (centerModeRange) {
        this.sliderInnerWrapper.classList.add('-is-center-range');
      }
    }
  }

  createSliderOuterWrapper() {
    const slideItemWrapper = document.createElement('div');
    slideItemWrapper.classList.add('expand-js');

    this.addClassesBasedOnConfig(slideItemWrapper, ['-hidden']);

    if (!this.config.useCssFile) {
      slideItemWrapper.style.overflow = 'hidden';
      slideItemWrapper.style.direction = this.config.rtl ? 'rtl' : 'ltr';
    }

    return slideItemWrapper;
  }

  getSlidesCollection() {
    const slides = document.createDocumentFragment();
    const appendClonedItems = (start, end) => {
      for (let i = start; i < end; i++) {
        const element = this.createSliderItem(this.innerItems[i].cloneNode(true));
        slides.appendChild(element);
      }
    };

    if (this.config.loop) {
      appendClonedItems(this.innerItems.length - this.visibleSlides, this.innerItems.length);
    }

    this.innerItems.forEach(item => {
      const element = this.createSliderItem(item);
      slides.appendChild(element);
    });

    if (this.config.loop) {
      appendClonedItems(0, this.visibleSlides);
    }

    return slides;
  }

  getCalculatedItemWidth() {
    const widthItem = this.selectorWidth / this.visibleSlides;
    const itemWidthCalc = this.config.loop ? (2 * this.visibleSlides) + this.innerItems.length : this.innerItems.length;

    return widthItem * itemWidthCalc;
  }

  createSliderItem(item) {
    const { useCssFile, itemSelector, rtl, gap, loop } = this.config;
    const itemContainer = document.createElement('div');

    if (useCssFile) {
      itemContainer.classList.add(itemSelector.replace('.', ''));
      if (rtl) {
        itemContainer.classList.add('f-right');
      }
    } else {
      itemContainer.style.cssFloat = rtl ? 'right' : 'left';
    }

    const baseWidthPercentage = loop ? 100 / (this.innerItems.length + (this.visibleSlides * 2)) : 100 / this.innerItems.length;
    itemContainer.style.width = gap ? `calc(${baseWidthPercentage}% - ${gap}px)` : `${baseWidthPercentage}%`;

    itemContainer.appendChild(item);
    return itemContainer;
  }

  slidesAmount() {
    const { visibleSlides } = this.config;

    if (typeof visibleSlides === 'number') {
      this.visibleSlides = visibleSlides;
      return;
    }

    if (typeof visibleSlides === 'object') {
      this.visibleSlides = Object.keys(visibleSlides)
          .filter(key => window.innerWidth >= Number(key))
          .sort((a, b) => b - a)
          .map(key => visibleSlides[key])[0] || 1;
    }
  }


  slide(direction = 'next', countSlides = 1, cb, delay) {
    if (this.innerItems.length <= this.visibleSlides) return;

    countSlides = this.config.slidesToSlide > 1 ? this.config.slidesToSlide : countSlides;
    const curSlideCheck = this.curSlide;

    const calculateCloneIndex = () => {
      return direction === 'next' ? this.curSlide - this.innerItems.length : this.curSlide + this.innerItems.length;
    };

    const adjustCurSlide = (value) => {
      this.curSlide = direction === 'next'
          ? Math.min(this.curSlide + value, this.innerItems.length - this.visibleSlides)
          : Math.max(this.curSlide - value, 0);
    };

    if (this.config.loop) {
      const isCloneSlide = direction === 'next'
          ? (this.curSlide + countSlides) > (this.innerItems.length - this.visibleSlides)
          : this.curSlide - countSlides < 0;

      if (isCloneSlide) {
        this.isNotTransition();
        const cloneIndex = calculateCloneIndex();
        const newPos = cloneIndex + this.visibleSlides;
        const offset = (this.config.rtl ? 1 : -1) * newPos * (this.selectorWidth / this.visibleSlides)
            + (this.config.gap || 0);
        const dragDistance = this.config.draggable ? this.drag.endXAxis - this.drag.startXAxis : 0;
        this.sliderInnerWrapper.style.transform = `translate3d(${offset + dragDistance}px, 0, 0)`;
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

  isNotTransition() {
    this.sliderInnerWrapper.style.transition = `all 0ms ${this.config.easeMode}`;
  }

  isTransition() {
    this.sliderInnerWrapper.style.transition = `all ${this.config.duration}ms ${this.config.easeMode}`;
  }

  goToSlide(index, cb, delay) {
    const { loop, onChange } = this.config;

    if (this.innerItems.length <= this.visibleSlides) {
      return;
    }

    const curSlideCheck = this.curSlide;

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


  slideToCurrent(isTransition) {
    const curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
    const offset = (this.config.rtl ? 1 : -1) * curSlide * (this.selectorWidth / this.visibleSlides)
        + (this.config.gap ? this.config.gap : 0);

    if (isTransition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.isTransition();
          this.sliderInnerWrapper.style.transform = `translate3d(${offset + this.config.gap}px, 0, 0)`;
        });
      });
    } else {
      this.sliderInnerWrapper.style.transform = `translate3d(${offset}px, 0, 0)`;
    }

    if (this.config.useCssFile && this.config.activeClass) {
      this.activeClass();
    }

    if (this.config.pagination) {
      this.paginationUpdate();
    }
  }

  callbackHandler(callback, delay) {
    if (callback) {
      delay ? setTimeout(() => callback.call(this), delay) : callback.call(this);
    }
  }

  updateAfterDrag() {
    const { rtl, multipleDrag, slidesToSlide, triggerDistance } = this.config;
    if (!this.innerItems) {
      console.error("this.innerItems is undefined!");
      return;
    }

    const movement = (rtl ? -1 : 1) * (this.drag.endXAxis - this.drag.startXAxis);
    const moveDistance = Math.abs(movement);
    const slideableSlides = multipleDrag
        ? Math.ceil(moveDistance / (this.selectorWidth / this.visibleSlides))
        : slidesToSlide;

    const slideToNegativeClone = movement > 0 && this.curSlide - slideableSlides < 0;
    const slideToPositiveClone = movement < 0 && (this.curSlide + slideableSlides) > (this.innerItems.length - this.visibleSlides);
    const shouldSlide = moveDistance > triggerDistance && this.innerItems.length > this.visibleSlides;

    if (shouldSlide) {
      this.slide(movement > 0 ? 'prev' : 'next', slideableSlides);
    }

    this.slideToCurrent(slideToNegativeClone || slideToPositiveClone);
  }

  resizeHandler = () => {
    const { arrows, useCssFile, activeClass, pagination } = this.config;
    this.slidesAmount();
    this.selectorWidth = this.selector.offsetWidth;

    if ((this.curSlide + this.visibleSlides) > this.innerItems.length) {
      this.curSlide = this.innerItems.length <= this.visibleSlides ? 0 : this.innerItems.length - this.visibleSlides;
    }

    this.sliderContainerCreate();

    if (arrows) {
      this.arrowsVisibility();
      this.arrowsInit();
    }

    if (useCssFile && activeClass) {
      this.activeClass();
    }

    if (pagination) {
      this.paginationVisibility();
      this.paginationInit();
      this.paginationUpdate();
    }
  }

  stopDragging() {
    this.drag = {
      startXAxis: 0,
      endXAxis: 0,
      startYAxis: 0,
      dragOff: null,
      preventClick: this.drag.preventClick
    };
  }

  remove(index, cb, delay) {
    if (index < this.curSlide || (this.curSlide + this.visibleSlides) - 1 === index) {
      this.curSlide -= 1;
    }

    this.innerItems.splice(index, 1);

    // Build a frame and slide to the current slide
    this.sliderContainerCreate();
    this.callbackHandler(cb, delay);
  }

  insertElem(item, index, cb, delay) {
    this.innerItems.splice(index, 0, item);
    this.sliderContainerCreate();
    this.callbackHandler(cb, delay);
  }

  prependElem(item, cb, delay) {
    this.insertElem(item, 0);
    this.callbackHandler(cb, delay);
  }

  appendElem(item, cb, delay) {
    this.insertElem(item, this.innerItems.length + 1);
    this.callbackHandler(cb, delay);
  }

  autoPlay() {
    clearInterval(this.myTimer);
    this.myTimer = setInterval(() => { this.slide('next'); }, this.config.autoplayDuration);
  }

  determineVisibility(configProperty) {
    if (typeof configProperty === 'boolean') {
      return configProperty;
    }

    if (typeof configProperty === 'object') {
      return Object.keys(configProperty)
          .sort((a, b) => b - a)
          .find(key => window.innerWidth >= Number(key)) || true;
    }

    return false;
  }

  paginationInit() {
    const { pagination, paginationContainer, paginationItemSelector: configPaginationItemSelector, paginationType, paginationItemActiveClass } = this.config;

    if (this.paginationVisible && pagination) {
      const paginationCount = Math.ceil(this.innerItems.length / this.visibleSlides);
      const paginationItemSelector = configPaginationItemSelector || `${paginationContainer}--item`;

      this.paginationContainer = document.createElement('div');
      this.paginationContainer.classList.add(paginationContainer);

      for (let i = 0; i < paginationCount; i++) {
        const jumpTo = i * this.visibleSlides;
        const paginationItem = document.createElement('span');

        paginationItem.classList.add(paginationItemSelector);
        if (paginationType === 'dots') {
          paginationItem.classList.add(`${paginationItemSelector}--dots`);
        }
        paginationItem.dataset.pagination = i + 1;
        paginationItem.innerHTML = paginationType !== 'dots' ? paginationItem.dataset.pagination : '';
        paginationItem.addEventListener('click', () => this.goToSlide(jumpTo));

        this.paginationContainer.appendChild(paginationItem);
      }

      this.selector.appendChild(this.paginationContainer);
    }
  }

  paginationUpdate() {
    if (this.paginationVisible && this.config.pagination) {
      const paginationItemSelector = this.config.paginationItemSelector || `${this.config.paginationContainer}--item`;
      const paginationItems = this.selector.querySelectorAll(`.${paginationItemSelector}`);
      const activePaginationItem = Math.floor(this.curSlide / this.visibleSlides) + 1;

      paginationItems.forEach(item => {
        item.classList.toggle(this.config.paginationItemActiveClass, Number(item.dataset.pagination) === activePaginationItem);
      });
    }
  }

  paginationVisibility() {
    this.paginationVisible = this.determineVisibility(this.config.paginationVisible);
  }

  arrowsInit() {
    const { arrows, prevArrowClass, prevArrowInner, nextArrowClass, nextArrowInner } = this.config;

    if (this.arrowsVisible && arrows) {
      this.prevSelector = document.createElement('button');
      this.prevSelector.className = prevArrowClass;
      this.prevSelector.innerHTML = prevArrowInner;
      this.prevSelector.addEventListener('click', () => this.slide('prev'));

      this.nextSelector = document.createElement('button');
      this.nextSelector.className = nextArrowClass;
      this.nextSelector.innerHTML = nextArrowInner;
      this.nextSelector.addEventListener('click', () => this.slide('next'));

      this.selector.append(this.prevSelector, this.nextSelector);
    }
  }

  arrowsVisibility() {
    this.arrowsVisible = this.determineVisibility(this.config.arrowsVisible);
  }

  keyboardNavigation() {
    document.addEventListener('keydown', this.handleKeyboardEvent.bind(this));
  }

  handleKeyboardEvent(e) {
    if (e.key === 'ArrowLeft') {
      this.slide('prev');
    }

    if (e.key === 'ArrowRight') {
      this.slide('next');
    }
  }


  activeClass() {
    const curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
    const classCount = this.visibleSlides;
    const availableItems = this.selector.querySelectorAll(this.config.itemSelector);
    const itemSelector = this.config.itemSelector.replace('.', '');
    const activeClass = itemSelector + '-active';

    if (availableItems) {
      for (let i = 0; i < availableItems.length; i += 1) {
        availableItems[i].classList.remove(activeClass);
      }

      for (let j = 0; j < classCount; j += 1) {
        availableItems[curSlide + j].classList.add(activeClass);
      }

      // centered mode
      if (this.config.centerMode) {
        this.centerMode(itemSelector);
      }
    }
  }

  centerMode(itemSelector) {
    const curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
    const classCount = this.visibleSlides;
    const availableItems = this.selector.querySelectorAll('.' + itemSelector);
    const centeredItem = Math.ceil((classCount / 2));
    const centerClass = itemSelector + '-center';
    const halfCenterClass = itemSelector + '-half-center';
    const quarterCenterClass = itemSelector + '-quarter-center';

    if (availableItems) {
      for (let i = 0; i < availableItems.length; i += 1) {
        availableItems[i].classList.remove(centerClass);
        availableItems[i].classList.remove(halfCenterClass);
        availableItems[i].classList.remove(quarterCenterClass);
      }
    }

    for (let j = 0; j < classCount; j += 1) {
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

  clickHandler = (e) => {
    // prevent clicking link on dragging
    // (note: if subitems inside slide, you need to set `pointer-events: none` via css.)
    if (this.drag.preventClick) {
      e.preventDefault();
    }
    this.drag.preventClick = false;
  }

  mousedownHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    this.pointerDown = true;
    this.drag.startXAxis = e.pageX;
  }

  mouseupHandler(e) {
    e.stopPropagation();
    this.pointerDown = false;
    this.selector.style.cursor = '-webkit-grab';
    this.isTransition();
    if (this.drag.endXAxis) {
      this.updateAfterDrag();
    }
    this.stopDragging();
  }

  mousemoveHandler(e) {
    e.preventDefault();
    if (this.pointerDown) {
      if (e.target.nodeName === 'A') {
        this.drag.preventClick = true;
      }

      this.drag.endXAxis = e.pageX;
      this.selector.style.cursor = '-webkit-grabbing';
      this.sliderInnerWrapper.style.transition = `all 0ms ${this.config.easeMode}`;

      const curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
      const currentOffset = curSlide * (this.selectorWidth / this.visibleSlides);
      const dragOffset = (this.drag.endXAxis - this.drag.startXAxis);
      const offset = this.config.rtl
        ? currentOffset + dragOffset + (this.config.gap ? this.config.gap : 0)
        : currentOffset - dragOffset - (this.config.gap ? this.config.gap : 0);
      this.sliderInnerWrapper.style.transform = `translate3d(${(this.config.rtl ? 1 : -1) * offset}px, 0, 0)`;
    }
  }

  mouseleaveHandler(e) {
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

  touchstartHandler(e) {
    e.stopPropagation();
    this.drag.startXAxis = e.touches[0].pageX;
    this.drag.startYAxis = e.touches[0].pageY;
    this.pointerDown = true;
  }

  touchendHandler(e) {
    e.stopPropagation();
    this.pointerDown = false;
    this.isTransition();
    if (this.drag.endXAxis) {
      this.updateAfterDrag();
    }
    this.stopDragging();
  }

  touchmoveHandler(e) {
    e.stopPropagation();

    if (this.drag.dragOff === null) {
      this.drag.dragOff = Math.abs(this.drag.startYAxis - e.touches[0].pageY)
          < Math.abs(this.drag.startXAxis - e.touches[0].pageX);
    }

    if (this.pointerDown && this.drag.dragOff) {
      const curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
      const currentOffset = curSlide * (this.selectorWidth / this.visibleSlides);
      const dragOffset = (this.drag.endXAxis - this.drag.startXAxis);
      const offset = this.config.rtl
        ? currentOffset + dragOffset + (this.config.gap ? this.config.gap : 0)
        : currentOffset - dragOffset - (this.config.gap ? this.config.gap : 0);

      e.preventDefault();

      this.drag.endXAxis = e.touches[0].pageX;
      this.sliderInnerWrapper.style.transition = `0 all ${this.config.easeMode} `;
      this.sliderInnerWrapper.style.transform = `translate3d(${(this.config.rtl ? 1 : -1) * offset}px, 0, 0)`;
    }
  }

  attachHoverListeners() {
    this.selector.addEventListener('mouseenter', () => {
      clearInterval(this.myTimer);
    });

    this.selector.addEventListener('mouseleave', () => {
      this.autoPlay();
    });
  }


  destroy(restore = false, cb, delay) {
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
      const slides = document.createDocumentFragment();
      for (let i = 0; i < this.innerItems.length; i += 1) {
        slides.appendChild(this.innerItems[i]);
      }
      this.selector.innerHTML = '';
      this.selector.appendChild(slides).removeAttribute('style');
    }
    this.callbackHandler(cb, delay);
  }
}
