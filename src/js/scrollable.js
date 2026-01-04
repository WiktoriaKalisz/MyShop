export function initCollectionsScroll(root = document) {
  const wrappers = root.querySelectorAll('.collections-wrapper');

  wrappers.forEach(wrapper => {
    const container = wrapper.querySelector('.collections-container');
    const btnLeft = wrapper.querySelector('.scroll-btn.left');
    const btnRight = wrapper.querySelector('.scroll-btn.right');

    if (!container || !btnLeft || !btnRight) return;

    const updateButtons = () => {
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      btnLeft.classList.toggle('hidden', scrollLeft <= 0);
      btnRight.classList.toggle('hidden', scrollLeft >= maxScrollLeft);
    };

    btnLeft.addEventListener('click', () => {
      container.scrollBy({ left: -400, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
      container.scrollBy({ left: 400, behavior: 'smooth' });
    });

    container.addEventListener('scroll', updateButtons);
    updateButtons();
  });
}
