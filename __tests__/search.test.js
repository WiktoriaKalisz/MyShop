import { initSearchSizeFilter } from '../src/js/search';

describe('Search Size Filter', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="size-button">
        <input type="radio" name="size" value="s">
        Small
      </div>
      <div class="size-button">
        <input type="radio" name="size" value="m">
        Medium
      </div>
      <div class="size-button">
        <input type="radio" name="size" value="l">
        Large
      </div>
    `;
  });

  test('activates selected size and deactivates others', () => {
    initSearchSizeFilter();
    const buttons = document.querySelectorAll('.size-button');
    const inputs = document.querySelectorAll('input[type="radio"]');

    inputs[0].click();
    expect(buttons[0].classList.contains('active')).toBe(true);
    expect(buttons[1].classList.contains('active')).toBe(false);
  });

  test('only one size button active at a time', () => {
    initSearchSizeFilter();
    const buttons = document.querySelectorAll('.size-button');
    const inputs = document.querySelectorAll('input[type="radio"]');

    inputs[0].click();
    expect(buttons[0].classList.contains('active')).toBe(true);

    inputs[1].click();
    expect(buttons[0].classList.contains('active')).toBe(false);
    expect(buttons[1].classList.contains('active')).toBe(true);

    inputs[2].click();
    expect(buttons[1].classList.contains('active')).toBe(false);
    expect(buttons[2].classList.contains('active')).toBe(true);
  });

  test('handles missing input gracefully', () => {
    document.body.innerHTML = '<div class="size-button">No input</div>';
    expect(() => initSearchSizeFilter()).not.toThrow();
  });

  test('does not crash when no size buttons exist', () => {
  document.body.innerHTML = '';
  expect(() => initSearchSizeFilter()).not.toThrow();
});
});
