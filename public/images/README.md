# Wall Background Images

This directory contains the background images for each of the 4 walls in the game.

## Required Images

Place your wall images in this directory with these exact filenames:

### 1. `wall-north.png`
- **Wall:** North (Door wall)
- **Index:** 0
- **Color reference:** Previously dark red (#8b0000)

### 2. `wall-east.png`
- **Wall:** East (TV and Drawer wall)
- **Index:** 1
- **Color reference:** Previously dark blue (#1e3a8a)

### 3. `wall-south.png`
- **Wall:** South (Sofa wall)
- **Index:** 2
- **Color reference:** Previously dark green (#065f46)

### 4. `wall-west.png`
- **Wall:** West (Clock and Frame wall)
- **Index:** 3
- **Color reference:** Previously dark brown (#78350f)

## Image Specifications

### Recommended Specs:
- **Format:** PNG (supports transparency if needed)
- **Resolution:** 1920×1080 or higher (16:9 aspect ratio)
- **File Size:** Optimized for web (<500KB each if possible)
- **Orientation:** Landscape/horizontal

### Background Behavior:
- Images will use `background-size: cover` (fills container)
- Images will be centered (`background-position: center`)
- Black background shows while images load
- Smooth transition when rotating between walls (300ms)

## Interactive Elements

The following interactive zones and overlays are rendered **on top** of the background images:

### North Wall (wall-north.png):
- Door zone (center, 30×60%)
- "OPEN" overlay when unlocked

### East Wall (wall-east.png):
- TV zone (top center, 40×30%)
- Drawer zone (middle, 40×12%)
- TV "09:30" overlay when fixed
- "DRAWER OPEN" overlay when unlocked

### South Wall (wall-south.png):
- Sofa zone
- Letter zone (inspect)
- Coaster zone (inspect)

### West Wall (wall-west.png):
- Clock zone (top center, 20×20%)
- Picture frame zone (for photo halves)
- "OPEN" overlay when clock unlocked

## Current Status

✅ RoomView.jsx updated to use background images
✅ Dynamic image loading based on currentWall
✅ Background styling applied (cover, center, no-repeat)
✅ Fallback black background while loading
⏳ Waiting for image files to be added

## Implementation Details

### Code Reference (RoomView.jsx):
```javascript
const getWallBackground = () => {
  const wallImages = {
    0: '/images/wall-north.png',
    1: '/images/wall-east.png',
    2: '/images/wall-south.png',
    3: '/images/wall-west.png',
  };
  return wallImages[currentWall] || '/images/wall-north.png';
};

// Applied as:
style={{
  backgroundImage: `url('${getWallBackground()}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#000000', // Fallback
}}
```

### Transition:
- `transition-all duration-300` class provides smooth fade between walls
- Cross-fade effect when rotating camera

---

**To use:** Place your 4 wall PNG images in this directory and reload the game!
