# Chapter 1: The Majlis - Gameplay Guide

## 🎮 Puzzle Overview

A locked door stands before you. To escape the Majlis, you must solve a series of interconnected puzzles involving a broken TV, hidden photos, and a mysterious clock.

---

## 🗺️ Room Layout

### North Wall (Dark Red) - The Exit
- **Door** (locked, requires Brass Key)

### East Wall (Dark Blue) - The TV
- **TV Screen** (broken, shows static)

### South Wall (Dark Green) - The Sofa
- **Sofa Cushions** (hiding Photo Half A)

### West Wall (Dark Brown) - The Mysteries
- **Clock Face** (hands stuck at wrong time)
- **Picture Frame** (empty, waiting for photos)
- **Brass Key** (hidden, appears when puzzle solved)

---

## 📋 Complete Walkthrough

### Step 1: Explore the Room
1. Navigate between walls using arrow buttons
2. Notice the Door is locked (North Wall)
3. Find the TV showing static (East Wall)

### Step 2: Fix the TV
1. Go to **East Wall**
2. Click the **TV Screen**
3. **Result**: TV fixes and shows time "09:30"
4. **Console**: "TV Fixed - Time: 09:30"

### Step 3: Find Photo Half A
1. Go to **South Wall**
2. Click the **Sofa Cushions**
3. **Result**: Photo Half A added to inventory, cushions disappear
4. **Console**: "Picked up [Photo Half A]"

### Step 4: Set the Clock
1. Go to **West Wall**
2. Click the **Clock Face**
3. **If TV not fixed**: "The hands are stuck..."
4. **If TV is fixed**: Time sets to 09:30, Photo Half B appears
5. **Result**: Photo Half B added to inventory
6. **Console**: "Time set to 09:30" + "Photo Half B falls from behind the clock"

### Step 5: Complete the Picture
1. Stay on **West Wall**
2. Click **Photo Half A** in inventory (yellow border appears)
3. Click the **Picture Frame**
4. **Result**: Photo Half A placed in frame
5. **Console**: "Placed Photo Half A in the frame"
6. Click **Photo Half B** in inventory
7. Click the **Picture Frame** again
8. **Result**: Photo Half B placed, frame changes color to orange
9. **Console**: "Placed Photo Half B in the frame"
10. **Reward**: "The complete photo reveals a hidden compartment!"
11. **Result**: Brass Key appears below the frame

### Step 6: Get the Brass Key
1. Stay on **West Wall**
2. Click the **Brass Key** (golden/yellow zone at bottom)
3. **Result**: Brass Key added to inventory
4. **Console**: "Picked up [Brass Key]"

### Step 7: Escape
1. Go to **North Wall**
2. Click **Brass Key** in inventory (select it)
3. Click the **Door**
4. **Result**: Door opens (changes from dark grey to light green)
5. **Console**: "Door Opened"
6. **Success**: Chapter 1 Complete!

---

## 🎯 Puzzle Dependencies

```
Fix TV (East)
    ↓
Know Time: 09:30
    ↓
Set Clock (West) → Get Photo Half B
    ↓
Find Photo Half A (South)
    ↓
Place Both Photos in Frame (West)
    ↓
Brass Key Reveals (West)
    ↓
Pick Up Brass Key
    ↓
Unlock Door (North)
    ↓
ESCAPE!
```

---

## 🧩 Game Mechanics

### Zone Types Implemented

1. **pickupItem**
   - Click to pick up item
   - Zone disappears after pickup
   - Item added to inventory
   - Example: Sofa Cushions

2. **lockedObject**
   - Requires specific item to unlock
   - Use item from inventory to interact
   - Changes visual state when unlocked
   - Example: Door (requires Brass Key)

3. **interactive**
   - Click to change state
   - No item required
   - Triggers game state flag
   - Example: TV Screen

4. **conditional**
   - Requires game state condition to work
   - Shows different message if condition not met
   - Can give rewards when condition met
   - Example: Clock (requires tvFixed)

5. **placement**
   - Accepts specific items from inventory
   - Tracks multiple placements
   - Changes visual state as items added
   - Triggers reward when complete
   - Example: Picture Frame

6. **conditionalPickup**
   - Only appears when game state condition met
   - Then acts like normal pickup
   - Example: Brass Key (appears when brassKeyRevealed)

---

## 🎨 Visual Feedback

### Colors
- **Door**: Dark Grey (locked) → Light Green (open)
- **TV**: Black (static) → Blue-grey with "09:30" text (fixed)
- **Sofa**: Purple (disappears when clicked)
- **Clock**: Yellow
- **Frame**: Brown (empty) → Orange (complete) + text overlay
- **Brass Key**: Gold/Brass (appears only when photos complete)

### Text Overlays
- **TV (fixed)**: Shows "09:30" in green monospace font
- **Frame (partial)**: Shows "Half Photo"
- **Frame (complete)**: Shows "Complete Photo"

---

## 🔧 State Flags

### gameState Object
```javascript
{
  doorOpen: false,           // Door unlocked?
  tvFixed: false,            // TV showing time?
  photoHalfAPlaced: false,   // Photo A in frame?
  photoHalfBPlaced: false,   // Photo B in frame?
  clockSet: false,           // Clock set to 09:30?
  brassKeyRevealed: false    // Brass Key visible?
}
```

### Inventory Items
- "Photo Half A" - Found in sofa cushions
- "Photo Half B" - Falls from clock when set
- "Brass Key" - Appears when photo puzzle complete

---

## 🧪 Testing Commands

Open browser console and test each step:

```javascript
// Check current state
window.gameStore = require('./store/gameStore').default;
console.log(gameStore.getState());

// View inventory
console.log(gameStore.getState().inventory);

// View game state flags
console.log(gameStore.getState().gameState);
```

---

## 🎯 Console Messages Reference

### Success Messages
- "TV Fixed - Time: 09:30"
- "Picked up [Photo Half A]"
- "Time set to 09:30"
- "Photo Half B falls from behind the clock"
- "Placed Photo Half A in the frame"
- "Placed Photo Half B in the frame"
- "The complete photo reveals a hidden compartment!"
- "A Brass Key falls to the floor"
- "Picked up [Brass Key]"
- "Door Opened"

### Error Messages
- "The hands are stuck..." (Clock clicked before TV fixed)
- "It is locked." (Door clicked without Brass Key)
- "This piece is already in the frame" (Photo already placed)
- "This item doesn't fit here" (Wrong item used on frame)

### Info Messages
- "The TV shows: 09:30" (TV clicked after fixed)
- "The clock shows 09:30" (Clock clicked after set)
- "An empty picture frame" (Frame clicked when empty)
- "Half of a photo... there must be another piece" (Frame with 1 photo)
- "The complete photo of the Majlis" (Frame clicked when complete)

---

## 🚀 Quick Test Sequence

1. **East Wall** → Click TV → See "09:30"
2. **South Wall** → Click Sofa → Get Photo Half A
3. **West Wall** → Click Clock → Get Photo Half B
4. **West Wall** → Select Photo A → Click Frame
5. **West Wall** → Select Photo B → Click Frame
6. **West Wall** → Click Brass Key → Pick it up
7. **North Wall** → Select Brass Key → Click Door
8. **Success!** Door opens

**Total time**: ~2 minutes to complete chapter

---

## 📝 Developer Notes

### Easy to Extend
- Add new zones to `roomData.js`
- Add new state flags to `gameStore.js`
- Add new interaction logic to `RoomView.jsx`
- Add new visual states to `ClickableZone.jsx`

### Reusable System
All zone types are reusable:
- Create new puzzles by mixing zone types
- Chain puzzles with state dependencies
- Visual feedback automatically handled
- Console logging for debugging

**Perfect foundation for Chapter 2 and beyond!**
