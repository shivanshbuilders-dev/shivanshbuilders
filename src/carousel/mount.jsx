import React from 'react';
import ReactDOM from 'react-dom/client';
import FlexCarousel from './FlexCarousel';
import { SHIVANSH_PROJECT_ITEMS } from './items.js';

export { SHIVANSH_PROJECT_ITEMS };

export function mountFlexCarousel(container, customProps = {}) {
  if (!container) return null;
  const root = ReactDOM.createRoot(container);
  
  const defaultProps = {
    items: SHIVANSH_PROJECT_ITEMS,
    preset: 'liquid',
    intro: 'rise',
    cardHeight: 0.52,
    gap: 16,
    radius: 8,
    squeeze: 0.2,
    focusOnClick: true,
    captions: true,
    autoplay: true,
    interval: 4
  };

  const finalProps = { ...defaultProps, ...customProps };
  root.render(React.createElement(FlexCarousel, finalProps));
  return root;
}

if (typeof window !== 'undefined') {
  window.FlexCarouselMount = {
    mount: mountFlexCarousel,
    items: SHIVANSH_PROJECT_ITEMS
  };

  const init = () => {
    const el = document.getElementById('shivanshFlexCarousel');
    if (el && !el.dataset.mounted) {
      el.dataset.mounted = 'true';
      mountFlexCarousel(el);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
