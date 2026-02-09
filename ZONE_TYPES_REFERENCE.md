# Zone Types Reference

Complete guide to all clickable zone types in the game engine.

---

## 🎯 Zone Type: `pickupItem`

**Purpose**: Simple item that can be picked up once.

### Data Structure
```javascript
{
  id: 'unique-id',
  name: 'Display Name',
  type: 'pickupItem',
  itemName: 'Item Name',  // What gets added to inventory
  top: 50,
  left: 45,
  width: 10,
  height: 8,
  backgroundColor: '#color',
}
```

### Behavior
1. Click zone → Item added to inventory
2. Zone removed from screen (added to `pickedUpZones`)
3. Cannot be picked up again

### Example: Sofa Cushions
```javascript
{
  id: 'south-sofa',
  name: 'Sofa Cushions',
  type: 'pickupItem',
  itemName: 'Photo Half A',
  // ...positioning
  backgroundColor: '#7c3aed',
}
```

**Interaction**: Click → "Picked up [Photo Half A]" → Cushions disappear

---

## 🔒 Zone Type: `lockedObject`

**Purpose**: Objects that require a specific item to unlock.

### Data Structure
```javascript
{
  id: 'unique-id',
  name: 'Display Name',
  type: 'lockedObject',
  requiredItem: 'Required Item Name',  // Item needed to unlock
  // ...positioning
  backgroundColor: '#color',   // Locked state
  openColor: '#color',        // Unlocked state
}
```

### Behavior
1. Click without required item → "It is locked."
2. Click WITH required item:
   - Item removed from inventory
   - State updated (e.g., `doorOpen: true`)
   - Visual changes to `openColor`
   - Success message

### Example: Door
```javascript
{
  id: 'north-door',
  name: 'Door',
  type: 'lockedObject',
  requiredItem: 'Brass Key',
  backgroundColor: '#4a4a4a',  // Dark grey locked
  openColor: '#88aa88',        // Green open
}
```

**Interaction**:
- Without key: "It is locked."
- With key: Door opens (grey → green) + "Door Opened"

---

## 💡 Zone Type: `interactive`

**Purpose**: Objects that change state when clicked (no item needed).

### Data Structure
```javascript
{
  id: 'unique-id',
  name: 'Display Name',
  type: 'interactive',
  // ...positioning
  backgroundColor: '#color',    // Inactive state
  activeColor: '#color',        // Active state
}
```

### Behavior
1. First click → State flag set to true
2. Visual changes to `activeColor`
3. Subsequent clicks → Info message

### Example: TV Screen
```javascript
{
  id: 'east-tv',
  name: 'TV Screen',
  type: 'interactive',
  backgroundColor: '#1a1a1a',  // Black static
  activeColor: '#2a4a6a',      // Blue fixed
}
```

**Interaction**:
- First click: `tvFixed: true` + "TV Fixed - Time: 09:30"
- Later clicks: "The TV shows: 09:30"

**Logic in RoomView.jsx**:
```javascript
if (zone.type === 'interactive') {
  if (zone.id === 'east-tv') {
    if (!gameState.tvFixed) {
      updateGameState('tvFixed', true);
      console.log('TV Fixed - Time: 09:30');
    } else {
      console.log('The TV shows: 09:30');
    }
  }
}
```

---

## ⚙️ Zone Type: `conditional`

**Purpose**: Objects that require a game state condition to work.

### Data Structure
```javascript
{
  id: 'unique-id',
  name: 'Display Name',
  type: 'conditional',
  requiredState: 'stateFlag',  // Game state flag that must be true
  // ...positioning
  backgroundColor: '#color',
}
```

### Behavior
1. Click when condition NOT met → Error message
2. Click when condition IS met:
   - Execute action (give item, set state, etc.)
   - Success message

### Example: Clock Face
```javascript
{
  id: 'west-clock',
  name: 'Clock Face',
  type: 'conditional',
  requiredState: 'tvFixed',    // Requires TV to be fixed first
  backgroundColor: '#fbbf24',
}
```

**Interaction**:
- TV not fixed: "The hands are stuck..."
- TV fixed: Sets clock + gives Photo Half B

**Logic in RoomView.jsx**:
```javascript
if (zone.type === 'conditional') {
  if (zone.id === 'west-clock') {
    if (gameState[zone.requiredState]) {
      // TV is fixed, player knows the time
      updateGameState('clockSet', true);
      addToInventory('Photo Half B');
      console.log('Time set to 09:30');
    } else {
      console.log('The hands are stuck...');
    }
  }
}
```

---

## 🖼️ Zone Type: `placement`

**Purpose**: Objects that accept multiple items to be placed.

### Data Structure
```javascript
{
  id: 'unique-id',
  name: 'Display Name',
  type: 'placement',
  acceptsItems: ['Item 1', 'Item 2'],  // Items that can be placed
  // ...positioning
  backgroundColor: '#color',   // Empty state
  filledColor: '#color',       // Filled state
}
```

### Behavior
1. Click with no item selected → Info message (current state)
2. Click with wrong item → "This item doesn't fit here"
3. Click with correct item:
   - Item removed from inventory
   - State flag set (e.g., `photoHalfAPlaced: true`)
   - Check if all pieces placed → Trigger reward
   - Visual changes to `filledColor` when complete

### Example: Picture Frame
```javascript
{
  id: 'west-frame',
  name: 'Picture Frame',
  type: 'placement',
  acceptsItems: ['Photo Half A', 'Photo Half B'],
  backgroundColor: '#92400e',  // Brown empty
  filledColor: '#d97706',      // Orange filled
}
```

**Interaction Flow**:
1. Empty + no item: "An empty picture frame"
2. Select Photo A → Click frame: Placed, "Half of a photo..."
3. Select Photo B → Click frame: Placed, both complete
4. Reward: `brassKeyRevealed: true` + Brass Key appears

**Logic in RoomView.jsx**:
```javascript
if (zone.type === 'placement') {
  if (zone.acceptsItems.includes(activeItem)) {
    if (activeItem === 'Photo Half A' && !gameState.photoHalfAPlaced) {
      updateGameState('photoHalfAPlaced', true);
      removeFromInventory(activeItem);

      // Check if both halves placed
      if (gameState.photoHalfBPlaced) {
        updateGameState('brassKeyRevealed', true);
        console.log('Brass Key falls to the floor');
      }
    }
    // Same for Photo Half B...
  }
}
```

---

## 🔑 Zone Type: `conditionalPickup`

**Purpose**: Items that only appear when a condition is met.

### Data Structure
```javascript
{
  id: 'unique-id',
  name: 'Display Name',
  type: 'conditionalPickup',
  itemName: 'Item Name',
  requiresState: 'stateFlag',  // Game state flag that reveals this zone
  // ...positioning
  backgroundColor: '#color',
}
```

### Behavior
1. Zone **invisible** until `gameState[requiresState] === true`
2. Once visible, acts like `pickupItem`
3. Click → Item added to inventory, zone removed

### Example: Brass Key
```javascript
{
  id: 'west-brass-key',
  name: 'Brass Key',
  type: 'conditionalPickup',
  itemName: 'Brass Key',
  requiresState: 'brassKeyRevealed',  // Appears after photos placed
  backgroundColor: '#fbbf24',
}
```

**Visibility Logic in RoomView.jsx**:
```javascript
const visibleZones = wall.zones.filter(zone => {
  // Conditional pickup zones only appear when state condition met
  if (zone.type === 'conditionalPickup') {
    return gameState[zone.requiresState] === true;
  }
  return true;
});
```

**Interaction**:
- Before photos complete: Zone doesn't exist
- After photos complete: Zone appears (golden key)
- Click: "Picked up [Brass Key]" → Key in inventory

---

## 🎨 Visual State Management

### ClickableZone.jsx

Determines colors based on zone type and game state:

```javascript
const getBackgroundColor = () => {
  // Door: locked vs open
  if (zone.id === 'north-door') {
    return gameState.doorOpen ? zone.openColor : zone.backgroundColor;
  }

  // TV: static vs fixed
  if (zone.id === 'east-tv') {
    return gameState.tvFixed ? zone.activeColor : zone.backgroundColor;
  }

  // Picture Frame: empty vs filled
  if (zone.id === 'west-frame') {
    if (gameState.photoHalfAPlaced && gameState.photoHalfBPlaced) {
      return zone.filledColor;
    }
    return zone.backgroundColor;
  }

  return zone.backgroundColor;
};
```

### Text Overlays

```javascript
const renderOverlay = () => {
  // TV shows time
  if (zone.id === 'east-tv' && gameState.tvFixed) {
    return <span className="text-green-400 font-mono">09:30</span>;
  }

  // Frame shows status
  if (zone.id === 'west-frame') {
    if (both photos placed) return "Complete Photo";
    if (one photo placed) return "Half Photo";
  }

  return null;
};
```

---

## 🛠️ Creating New Zone Types

### Step 1: Define in roomData.js
```javascript
{
  id: 'wall-zone-id',
  name: 'Zone Name',
  type: 'newType',
  customProperty: 'value',
  // ...positioning & colors
}
```

### Step 2: Add Logic in RoomView.jsx
```javascript
if (zone.type === 'newType') {
  // Handle interaction logic
  // Update game state
  // Add/remove inventory items
  // Show messages
}
```

### Step 3: Add Visual Logic in ClickableZone.jsx
```javascript
if (zone.id === 'wall-zone-id') {
  return gameState.someFlag ? zone.activeColor : zone.backgroundColor;
}
```

### Step 4: Add State Flags in gameStore.js
```javascript
gameState: {
  someFlag: false,
  // ...other flags
}
```

---

## 📋 Quick Reference Table

| Type | Requires Item? | Changes State? | Gives Item? | Appears Conditionally? |
|------|---------------|----------------|-------------|----------------------|
| `pickupItem` | No | No | Yes | No |
| `lockedObject` | Yes | Yes | No | No |
| `interactive` | No | Yes | No | No |
| `conditional` | No | Maybe | Maybe | No (always visible) |
| `placement` | Yes (multiple) | Yes | Maybe (reward) | No |
| `conditionalPickup` | No | No | Yes | **Yes** |

---

## 🎯 Best Practices

1. **Use `pickupItem`** for simple collectibles
2. **Use `lockedObject`** for gates/doors that consume keys
3. **Use `interactive`** for switches, buttons, machines
4. **Use `conditional`** for puzzles requiring prior knowledge/state
5. **Use `placement`** for assembly puzzles (photos, fragments)
6. **Use `conditionalPickup`** for rewards that appear after puzzles

**Mix and match zone types to create complex puzzle chains!**
