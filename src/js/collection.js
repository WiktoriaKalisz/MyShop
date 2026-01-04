export function initCollectionSort() {
  const sortBtn = document.getElementById('sort-toggle');
  const sortPanel = document.getElementById('sort-panel');
  const sortClose = document.getElementById('sort-close');
  const overlay = document.getElementById('sort-overlay');
  const applySort = document.getElementById('apply-sort');

  if (!sortBtn || !sortPanel || !overlay || !applySort) return;

  function closePanel() {
    sortPanel.classList.remove('open');
    overlay.classList.remove('active');
  }

  sortBtn.addEventListener('click', () => {
    sortPanel.classList.add('open');
    overlay.classList.add('active');
  });

  overlay.addEventListener('click', closePanel);
  sortClose.addEventListener('click', closePanel);

  applySort.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="sort-option"]:checked');
    if (selectedOption) {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', selectedOption.value);
      window.location.href = url.toString();
    }
  });
}

export function initCollectionSizeFilter() {
  const sizeButtons = document.querySelectorAll('.size-button');
  
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
