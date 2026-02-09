# Chapter 1: The Majlis - Gameplay Test Guide

## 🎮 Visual Feedback System

The game now uses **dynamic placeholder images** from placehold.co that change based on game state!

### Wall Backgrounds

Each wall shows different text based on your progress:

**North Wall (Brown):**
- Default: `NORTH: Door LOCKED`
- After unlocking: `NORTH: Door OPEN (EXIT)`

**East Wall (Dark Grey):**
- Default: `EAST: TV Static`
- After fixing: `EAST: TV Says 09:30`

**South Wall (Blue):**
- Always: `SOUTH: Sofa Cushions`

**West Wall (Purple):**
- Default: `WEST: Clock Stuck`
- After setting time: `WEST: Clock OPEN`

### Inventory Icons

Items appear as placeholder images with their names:
- `Photo Half A` - 100x100 placeholder
- `Photo Half B` - 100x100 placeholder
- `Brass Key` - 100x100 placeholder

---

## 📋 Complete Walkthrough

### Step 1: Fix the TV (East Wall)

1. Click **RIGHT arrow** to rotate to East Wall
2. **Background shows**: "EAST: TV Static"
3. **Hover over TV area** (center-ish) - yellow highlight appears
4. **Click the TV zone**
5. **Console logs**: "Clicked [TV Screen]" + "TV Fixed - Time: 09:30"
6. **Background changes to**: "EAST: TV Says 09:30"
7. **State updated**: `tvFixed = true`

### Step 2: Find Photo Half A (South Wall)

1. Click **RIGHT arrow** twice to rotate to South Wall
2. **Background shows**: "SOUTH: Sofa Cushions"
3. **Hover over sofa area** (bottom center) - yellow highlight
4. **Click the sofa zone**
5. **Console logs**: "Clicked [Sofa Cushions]" + "Picked up [Photo Half A]"
6. **Inventory**: Photo Half A appears with placeholder image
7. **Zone disappears**: Can't click sofa again
8. **State updated**: `inventory = ['Photo Half A']`

### Step 3: Set the Clock (West Wall)

1. Click **RIGHT arrow** to rotate to West Wall
2. **Background shows**: "WEST: Clock Stuck"
3. **Hover over clock area** (top center) - yellow highlight
4. **Click the clock zone**
5. **Console logs**: "Clicked [Clock Face]" + "You set the time to 09:30. It opens."
6. **Background changes to**: "WEST: Clock OPEN"
7. **Inventory**: Photo Half B appears
8. **State updated**: `clockOpen = true`, `inventory = ['Photo Half A', 'Photo Half B']`

**Note**: If you click the clock BEFORE fixing the TV, you'll see:
- Console: "The hands are stuck. I don't know the time."

### Step 4: Complete the Picture Frame (West Wall)

1. Stay on **West Wall**
2. In **inventory**, click **Photo Half A**
3. **Yellow border** appears around Photo Half A (selected)
4. **Console logs**: "Selected [Photo Half A]"
5. **Hover over frame area** (middle center) - yellow highlight
6. **Click the picture frame zone**
7. **Console logs**: "Clicked [Picture Frame]" + "Placed Photo Half A in the frame"
8. **Photo Half A** removed from inventory
9. **State updated**: `frameHasA = true`

10. In **inventory**, click **Photo Half B**
11. **Yellow border** appears around Photo Half B
12. **Click the picture frame zone** again
13. **Console logs**: "Placed Photo Half B in the frame" + "The complete photo reveals a hidden compartment!" + "A Brass Key falls to the floor"
14. **Photo Half B** removed from inventory
15. **State updated**: `frameHasB = true`, `brassKeyRevealed = true`

### Step 5: Pick Up the Brass Key (West Wall)

1. Stay on **West Wall**
2. **New zone appears**: Brass Key (bottom center)
3. **Hover over brass key area** - yellow highlight
4. **Click the brass key zone**
5. **Console logs**: "Clicked [Brass Key]" + "Picked up [Brass Key]"
6. **Inventory**: Brass Key appears with placeholder image
7. **Zone disappears**
8. **State updated**: `inventory = ['Brass Key']`

### Step 6: Unlock the Door (North Wall)

1. Click **LEFT arrow** to rotate to North Wall
2. **Background shows**: "NORTH: Door LOCKED"
3. In **inventory**, click **Brass Key**
4. **Yellow border** appears (selected)
5. **Console logs**: "Selected [Brass Key]"
6. **Hover over door area** (center) - yellow highlight
7. **Click the door zone**
8. **Console logs**: "Clicked [Door]" + "The door unlocks!"
9. **Background changes to**: "NORTH: Door OPEN (EXIT)"
10. **Brass Key** removed from inventory
11. **State updated**: `doorOpen = true`

### 🎉 SUCCESS!

You've completed Chapter 1: The Majlis!

---

## 🧪 Testing Checklist

### Visual Tests
- [ ] North wall shows "LOCKED" initially
- [ ] North wall shows "OPEN" after using key
- [ ] East wall shows "Static" initially
- [ ] East wall shows "09:30" after fixing
- [ ] South wall shows "Sofa Cushions"
- [ ] West wall shows "Stuck" initially
- [ ] West wall shows "OPEN" after setting clock

### Interaction Tests
- [ ] Clicking TV fixes it (only once)
- [ ] Clicking sofa gives Photo Half A
- [ ] Sofa disappears after clicking
- [ ] Clock won't work before TV fixed
- [ ] Clock gives Photo Half B after TV fixed
- [ ] Frame accepts Photo Half A
- [ ] Frame accepts Photo Half B
- [ ] Brass Key appears after both photos placed
- [ ] Door won't open without Brass Key
- [ ] Door opens with Brass Key

### Inventory Tests
- [ ] Items show placeholder images
- [ ] Clicking item selects it (yellow border)
- [ ] Clicking again deselects it
- [ ] Used items disappear from inventory
- [ ] Multiple items stack vertically

### Zone Visibility Tests
- [ ] Hover shows yellow highlight on zones
- [ ] Zones show tooltips with names
- [ ] Picked up zones don't reappear
- [ ] Brass Key only appears after photos placed

### Console Logging Tests
- [ ] All clicks log zone name
- [ ] Success messages appear for valid actions
- [ ] Error messages appear for invalid actions
- [ ] State changes logged clearly

---

## 🎯 Quick Test Sequence (2 minutes)

1. **East** → Click TV → See "09:30"
2. **South** → Click Sofa → Get Photo A
3. **West** → Click Clock → Get Photo B
4. **West** → Use Photo A on Frame
5. **West** → Use Photo B on Frame → Key appears
6. **West** → Click Brass Key → Pick it up
7. **North** → Use Key on Door → Opens!

---

## 🔍 Edge Cases to Test

### Try to Break the Puzzle

1. **Click clock before TV fixed**
   - Expected: "The hands are stuck. I don't know the time."

2. **Click door without key**
   - Expected: "It is locked."

3. **Click door with wrong item selected**
   - Expected: "It is locked."

4. **Try to use non-photo item on frame**
   - Expected: "This item doesn't fit here"

5. **Try to place same photo twice**
   - Expected: "This piece is already in the frame"

6. **Click TV multiple times**
   - Expected: "The TV shows: 09:30" (no change)

7. **Click clock multiple times after opening**
   - Expected: "The clock is already open"

8. **Try to pick up sofa twice**
   - Expected: Zone disappears, can't click again

All edge cases should be handled gracefully!

---

## 📊 State Tracking

Open browser console and type:
```javascript
// View current game state
console.log('Game State:', window.gameStore?.getState?.());
```

You should see:
```javascript
{
  currentWall: 0-3,
  inventory: [...],
  activeItem: "Item Name" or null,
  pickedUpZones: [...],
  gameState: {
    doorOpen: false/true,
    tvFixed: false/true,
    clockOpen: false/true,
    frameHasA: false/true,
    frameHasB: false/true,
    brassKeyRevealed: false/true
  }
}
```

---

## ✅ Success Criteria

A successful playthrough should:
1. Take 2-3 minutes to complete
2. Show all 4 different wall backgrounds
3. Display dynamic state changes on backgrounds
4. Show 3 items in inventory at different times
5. Log 10+ console messages
6. End with "Door OPEN (EXIT)" background

**Enjoy testing Chapter 1: The Majlis!**
