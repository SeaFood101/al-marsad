import React from 'react';
import useGameStore from '../store/gameStore';

const ClickableZone = ({ zone, onZoneClick }) => {
  const debugMode = useGameStore((state) => state.debugMode);

  const handleClick = () => {
    if (onZoneClick) {
      onZoneClick(zone);
    }
  };

  // Get zone colors based on colorType (inline styles to bypass Tailwind)
  const getZoneStyle = () => {
    const baseStyle = {
      top: `${zone.top}%`,
      left: `${zone.left}%`,
      width: `${zone.width}%`,
      height: `${zone.height}%`,
      position: 'absolute',
      cursor: 'pointer',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderRadius: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    };

    switch (zone.colorType) {
      case 'exit':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(220, 38, 38, 0.5)', // Red
          borderColor: '#fca5a5'
        };
      case 'puzzle':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(37, 99, 235, 0.5)', // Blue
          borderColor: '#93c5fd'
        };
      case 'item':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(234, 179, 8, 0.5)', // Yellow
          borderColor: '#fde047'
        };
      case 'lore':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(22, 163, 74, 0.5)', // Green
          borderColor: '#86efac'
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderColor: '#ffffff'
        };
    }
  };

  return (
    <div
      style={getZoneStyle()}
      onClick={handleClick}
      title={zone.name}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'brightness(1.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'brightness(1)';
      }}
    >
      {/* Zone Label (only in debug mode) */}
      {debugMode && (
        <span
          style={{
            color: '#ffffff',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '0.125rem 0.25rem',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '0.25rem',
            pointerEvents: 'none',
            userSelect: 'none',
            lineHeight: '1.25'
          }}
        >
          {zone.name || zone.id}
        </span>
      )}
    </div>
  );
};

export default ClickableZone;
