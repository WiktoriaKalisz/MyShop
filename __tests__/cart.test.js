import { initCartPanel, initMobileMenu } from '../src/js/cart';

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

describe('initCartPanel', () => {
  beforeEach(() => {
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
        <button type="submit">Add</button>
      </form>
    `;
  });

  test('does not crash when required DOM elements are missing', () => {
    document.body.innerHTML = '';
    expect(() => initCartPanel()).not.toThrow();
  });

  test('does not render price for invalid cents', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        items: [{
          product_title: 'Test',
          variant_title: 'M',
          quantity: 1,
          image: '',
          line_price: null
        }],
        item_count: 1,
        items_subtotal_price: null
      })
    })
  );

  initCartPanel();
  document.getElementById('cart-toggle').click();
  await flushPromises();

  expect(document.querySelector('.cart-item-price').textContent).toBe('');
});

  test('renders empty cart', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            items: [],
            item_count: 0,
            items_subtotal_price: 0
          })
      })
    );

    initCartPanel();
    document.getElementById('cart-toggle').click();
    await flushPromises();

    expect(document.querySelector('.cart-subtitle').textContent)
      .toContain('empty');
  });

  test('renders cart with product', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            items: [
              {
                product_title: 'T-shirt',
                variant_title: 'M',
                quantity: 2,
                image: '/img.jpg',
                line_price: 5000
              }
            ],
            item_count: 1,
            items_subtotal_price: 5000
          })
      })
    );

    initCartPanel();
    document.getElementById('cart-toggle').click();
    await flushPromises();

    expect(document.querySelector('.cart-item')).toBeTruthy();
    expect(document.querySelector('.cart-item-title').textContent)
      .toBe('T-shirt');
    expect(document.querySelector('.cart-item-price').textContent)
      .toBe('50.00 zł');
  });

  test('increments quantity', async () => {
  global.fetch = jest.fn()
    .mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          items: [
            {
              product_title: 'Hat',
              variant_title: 'Default Title',
              quantity: 1,
              image: '',
              line_price: 3000
            }
          ],
          item_count: 1,
          items_subtotal_price: 3000
        })
    })
    .mockResolvedValue({
      json: () => Promise.resolve({})
    });

  initCartPanel();
  document.getElementById('cart-toggle').click();
  await flushPromises();

  document.querySelector('.qty-btn.plus').click();
  await flushPromises();

  expect(fetch).toHaveBeenCalledWith(
    '/cart/change.js',
    expect.objectContaining({
      body: JSON.stringify({ line: '1', quantity: 2 })
    })
  );
});

test('removes item', async () => {
  global.fetch = jest.fn()
    .mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          items: [
            {
              product_title: 'Shoes',
              variant_title: '42',
              quantity: 1,
              image: '',
              line_price: 10000
            }
          ],
          item_count: 1,
          items_subtotal_price: 10000
        })
    })
    .mockResolvedValue({
      json: () => Promise.resolve({})
    });

  initCartPanel();
  document.getElementById('cart-toggle').click();
  await flushPromises();

  document.querySelector('.remove-btn').click();
  await flushPromises();

  expect(fetch).toHaveBeenCalledWith(
    '/cart/change.js',
    expect.objectContaining({
      body: JSON.stringify({ line: '1', quantity: 0 })
    })
  );
});

  test('handles fetch error gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('API down')));

    initCartPanel();
    document.getElementById('cart-toggle').click();
    await flushPromises();

    expect(console.error).toHaveBeenCalled();
  });

  test('renders plural items label', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        items: [
          { product_title: 'A', variant_title: 'M', quantity: 1, image: '', line_price: 1000 },
          { product_title: 'B', variant_title: 'L', quantity: 1, image: '', line_price: 2000 }
        ],
        item_count: 2,
        items_subtotal_price: 3000
      })
    })
  );

  initCartPanel();
  document.getElementById('cart-toggle').click();
  await flushPromises();

  expect(document.querySelector('.cart-subtitle').textContent)
    .toContain('items');
});

test('logs message after add to cart', async () => {
  jest.spyOn(console, 'log').mockImplementation(() => {});

  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve({}) })
  );

  initCartPanel();

  document.querySelector('form')
    .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

  await flushPromises();

  expect(console.log).toHaveBeenCalled();
});

test('minus button does not go below zero', async () => {
  global.fetch = jest.fn()
    .mockResolvedValueOnce({
      json: () => Promise.resolve({
        items: [{
          product_title: 'Hat',
          variant_title: 'M',
          quantity: 0,
          image: '',
          line_price: 0
        }],
        item_count: 1,
        items_subtotal_price: 0
      })
    })
    .mockResolvedValue({ json: () => Promise.resolve({}) });

  initCartPanel();
  document.getElementById('cart-toggle').click();
  await flushPromises();

  document.querySelector('.qty-btn.minus').click();
  await flushPromises();

  expect(fetch).toHaveBeenCalledWith(
    '/cart/change.js',
    expect.objectContaining({
      body: JSON.stringify({ line: '1', quantity: 0 })
    })
  );
});

test('handles change cart error', async () => {
  global.fetch = jest.fn()
    .mockResolvedValueOnce({
      json: () => Promise.resolve({
        items: [{
          product_title: 'Hat',
          variant_title: 'M',
          quantity: 1,
          image: '',
          line_price: 1000
        }],
        item_count: 1,
        items_subtotal_price: 1000
      })
    })
    .mockRejectedValueOnce(new Error('change error'));

  initCartPanel();
  document.getElementById('cart-toggle').click();
  await flushPromises();

  document.querySelector('.qty-btn.plus').click();
  await flushPromises();

  expect(console.error).toHaveBeenCalled();
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

  test('toggles menu', () => {
    initMobileMenu();
    document.querySelector('.mobile-menu-icon').click();
    expect(document.querySelector('.mobile-dropdown')).toHaveClass('active');
  });
});
