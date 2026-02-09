import React from 'react';
import useGameStore from '../store/gameStore';

const Navigation = () => {
  const rotateLeft = useGameStore((state) => state.rotateLeft);
  const rotateRight = useGameStore((state) => state.rotateRight);

  return (
    <>
      {/* Left Arrow */}
      <button
        onClick={rotateLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                   bg-black/30 hover:bg-black/50 text-white
                   w-12 h-16 rounded-lg transition-all duration-200
                   flex items-center justify-center text-2xl font-bold
                   border border-white/20 hover:border-white/40"
        aria-label="Rotate left"
      >
        ←
      </button>

      {/* Right Arrow */}
      <button
        onClick={rotateRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                   bg-black/30 hover:bg-black/50 text-white
                   w-12 h-16 rounded-lg transition-all duration-200
                   flex items-center justify-center text-2xl font-bold
                   border border-white/20 hover:border-white/40"
        aria-label="Rotate right"
      >
        →
      </button>
    </>
  );
};

export default Navigation;
