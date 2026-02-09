import React from 'react';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import { LayoutContext } from '../hooks/LayoutContext';

const AspectRatioContainer = ({ children }) => {
  const layout = useResponsiveLayout();

  const totalHeight = layout.isPortrait
    ? layout.boxHeight + layout.inventoryHeight
    : layout.boxHeight;

  return (
    <div
      style={{
        width: '100%',
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: layout.boxWidth,
          height: totalHeight,
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <LayoutContext.Provider value={layout}>
          {children}
        </LayoutContext.Provider>
      </div>
    </div>
  );
};

export default AspectRatioContainer;
