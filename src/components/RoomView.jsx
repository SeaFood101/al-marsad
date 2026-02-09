import React, { useState } from 'react';
import useGameStore from '../store/gameStore';
import { walls } from '../data/roomData';
import ClickableZone from './ClickableZone';
import KeypadModal from './KeypadModal';
import NavigationArrows from './NavigationArrows';
import DraggableProp from './DraggableProp';

const RoomView = () => {
  const currentWall = useGameStore((state) => state.currentWall);
  const pickedUpZones = useGameStore((state) => state.pickedUpZones);
  const activeItem = useGameStore((state) => state.activeItem);
  const addToInventory = useGameStore((state) => state.addToInventory);
  const removeFromInventory = useGameStore((state) => state.removeFromInventory);
  const pickUpZone = useGameStore((state) => state.pickUpZone);
  const updateGameState = useGameStore((state) => state.updateGameState);
  const gameState = useGameStore((state) => state.gameState);
  const setInspectingItem = useGameStore((state) => state.setInspectingItem);
  const slideDirection = useGameStore((state) => state.slideDirection);
  const showToast = useGameStore((state) => state.showToast);
  const debugMode = useGameStore((state) => state.debugMode);

  // Keypad state
  const [showKeypad, setShowKeypad] = useState(false);
  const [keypadCorrectCode, setKeypadCorrectCode] = useState('');

  const wall = walls[currentWall];

  // Feedback helper — shows toast and logs to console
  const log = (message) => {
    showToast(message);
    console.log(`[Game] ${message}`);
  };

  // Get dynamic background image based on current wall
  const getWallBackground = () => {
    const wallImages = {
      0: '/images/wall-north.png',
      1: '/images/wall-east.png',
      2: '/images/wall-south.png',
      3: '/images/wall-west.png',
    };

    return wallImages[currentWall] || '/images/wall-north.png';
  };

  // Collect zone IDs that are represented by a prop image (no colored box needed)
  const propZoneIds = (wall.props || [])
    .filter(p => p.zoneId)
    .map(p => p.zoneId);

  // Filter zones: remove picked up, conditional not ready, and prop-linked zones
  const visibleZones = wall.zones.filter(zone => {
    if (pickedUpZones.includes(zone.id)) return false;
    if (propZoneIds.includes(zone.id)) return false;
    if (zone.type === 'conditionalPickup') {
      return gameState[zone.requiresState] === true;
    }
    return true;
  });

  // Zone handler: pickupItem
  const handlePickupItem = (zone) => {
    pickUpZone(zone.id);
    addToInventory(zone.itemName);
    log(`Picked up [${zone.itemName}]`);
  };

  // Zone handler: conditionalPickup
  const handleConditionalPickup = (zone) => {
    if (gameState[zone.requiresState]) {
      pickUpZone(zone.id);
      addToInventory(zone.itemName);
      log(`Picked up [${zone.itemName}]`);
    }
  };

  // Zone handler: lockedObject
  const handleLockedObject = (zone) => {
    if (activeItem === zone.requiredItem) {
      updateGameState('doorOpen', true);
      removeFromInventory(activeItem);
      log('The door unlocks!');
    } else {
      log('It is locked.');
    }
  };

  // Zone handler: tvInteractive
  const handleTVInteractive = (zone) => {
    if (!gameState.tvHasKnob) {
      if (activeItem === 'TV Knob') {
        updateGameState('tvHasKnob', true);
        removeFromInventory(activeItem);
        log('You attach the TV Knob to the TV');
      } else {
        log("It's missing a knob. I can't change the channel.");
      }
    } else if (!gameState.tvFixed) {
      updateGameState('tvFixed', true);
      log('TV Fixed - Time: 09:30');
    } else {
      log('The TV shows: 09:30');
    }
  };

  // Zone handler: inspect
  const handleInspect = (zone) => {
    setInspectingItem(zone.inspectItem);
    log(`Inspecting [${zone.name}]`);
  };

  // Zone handler: codelock
  const handleCodeLock = (zone) => {
    if (gameState.drawerUnlocked) {
      if (!gameState.drawerOpen) {
        updateGameState('drawerOpen', true);
        log('You open the drawer');
      } else {
        log('The drawer is already open');
      }
    } else {
      // Open keypad modal instead of window.prompt
      setKeypadCorrectCode(zone.correctCode);
      setShowKeypad(true);
    }
  };

  // Handle keypad submission
  const handleKeypadSubmit = (code) => {
    if (code === keypadCorrectCode) {
      updateGameState('drawerUnlocked', true);
      updateGameState('drawerOpen', true);
      log('The drawer unlocks!');
      log('Inside you see a TV Knob');
      setShowKeypad(false);
      return true; // Success
    } else {
      log("It won't budge.");
      return false; // Failure
    }
  };

  // Handle keypad close
  const handleKeypadClose = () => {
    setShowKeypad(false);
    log('You step back from the drawer.');
  };

  // Zone handler: conditional
  const handleConditional = (zone) => {
    if (zone.id === 'west-clock') {
      if (gameState.tvFixed) {
        if (!gameState.clockOpen) {
          updateGameState('clockOpen', true);
          addToInventory('Photo Half B');
          log('You set the time to 09:30. It opens.');
        } else {
          log('The clock is already open');
        }
      } else {
        log("The hands are stuck. I don't know the time.");
      }
    }
  };

  // Zone handler: placement
  const handlePlacement = (zone) => {
    if (zone.acceptsItems.includes(activeItem)) {
      if (activeItem === 'Photo Half A' && !gameState.frameHasA) {
        updateGameState('frameHasA', true);
        removeFromInventory(activeItem);
        log('Placed Photo Half A in the frame');

        if (gameState.frameHasB) {
          updateGameState('brassKeyRevealed', true);
          log('The complete photo reveals a hidden compartment!');
          log('A Brass Key falls to the floor');
        }
      } else if (activeItem === 'Photo Half B' && !gameState.frameHasB) {
        updateGameState('frameHasB', true);
        removeFromInventory(activeItem);
        log('Placed Photo Half B in the frame');

        if (gameState.frameHasA) {
          updateGameState('brassKeyRevealed', true);
          log('The complete photo reveals a hidden compartment!');
          log('A Brass Key falls to the floor');
        }
      } else {
        log('This piece is already in the frame');
      }
    } else if (activeItem) {
      log("This item doesn't fit here");
    } else {
      // Show current state
      if (gameState.frameHasA && gameState.frameHasB) {
        log('The complete photo of the Majlis');
      } else if (gameState.frameHasA || gameState.frameHasB) {
        log('Half of a photo... there must be another piece');
      } else {
        log('An empty picture frame');
      }
    }
  };

  // Main zone click handler (router)
  const handleZoneClick = (zone) => {
    log(`Clicked [${zone.name}]`);

    const handlers = {
      pickupItem: handlePickupItem,
      conditionalPickup: handleConditionalPickup,
      lockedObject: handleLockedObject,
      tvInteractive: handleTVInteractive,
      inspect: handleInspect,
      codelock: handleCodeLock,
      conditional: handleConditional,
      placement: handlePlacement,
    };

    const handler = handlers[zone.type];
    if (handler) {
      handler(zone);
    } else {
      log(`Unknown zone type: ${zone.type}`);
    }
  };

  return (
    <>
      <div className="relative w-full h-full bg-black overflow-hidden select-none">

        {/* Animated wall content — slides on wall change */}
        <div
          key={currentWall}
          className={`absolute inset-0 ${
            slideDirection === 'right' ? 'animate-slideFromRight' :
            slideDirection === 'left' ? 'animate-slideFromLeft' : ''
          }`}
        >

          {/* ================================================= */}
          {/* LAYER 1: BACKGROUNDS & PROPS (The New Graphics)  */}
          {/* ================================================= */}

          {/* 1A. Background Images (z-0) */}
          <div className="absolute inset-0 z-0">
            <img
              src={getWallBackground()}
              alt={`Wall View ${currentWall}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 1B. Props (z-25) — draggable in debug, clickable if linked */}
          <div className="absolute inset-0 z-25 pointer-events-none">
            {(wall.props || []).map((prop) => {
              const linkedZone = prop.zoneId
                ? wall.zones.find(z => z.id === prop.zoneId)
                : null;

              return (
                <DraggableProp
                  key={prop.id}
                  prop={prop}
                  linkedZone={linkedZone}
                  onZoneClick={handleZoneClick}
                  debugMode={debugMode}
                />
              );
            })}
          </div>

          {/* 1C. State Overlays - Visual feedback for game states */}
          {currentWall === 0 && gameState.doorOpen && (
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '35%',
                width: '30%',
                height: '60%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              OPEN
            </div>
          )}

          {currentWall === 1 && gameState.drawerOpen && (
            <div
              style={{
                position: 'absolute',
                top: '52%',
                left: '30%',
                width: '40%',
                height: '12%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              DRAWER OPEN
            </div>
          )}

          {currentWall === 1 && gameState.tvFixed && (
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '30%',
                width: '40%',
                height: '30%',
                backgroundColor: 'rgba(0, 100, 200, 0.3)',
                border: '2px solid rgba(100, 200, 255, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '2rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                textShadow: '0 0 10px rgba(0,200,255,0.8)'
              }}
            >
              09:30
            </div>
          )}

          {currentWall === 3 && gameState.clockOpen && (
            <div
              style={{
                position: 'absolute',
                top: '15%',
                left: '40%',
                width: '20%',
                height: '20%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}
            >
              OPEN
            </div>
          )}

          {/* ================================================= */}
          {/* LAYER 2: INTERACTIVE ZONES (Your Game Logic)     */}
          {/* ================================================= */}
          <div className="absolute inset-0 z-20">
            {visibleZones.map((zone) => (
              <ClickableZone
                key={zone.id}
                zone={zone}
                onZoneClick={handleZoneClick}
              />
            ))}
          </div>

        </div>

        {/* ================================================= */}
        {/* LAYER 3: UI & NAVIGATION (Always on Top)         */}
        {/* ================================================= */}
        <div className="absolute inset-0 z-50 pointer-events-none">

          {/* Navigation Arrows */}
          <div className="pointer-events-auto">
            <NavigationArrows />
          </div>

          {/* Wall Name Display */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2
                          bg-black/70 text-white px-6 py-2 rounded-lg
                          text-lg font-semibold border border-white/20 pointer-events-auto">
            {wall.name} Wall
          </div>

          {/* Debug Info */}
          <div className="absolute top-4 left-4 text-white/70 bg-black/50 p-2 rounded text-xs font-mono pointer-events-auto">
            View: {currentWall}
          </div>

        </div>
      </div>

      {/* Keypad Modal */}
      {showKeypad && (
        <KeypadModal
          onSubmit={handleKeypadSubmit}
          onClose={handleKeypadClose}
          maxDigits={3}
        />
      )}
    </>
  );
};

export default RoomView;
