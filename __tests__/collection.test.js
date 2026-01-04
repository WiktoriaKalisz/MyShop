import { initCollectionSort, initCollectionSizeFilter } from '../src/js/collection';

describe('Collection Sort', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="sort-toggle">Sort</button>
      <div id="sort-panel">
        <label>
          <input type="radio" name="sort-option" value="newest">
          Newest
        </label>
        <label>
          <input type="radio" name="sort-option" value="price">
          Price
        </label>
        <button id="apply-sort">Apply</button>
        <button id="sort-close">Close</button>
      </div>
      <div id="sort-overlay"></div>
    `;
    delete window.location;
    window.location = { href: 'http://example.com/collections' };
  });

  test('sort panel opens on button click', () => {
    initCollectionSort();
    const btn = document.getElementById('sort-toggle');
    const panel = document.getElementById('sort-panel');

    btn.click();
    expect(panel.classList.contains('open')).toBe(true);
  });

  test('sort panel closes on close button', () => {
    initCollectionSort();
    const btn = document.getElementById('sort-toggle');
    const closeBtn = document.getElementById('sort-close');
    const panel = document.getElementById('sort-panel');

    btn.click();
    closeBtn.click();
    expect(panel.classList.contains('open')).toBe(false);
  });

  test('sort panel closes on overlay click', () => {
    initCollectionSort();
    const btn = document.getElementById('sort-toggle');
    const overlay = document.getElementById('sort-overlay');
    const panel = document.getElementById('sort-panel');

    btn.click();
    overlay.click();
    expect(panel.classList.contains('open')).toBe(false);
  });
});

describe('Collection Size Filter', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="size-button">
        <input type="radio" name="size">
        Small
      </div>
      <div class="size-button">
        <input type="radio" name="size">
        Medium
      </div>
    `;
  });

  test('active class toggled on size button', () => {
    initCollectionSizeFilter();
    const buttons = document.querySelectorAll('.size-button');
    const inputs = document.querySelectorAll('input[type="radio"]');

    inputs[0].click();
    expect(buttons[0].classList.contains('active')).toBe(true);
    expect(buttons[1].classList.contains('active')).toBe(false);

    inputs[1].click();
    expect(buttons[0].classList.contains('active')).toBe(false);
    expect(buttons[1].classList.contains('active')).toBe(true);
  });
});
