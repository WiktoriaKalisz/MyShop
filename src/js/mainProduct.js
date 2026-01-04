export function initProductForm() {
  const form = document.querySelector('#product-form');
  if (!form) return;

  const sizeInputs = form.querySelectorAll('input[name="id"]');
  const addToCartBtn = form.querySelector('.add-to-cart');

  function updateButtonState() {
    const selected = form.querySelector('input[name="id"]:checked');
    addToCartBtn.disabled = !selected || selected.disabled;
  }

  sizeInputs.forEach(input => {
    input.addEventListener('change', updateButtonState);
  });

  updateButtonState();
}
