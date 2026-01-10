import { initCollectionSort, initCollectionSizeFilter } from '../src/js/collection';

describe('Collection Sort', () => {
  let originalLocation;

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

    originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: 'http://example.com/collections',
      },
    });
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  test('opens sort panel on toggle click', () => {
    initCollectionSort();

    document.getElementById('sort-toggle').click();

    expect(
      document.getElementById('sort-panel').classList.contains('open')
    ).toBe(true);

    expect(
      document.getElementById('sort-overlay').classList.contains('active')
    ).toBe(true);
  });

  test('closes sort panel on close button click', () => {
    initCollectionSort();

    document.getElementById('sort-toggle').click();
    document.getElementById('sort-close').click();

    expect(
      document.getElementById('sort-panel').classList.contains('open')
    ).toBe(false);
  });

  test('closes sort panel on overlay click', () => {
    initCollectionSort();

    document.getElementById('sort-toggle').click();
    document.getElementById('sort-overlay').click();

    expect(
      document.getElementById('sort-panel').classList.contains('open')
    ).toBe(false);
  });

  test('updates URL with selected sort option on apply', () => {
    initCollectionSort();

    const priceOption = document.querySelector(
      'input[name="sort-option"][value="price"]'
    );

    priceOption.checked = true;
    document.getElementById('apply-sort').click();

    expect(window.location.href).toBe(
      'http://example.com/collections?sort_by=price'
    );
  });
});

describe('Collection Size Filter', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="size-button">
        <input type="radio" name="size" />
        Small
      </div>
      <div class="size-button">
        <input type="radio" name="size" />
        Medium
      </div>
    `;
  });

  test('toggles active class on size change', () => {
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
