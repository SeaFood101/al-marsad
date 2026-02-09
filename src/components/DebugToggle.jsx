import React from 'react';
import useGameStore from '../store/gameStore';
import { useLayout } from '../hooks/LayoutContext';

const DebugToggle = () => {
  const debugMode = useGameStore((state) => state.debugMode);
  const toggleDebugMode = useGameStore((state) => state.toggleDebugMode);
  const { isPortrait } = useLayout();

  return (
    <button
      onClick={toggleDebugMode}
      className={`absolute z-40 ${isPortrait ? 'bottom-24 right-4' : 'bottom-4 right-36'}
                 bg-black/70 hover:bg-black/90 text-white
                 px-4 py-2 rounded-lg text-xs font-semibold
                 border border-white/30 hover:border-white/50
                 transition-all duration-200 shadow-lg`}
      title="Toggle debug zone visibility"
    >
      {debugMode ? '🐛 Debug: ON' : '🐛 Debug: OFF'}
    </button>
  );
};

export default DebugToggle;
