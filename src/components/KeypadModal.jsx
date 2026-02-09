import React, { useState } from 'react';
import SoundManager from '../utils/SoundManager';

const KeypadModal = ({ onSubmit, onClose, maxDigits = 3 }) => {
  const [code, setCode] = useState('');
  const [isError, setIsError] = useState(false);

  const handleNumberClick = (num) => {
    if (code.length < maxDigits) {
      setCode(code + num);
      setIsError(false);
      // Play click sound + haptic
      SoundManager.playClick();
    }
  };

  const handleClear = () => {
    setCode('');
    setIsError(false);
    // Play click sound + haptic
    SoundManager.playClick();
  };

  const handleEnter = () => {
    if (code.length === maxDigits) {
      const isCorrect = onSubmit(code);
      if (!isCorrect) {
        // Error: Play error sound + shake haptic
        SoundManager.playError();
        setIsError(true);
        // Flash error and clear after delay
        setTimeout(() => {
          setCode('');
          setIsError(false);
        }, 800);
      } else {
        // Success: Play unlock sound + double pulse haptic
        SoundManager.playUnlock();
      }
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Generate display text (e.g., "3 1 _")
  const getDisplay = () => {
    const digits = code.split('');
    const remaining = maxDigits - digits.length;
    return [...digits, ...Array(remaining).fill('_')].join(' ');
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: '1rem'
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          padding: '2.5rem',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 2px 4px rgba(255,255,255,0.1)',
          border: '2px solid #1a252f'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2
          style={{
            textAlign: 'center',
            color: '#ecf0f1',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Enter Code
        </h2>

        {/* LCD Display */}
        <div
          style={{
            backgroundColor: isError ? '#c0392b' : '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            border: '3px solid #0a0a0a',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8)',
            transition: 'background-color 0.2s'
          }}
        >
          <div
            style={{
              fontFamily: 'Monaco, Courier New, monospace',
              fontSize: '2.5rem',
              color: isError ? '#fff' : '#00ff41',
              textAlign: 'center',
              letterSpacing: '1rem',
              fontWeight: 'bold',
              textShadow: isError ? '0 0 10px #ff0000' : '0 0 10px #00ff41',
              paddingLeft: '1rem' // Offset for letter-spacing
            }}
          >
            {getDisplay()}
          </div>
        </div>

        {/* Keypad Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}
        >
          {/* Numbers 1-9 */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              style={{
                padding: '1.25rem',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#ecf0f1',
                background: 'linear-gradient(135deg, #4a5f7f 0%, #3d4f66 100%)',
                border: '2px solid #2c3e50',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)',
                transition: 'all 0.1s',
                userSelect: 'none'
              }}
              onMouseDown={(e) => {
                e.target.style.transform = 'translateY(2px)';
                e.target.style.boxShadow = '0 2px 3px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)';
              }}
              onMouseUp={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)';
              }}
            >
              {num}
            </button>
          ))}

          {/* Clear Button */}
          <button
            onClick={handleClear}
            style={{
              padding: '1.25rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#ecf0f1',
              background: 'linear-gradient(135deg, #c0392b 0%, #a93226 100%)',
              border: '2px solid #922b21',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)',
              transition: 'all 0.1s',
              userSelect: 'none'
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(2px)';
              e.target.style.boxShadow = '0 2px 3px rgba(0,0,0,0.3)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)';
            }}
          >
            CLR
          </button>

          {/* 0 Button */}
          <button
            onClick={() => handleNumberClick('0')}
            style={{
              padding: '1.25rem',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#ecf0f1',
              background: 'linear-gradient(135deg, #4a5f7f 0%, #3d4f66 100%)',
              border: '2px solid #2c3e50',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)',
              transition: 'all 0.1s',
              userSelect: 'none'
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(2px)';
              e.target.style.boxShadow = '0 2px 3px rgba(0,0,0,0.3)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)';
            }}
          >
            0
          </button>

          {/* Enter Button */}
          <button
            onClick={handleEnter}
            style={{
              padding: '1.25rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#ecf0f1',
              background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
              border: '2px solid #1e8449',
              borderRadius: '0.5rem',
              cursor: code.length === maxDigits ? 'pointer' : 'not-allowed',
              opacity: code.length === maxDigits ? 1 : 0.5,
              boxShadow: '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)',
              transition: 'all 0.1s',
              userSelect: 'none'
            }}
            disabled={code.length !== maxDigits}
            onMouseDown={(e) => {
              if (code.length === maxDigits) {
                e.target.style.transform = 'translateY(2px)';
                e.target.style.boxShadow = '0 2px 3px rgba(0,0,0,0.3)';
              }
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)';
            }}
          >
            ENTER
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            color: '#7f8c8d',
            backgroundColor: 'transparent',
            border: '2px solid #34495e',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#34495e';
            e.target.style.color = '#ecf0f1';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#7f8c8d';
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default KeypadModal;
