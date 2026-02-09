import React, { useEffect } from 'react';
import useGameStore from '../store/gameStore';
import { useLayout } from '../hooks/LayoutContext';
import SoundManager from '../utils/SoundManager';

const NavigationArrows = () => {
  const { isPortrait } = useLayout();
  const rotateLeft = useGameStore((state) => state.rotateLeft);
  const rotateRight = useGameStore((state) => state.rotateRight);

  // Wrapper functions to add sound/haptic feedback
  const handleRotateLeft = () => {
    SoundManager.playTurn();
    rotateLeft();
  };

  const handleRotateRight = () => {
    SoundManager.playTurn();
    rotateRight();
  };

  // Keyboard support for arrow keys
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        handleRotateLeft();
      } else if (e.key === 'ArrowRight') {
        handleRotateRight();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [rotateLeft, rotateRight]);

  const buttonSize = isPortrait ? '4rem' : '3rem';
  const iconSize = isPortrait ? 28 : 24;

  const arrowBaseStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: buttonSize,
    height: buttonSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    zIndex: 40,
    border: '2px solid rgba(255, 255, 255, 0.2)',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
  };

  return (
    <>
      {/* Left Arrow */}
      <button
        onClick={handleRotateLeft}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...arrowBaseStyle,
          left: '1rem',
        }}
        aria-label="Rotate Left"
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleRotateRight}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...arrowBaseStyle,
          right: '1rem',
        }}
        aria-label="Rotate Right"
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
};

export default NavigationArrows;
