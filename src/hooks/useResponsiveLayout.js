import { useState, useEffect } from 'react';

const ASPECT_RATIO = 16 / 9;
const PORTRAIT_BREAKPOINT = 1.0;
const INVENTORY_BAR_HEIGHT = 80;

function computeLayout() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const screenRatio = vw / vh;
  const isPortrait = screenRatio < PORTRAIT_BREAKPOINT;

  let boxWidth, boxHeight;

  if (isPortrait) {
    const availableHeight = vh - INVENTORY_BAR_HEIGHT;
    if (vw / availableHeight > ASPECT_RATIO) {
      boxHeight = availableHeight;
      boxWidth = availableHeight * ASPECT_RATIO;
    } else {
      boxWidth = vw;
      boxHeight = vw / ASPECT_RATIO;
    }
  } else {
    if (screenRatio > ASPECT_RATIO) {
      boxHeight = vh;
      boxWidth = vh * ASPECT_RATIO;
    } else {
      boxWidth = vw;
      boxHeight = vw / ASPECT_RATIO;
    }
  }

  return {
    isPortrait,
    boxWidth: Math.floor(boxWidth),
    boxHeight: Math.floor(boxHeight),
    inventoryHeight: isPortrait ? INVENTORY_BAR_HEIGHT : 0,
  };
}

export function useResponsiveLayout() {
  const [layout, setLayout] = useState(computeLayout);

  useEffect(() => {
    const onResize = () => setLayout(computeLayout());
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(onResize, 100);
    });
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  return layout;
}
