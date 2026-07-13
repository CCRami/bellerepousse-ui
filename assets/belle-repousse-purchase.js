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
    const addButtonLabel = root.querySelector('[data-br-add-label]');
    const buyNowButton = root.querySelector('[data-br-buy-now]');
    const stockStatus = root.querySelector('[data-br-stock]');
    const stockText = root.querySelector('[data-br-stock-text]');
    const purchaseError = root.querySelector('[data-br-purchase-error]');
    const form = root.querySelector('form[action*="/cart/add"]');

    const updateStock = (input) => {
      if (!stockStatus || !stockText) return;

      const available = input.dataset.available === 'true';
      const tracked = input.dataset.inventoryTracked === 'true';
      const quantity = Number.parseInt(input.dataset.inventoryQuantity || '0', 10);

      if (!available) {
        stockText.textContent = 'Cette couleur est actuellement indisponible.';
      } else if (tracked && quantity > 0) {
        const plural = quantity > 1;
        stockText.textContent = `Stock limité : plus que ${quantity} brosse${plural ? 's' : ''} disponible${plural ? 's' : ''}.`;
      } else {
        stockText.textContent = 'En stock, prête à être expédiée.';
      }
    };

    const updateColor = (input) => {
      variantInput.value = input.dataset.variantId;
      colorLabel.textContent = input.value;
      addButton.disabled = input.dataset.available !== 'true';
      if (addButtonLabel) {
        addButtonLabel.textContent = input.dataset.available === 'true' ? root.dataset.brAvailableLabel : root.dataset.brSoldOutLabel;
      }
      if (buyNowButton) buyNowButton.disabled = input.dataset.available !== 'true';
      updateStock(input);
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

    buyNowButton?.addEventListener('click', async () => {
      if (!form || buyNowButton.disabled) return;

      const originalLabel = buyNowButton.textContent;
      const routeRoot = window.Shopify?.routes?.root || '/';
      buyNowButton.disabled = true;
      buyNowButton.setAttribute('aria-busy', 'true');
      buyNowButton.textContent = 'Redirection vers le paiement...';
      if (purchaseError) purchaseError.hidden = true;

      try {
        const response = await fetch(`${routeRoot}cart/add.js`, {
          method: 'POST',
          headers: {Accept: 'application/json'},
          body: new FormData(form),
        });
        if (!response.ok) throw new Error('Unable to add product');
        window.location.assign(`${routeRoot}checkout`);
      } catch (_error) {
        buyNowButton.disabled = false;
        buyNowButton.removeAttribute('aria-busy');
        buyNowButton.textContent = originalLabel;
        if (purchaseError) {
          purchaseError.textContent = 'Impossible de démarrer le paiement. Veuillez réessayer.';
          purchaseError.hidden = false;
        }
      }
    });
  };

  const initStickyPurchase = (scope = document) => {
    scope.querySelectorAll('[data-br-sticky-purchase]').forEach((button) => {
      if (button.dataset.brStickyReady === 'true') return;
      const target = document.getElementById(button.dataset.brTarget);
      if (!target) return;

      button.dataset.brStickyReady = 'true';
      const observer = new IntersectionObserver(([entry]) => {
        button.hidden = entry.isIntersecting || entry.boundingClientRect.bottom >= 0;
      });
      observer.observe(target);

      button.addEventListener('click', (event) => {
        event.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    });
  };

  const initAll = (scope = document) => {
    scope.querySelectorAll('[data-br-purchase]').forEach(initPurchase);
    initStickyPurchase(scope);
  };
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
