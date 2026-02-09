import React, { useState } from 'react';
import { useLayout } from '../hooks/LayoutContext';

const ColorLegend = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isPortrait } = useLayout();

  const legendItems = [
    { color: 'bg-red-600/50 border-red-300', label: 'Exits/Doors', icon: '🚪' },
    { color: 'bg-blue-600/50 border-blue-300', label: 'Puzzles', icon: '🧩' },
    { color: 'bg-yellow-500/50 border-yellow-200', label: 'Items/Loot', icon: '💎' },
    { color: 'bg-green-600/50 border-green-300', label: 'Lore/Reading', icon: '📜' },
  ];

  return (
    <div className={`absolute top-4 z-40 ${isPortrait ? 'right-4' : 'right-36'}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-black/70 hover:bg-black/90 text-white
                   px-3 py-2 rounded-lg text-xs font-semibold
                   border border-white/30 hover:border-white/50
                   transition-all duration-200 shadow-lg"
        title="Toggle color legend"
      >
        🎨 {isExpanded ? 'Hide' : 'Legend'}
      </button>

      {/* Legend Panel */}
      {isExpanded && (
        <div className="absolute top-12 right-0 bg-black/90 border-2 border-white/30
                        rounded-lg p-4 shadow-2xl min-w-[180px]">
          <h3 className="text-white text-sm font-bold mb-3 text-center border-b border-white/20 pb-2">
            Zone Colors
          </h3>
          <div className="space-y-2">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-6 h-6 ${item.color} border-2 rounded flex-shrink-0`}></div>
                <span className="text-white text-xs flex-1">{item.label}</span>
                <span className="text-lg">{item.icon}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorLegend;
