export default class Expand {
  /**
   * Constructor
   * @param options
   */
  constructor(options) {
    const eventHandlers = [
      'resizeHandler',
      'clickHandler',
      'touchstartHandler',
      'touchendHandler',
      'touchmoveHandler',
      'mousedownHandler',
      'mouseupHandler',
      'mouseleaveHandler',
      'mousemoveHandler'
    ];

    this.config = Expand.settingsOverride(options);
    this.selector = (typeof this.config.selector === 'string')
      ? document.querySelector(this.config.selector)
      : this.config.selector;

    // Create global references
    this.selectorWidth = this.selector.offsetWidth;
    this.innerItems = [].slice.call(this.selector.children);
    this.curSlide = (this.config.loop)
      ? this.config.startIndex % this.innerItems.length
      : Math.max(0, Math.min(this.config.startIndex, this.innerItems.length - this.visibleSlides));

    // Event handler binding
    eventHandlers.forEach(method => {
      this[method] = this[method].bind(this);
    });

    this.slidesAmount();
    this.init();
  }

  /**
   * Overrides default settings with custom ones.
   * @param options
   * @returns {{
   *    useCssFile, onChange, cssCustomPath, triggerDistance, rtl, duration, startIndex,
   *    multipleDrag, draggable, easeMode, gap, onInit, loop, selector, visibleSlides
   *  }}
   */
  static settingsOverride(options) {
    const defaults = {
      selector: '.expand-js-outer',
      visibleSlides: 1,
      useCssFile: 1,
      cssCustomPath: '',
      startIndex: 0,
      draggable: true,
      multipleDrag: true,
      triggerDistance: 20,
      loop: true,
      rtl: false,
      duration: 500,
      easeMode: 'ease-out',
      slidesToSlide: 1,
      autoplay: 0,
      autoplayDuration: 3000,
      arrows: false,
      arrowsVisible: 1,
      prevArrowClass: 'expand-js--prev',
      nextArrowClass: 'expand-js--next',
      prevArrowInner: '‹',
      nextArrowInner: '›',
      gap: 0,
      keyboard: false,
      onInit: () => {},
      onChange: () => {}
    };

    return { ...defaults, ...options };
  }


  /**
   * Attaches listeners to required events.
   */
  attachEvents() {
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
      };

      // add event handlers
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
  init() {
    this.attachEvents();
    this.selector.classList.add('expand-outer');

    // Build container and slide to current item
    this.sliderContainerCreate();

    // trigger autoplay if enabled
    if (this.config.autoplay) {
      this.autoPlay();
    }

    // add arrows to slider
    if (this.config.arrows) {
      this.arrowsVisibility();
      this.arrowsInit();
    }

    // add keyboard navigation to slider
    if (this.config.keyboard) {
      this.keyboardNavigaion();
    }

    this.config.onInit.call(this);
  }


  /**
   * Build container and slide to current item
   */
  sliderContainerCreate() {
    const widthItem = this.selectorWidth / this.visibleSlides;
    const itemWidthCalc = this.config.loop ? (2 * this.visibleSlides) + this.innerItems.length : this.innerItems.length;

    this.slideItemWrapper = document.createElement('div');
    this.slideItemWrapper.classList.add('expand-js');
    // inline css or with classes for more customizability
    if (this.config.useCssFile) {
      this.slideItemWrapper.classList.add('-hidden');
      if (this.config.rtl) {
        this.slideItemWrapper.classList.add('-rtl');
      }
    } else {
      this.slideItemWrapper.style.overflow = 'hidden';
      this.slideItemWrapper.style.direction = this.config.rtl ? 'rtl' : 'ltr'; // rtl or ltr
    }

    // Create frame and apply styling
    this.slideItem = document.createElement('div');
    this.slideItem.classList.add('expand-js--container');
    this.slideItem.style.width = `${widthItem * itemWidthCalc}px`;
    this.isTransition();

    // Create a document fragment to put slides into it
    const slides = document.createDocumentFragment();

    // Loop through the slides, add styling and add them to document fragment
    if (this.config.loop) {
      for (let i = this.innerItems.length - this.visibleSlides; i < this.innerItems.length; i += 1) {
        const element = this.createSliderItem(this.innerItems[i].cloneNode(true));
        slides.appendChild(element);
      }
    }
    for (let i = 0; i < this.innerItems.length; i += 1) {
      const element = this.createSliderItem(this.innerItems[i]);
      slides.appendChild(element);
    }
    if (this.config.loop) {
      for (let i = 0; i < this.visibleSlides; i += 1) {
        const element = this.createSliderItem(this.innerItems[i].cloneNode(true));
        slides.appendChild(element);
      }
    }

    // Add fragment to the frame
    this.selector.innerHTML = '';
    this.slideItemWrapper.appendChild(this.slideItem);
    this.slideItem.appendChild(slides);
    this.selector.appendChild(this.slideItemWrapper);

    // Go to currently active slide after initial build
    this.slideToCurrent();
  }

  /**
   * Slider item creation
   * @param item
   * @returns {*}
   */
  createSliderItem(item) {
    const itemContainer = document.createElement('div');
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

    if (this.config.gap) {
      itemContainer.style.width = `calc(${this.config.loop
        ? 100 / (this.innerItems.length + (this.visibleSlides * 2))
        : 100 / (this.innerItems.length)}% - ${this.config.gap}px)`;
    } else {
      itemContainer.style.width = `${this.config.loop
        ? 100 / (this.innerItems.length + (this.visibleSlides * 2))
        : 100 / (this.innerItems.length)}%`;
    }

    itemContainer.appendChild(item);
    return itemContainer;
  }


  /**
   * sets amount of visible slides based on viewport (fixed number or object value for responsive changes)
   */
  slidesAmount() {
    if (typeof this.config.visibleSlides === 'number') {
      this.visibleSlides = this.config.visibleSlides;
    } else if (typeof this.config.visibleSlides === 'object') {
      this.visibleSlides = 1;
      Object.keys(this.config.visibleSlides).forEach(key => {
        if (window.innerWidth >= key) {
          this.visibleSlides = this.config.visibleSlides[key];
        }
      });
    }
  }


  /**
   * Previous slide
   * @param countSlides
   */
  prevSlide(countSlides = 1) {
    // early return if no slides
    if (this.innerItems.length <= this.visibleSlides) {
      return;
    }

    if (this.config.slidesToSlide > 1) {
      countSlides = this.config.slidesToSlide;
    }

    const curSlideCheck = this.curSlide;

    if (this.config.loop) {
      const isCloneSlide = this.curSlide - countSlides < 0;
      if (isCloneSlide) {
        const cloneIndex = this.curSlide + this.innerItems.length;
        const cloneIndexOffset = this.visibleSlides;
        const newPos = cloneIndex + cloneIndexOffset;
        const offset = (this.config.rtl ? 1 : -1) * newPos * (this.selectorWidth / this.visibleSlides)
          + (this.config.gap ? this.config.gap : 0);
        const dragDistance = this.config.draggable ? this.drag.endXAxis - this.drag.startXAxis : 0;

        this.isNotTransition();
        this.slideItem.style.transform = `translate3d(${offset + dragDistance}px, 0, 0)`;

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
   * @param countSlides
   */
  nextSlide(countSlides = 1) {
    // early return when there is nothing to slide
    if (this.innerItems.length <= this.visibleSlides) {
      return;
    }

    if (this.config.slidesToSlide > 1) {
      countSlides = this.config.slidesToSlide;
    }

    const curSlideCheck = this.curSlide;

    if (this.config.loop) {
      const isCloneSlide = (this.curSlide + countSlides) > (this.innerItems.length - this.visibleSlides);

      if (isCloneSlide) {
        this.isNotTransition();

        const cloneIndex = this.curSlide - this.innerItems.length;
        const cloneIndexOffset = this.visibleSlides;
        const newPos = cloneIndex + cloneIndexOffset;
        const offset = (this.config.rtl ? 1 : -1) * newPos * (this.selectorWidth / this.visibleSlides)
          + (this.config.gap ? this.config.gap : 0);
        const dragDistance = this.config.draggable ? this.drag.endXAxis - this.drag.startXAxis : 0;

        this.slideItem.style.transform = `translate3d(${offset + dragDistance}px, 0, 0)`;

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
  isNotTransition() {
    this.slideItem.style.webkitTransition = `all 0ms ${this.config.easeMode}`;
    this.slideItem.style.transition = `all 0ms ${this.config.easeMode}`;
  }


  /**
   * Enable transition on slideItem.
   */
  isTransition() {
    this.slideItem.style.webkitTransition = `all ${this.config.duration}ms ${this.config.easeMode}`;
    this.slideItem.style.transition = `all ${this.config.duration}ms ${this.config.easeMode}`;
  }


  /**
   * Go to specific slide method
   * @param index
   */
  goToSlide(index) {
    if (this.innerItems.length <= this.visibleSlides) {
      return;
    }
    const curSlideCheck = this.curSlide;
    this.curSlide = this.config.loop
      ? index % this.innerItems.length
      : Math.min(Math.max(index, 0), this.innerItems.length - this.visibleSlides);

    if (curSlideCheck !== this.curSlide) {
      this.slideToCurrent();
      this.config.onChange.call(this);
    }
  }


  /**
   * Jump to active slide
   * @param isTransition
   */
  slideToCurrent(isTransition) {
    const curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
    const offset = (this.config.rtl ? 1 : -1) * curSlide * (this.selectorWidth / this.visibleSlides)
      + (this.config.gap ? this.config.gap : 0);

    if (isTransition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.isTransition();
          this.slideItem.style.transform = `translate3d(${offset + this.config.gap}px, 0, 0)`;
        });
      });
    } else {
      this.slideItem.style.transform = `translate3d(${offset}px, 0, 0)`;
    }
  }


  /**
   * Get new position after dragging
   */
  updateAfterDrag() {
    const movement = (this.config.rtl ? -1 : 1) * (this.drag.endXAxis - this.drag.startXAxis);
    const moveDistance = Math.abs(movement);
    const slideableSlides = this.config.multipleDrag
      ? Math.ceil(moveDistance / (this.selectorWidth / this.visibleSlides))
      : this.config.slidesToSlide;

    const slideToNegativeClone = movement > 0 && this.curSlide - slideableSlides < 0;
    const slideToPositiveClone = movement < 0
      && (this.curSlide + slideableSlides) > (this.innerItems.length - this.visibleSlides);

    if (movement > 0 && moveDistance > this.config.triggerDistance
      && this.innerItems.length > this.visibleSlides) {
      this.prevSlide(slideableSlides);
    } else if (movement < 0 && moveDistance > this.config.triggerDistance
      && this.innerItems.length > this.visibleSlides) {
      this.nextSlide(slideableSlides);
    }
    this.slideToCurrent(slideToNegativeClone || slideToPositiveClone);
  }


  /**
   * dynamic item sizes for browser scaling
   */
  resizeHandler() {
    this.slidesAmount();

    if ((this.curSlide + this.visibleSlides) > this.innerItems.length) {
      this.curSlide = this.innerItems.length <= this.visibleSlides ? 0 : this.innerItems.length - this.visibleSlides;
    }
    this.selectorWidth = this.selector.offsetWidth;

    this.sliderContainerCreate();
    this.arrowsVisibility();
    this.arrowsInit();
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


  /**
   * Remove item method
   * @param index
   */
  remove(index) {
    const lowerIndex = index < this.curSlide;
    const lastItem = (this.curSlide + this.visibleSlides) - 1 === index;

    if (lowerIndex || lastItem) {
      this.curSlide -= 1;
    }

    this.innerItems.splice(index, 1);

    // build a frame and slide to a curSlide
    this.sliderContainerCreate();
  }


  /**
   * Insert item method
   * @param item
   * @param index
   */
  insert(item, index) {
    this.innerItems.splice(index, 0, item);
    this.sliderContainerCreate();
  }


  /**
   * Prepend item method
   * @param item
   */
  prepend(item) {
    this.insert(item, 0);
  }


  /**
   * Append item method
   * @param item
   */
  append(item) {
    this.insert(item, this.innerItems.length + 1);
  }


  /**
   * Autoplay method
   */
  autoPlay() {
    setInterval(() => this.nextSlide(), this.config.autoplayDuration);
  }


  /**
   * add arrows
   */
  arrowsInit() {
    if (this.arrowsVisible >= 1 && this.config.arrows) {
      this.prevSelector = document.createElement('button');
      this.prevSelector.setAttribute('class', this.config.prevArrowClass);
      this.prevSelector.innerHTML = this.config.prevArrowInner;
      this.selector.appendChild(this.prevSelector);

      this.nextSelector = document.createElement('button');
      this.nextSelector.setAttribute('class', this.config.nextArrowClass);
      this.nextSelector.innerHTML = this.config.nextArrowInner;
      this.selector.appendChild(this.nextSelector);

      this.prevSelector.addEventListener('click', () => this.prevSlide());
      this.nextSelector.addEventListener('click', () => this.nextSlide());
    }
  }


  /**
   * sets visibility of arrows based on viewport
   * (fixed number or object value for responsive changes)
   */
  arrowsVisibility() {
    if (typeof this.config.arrowsVisible === 'number') {
      this.arrowsVisible = this.config.arrowsVisible;
    } else if (typeof this.config.arrowsVisible === 'object') {
      this.arrowsVisible = 1;
      Object.keys(this.config.arrowsVisible).forEach(key => {
        if (window.innerWidth >= key) {
          this.arrowsVisible = this.config.arrowsVisible[key];
        }
      });
    }
  }


  /**
   * add keyboard navigation
   */
  keyboardNavigaion() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
      }

      if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    });
  }


  /**
   * click event handler
   */
  clickHandler(e) {
    // prevent clicking link on dragging
    // (note: if subitems inside slide, you need to set `pointer-events: none` via css.)
    if (this.drag.preventClick) {
      e.preventDefault();
    }
    this.drag.preventClick = false;
  }

  /**
   * mousedown event handler
   */
  mousedownHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    this.pointerDown = true;
    this.drag.startXAxis = e.pageX;
  }


  /**
   * mouseup event handler
   */
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


  /**
   * mousemove event handler
   */
  mousemoveHandler(e) {
    e.preventDefault();
    if (this.pointerDown) {
      if (e.target.nodeName === 'A') {
        this.drag.preventClick = true;
      }

      this.drag.endXAxis = e.pageX;
      this.selector.style.cursor = '-webkit-grabbing';
      this.slideItem.style.webkitTransition = `all 0ms ${this.config.easeMode}`;
      this.slideItem.style.transition = `all 0ms ${this.config.easeMode}`;

      const curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
      const currentOffset = curSlide * (this.selectorWidth / this.visibleSlides);
      const dragOffset = (this.drag.endXAxis - this.drag.startXAxis);
      const offset = this.config.rtl
        ? currentOffset + dragOffset + (this.config.gap ? this.config.gap : 0)
        : currentOffset - dragOffset - (this.config.gap ? this.config.gap : 0);
      this.slideItem.style.transform = `translate3d(${(this.config.rtl ? 1 : -1) * offset}px, 0, 0)`;
    }
  }


  /**
   * mouseleave event handler
   */
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


  /**
   * touchstart event handler
   */
  touchstartHandler(e) {
    e.stopPropagation();
    this.drag.startXAxis = e.touches[0].pageX;
    this.drag.startYAxis = e.touches[0].pageY;
    this.pointerDown = true;
  }


  /**
   * touchend event handler
   */
  touchendHandler(e) {
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
  touchmoveHandler(e) {
    e.stopPropagation();

    if (this.drag.dragOff === null) {
      this.drag.dragOff = Math.abs(this.drag.startYAxis - e.touches[0].pageY)
        < Math.abs(this.drag.startXAxis - e.touches[0].pageX);
    }

    if (this.pointerDown && this.drag.dragOff) {
      e.preventDefault();
      this.drag.endXAxis = e.touches[0].pageX;
      this.slideItem.style.webkitTransition = `0 all ${this.config.easeMode} `;
      this.slideItem.style.transition = `0 all ${this.config.easeMode} `;

      const curSlide = this.config.loop ? this.curSlide + this.visibleSlides : this.curSlide;
      const currentOffset = curSlide * (this.selectorWidth / this.visibleSlides);
      const dragOffset = (this.drag.endXAxis - this.drag.startXAxis);
      const offset = this.config.rtl
        ? currentOffset + dragOffset + (this.config.gap ? this.config.gap : 0)
        : currentOffset - dragOffset - (this.config.gap ? this.config.gap : 0);
      this.slideItem.style.transform = `translate3d(${(this.config.rtl ? 1 : -1) * offset}px, 0, 0)`;
    }
  }

  /**
   * destroy method
   * @param restore
   */
  destroy(restore = false) {
    // remove listeners
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
  }
}
