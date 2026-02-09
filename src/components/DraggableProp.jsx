import React, { useRef, useState, useCallback, useEffect } from 'react';

const DraggableProp = ({ prop, linkedZone, onZoneClick, debugMode }) => {
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ top: prop.top, left: prop.left, width: prop.width });
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Sync with prop data when it changes externally
  useEffect(() => {
    setPos({ top: prop.top, left: prop.left, width: prop.width });
    setDirty(false);
  }, [prop.top, prop.left, prop.width]);

  const getParentRect = () => {
    const el = imgRef.current?.parentElement?.parentElement;
    return el ? el.getBoundingClientRect() : null;
  };

  const handleMouseDown = useCallback((e) => {
    if (!debugMode) return;
    e.preventDefault();
    e.stopPropagation();
    const parentRect = getParentRect();
    if (!parentRect) return;

    const currentTop = (pos.top / 100) * parentRect.height;
    const currentLeft = (pos.left / 100) * parentRect.width;
    dragOffset.current = {
      x: e.clientX - parentRect.left - currentLeft,
      y: e.clientY - parentRect.top - currentTop,
    };
    setDragging(true);
  }, [debugMode, pos]);

  const handleMouseMove = useCallback((e) => {
    if (!dragging) return;
    const parentRect = getParentRect();
    if (!parentRect) return;

    const newLeft = ((e.clientX - parentRect.left - dragOffset.current.x) / parentRect.width) * 100;
    const newTop = ((e.clientY - parentRect.top - dragOffset.current.y) / parentRect.height) * 100;

    setPos((prev) => ({
      ...prev,
      top: Math.round(newTop * 10) / 10,
      left: Math.round(newLeft * 10) / 10,
    }));
    setDirty(true);
  }, [dragging]);

  const handleMouseUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
  }, [dragging]);

  // Scroll wheel to resize width
  const handleWheel = useCallback((e) => {
    if (!debugMode) return;
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -1 : 1;
    setPos((prev) => ({
      ...prev,
      width: Math.max(2, Math.round((prev.width + delta) * 10) / 10),
    }));
    setDirty(true);
  }, [debugMode]);

  // Save position to roomData.js via Vite dev server
  const handleSave = async (e) => {
    e.stopPropagation();
    setSaving(true);
    try {
      const res = await fetch('/__save-prop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propId: prop.id,
          top: pos.top,
          left: pos.left,
          width: pos.width,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setDirty(false);
        console.log(`[PropPositioner] Saved ${prop.id}: top:${pos.top} left:${pos.left} w:${pos.width}`);
      } else {
        console.error(`[PropPositioner] Save failed:`, data.error);
      }
    } catch (err) {
      console.error(`[PropPositioner] Save error:`, err);
    }
    setSaving(false);
  };

  // Global mouse events for drag
  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  const isInteractive = !!linkedZone;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        width: `${pos.width}%`,
        pointerEvents: (debugMode || isInteractive) ? 'auto' : 'none',
        cursor: debugMode ? (dragging ? 'grabbing' : 'grab') : (isInteractive ? 'pointer' : 'default'),
      }}
      onWheel={handleWheel}
    >
      <img
        ref={imgRef}
        src={prop.src}
        alt={prop.id}
        onClick={(!debugMode && linkedZone) ? () => onZoneClick(linkedZone) : undefined}
        draggable={false}
        style={{
          width: '100%',
          height: prop.height != null ? `${prop.height}%` : undefined,
          objectFit: 'contain',
          display: 'block',
          outline: debugMode ? '2px dashed rgba(0, 255, 255, 0.7)' : 'none',
        }}
        onMouseDown={handleMouseDown}
      />

      {/* Debug overlay: coordinates + save button */}
      {debugMode && (
        <div
          style={{
            position: 'absolute',
            top: -28,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            pointerEvents: 'auto',
          }}
        >
          <span
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              color: '#0ff',
              fontSize: '0.65rem',
              fontFamily: 'monospace',
              padding: '2px 6px',
              borderRadius: '3px',
              whiteSpace: 'nowrap',
            }}
          >
            {prop.id} — top:{pos.top} left:{pos.left} w:{pos.width}
          </span>

          {dirty && (
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                backgroundColor: saving ? '#555' : '#00cc66',
                color: '#fff',
                border: 'none',
                borderRadius: '3px',
                padding: '2px 8px',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                cursor: saving ? 'wait' : 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {saving ? '...' : 'Save'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DraggableProp;
