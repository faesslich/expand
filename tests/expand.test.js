import '@testing-library/jest-dom';
import Expand from './../src/expand';

describe('Expand', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        container.className = 'expand-js-outer';

        // Hypothetically adding some slides/items to the container
        for (let i = 0; i < 5; i++) {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.textContent = `Slide ${i + 1}`;
            container.appendChild(slide);
        }

        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('should initialize with default settings', () => {
        const carousel = new Expand();
        expect(carousel.config).toEqual(expect.objectContaining({
            selector: '.expand-js-outer',
            draggable: true,
        }));
    });

    it('should initialize with default settings', () => {
        const expand = new Expand();
        expect(expand.config).toBeDefined();
        expect(expand.selector).toBe(container);
    });

    it('should modify the DOM on initialization', () => {
        const expand = new Expand();
        expect(document.querySelector('.expand-outer')).toBeInTheDocument();
    });

    it('should navigate to the next slide', () => {
        const expand = new Expand();
        const initialSlide = expand.curSlide;
        expand.slide('next');
        expect(expand.curSlide).toBe(initialSlide + 1);
    });

    it('should navigate to a specific slide using goToSlide', () => {
        const expand = new Expand();
        expand.goToSlide(4);
        expect(expand.curSlide).toBe(4);
    });

    it('should create arrows based on configuration', () => {
        new Expand({ arrows: true }, {}, container);
        const prevArrow = document.querySelector('.expand-js--prev');
        const nextArrow = document.querySelector('.expand-js--next');
        expect(prevArrow).not.toBeNull();
        expect(nextArrow).not.toBeNull();
    });

    it('should create pagination based on configuration', () => {
        new Expand({ pagination: true }, {}, container);
        const paginationContainer = document.querySelector('.expand-pagination');
        expect(paginationContainer).not.toBeNull();
    });

    it('should loop based on configuration', () => {
        const carousel = new Expand({ loop: true }, {}, container);
        expect(carousel.config.loop).toBeTruthy();
    });

    it('should adjust to window resizing', () => {
        const expand = new Expand();
        window.innerWidth = 480;
        window.dispatchEvent(new Event('resize'));
    });

    it('should cleanup when destroyed', () => {
        const expand = new Expand();
        expand.destroy();
    });

    it('should respond to arrow key presses', () => {
        const expand = new Expand();
        expand.handleKeyboardEvent(new KeyboardEvent('keydown', { 'key': 'ArrowRight' }));
        expect(expand.curSlide).toBe(1);
    });

    jest.useFakeTimers();
    it('should auto-play slides', () => {
        const expand = new Expand({ autoplay: true, autoplayDuration: 1000 });
        jest.advanceTimersByTime(1000);
        expect(expand.curSlide).toBe(1);
    });

    it('should pause auto-play on hover', () => {
        const expand = new Expand({ autoplay: true, autoplayDuration: 1000, pauseOnHover: true });
        expand.selector.dispatchEvent(new Event('mouseenter'));
        jest.advanceTimersByTime(1000);
        expect(expand.curSlide).toBe(0);
    });
});
