import { initBannerCarousel } from '../src/js/banner';

describe('Banner Carousel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = `
      <div id="text1">Text 1</div>
      <div id="text2">Text 2</div>
      <div id="text3">Text 3</div>
    `;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('sets first text active on init', () => {
    initBannerCarousel();
    expect(document.getElementById('text1')).toHaveClass('active');
  });

  test('cycles through texts every 6 seconds', () => {
    initBannerCarousel();

    jest.advanceTimersByTime(6000);
    expect(text2).toHaveClass('active');

    jest.advanceTimersByTime(6000);
    expect(text3).toHaveClass('active');

    jest.advanceTimersByTime(6000);
    expect(text1).toHaveClass('active');
  });

  test('does nothing when no texts exist', () => {
    document.body.innerHTML = '';
    expect(() => initBannerCarousel()).not.toThrow();
  });
});
