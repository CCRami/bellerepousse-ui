(() => {
  const initPurchase = (root) => {
    if (root.dataset.brPurchaseReady === 'true') return;
    root.dataset.brPurchaseReady = 'true';

    const colors = [...root.querySelectorAll('[data-br-color]')];
    const bundles = [...root.querySelectorAll('[data-br-bundle]')];
    const variantInput = root.querySelector('[data-br-variant-input]');
    const quantityInput = root.querySelector('[data-br-quantity-input]');
    const total = root.querySelector('[data-br-total]');
    const colorLabel = root.querySelector('[data-br-color-label]');
    const addButton = root.querySelector('[data-br-add]');

    const updateColor = (input) => {
      variantInput.value = input.dataset.variantId;
      colorLabel.textContent = input.value;
      addButton.disabled = input.dataset.available !== 'true';
      const gallery = root.closest('.br-home__hero')?.querySelector('[data-br-gallery]');
      const mainImage = gallery?.querySelector('.br-home__main-image');
      const colorThumbs = [...(gallery?.querySelectorAll('[data-br-color-thumb]') || [])];
      if (mainImage) {
        mainImage.src = input.dataset.image;
        mainImage.alt = `Brosse Belle Repousse ${input.value.toLowerCase()}`;
      }
      let selectedThumbFound = false;
      colorThumbs.forEach((thumb) => {
        const isSelectedColor = thumb.dataset.brColorThumb === input.value;
        thumb.hidden = !isSelectedColor;
        const isPrimaryThumb = isSelectedColor && !selectedThumbFound;
        thumb.setAttribute('aria-pressed', isPrimaryThumb ? 'true' : 'false');
        if (isPrimaryThumb) selectedThumbFound = true;
      });
    };

    const updateBundle = (input) => {
      quantityInput.value = input.value;
      total.textContent = input.dataset.total;
    };

    colors.forEach((input) => input.addEventListener('change', () => updateColor(input)));
    bundles.forEach((input) => input.addEventListener('change', () => updateBundle(input)));
  };

  const initAll = (scope = document) => scope.querySelectorAll('[data-br-purchase]').forEach(initPurchase);
  document.addEventListener('click', (event) => {
    const reviewLink = event.target.closest('[data-br-reviews-link]');
    if (!reviewLink) return;

    const reviewSection = document.getElementById('avis-clients');
    if (!reviewSection) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    reviewSection.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  }, true);
  document.addEventListener('DOMContentLoaded', () => initAll());
  document.addEventListener('shopify:section:load', (event) => initAll(event.target));
})();
