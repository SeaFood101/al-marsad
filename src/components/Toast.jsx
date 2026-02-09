import React, { useEffect, useState } from 'react';
import useGameStore from '../store/gameStore';

const Toast = () => {
  const toast = useGameStore((state) => state.toast);
  const [visible, setVisible] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (toast) {
      setDisplayText(toast);
      // Small delay to trigger CSS transition
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [toast]);

  if (!displayText) return null;

  return (
    <div
      onTransitionEnd={() => {
        if (!visible) setDisplayText('');
      }}
      style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: `translateX(-50%) translateY(${visible ? '0' : '20px'})`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        color: '#fff',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        fontWeight: '500',
        textAlign: 'center',
        maxWidth: '80%',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        pointerEvents: 'none',
        zIndex: 100,
        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
      }}
    >
      {displayText}
    </div>
  );
};

export default Toast;
