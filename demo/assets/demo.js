/* eslint-disable */

import Expand from "../../src/expand";

/**
 * default usage
 * @type {Expand}
 */
if (document.querySelector('.expand-js-outer')) {
  const defaultDemo = new Expand();
}



/**
 * responsive example with custom selector
 * @type {Element}
 */
const responsiveSelector = document.querySelector('.expand-responsive-wrapper');
if (responsiveSelector) {
  const responsiveDemo = new Expand({
    selector: responsiveSelector,
    visibleSlides: {
      768: 2,
      1024: 3
    }
  });
}


/**
 * arrow navigation example with custom selector
 * @type {Element}
 */
const arrowNavSelector = document.querySelector('.expand-arrow-navigation-wrapper');
if (arrowNavSelector) {
  const arrowNavDemo = new Expand({
    selector: arrowNavSelector,
    arrows: true
  });
}

/**
 * responsive expand with a responsive arrow navigation example with custom selector
 * @type {Element}
 */
const responsiveArrowNavSelector = document.querySelector('.expand-responsive-and-arrow-navigation-wrapper');
if (responsiveArrowNavSelector) {
  const responsiveArrowNavDemo = new Expand({
    selector: responsiveArrowNavSelector,
    visibleSlides: {
      768: 2,
      1024: 3
    },
    arrows: true,
    arrowsVisible: {
      100: false,
      1024: true
    }
  });
}


/**
 * responsive expand with a responsive arrow navigation example with custom selector
 * @type {Element}
 */
const customArrowNavSelector = document.querySelector('.expand-custom-arrow-navigation-wrapper');
if (customArrowNavSelector) {
  const customArrowNavDemo = new Expand({
    selector: customArrowNavSelector,
    visibleSlides: {
      768: 2,
      1024: 5
    },
    arrows: true,
    arrowsVisible: {
      100: false,
      1024: true
    },
    prevArrowClass: 'expand-js--prev expand-custom-arrows',
    nextArrowClass: 'expand-js--next expand-custom-arrows',
    prevArrowInner: '<span>«</span>',
    nextArrowInner: '<span>»</span>'
  });
}


/**
 * responsive expand with a responsive pagination example
 * @type {Element}
 */
const paginationSelector = document.querySelectorAll('.expand-pagination-wrapper');
if (paginationSelector) {
  for (let i = 0; i < paginationSelector.length; i += 1) {
    const paginationDemo = new Expand({
        selector: paginationSelector[i],
        visibleSlides: {
          768: 2,
          1024: 3
        },
        arrows: true,
        arrowsVisible: {
          100: false,
          1024: true
        },
        pagination: true,
        // paginationVisible: true,
        paginationVisible: {
          0: false,
          320: true
        }
      },
      // dataOptions
      JSON.parse(paginationSelector[i].dataset.options));
  }
}



/**
 * responsive expand with a responsive arrow navigation example with custom selector
 * @type {Element}
 */
const centerModeSelector = document.querySelector('.expand-center-mode-wrapper');
if (centerModeSelector) {
  const centerModeDemo = new Expand({
    selector: centerModeSelector,
    visibleSlides: {
      768: 2,
      1024: 5
    },
    arrows: true,
    centerMode: true
  });
}



/**
 * responsive expand with a responsive arrow navigation example with custom selector
 * @type {Element}
 */
const centerModeRangeSelector = document.querySelector('.expand-center-mode-range-wrapper');
if  (centerModeRangeSelector) {
  const centerModeRangeDemo = new Expand({
    selector: centerModeRangeSelector,
    visibleSlides: {
      768: 2,
      1024: 5
    },
    arrows: true,
    centerMode: true,
    centerModeRange: true
  });
}

const centerModeRangeSelector2 = document.querySelector('.expand-center-mode-range-wrapper2');
if (centerModeRangeSelector2) {
  const centerModeRangeDemo2 = new Expand({
    selector: centerModeRangeSelector2,
    visibleSlides: {
      768: 2,
      1024: 7
    },
    arrows: true,
    centerMode: true,
    centerModeRange: true
  });
}

/**
 * expand with autoplay enabled and with custom selector
 * @type {Element}
 */
const autoplaySelector = document.querySelector('.expand-autoplay-wrapper');
if (autoplaySelector) {
  const autoplayDemo = new Expand({
    selector: autoplaySelector,
    autoplay: true,
    autoplayDuration: 4000
  });
}


/**
 * expand with multiple slides to slide on trigger
 * @type {Element}
 */
const multiSlideSelector = document.querySelector('.expand-multislide-wrapper');
if (multiSlideSelector) {
  const multiSlideDemo = new Expand({
    selector: multiSlideSelector,
    slidesToSlide: 2
  });
}



/**
 * expand with rtl enabled
 * @type {Element}
 */
const rtlSelector = document.querySelector('.expand-rtl-wrapper');
if (rtlSelector) {
  const rtlDemo = new Expand({
    selector: rtlSelector,
    rtl: true
  });
}



/**
 * expand with keyboard usage enabled
 * @type {Element}
 */
const keyboardSelector = document.querySelector('.expand-keyboard-wrapper');
if (keyboardSelector) {
  const keyboardDemo = new Expand({
    selector: keyboardSelector,
    keyboard: true
  });
}


/**
 * expand with more or less all features enabled at once
 * @type {Element}
 */
const featureSeptionSelector = document.querySelector('.expand-featureseption-wrapper');
if (featureSeptionSelector) {
  const featureSeptionDemo = new Expand({
    selector: featureSeptionSelector,
    duration: 300,
    easeMode: 'ease-out',
    visibleSlides: {
      100: 1,
      768: 2,
      1024: 3
    },
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    triggerDistance: 30,
    slidesToSlide: 2,
    autoplay: true,
    autoplayDuration: 5000,
    arrows: true,
    arrowsVisible: {
      100: false,
      1024: true,
      1920: false
    },
    prevArrowClass: 'expand-js--prev expand-custom-arrows',
    nextArrowClass: 'expand-js--next expand-custom-arrows',
    prevArrowInner: '<span>«</span>',
    nextArrowInner: '<span>»</span>',
    rtl: true,
    keyboard: true,
    loop: true
  });
}



/**
 * multiple expand instances fired by one selector node list
 * @type {NodeListOf<Element>}
 */
const multiInstancesSelectors = document.querySelectorAll('.expand-multi-instances-wrapper');
if (multiInstancesSelectors) {
  for (const multiInstancesSelector of multiInstancesSelectors) {
    const multiInstancesDemo = new Expand({
      selector: multiInstancesSelector,
      duration: 300,
      easeMode: 'ease-out',
      useCssFile: true,
      visibleSlides: {
        100: 1,
        768: 2
      },
      startIndex: 0,
      draggable: true,
      multipleDrag: true,
      arrows: true,
      triggerDistance: 30,
      rtl: false,
      loop: true
    });
  }
}



/**
 * expand with ootb events
 * @type {Element}
 */
const eventBindingSelector = document.querySelector('.expand-event-binding-wrapper');
if (eventBindingSelector) {
  const eventBindingDemo = new Expand({
    selector: eventBindingSelector,
    onInit: () => console.log('I got initialised'),
    onChange: () => {
      console.log('I got changed'),
      eventBindingSelector.style.backgroundColor = "blue",
      eventBindingSelector.style.padding = "2rem"
    }
  });
}


/**
 * expand with callback
 * @type {Element}
 */
const prevBtnCallback = document.querySelector('#goToPrevCallback');
const nextBtnCallback = document.querySelector('#goToNextCallback');
const callbackSelector = document.querySelector('.expand-callback-usage-wrapper');
if (callbackSelector) {
  const callbackDemo = new Expand({
    selector: callbackSelector,
    arrows: true,
    visibleSlides: {
      768: 2,
      1024: 3
    }
  });

// the number inside of the used methods tell the slider how many slides to change
  prevBtnCallback.addEventListener('click', () => callbackDemo.prevSlide(3, () => {
    document.querySelector('.callback-text-output').innerHTML = 'Callback for <b>prevSlide</b> after one second';
    console.log('Callback for prevSlide after one second');
  }, 1000));

  nextBtnCallback.addEventListener('click', () => callbackDemo.nextSlide(3, () => {
    document.querySelector('.callback-text-output').innerHTML = 'Callback for <b>nextSlide</b> after one second';
    console.log('Callback for nextSlide after one second');
  }, 1000));
}




/**
 * bind instance to elements which are not part of the slider itself
 * @type {Element}
 */
const prevBtn = document.querySelector('#goToPrev');
const nextBtn = document.querySelector('#goToNext');
const externalNavSelector = document.querySelector('.expand-api-navigate-binding-wrapper');
if (externalNavSelector) {
  const externalNavDemo = new Expand({
    selector: externalNavSelector,
    visibleSlides: {
      768: 2,
      1024: 3
    },
    arrows: true,
    arrowsVisible: {
      100: false,
      1024: true
    }
  });

// the number inside of the used methods tell the slider how many slides to change
  prevBtn.addEventListener('click', () => externalNavDemo.prevSlide(3));
  nextBtn.addEventListener('click', () => externalNavDemo.nextSlide(3));
}


/**
 * easy manipulate expand and append or prepend new items
 * @type {Element}
 */
const prependBtn = document.querySelector('#prependButton');
const appendBtn = document.querySelector('#appendButton');
const manipulateItemsSelector = document.querySelector('.expand-api-manipulate-items-wrapper');
if (manipulateItemsSelector) {
  const manipulateItemsDemo = new Expand({
    selector: manipulateItemsSelector,
    visibleSlides: 2,
    arrows: true
  });

  prependBtn.addEventListener('click', () => {
    const prependItem = document.createElement('div');
    prependItem.innerHTML = 'I am prepended!';
    manipulateItemsDemo.prependElem(prependItem);
  });

  appendBtn.addEventListener('click', () => {
    const appendItem = document.createElement('div');
    appendItem.innerHTML = 'I am appended!';
    manipulateItemsDemo.appendElem(appendItem);
  });
}



/**
 * add settings to expand via data attribute or any JSON string.
 * JSON String needs to get parsed as in this example!
 * @type {Element}
 */
const dataOptionsSelector = document.querySelector('.expand-api-data-options-wrapper');
if (dataOptionsSelector) {
  const dataOptionsDemo = new Expand({
      selector: dataOptionsSelector,
      visibleSlides: 2,
      arrows: true
    },
    // dataOptions
    JSON.parse(dataOptionsSelector.dataset.options)
  );
}