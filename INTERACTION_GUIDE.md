# Interaction System Guide

## ✅ Features Implemented

### 1. Inventory Selection
- **Click an item** in the inventory bar to select it (yellow border + glow)
- **Click again** to deselect it
- Console logs: `Selected [Item Name]` / `Deselected [Item Name]`

### 2. Item Pickup: The Rusty Key
- **Location**: South Wall (Green background)
- **Appearance**: Small yellow zone (10% x 8%)
- **Behavior**: Click to pick it up
  - Adds "Rusty Key" to inventory
  - Removes the zone from the wall
  - Console: `Picked up [Rusty Key]`

### 3. Locked Object: The Door
- **Location**: North Wall (Red background)
- **Appearance**: Large grey rectangle (30% x 50%)
- **Behavior**:
  - **Without key selected**: Console shows `It is locked.`
  - **With key selected**:
    - Door turns white (opens)
    - Key is removed from inventory
    - Console: `Door Opened`
    - State persists (door stays open even if you navigate away)

## 🎮 Test Flow

1. **Navigate to South Wall** (click right arrow twice)
2. **Pick up the yellow key** (click it)
3. **Check inventory** - "RUS" item should appear
4. **Select the key** - click it (yellow border appears)
5. **Navigate to North Wall** (click left arrow twice)
6. **Click the grey door** - it turns white and key disappears
7. **Navigate away and back** - door remains white (state persists)

## 🏗️ Architecture

### State Management (gameStore.js)
- `activeItem`: Currently selected inventory item
- `pickedUpZones[]`: IDs of zones that have been picked up
- `gameState.doorOpen`: Boolean flag for door state

### Zone Types
- **pickupItem**: Adds item to inventory, removes zone
- **lockedObject**: Requires specific item to interact

### Data Structure (roomData.js)
```javascript
// Pickup Item
{
  type: 'pickupItem',
  itemName: 'Item Name',
  // ...position & styling
}

// Locked Object
{
  type: 'lockedObject',
  requiredItem: 'Item Name',
  openColor: '#ffffff', // Color when unlocked
  // ...position & styling
}
```

## 🔧 Adding New Interactions

### New Pickup Item
```javascript
{
  id: 'unique-id',
  name: 'Display Name',
  type: 'pickupItem',
  itemName: 'Item Name',
  top: 50, left: 50,
  width: 10, height: 10,
  backgroundColor: '#color'
}
```

### New Locked Object
```javascript
{
  id: 'unique-id',
  name: 'Object Name',
  type: 'lockedObject',
  requiredItem: 'Key Name',
  openColor: '#opened-color',
  top: 30, left: 40,
  width: 20, height: 30,
  backgroundColor: '#locked-color'
}
```
