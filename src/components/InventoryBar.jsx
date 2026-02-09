import React from 'react';
import useGameStore from '../store/gameStore';
import SoundManager from '../utils/SoundManager';

const InventoryBar = ({ layout = 'landscape' }) => {
  const inventory = useGameStore((state) => state.inventory);
  const activeItem = useGameStore((state) => state.activeItem);
  const setActiveItem = useGameStore((state) => state.setActiveItem);

  const isPortrait = layout === 'portrait';

  const handleItemClick = (item) => {
    const isCurrentlyActive = activeItem === item;
    setActiveItem(item);
    // Play click sound + haptic feedback
    SoundManager.playClick();
    console.log(`[Inventory] ${isCurrentlyActive ? 'Deselected' : 'Selected'} [${item}]`);
  };

  // Get item image - uses real assets where available
  const getItemImage = (item) => {
    const itemImages = {
      'Brass Key': '/images/key-icon.png',
      'TV Knob': '/images/knob-icon.png',
      'Photo Half A': '/images/photo-a-icon.png',
      'Photo Half B': '/images/photo-b-icon.png',
    };

    // Return real image if available, otherwise fallback to placeholder
    if (itemImages[item]) {
      return itemImages[item];
    }

    // Fallback placeholder
    const encodedName = encodeURIComponent(item);
    return `https://placehold.co/100x100/4a4a4a/ffffff?text=${encodedName}`;
  };

  const itemSize = isPortrait ? 'w-14 h-14' : 'w-20 h-20';

  return (
    <div className={`w-full h-full bg-gradient-to-b from-[#2a2520] via-[#1f1b17] to-[#0f0d0b]
                    shadow-2xl flex ${
                      isPortrait
                        ? 'flex-row border-t-4 border-[#5a4a3a] items-center'
                        : 'flex-col border-l-4 border-[#5a4a3a]'
                    }`}>
      {/* Inventory Header — landscape only */}
      {!isPortrait && (
        <div className="w-full px-3 py-4 border-b-2 border-[#3a2a1a] bg-black/30">
          <h2 className="text-amber-100 font-bold text-xs tracking-widest text-center uppercase">
            Inventory
          </h2>
        </div>
      )}

      {/* Inventory Items */}
      <div className={`flex-1 ${
        isPortrait
          ? 'flex flex-row items-center gap-2 px-2 overflow-x-auto'
          : 'w-full px-3 py-4 overflow-y-auto flex flex-col items-center gap-3'
      }`}>
        {inventory.length === 0 ? (
          <div className={`text-gray-600 italic text-xs ${
            isPortrait ? 'px-4 whitespace-nowrap' : 'text-center pt-8 px-2'
          }`}>
            Empty
          </div>
        ) : (
          inventory.map((item, index) => {
            const isActive = activeItem === item;
            return (
              <div
                key={`${item}-${index}`}
                onClick={() => handleItemClick(item)}
                className={`${itemSize} bg-[#2a2a2a] rounded-md border-2
                           hover:bg-[#3a3a3a] transition-all cursor-pointer
                           shadow-lg flex-shrink-0 overflow-hidden
                           ${isActive ? 'border-yellow-400 shadow-yellow-400/50 scale-105' : 'border-[#5a5a5a]'}`}
                title={item}
              >
                <img
                  src={getItemImage(item)}
                  alt={item}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default InventoryBar;
