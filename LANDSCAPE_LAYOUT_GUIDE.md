# Landscape Mode Layout Guide

## ✅ Layout Strategy (Horizontal/Landscape)

The game now uses a **landscape-oriented horizontal flex layout** - perfect for mobile gaming in landscape mode and immersive desktop play!

### Layout Structure

```
┌─────────────────────────────────────────────┐
│                                    │ I │    │
│                                    │ N │    │
│        ROOM VIEW (4:3)            │ V │ I  │
│     (Full height, width scales    │ E │ T  │
│      to maintain aspect ratio)    │ N │ E  │
│                                    │ T │ M  │
│                                    │ O │ S  │
│                                    │ R │    │
│                                    │ Y │    │
└─────────────────────────────────────────────┘
     ← Room (4:3 aspect) →  ← Sidebar →
```

## 📐 Implementation Details

### GameContainer (`src/components/GameContainer.jsx:7-24`)

**Outer Container (Centering Wrapper):**
```jsx
<div className="flex items-center justify-center h-screen w-screen overflow-hidden bg-black">
```
- Centers the game on desktop
- Black background for letterboxing effect on ultra-wide screens

**Inner Container (Main Game):**
```jsx
<div className="flex flex-row h-full w-full max-w-screen-xl">
```
- Horizontal layout (`flex-row`)
- Full height (`h-full`)
- Max width constraint for desktop (`max-w-screen-xl`)

**Left Section (Room View):**
```jsx
<div className="relative h-full aspect-[4/3] bg-black flex-shrink-0">
```
- Full height (`h-full`)
- 4:3 aspect ratio maintained
- Width scales automatically
- No shrinking (`flex-shrink-0`)

**Right Section (Inventory Sidebar):**
```jsx
<div className="flex-grow h-full">
```
- Fills remaining horizontal space
- Full height

### InventoryBar - Vertical Sidebar (`src/components/InventoryBar.jsx:15-50`)

**Sidebar Container:**
```jsx
<div className="w-full h-full bg-gradient-to-r from-[#2c2c2c] to-[#1a1a1a]
                border-l-4 border-[#4a4a4a] flex flex-col">
```
- Left border (instead of top)
- Horizontal gradient (left to right)
- Vertical flex layout

**Features:**
- Header at top with "Inventory" label
- Vertical stack of items (`flex-col items-center gap-4`)
- Items are 16x16 (compact for sidebar)
- Scrollable if many items

## 🎨 Visual Behavior

### On Mobile (Landscape Mode)
- Room view fills most of the screen (4:3 aspect)
- Inventory sidebar on the right (compact)
- Full-screen immersive experience
- No wasted space

### On Tablet (Landscape)
- Centered game container
- Room view at comfortable size
- Sidebar remains compact and functional

### On Desktop (Wide Screen)
- Game centered horizontally
- Max width constraint (`max-w-screen-xl` = 1280px)
- Black bars on ultra-wide monitors
- Looks like a horizontal tablet in the center

## 🎮 Layout Advantages

1. **Natural for landscape mobile** - Most mobile games play in landscape
2. **Better aspect ratio** - Room view gets more screen space
3. **Compact inventory** - Sidebar doesn't waste vertical space
4. **Desktop friendly** - Centered with max-width looks polished
5. **Immersive** - Wider field of view for room exploration

## 📱 Responsive Breakpoints

The layout adapts automatically:

**Mobile (Portrait) - 375px-768px:**
- Not ideal, but still works
- Room view becomes narrow
- Consider adding orientation lock prompt

**Mobile (Landscape) - 568px-926px:**
- **Perfect!** This is the target experience
- Room fills most of screen
- Sidebar compact on right

**Tablet (Landscape) - 768px-1024px:**
- Great experience
- Balanced proportions
- Room view larger

**Desktop - 1024px+:**
- Centered with `max-w-screen-xl`
- Professional appearance
- Black letterboxing on sides for ultra-wide

## 🔧 Key CSS Changes

### Global (`src/index.css`)
- Body background: `#0a0a0a` (deep black for letterboxing)
- Removed `flex-direction: column` from `#root`

### GameContainer
- Changed from `flex-col` to `flex-row`
- Added centering wrapper
- Room: `h-full aspect-[4/3]` (height-based sizing)
- Inventory: `flex-grow` (fills remaining width)

### InventoryBar
- Vertical layout (`flex-col`)
- Left border (`border-l-4`)
- Horizontal gradient (`gradient-to-r`)
- Smaller items (16x16 instead of 20x20)
- Vertical stacking with gaps

## 🎯 Navigation

Navigation arrows remain positioned within the room view:
- Left arrow: Left side of room
- Right arrow: Right side of room
- No changes needed!

## ✅ What Works

- ✓ 4:3 aspect ratio maintained
- ✓ Full-height room view
- ✓ Compact vertical inventory sidebar
- ✓ Desktop centering
- ✓ Mobile landscape optimization
- ✓ All interactions intact (pickup, unlock, selection)
- ✓ Responsive to screen sizes

## 🎮 Test Scenarios

1. **Desktop Browser**: Resize window - game stays centered
2. **Mobile Landscape**: Rotate phone - full-screen experience
3. **Tablet**: Perfect balance of room and inventory
4. **Ultra-wide Monitor**: Black bars on sides, game centered

The engine now feels like a professional Rusty Lake game in landscape mode!
