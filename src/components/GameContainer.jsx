import React from 'react';
import { useLayout } from '../hooks/LayoutContext';
import RoomView from './RoomView';
import InventoryBar from './InventoryBar';
import InspectOverlay from './InspectOverlay';
import DebugToggle from './DebugToggle';
import ColorLegend from './ColorLegend';
import Toast from './Toast';

const GameContainer = () => {
  const { isPortrait } = useLayout();

  return (
    <div className={`relative w-full h-full overflow-hidden flex ${
      isPortrait ? 'flex-col' : 'flex-row'
    }`}>
      {/* Room View (fills available space) */}
      <div className="relative flex-grow min-h-0 min-w-0">
        <RoomView />
      </div>

      {/* Inventory: right sidebar in landscape, bottom bar in portrait */}
      {isPortrait ? (
        <div className="w-full flex-shrink-0" style={{ height: 80 }}>
          <InventoryBar layout="portrait" />
        </div>
      ) : (
        <div className="w-32 h-full flex-shrink-0">
          <InventoryBar layout="landscape" />
        </div>
      )}

      {/* Overlays */}
      <ColorLegend />
      <DebugToggle />
      <InspectOverlay />
      <Toast />
    </div>
  );
};

export default GameContainer;
