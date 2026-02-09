# Color-Coded Blockout Mode Guide
**Chapter 1: The Majlis - Visual Design System**

Date: 2026-02-04
Status: ✅ **IMPLEMENTED**

---

## Overview

The game now uses a **color-coded blockout mode** to make clickable zones always visible and easy to identify by their function. Each zone type has a distinct color that communicates its purpose at a glance.

---

## Color Coding System

### 🚪 RED - Exits/Navigation
**Color:** `bg-red-500/50`
**Purpose:** Doors, exits, transitions between areas

**Zones:**
- ✅ North Wall - Door (exits the Majlis)

**Psychology:** Red = action, urgency, "this is the way out"

---

### 🧩 BLUE - Puzzles/Interactables
**Color:** `bg-blue-500/50`
**Purpose:** Objects that require solving, logic, or multi-step interaction

**Zones:**
- ✅ East Wall - TV Screen (requires knob + fixing)
- ✅ East Wall - Cabinet Drawer (requires code input)
- ✅ West Wall - Clock Face (requires time knowledge)
- ✅ West Wall - Picture Frame (requires photo placement)

**Psychology:** Blue = logic, thinking, "solve me"

---

### 💎 YELLOW - Items/Loot
**Color:** `bg-yellow-500/50`
**Purpose:** Pickupable items, collectibles, inventory additions

**Zones:**
- ✅ East Wall - TV Knob (pickup)
- ✅ East Wall - Folded Letter (narrative item)
- ✅ South Wall - Sofa Cushions → Photo Half A (pickup)
- ✅ West Wall - Brass Key (pickup, conditional)

**Psychology:** Yellow/gold = treasure, valuable, "take me"

---

### 📜 GREEN - Lore/Reading
**Color:** `bg-green-500/50`
**Purpose:** Flavor text, clues, narrative content, non-essential reading

**Zones:**
- ✅ East Wall - Coaster (shows code clue)

**Psychology:** Green = information, passive, "read me"

---

## Visual Design

### Always Visible:
```css
bg-[color]-500/50  /* 50% opacity - high enough to see without hover */
border-2 border-white  /* White borders make zones pop */
shadow-md  /* Subtle shadow for depth */
```

### Hover Effect:
```css
hover:brightness-125  /* Zones brighten on hover (20% brighter) */
transition-all duration-200  /* Smooth animation */
```

### Debug Mode:
- **ON:** Shows zone labels with black background
- **OFF:** Zones still visible with colors, labels hidden

---

## Implementation Details

### ClickableZone Component:
```javascript
const colorClass = zone.blockoutColor || 'bg-white/50';
const baseStyles = `${colorClass} border-2 border-white shadow-md hover:brightness-125`;
```

### Zone Data Structure:
```javascript
{
  id: 'east-tv',
  name: 'TV Screen',
  type: 'tvInteractive',
  blockoutColor: 'bg-blue-500/50', // <-- Color coding
  top: 20,
  left: 30,
  width: 40,
  height: 30,
}
```

---

## Chapter 1 Zone Map

### North Wall (1 zone)
| Zone | Color | Type | Function |
|------|-------|------|----------|
| Door | 🔴 Red | Exit | Requires Brass Key to open |

### East Wall (5 zones)
| Zone | Color | Type | Function |
|------|-------|------|----------|
| TV Screen | 🔵 Blue | Puzzle | Requires knob + fixing |
| Cabinet Drawer | 🔵 Blue | Puzzle | Requires code "314" |
| Coaster | 🟢 Green | Lore | Shows code clue |
| Folded Letter | 🟡 Yellow | Item | Narrative content |
| TV Knob | 🟡 Yellow | Item | Pickup (conditional) |

### South Wall (1 zone)
| Zone | Color | Type | Function |
|------|-------|------|----------|
| Sofa Cushions | 🟡 Yellow | Item | Photo Half A |

### West Wall (3 zones)
| Zone | Color | Type | Function |
|------|-------|------|----------|
| Clock Face | 🔵 Blue | Puzzle | Requires TV time |
| Picture Frame | 🔵 Blue | Puzzle | Requires 2 photos |
| Brass Key | 🟡 Yellow | Item | Pickup (conditional) |

**Total:** 10 zones across 4 walls

---

## Color Legend UI

### In-Game Legend:
- **Location:** Top-right corner
- **Toggle:** "🎨 Legend" button
- **Contents:**
  - 🚪 Red - Exits/Doors
  - 🧩 Blue - Puzzles
  - 💎 Yellow - Items/Loot
  - 📜 Green - Lore/Reading

### Usage:
1. Click "Legend" to expand color guide
2. Reference colors while exploring
3. Click "Hide" to collapse

---

## Benefits

### For Players:
- ✅ Always know where clickable zones are
- ✅ Understand zone purpose at a glance
- ✅ No frustration with invisible hotspots
- ✅ Learn spatial layout quickly

### For Developers:
- ✅ Easy to spot missing zones
- ✅ Quick validation of zone placement
- ✅ Visual confirmation of zone types
- ✅ Simplified level design iteration

### For Designers:
- ✅ Clear visual hierarchy
- ✅ Consistent design language
- ✅ Easy to add new zone types
- ✅ Professional blockout aesthetic

---

## Future Enhancements

### Planned:
- [ ] Toggle between blockout mode and art mode
- [ ] Adjust opacity per color (settings panel)
- [ ] Add color-blind friendly mode
- [ ] Animated pulse for important zones
- [ ] Dim completed zones (picked up items)

### Possible Colors:
- **Purple** (`bg-purple-500/50`) - Magic/supernatural elements
- **Orange** (`bg-orange-500/50`) - Danger/hazards
- **Pink** (`bg-pink-500/50`) - Relationships/characters
- **Cyan** (`bg-cyan-500/50`) - Technology/electronics

---

## Testing

### Visual Test:
1. ✅ All zones clearly visible
2. ✅ Colors distinct and recognizable
3. ✅ Borders provide clear boundaries
4. ✅ Hover effect works smoothly
5. ✅ Labels readable in debug mode

### Functional Test:
1. ✅ Red zones = navigation
2. ✅ Blue zones = puzzles work
3. ✅ Yellow zones = items collected
4. ✅ Green zones = lore displayed

### Accessibility Test:
1. ✅ 50% opacity readable on dark backgrounds
2. ✅ White borders provide contrast
3. ✅ Hover brightness increase noticeable
4. ✅ Zone titles shown on hover

---

## Comparison: Before vs After

### Before (Green Debug Mode):
- ❌ All zones same color (green)
- ❌ No visual hierarchy
- ❌ Had to hover to see zones
- ❌ Labels required to know function

### After (Color-Coded Blockout):
- ✅ 4 distinct colors by function
- ✅ Clear visual hierarchy
- ✅ Always visible (50% opacity)
- ✅ Instant recognition by color

---

## Design Philosophy

**"Form Follows Function"**

The color of a zone immediately communicates its purpose:
- See RED → Think "Exit"
- See BLUE → Think "Puzzle"
- See YELLOW → Think "Treasure"
- See GREEN → Think "Information"

This reduces cognitive load and improves player experience, even during the blockout/prototype phase.

---

## Art Integration Plan

When real art assets are added:

### Option 1: Fade Out Blockout
```javascript
// Gradually reduce blockout opacity
blockoutColor: 'bg-blue-500/20' // From 50% to 20%
```

### Option 2: Toggle Blockout
```javascript
// Add setting to disable blockout
const showBlockout = useGameStore((state) => state.showBlockout);
if (!showBlockout) return <div className="invisible" />;
```

### Option 3: Blend Mode
```javascript
// Use mix-blend-mode for subtle overlay
className="mix-blend-overlay"
```

**Recommended:** Option 2 (Toggle) for maximum flexibility

---

## Conclusion

**Status:** ✅ **PRODUCTION READY**

The color-coded blockout mode successfully:
- Makes all zones always visible
- Communicates function through color
- Maintains professional aesthetic
- Supports future art integration

**Result:** The game now looks like a polished level blockout with clear visual design language.

---

**End of Guide**
