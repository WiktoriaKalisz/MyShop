import { initCartPanel, initMobileMenu } from '../src/js/cart';

const flushPromises = () =>
  new Promise(resolve => setTimeout(resolve, 0));


global.fetch = jest.fn((url) => {
  if (url === '/cart.js') {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          items: [],
          item_count: 0,
          items_subtotal_price: 0
        })
    });
  }

  if (url === '/cart/add.js' || url === '/cart/change.js') {
    return Promise.resolve({
      json: () => Promise.resolve({})
    });
  }

  return Promise.reject(new Error('Unknown endpoint'));
});

describe('initCartPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    document.body.innerHTML = `
      <a href="#" id="cart-toggle">Cart</a>

      <div id="cart-panel">
        <div class="cart-items"></div>
        <div class="subtotal-price">0 zł</div>
        <button id="cart-close">Close</button>
      </div>

      <div id="cart-overlay"></div>

      <form action="/cart/add">
        <input type="hidden" name="id" value="123">
        <button type="submit">Add to cart</button>
      </form>
    `;
  });

  test('does not crash when required DOM elements are missing', () => {
    document.body.innerHTML = '';
    expect(() => initCartPanel()).not.toThrow();
  });

  test('opens cart panel when toggle is clicked', async () => {
    initCartPanel();

    document.getElementById('cart-toggle').click();
    await flushPromises();

    expect(document.getElementById('cart-panel')).toHaveClass('open');
    expect(document.getElementById('cart-overlay')).toHaveClass('active');
  });

  test('closes cart panel when close button is clicked', async () => {
    initCartPanel();

    document.getElementById('cart-toggle').click();
    await flushPromises();

    document.getElementById('cart-close').click();

    expect(document.getElementById('cart-panel')).not.toHaveClass('open');
    expect(document.getElementById('cart-overlay')).not.toHaveClass('active');
  });

  test('closes cart panel when overlay is clicked', async () => {
    initCartPanel();

    document.getElementById('cart-toggle').click();
    await flushPromises();

    document.getElementById('cart-overlay').click();

    expect(document.getElementById('cart-panel')).not.toHaveClass('open');
  });

  test('renders empty cart message when cart is empty', async () => {
  initCartPanel();

  document.getElementById('cart-toggle').click();
  await flushPromises();

  const subtitle = document.querySelector('.cart-subtitle');
  expect(subtitle).not.toBeNull();
  expect(subtitle.textContent.toLowerCase()).toContain('empty');
});

  test('submits add-to-cart form and opens cart', async () => {
  initCartPanel();

  const form = document.querySelector('form[action="/cart/add"]');
  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

  await flushPromises();

  expect(fetch).toHaveBeenCalledWith(
    '/cart/add.js',
    expect.objectContaining({ method: 'POST' })
  );

  expect(document.getElementById('cart-panel')).toHaveClass('open');
  expect(document.getElementById('cart-overlay')).toHaveClass('active');
});
});

describe('initMobileMenu', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="mobile-menu-icon">Menu</div>
      <div class="mobile-dropdown"></div>
      <div class="outside">Outside</div>
    `;
  });

  test('does not crash if DOM elements are missing', () => {
    document.body.innerHTML = '';
    expect(() => initMobileMenu()).not.toThrow();
  });

  test('toggles mobile menu on icon click', () => {
    initMobileMenu();

    const icon = document.querySelector('.mobile-menu-icon');
    const menu = document.querySelector('.mobile-dropdown');

    icon.click();
    expect(menu).toHaveClass('active');

    icon.click();
    expect(menu).not.toHaveClass('active');
  });

  test('closes mobile menu when clicking outside', () => {
    initMobileMenu();

    const icon = document.querySelector('.mobile-menu-icon');
    const menu = document.querySelector('.mobile-dropdown');
    const outside = document.querySelector('.outside');

    icon.click();
    expect(menu).toHaveClass('active');

    outside.click();
    expect(menu).not.toHaveClass('active');
  });

  test('does not close menu when clicking inside', () => {
    initMobileMenu();

    const icon = document.querySelector('.mobile-menu-icon');
    const menu = document.querySelector('.mobile-dropdown');

    icon.click();
    menu.click();

    expect(menu).toHaveClass('active');
  });
});
