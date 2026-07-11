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
      if (mainImage) {
        mainImage.src = input.dataset.image;
        mainImage.alt = `Brosse Belle Repousse ${input.value.toLowerCase()}`;
      }
    };

    const updateBundle = (input) => {
      quantityInput.value = input.value;
      total.textContent = input.dataset.total;
    };

    colors.forEach((input) => input.addEventListener('change', () => updateColor(input)));
    bundles.forEach((input) => input.addEventListener('change', () => updateBundle(input)));
  };

  const initAll = (scope = document) => scope.querySelectorAll('[data-br-purchase]').forEach(initPurchase);
  document.addEventListener('DOMContentLoaded', () => initAll());
  document.addEventListener('shopify:section:load', (event) => initAll(event.target));
})();
