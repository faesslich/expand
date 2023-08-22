<img alt="Expand logo" src="https://github.com/faesslich/expand/blob/master/demo/assets/expand-logo.png?raw=true" width="300" />

## Expand - the lightweight pure JS carousel/slider

Expand is a dependency free vanilla js slider/carousel. It was built as an alternative for the often used jQuery carousel 
"slick" but without depending on jQuery and utilizing the advantages of object oriented programming.

#### Quick facts:
- 100% free and open source (personal/commercial)
- only 5kb gzipped
- modern ES6 javascript but compiled to ES5 for a larger browser compatibility
- available via CDN: https://cdn.jsdelivr.net/gh/faesslich/expand/dist/

<p><br></p>

## Basic usage:

#### HTML:
```html
<div class="expand-js-outer">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
</div>
```

#### JS (ES6 import):
```javascript
import Expand from 'expand';
new Expand();
```

#### JS static include:
```html
<script src="dist/expand.umd.min.js"></script>
<script>
    new Expand();
</script>
```


## Advanced usage:
#### HTML (with a custom selector and data-attribute with additional options):
```html
<div class="expand-js-outer custom-selector" data-options='
    {
        "arrows": true,
        "visibleSlides": {
            "768": 2,
            "1024": 3,
            "1280": 4
        }
    }
'>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
</div>
```

#### JS (ES6 import + a huge amount of options):
```javascript
import Expand from 'expand';

const customExpandSelector = document.querySelector('.custom-selector');
const customExpandSelectorDemo = new Expand(
    {
        selector: customExpandSelector,
        duration: 300,
        easeMode: 'ease-out',
        visibleSlides: {
            100: 1,
            768: 2,
            1024: 3,
            1280: 5
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
            1280: false
        },
        prevArrowClass: 'expand-js--prev expand-custom-arrows',
        nextArrowClass: 'expand-js--next expand-custom-arrows',
        prevArrowInner: '<span>«</span>',
        nextArrowInner: '<span>»</span>',
        rtl: true,
        keyboard: true,
        loop: true,
        centerMode: true,
        centerModeRange: true
    }, 
    JSON.parse(customExpandSelector.dataset.options)
);
```
> ### Huge amount of examples in the [DEMO](https://github.com/faesslich/expand/blob/master/demo/index.html).


<p><br></p>


## Options
``` javascript
{
  selector: '.expand-js-outer',
  itemSelector: '.expand-js--item',
  visibleSlides: 1,
  useCssFile: true,
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
  onInit: () => {},
  onChange: () => {}
}
```

| Key | Type | Default | Description |
| --- | ---- | ------- | ----------- |
| `selector`                    | (string or DOM node)  | `.expand-js-outer`    | _Option to add a custom selector for your **slider container**._ |
| `itemSelector`                | (string or DOM node)  | `.expand-js--item`    | _Option to add a custom selector for your **items**._ |
| `visibleSlides`               | (number or object)    | `1`                   | _Select how many slides are visible. Static (number) or responsive (object)._ |
| `useCssFile`                  | (boolean)             |  `true`               | _Determine if CSS classes should be used or if inline-styles are the way to go. Not using CSS is not recommended especially for advanced usage._ |
| `cssCustomPath`               | (string)              | ` `                   | _Add a path to the CSS file that should be used. (optional)_ |
| `startIndex`                  | (number)              | `1`                   | _Select at which slide the slider/carousel should start on initialization._ |
| `draggable`                   | (boolean)             | `true`                | _Select if slider/carousel should be draggable._ |
| `multipleDrag`                | (boolean)             | `true`                | _Select if slider/carousel should be able to slide over multiple slides._ |
| `triggerDistance`             | (number)              | `20`                  | _Select the trigger distance on dragging a slide._ |
| `loop`                        | (boolean)             | `true`                | _Select if slider/carousel should loop._ |
| `rtl`                         | (boolean)             | `false`               | _Select if slider/carousel should go right-to-left._ |
| `duration`                    | (number)              | `500`                 | _Change the speed of the slides change._ |
| `easeMode`                    | (string)              | `ease-out`            | _Change the ease mode. But it's not recommended or needed anyway._ |
| `slidesToSlide`               | (number)              | `1`                   | _Select how many slided should slide on e.g. `nextSlide` event. Note: Not working if `multipleDrag` is set to `false`_ |
| `activeClass`                 | (boolean)             | `true`                | _Select if the visible slides should get an active class._ |
| `centerMode`                  | (boolean)             | `false`               | _Select if the slides in the middle should get an center class for highlighting._ |
| `centerModeRange`             | (boolean)             | `false`               | _Select if the slides next to the centered slide should get an extra class for highlighting._ |
| `pagination`                  | (boolean)             | `false`               | _Select if slider/carousel should have a pagination._ |
| `paginationVisible`           | (boolean or object)   | `true`                | _Select if/when pagination should be visible. Static (number) or responsive (object)._ |
| `paginationType`              | (string)              | ` `                   | _Options: ` ` or `dots` _ |
| `paginationContainer`         | (string)              | `expand-pagination`   | _Option to add a custom selector for your **pagination container**_ |
| `paginationItemSelector`      | (string)              | ` `                   | _Option to add a custom selector for your **pagination items**_ |
| `paginationItemActiveClass`   | (string)              | `active`              | _Option to add a custom selector for your **pagination item active classes**._ |
| `autoplay`                    | (boolean)             | `false`               | _Select if slider/carousel should have autoplay enabled._ |
| `autoplayDuration`            | (number)              | `3000`                | _Set the speed of autoplay._ |
| `arrows`                      | (boolean)             | `false`               | _Select if slider/carousel should have an arrows navigation._ |
| `arrowsVisible`               | (boolean or object)   | `true`                | _Select if/when arrows navigation should be visible. Static (number) or responsive (object)._ |
| `prevArrowClass`              | (string)              | `expand-js--prev`     | _Changes the class of previous button in arrow navigation._ |
| `nextArrowClass`              | (string)              | `expand-js--next`     | _Changes the class of next button in arrow navigation._ |
| `prevArrowInner`              | (string)              | `‹`                   | _Changes the innerHTML/innerText of previous button in arrow navigation._ |
| `nextArrowInner`              | (string)              | `›`                   | _Changes the innerHTML/innerText of next button in arrow navigation._ |
| `gap`                         | (number)              | `0`                   | _Set a gap at the end of the slider to see a part of the upcoming slide._ |
| `keyboard`                    | (boolean)             | `false`               | _Select of keyboard navigation should be enabled._ |
| `onInit`                      | (function)            | `() => {}`            | _Add a custom method that runs after slider/carousel has been initialized._ |
| `onChange`                    | (function)            | `() => {}`            | _Add a custom method that runs after a slide has changed._ |


<p><br></p>

## API usages

| Method | Parameter |
| ------ | --------- |
| `goToSlide`   | `index` (int), `cb` (callback method), `delay` (time in ms until callback is fired) |
| `nextSlide`   | `countSlides` (int), `cb` (callback method), `delay` (time in ms until callback is fired) |
| `prevSlide`   | `countSlides` (int), `cb` (callback method), `delay` (time in ms until callback is fired) |
| `remove`      | `index` (int), `cb` (callback method), `delay` (time in ms until callback is fired) |
| `insertElem`  | `item` (dom element), `index` (int), `cb` (callback method), `delay` (time in ms until callback is fired) | 
| `prependElem` | `item` (dom element), `index` (int), `cb` (callback method), `delay` (time in ms until callback is fired) |
| `appendElem`  | `item` (dom element), `index` (int), `cb` (callback method), `delay` (time in ms until callback is fired) |
| `destroy`     | `restore` (boolean), `cb` (callback method), `delay` (time in ms until callback is fired) |

> ### A few examples of the API usage can be found in the [DEMO](https://github.com/faesslich/expand/blob/master/demo/index.html).

<p><br></p>

## Browser support
- Chrome >= 27
- Firefox >= 21
- Opera >= 23
- Safari >= 9.1
- Edge >= 12
- Android Browser >= 4.4
- iOS Safari >= 9.2
- IE 11 (just partial, but... who cares)

