(() => {
  const initGallery = (root) => {
    if (!root || root.dataset.brGalleryReady === 'true') return;

    const mainImage = root.querySelector('.br-home__main-image');
    const buttons = root.querySelectorAll('[data-br-gallery-image]');
    if (!mainImage || !buttons.length) return;

    root.dataset.brGalleryReady = 'true';

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        mainImage.src = button.dataset.brGalleryImage;
        mainImage.alt = button.dataset.brGalleryAlt || '';
        buttons.forEach((item) => item.setAttribute('aria-pressed', item === button ? 'true' : 'false'));
      });
    });
  };

  const initAll = (scope = document) => {
    scope.querySelectorAll('[data-br-gallery]').forEach(initGallery);
  };

  document.addEventListener('DOMContentLoaded', () => initAll());
  document.addEventListener('shopify:section:load', (event) => initAll(event.target));
})();
