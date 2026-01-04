export function initBannerCarousel(root = document) {
  const texts = [
    root.getElementById('text1'),
    root.getElementById('text2'),
    root.getElementById('text3')
  ].filter(Boolean);

  if (texts.length === 0) return;

  let currentIndex = 0;

  function showText(index) {
    texts.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
  }

  showText(currentIndex);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % texts.length;
    showText(currentIndex);
  }, 6000);
}
