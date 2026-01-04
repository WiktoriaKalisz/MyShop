export function initSearchSizeFilter(root = document) {
  const sizeButtons = root.querySelectorAll('.size-button');
  
  sizeButtons.forEach(btn => {
    const input = btn.querySelector('input[type="radio"]');
    if (!input) return;
    
    input.addEventListener('change', () => {
      sizeButtons.forEach(b => b.classList.remove('active'));
      if (input.checked) {
        btn.classList.add('active');
      }
    });
  });
}
