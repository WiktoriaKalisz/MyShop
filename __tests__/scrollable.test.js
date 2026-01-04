import { initCollectionsScroll } from '../src/js/scrollable';

describe('initCollectionsScroll', () => {
  let container;
  let leftBtn;
  let rightBtn;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="collections-wrapper">
        <button class="scroll-btn left"></button>
        <div class="collections-container"></div>
        <button class="scroll-btn right"></button>
      </div>
    `;

    container = document.querySelector('.collections-container');
    leftBtn = document.querySelector('.scroll-btn.left');
    rightBtn = document.querySelector('.scroll-btn.right');

    // jsdom fix
    Object.defineProperty(container, 'scrollWidth', { value: 1200 });
    Object.defineProperty(container, 'clientWidth', { value: 400 });
    Object.defineProperty(container, 'scrollLeft', { value: 0, writable: true });

    container.scrollBy = jest.fn();
  });

  test('left button is hidden on init', () => {
    initCollectionsScroll();

    expect(leftBtn).toHaveClass('hidden');
    expect(rightBtn).not.toHaveClass('hidden');
  });

  test('left button appears after scrolling right', () => {
    initCollectionsScroll();

    container.scrollLeft = 200;
    container.dispatchEvent(new Event('scroll'));

    expect(leftBtn).not.toHaveClass('hidden');
  });

  test('right button hides when scrolled to end', () => {
    initCollectionsScroll();

    container.scrollLeft = 800; // 1200 - 400
    container.dispatchEvent(new Event('scroll'));

    expect(rightBtn).toHaveClass('hidden');
  });

  test('clicking right button scrolls container right', () => {
    initCollectionsScroll();

    rightBtn.click();

    expect(container.scrollBy).toHaveBeenCalledWith({
      left: 400,
      behavior: 'smooth'
    });
  });

  test('clicking left button scrolls container left', () => {
    initCollectionsScroll();

    leftBtn.click();

    expect(container.scrollBy).toHaveBeenCalledWith({
      left: -400,
      behavior: 'smooth'
    });
  });

  test('does not crash if elements are missing', () => {
    document.body.innerHTML = '';
    expect(() => initCollectionsScroll()).not.toThrow();
  });
});
