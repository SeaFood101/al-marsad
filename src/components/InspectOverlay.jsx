import React from 'react';
import useGameStore from '../store/gameStore';

const InspectOverlay = () => {
  const inspectingItem = useGameStore((state) => state.inspectingItem);
  const closeInspect = useGameStore((state) => state.closeInspect);

  if (!inspectingItem) return null;

  // Get content for each inspectable item
  const getContent = () => {
    switch (inspectingItem) {
      case 'letter':
        return (
          <>
            <p style={{ fontStyle: 'italic', fontSize: '1.25rem', marginBottom: '1rem' }}>
              My dear Nour,
            </p>
            <p style={{ textIndent: '2rem', marginBottom: '1rem' }}>
              If you are reading this, I am already gone. The 'Majlis' is not just a room; it is a memory trap.
            </p>
            <p style={{ textIndent: '2rem', marginBottom: '1rem' }}>
              Do not trust the time. The clock stopped when <strong>she</strong> left.
            </p>
            <p style={{ textIndent: '2rem', marginBottom: '1rem' }}>
              Find the key, but do not open the door until you are ready to see the truth.
            </p>
            <p style={{ textAlign: 'right', marginTop: '2rem', fontWeight: 'bold' }}>
              - G.
            </p>
          </>
        );

      case 'coaster':
        return (
          <>
            {/* Coaster Visual */}
            <div style={{
              width: '16rem',
              height: '16rem',
              margin: '0 auto 2rem',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #78350f 0%, #92400e 100%)',
              border: '8px solid #451a03',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              <div style={{
                fontSize: '3.5rem',
                fontWeight: 'bold',
                color: '#451a03',
                fontFamily: 'courier new, monospace',
                letterSpacing: '0.5rem',
                transform: 'rotate(3deg)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>
                3 - 1 - 4
              </div>
            </div>
            <p style={{ textAlign: 'center', fontStyle: 'italic', marginBottom: '1rem' }}>
              A wooden coaster with numbers scribbled in pen.
            </p>
          </>
        );

      default:
        return <p>Unknown item: {inspectingItem}</p>;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <div
      className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={closeInspect}
    >
      <div
        className="relative max-w-2xl w-full bg-[#f4f1ea] p-10 shadow-2xl rounded text-slate-900 border-2 border-[#d4c5a0]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-serif text-lg leading-relaxed">
          {content}
        </div>

        <button
          onClick={closeInspect}
          className="mt-8 px-6 py-2 border-2 border-slate-800 hover:bg-slate-800 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InspectOverlay;
