import { initProductForm } from '../src/js/mainProduct.js';

describe('initProductForm', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="product-form">
        <label>
          <input type="radio" name="id" value="1">
          Small
        </label>

        <label>
          <input type="radio" name="id" value="2">
          Medium
        </label>

        <button type="button" class="add-to-cart">Add to cart</button>
      </form>
    `;
  });

  test('does not crash when form does not exist', () => {
    document.body.innerHTML = '';
    expect(() => initProductForm()).not.toThrow();
  });

  test('add to cart button is disabled initially', () => {
    initProductForm();

    const button = document.querySelector('.add-to-cart');
    expect(button.disabled).toBe(true);
  });

  test('enables button when size is selected', () => {
    initProductForm();

    const inputs = document.querySelectorAll('input[name="id"]');
    const button = document.querySelector('.add-to-cart');

    inputs[0].checked = true;
    inputs[0].dispatchEvent(new Event('change'));

    expect(button.disabled).toBe(false);
  });

  test('disables button when selected input is disabled', () => {
    initProductForm();

    const input = document.querySelector('input[name="id"]');
    const button = document.querySelector('.add-to-cart');

    input.disabled = true;
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(button.disabled).toBe(true);
  });

  test('switching selection updates button state correctly', () => {
    initProductForm();

    const inputs = document.querySelectorAll('input[name="id"]');
    const button = document.querySelector('.add-to-cart');

    inputs[0].checked = true;
    inputs[0].dispatchEvent(new Event('change'));
    expect(button.disabled).toBe(false);

    inputs[0].checked = false;
    inputs[1].checked = true;
    inputs[1].dispatchEvent(new Event('change'));
    expect(button.disabled).toBe(false);
  });
});
