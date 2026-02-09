# Layer 2 Puzzle System - Enhanced Complexity

## 🎮 New Puzzle Chain

The game now has a **more complex puzzle dependency chain** with the drawer and TV knob system!

### Complete Flow

```
Coaster (314 clue) → Drawer (code lock) → TV Knob → TV (with knob) →
Clock → Photos → Frame → Brass Key → Door
```

**Estimated Completion Time:** 4-5 minutes (increased from 2-3)

---

## 🆕 New State Variables

### Added to gameStore.js

```javascript
gameState: {
  tvHasKnob: false,      // TV Knob attached to TV?
  drawerOpen: false,     // Drawer opened?
  drawerUnlocked: false, // Drawer unlocked with code?
  // ... existing states
}
```

---

## 🔑 New Zones (East Wall)

### 1. Coaster (Clue)

**Type:** `clue`
**Location:** East Wall, left side of table
**Purpose:** Reveals the drawer code

**Interaction:**
- Click → Shows message: "There is a number scribbled on it: 314"
- No item required
- Can be clicked multiple times

**Properties:**
```javascript
{
  id: 'east-coaster',
  type: 'clue',
  clueText: 'There is a number scribbled on it: 314',
  top: 52,
  left: 15,
  width: 12,
  height: 8,
}
```

---

### 2. Cabinet Drawer (Code Lock)

**Type:** `codelock`
**Location:** East Wall, below TV
**Purpose:** Contains TV Knob

**Interaction:**
- Click → Prompts for 3-digit code
- **Correct Code ("314"):**
  - `drawerUnlocked = true`
  - `drawerOpen = true`
  - Console: "The drawer unlocks!" + "Inside you see a TV Knob"
  - TV Knob zone appears inside drawer
- **Incorrect Code:**
  - Console: "It won't budge."
  - Drawer stays locked
- **Already Unlocked:**
  - Opens/closes drawer
  - Console: "You open the drawer" or "The drawer is already open"

**Properties:**
```javascript
{
  id: 'east-drawer',
  type: 'codelock',
  correctCode: '314',
  top: 52,
  left: 30,
  width: 40,
  height: 12,
}
```

---

### 3. TV Knob (Conditional Pickup)

**Type:** `conditionalPickup`
**Location:** East Wall, inside drawer (only visible when open)
**Purpose:** Required to fix TV

**Interaction:**
- Only appears when `drawerOpen = true`
- Click → Adds "TV Knob" to inventory
- Zone disappears after pickup
- Console: "Picked up [TV Knob]"

**Properties:**
```javascript
{
  id: 'east-tv-knob',
  type: 'conditionalPickup',
  itemName: 'TV Knob',
  requiresState: 'drawerOpen',
  top: 58,
  left: 45,
  width: 10,
  height: 6,
}
```

---

### 4. TV Screen (Updated - Multi-Step)

**Type:** `tvInteractive` (new type)
**Location:** East Wall, center top
**Purpose:** Shows time after knob attached and activated

**Interaction - Step 1 (No Knob):**
- Click without knob selected → "It's missing a knob. I can't change the channel."

**Interaction - Step 2 (Attach Knob):**
- Select "TV Knob" in inventory
- Click TV → Knob removed from inventory
- `tvHasKnob = true`
- Console: "You attach the TV Knob to the TV"

**Interaction - Step 3 (Fix TV):**
- Click TV (knob now attached) → TV fixes
- `tvFixed = true`
- Console: "TV Fixed - Time: 09:30"
- Background changes to show "09:30"

**Interaction - After Fixed:**
- Click TV → "The TV shows: 09:30"

**Properties:**
```javascript
{
  id: 'east-tv',
  type: 'tvInteractive',
  top: 20,
  left: 30,
  width: 40,
  height: 30,
}
```

---

## 📋 Complete Walkthrough (Layer 2)

### Step 1: Find the Clue (East Wall)

1. Navigate to **East Wall**
2. **Hover over coaster** (brown square, left side)
3. **Click coaster**
4. **Console shows**: "Clicked [Coaster]" + "There is a number scribbled on it: 314"
5. **Remember the code**: 314

---

### Step 2: Unlock the Drawer (East Wall)

1. Stay on **East Wall**
2. **Hover over drawer** (below TV, dark grey rectangle)
3. **Click drawer**
4. **Prompt appears**: "Enter the 3-digit code:"
5. **Type**: `314`
6. **Press OK**
7. **Console shows**: "Clicked [Cabinet Drawer]" + "The drawer unlocks!" + "Inside you see a TV Knob"
8. **Background changes** to show "Drawer OPEN"
9. **New zone appears**: TV Knob (inside drawer)
10. **State updated**: `drawerUnlocked = true`, `drawerOpen = true`

**Wrong Code Test:**
- Try entering wrong code (e.g., "123")
- Console: "It won't budge."
- Drawer stays locked

---

### Step 3: Get the TV Knob (East Wall)

1. Stay on **East Wall**
2. **New zone is now visible** (grey knob inside drawer area)
3. **Hover over TV Knob**
4. **Click TV Knob**
5. **Console shows**: "Clicked [TV Knob]" + "Picked up [TV Knob]"
6. **Inventory**: TV Knob appears
7. **Zone disappears** (picked up)

---

### Step 4: Attach TV Knob (East Wall)

1. Stay on **East Wall**
2. In **inventory**, click **TV Knob** (select it)
3. **Yellow border** appears around TV Knob
4. **Console**: "Selected [TV Knob]"
5. **Hover over TV screen** (center top)
6. **Click TV**
7. **Console shows**: "Clicked [TV Screen]" + "You attach the TV Knob to the TV"
8. **TV Knob** removed from inventory
9. **State updated**: `tvHasKnob = true`

**Without Knob Test:**
- Before attaching, click TV without selecting knob
- Console: "It's missing a knob. I can't change the channel."

---

### Step 5: Fix the TV (East Wall)

1. Stay on **East Wall**
2. **Click TV again** (knob now attached)
3. **Console shows**: "TV Fixed - Time: 09:30"
4. **Background changes** to show "TV 09:30"
5. **State updated**: `tvFixed = true`

---

### Step 6-11: Continue with Original Puzzle

6. **South Wall** → Click Sofa → Get Photo Half A
7. **West Wall** → Click Clock (now works because TV fixed) → Get Photo Half B
8. **West Wall** → Place Photo A in Frame
9. **West Wall** → Place Photo B in Frame → Brass Key appears
10. **West Wall** → Pick up Brass Key
11. **North Wall** → Use Brass Key on Door → Escape!

---

## 🎨 Visual Updates

### East Wall Backgrounds

The East wall now shows **4 different states**:

1. **TV Static + Drawer CLOSED** (initial)
```
https://placehold.co/800x600/263238/ffffff?text=EAST:+TV+Static+Drawer+CLOSED
```

2. **TV Static + Drawer OPEN** (after code entered)
```
https://placehold.co/800x600/263238/ffffff?text=EAST:+TV+Static+Drawer+OPEN
```

3. **TV 09:30 + Drawer CLOSED** (TV fixed, drawer closed)
```
https://placehold.co/800x600/263238/ffffff?text=EAST:+TV+09:30+Drawer+CLOSED
```

4. **TV 09:30 + Drawer OPEN** (TV fixed, drawer open)
```
https://placehold.co/800x600/263238/ffffff?text=EAST:+TV+09:30+Drawer+OPEN
```

**Background updates automatically based on game state!**

---

## 🔧 New Zone Types

### Type: `clue`

**Purpose:** Display information when clicked

**Properties:**
- `clueText` - Message to display

**Behavior:**
- Click → Log clue text to console
- No state changes
- Can be clicked multiple times
- No items required

**Example:** Coaster showing code "314"

---

### Type: `codelock`

**Purpose:** Require code input to unlock

**Properties:**
- `correctCode` - The code that unlocks it (string)

**Behavior:**
- Click → Show prompt for code input
- Correct code → Unlock and open
- Incorrect code → Show error message
- Already unlocked → Toggle open/close

**Example:** Cabinet drawer with code "314"

---

### Type: `tvInteractive`

**Purpose:** Multi-step interaction requiring item

**Behavior:**
- **Step 1:** Require specific item (TV Knob)
- **Step 2:** Accept item, update state
- **Step 3:** Allow final interaction
- **Step 4:** Show completion state

**Example:** TV requiring knob before fixing

---

## 📊 Puzzle Dependency Graph

```
START
  ↓
Coaster (clue: 314)
  ↓
Drawer (code: 314)
  ↓
TV Knob
  ↓
TV (attach knob)
  ↓
TV (fix/show time)
  ↓
Clock (set time)
  ↓
Photo Half B
  ↓
Photo Half A (from sofa)
  ↓
Picture Frame (place both)
  ↓
Brass Key (appears)
  ↓
Door (unlock with key)
  ↓
ESCAPE!
```

**Total Steps:** 13 interactions (up from 7)
**Total Items:** 4 (TV Knob, Photo A, Photo B, Brass Key)
**Total Puzzles:** 5 (Code, Knob, Clock, Frame, Door)

---

## 🧪 Testing Checklist

### New Features

- [ ] Coaster displays code "314" when clicked
- [ ] Drawer prompts for code
- [ ] Correct code "314" unlocks drawer
- [ ] Wrong code shows "won't budge" message
- [ ] TV Knob appears inside open drawer
- [ ] TV Knob can be picked up
- [ ] TV shows "missing knob" message without knob
- [ ] TV Knob can be attached to TV
- [ ] TV can be fixed after knob attached
- [ ] Background shows drawer state correctly

### Integration Tests

- [ ] Can't fix TV without knob
- [ ] Can't get knob without code
- [ ] Code can be found on coaster
- [ ] Rest of puzzle works after TV fixed
- [ ] All 4 East wall backgrounds display
- [ ] Inventory shows TV Knob correctly

### Edge Cases

- [ ] Clicking TV before getting knob (error message)
- [ ] Entering wrong code (error message)
- [ ] Clicking drawer when already open (info message)
- [ ] Clicking coaster multiple times (shows clue each time)
- [ ] Trying to pick up knob before drawer open (zone not visible)

---

## 🎯 Quick Test Sequence (5 minutes)

1. **East** → Click Coaster → See "314"
2. **East** → Click Drawer → Enter "314" → Opens
3. **East** → Click TV Knob → Pick it up
4. **East** → Select TV Knob → Click TV → Attach
5. **East** → Click TV again → See "09:30"
6. **South** → Click Sofa → Get Photo A
7. **West** → Click Clock → Get Photo B
8. **West** → Place Photo A in Frame
9. **West** → Place Photo B in Frame → Key appears
10. **West** → Click Brass Key → Pick it up
11. **North** → Use Key on Door → Escape!

---

## ✅ Success Criteria

A successful playthrough should:
- Require finding the code clue first
- Force player to unlock drawer before accessing TV
- Require TV Knob to progress
- Show all 4 East wall state variations
- Take 4-5 minutes to complete
- Have clear visual and console feedback

**Enjoy the enhanced puzzle complexity!**
