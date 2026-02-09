# Al-Marsad - 2D Point-and-Click Adventure Game Engine

A React-based game engine inspired by Rusty Lake, built with Vite, Tailwind CSS, and Zustand.

## 🎮 Current Features

- **4-Wall Room System**: Navigate between North, East, South, and West walls
- **Chapter 1: The Majlis (Layer 2)**: Enhanced puzzle with 9 zone types and code lock
- **Advanced Interactions**: Clues, code locks, multi-step puzzles, conditionals
- **Inventory System**: Vertical sidebar with item selection and visual feedback
- **State Management**: Complex multi-layer puzzle chains with 9 interdependent flags
- **Full-Bleed Layout**: Immersive horizontal layout with no wasted space
- **Responsive Design**: Room expands to fill available space, sidebar docked right
- **Visual Feedback**: Dynamic placeholder images showing game state (4 states per wall)

## 📁 Project Structure

```
al-marsad/
├── src/
│   ├── components/
│   │   ├── GameContainer.jsx       # Landscape layout (Room + Sidebar)
│   │   ├── RoomView.jsx            # Renders current wall + zones
│   │   ├── Navigation.jsx          # Left/Right arrow controls
│   │   ├── ClickableZone.jsx       # Interactive hotspot component
│   │   └── InventoryBar.jsx        # Vertical inventory sidebar
│   ├── store/
│   │   └── gameStore.js            # Zustand state management
│   ├── data/
│   │   └── roomData.js             # Room/wall configuration
│   ├── App.jsx
│   └── index.css
```

## 🛠️ Tech Stack

- **React** 18.x - UI components
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎯 How It Works

### State Management (gameStore.js)

The Zustand store manages:
- `currentWall` (0-3): Current wall index
- `inventory` (array): Collected items
- `gameState` (object): Game flags (doorOpen, hasKey, etc.)

Actions:
- `rotateLeft()` / `rotateRight()`: Navigate walls
- `addToInventory(item)` / `removeFromInventory(item)`
- `updateGameState(key, value)`: Set game flags

### Room Configuration (roomData.js)

Define walls and clickable zones:

```javascript
{
  id: 0,
  name: 'North',
  color: '#ef4444',
  zones: [
    {
      id: 'zone-id',
      name: 'Zone Name',
      top: 40,    // percentage
      left: 35,   // percentage
      width: 30,  // percentage
      height: 20, // percentage
      backgroundColor: '#92400e'
    }
  ]
}
```

### Chapter 1: The Majlis - Playable Demo

**Puzzle**: Escape the locked room by solving interconnected puzzles.

**Quick Walkthrough**:
1. **East Wall**: Click TV → Fixes and shows "09:30"
2. **South Wall**: Click Sofa → Get Photo Half A
3. **West Wall**: Click Clock → Get Photo Half B (requires TV fixed)
4. **West Wall**: Place both photo halves in frame → Brass Key appears
5. **West Wall**: Pick up Brass Key
6. **North Wall**: Use Brass Key on Door → Escape!

See [CHAPTER_1_GUIDE.md](CHAPTER_1_GUIDE.md) for complete walkthrough.

## 📚 Documentation

- **[CHAPTER_1_GUIDE.md](CHAPTER_1_GUIDE.md)** - Complete puzzle walkthrough and testing guide
- **[ZONE_TYPES_REFERENCE.md](ZONE_TYPES_REFERENCE.md)** - Technical reference for all zone types
- **[FULL_BLEED_LAYOUT.md](FULL_BLEED_LAYOUT.md)** - Layout architecture and responsive design
- **[INTERACTION_GUIDE.md](INTERACTION_GUIDE.md)** - Interaction system guide

## 🎯 Zone Types Implemented

1. **pickupItem** - Simple collectibles (Sofa Cushions)
2. **lockedObject** - Requires specific item (Door)
3. **interactive** - Changes state on click (TV)
4. **conditional** - Requires game state condition (Clock)
5. **placement** - Accepts multiple items (Picture Frame)
6. **conditionalPickup** - Appears when condition met (Brass Key)

## 🔧 Next Steps

- Add Chapter 2 with new puzzles
- Implement image/sprite system for walls
- Add sound effects and music
- Implement save/load system
- Add animations and transitions
- Create dialogue/story system
