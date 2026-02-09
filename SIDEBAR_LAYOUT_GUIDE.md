# Landscape Sidebar Layout Guide

## ✅ Fixed Layout Architecture

The layout has been refactored to properly support landscape mode with a fixed-width sidebar.

### Layout Structure

```
Desktop (Centered):
┌────────────────────────────────────────────────┐
│         [Black Background]                     │
│    ┌───────────────────┬────┐                  │
│    │                   │ I  │                  │
│    │   ROOM VIEW       │ N  │  ← Fixed width   │
│    │   (4:3 ratio)     │ V  │     sidebar      │
│    │   Full height     │    │     (w-32)       │
│    │                   │    │                  │
│    └───────────────────┴────┘                  │
│         [Centered]                             │
└────────────────────────────────────────────────┘

Mobile Landscape (Full Screen):
┌─────────────────────────────┬────┐
│                             │ I  │
│   ROOM VIEW (4:3)          │ N  │
│   Full height               │ V  │
│                             │    │
└─────────────────────────────┴────┘
```

## 🏗️ Component Architecture

### GameContainer (`src/components/GameContainer.jsx:7-23`)

**Outer Container (Centering & Background):**
```jsx
<div className="flex items-center justify-center h-screen w-screen overflow-hidden bg-black">
```
- Centers the game horizontally and vertically
- Black background for letterboxing
- Prevents overflow

**Inner Container (Main Game Layout):**
```jsx
<div className="flex flex-row h-full">
```
- Horizontal flex layout (`flex-row`)
- Full height (`h-full`)
- Width auto-calculates based on content
- No max-width constraint (content defines width)

**Room View Container:**
```jsx
<div className="relative h-full aspect-[4/3] bg-black flex-shrink-0 mx-auto">
```
- `relative`: **Critical** for ClickableZone positioning
- `h-full`: Takes full available height
- `aspect-[4/3]`: Width auto-calculates to maintain 4:3 ratio
- `flex-shrink-0`: Prevents shrinking
- `mx-auto`: Centers horizontally if extra space exists

**Inventory Sidebar:**
```jsx
<div className="w-32 h-full flex-shrink-0">
```
- `w-32`: Fixed width (128px)
- `h-full`: Full height
- `flex-shrink-0`: Never shrinks

## 🎯 ClickableZone Positioning

### How It Works

1. **RoomView** has `className="relative"` (`src/components/RoomView.jsx:48-51`)
2. **ClickableZone** uses `className="absolute"` with percentage positioning
3. Percentages are calculated **relative to RoomView**, not the window

### Example: The Door

```javascript
{
  id: 'north-door',
  top: 25,    // 25% from top of Room View
  left: 35,   // 35% from left of Room View
  width: 30,  // 30% of Room View width
  height: 50, // 50% of Room View height
}
```

**Result:**
- Door stays positioned correctly on the room image
- Scales proportionally when room size changes
- Never floats outside the room bounds

## 📐 Responsive Behavior

### Desktop (1920x1080, 1440x900, etc.)

**Calculation:**
- Screen height: 1080px
- Room height: 1080px (full height)
- Room width: 1080px * (4/3) = 1440px
- Sidebar width: 128px
- **Total width**: 1440px + 128px = 1568px
- Screen width: 1920px
- **Extra space**: 1920px - 1568px = 352px
- **Result**: Centered with 176px black bars on each side ✓

### Mobile Landscape (iPhone 15 Pro: 852x393)

**Calculation:**
- Screen height: 393px
- Room height: 393px (full height)
- Room width: 393px * (4/3) = 524px
- Sidebar width: 128px
- **Total width**: 524px + 128px = 652px
- Screen width: 852px
- **Extra space**: 852px - 652px = 200px
- **Result**: Centered with small black bars (or can be adjusted)

### iPad Landscape (1024x768)

**Calculation:**
- Screen height: 768px
- Room height: 768px
- Room width: 768px * (4/3) = 1024px
- Sidebar width: 128px
- **Total width**: 1024px + 128px = 1152px
- Screen width: 1024px
- **Result**: Slightly overflows, but content is visible (scrollable if needed)

## 🎨 Inventory Sidebar Styling

### Visual Design (`src/components/InventoryBar.jsx:15-53`)

**Dark Wooden Panel Theme:**
```jsx
bg-gradient-to-b from-[#2a2520] via-[#1f1b17] to-[#0f0d0b]
border-l-4 border-[#5a4a3a]
```
- Vertical gradient (dark brown tones)
- Left border (separates from room)
- Shadow for depth

**Header:**
- Amber text color (`text-amber-100`)
- Dark background overlay (`bg-black/30`)
- Small, uppercase text

**Items:**
- 20x20 size (w-20 h-20) - visible but compact
- Vertical stack with 12px gaps (gap-3)
- Yellow border when selected
- Hover effects for feedback

## ✅ Key Features

1. **Proper Aspect Ratio**: Room maintains 4:3 regardless of screen size
2. **Centered on Desktop**: Game doesn't stretch infinitely wide
3. **Full Screen on Mobile**: Optimized for landscape gaming
4. **Correct Zone Positioning**: ClickableZones stay relative to room
5. **Fixed Sidebar**: Inventory doesn't grow/shrink
6. **Responsive**: Adapts to different screen sizes

## 🔧 Customization

### Change Sidebar Width

In `GameContainer.jsx`:
```jsx
<div className="w-32 h-full flex-shrink-0">  // w-32 = 128px
```

Options:
- `w-24` = 96px (narrower)
- `w-32` = 128px (current)
- `w-40` = 160px (wider)

### Change Item Size

In `InventoryBar.jsx`:
```jsx
className="w-20 h-20 ..."  // 80px x 80px
```

Options:
- `w-16 h-16` = 64px (smaller)
- `w-20 h-20` = 80px (current)
- `w-24 h-24` = 96px (larger)

## 🎮 Testing Checklist

- [ ] Desktop: Game is centered horizontally
- [ ] Desktop: Room maintains 4:3 aspect ratio
- [ ] Desktop: Sidebar is visible and functional
- [ ] Mobile Landscape: Game fills most of screen
- [ ] Mobile Landscape: Room is full height
- [ ] Resize browser: Layout adjusts correctly
- [ ] ClickableZones: Door stays on door frame
- [ ] ClickableZones: Key stays on floor
- [ ] Inventory: Items stack vertically
- [ ] Inventory: Selection highlights work

## 🚨 Common Issues & Fixes

**Issue**: Layout squashed on desktop
- **Cause**: Missing `h-full` on room container
- **Fix**: Ensure room has `h-full aspect-[4/3]`

**Issue**: ClickableZones float outside room
- **Cause**: Missing `relative` on RoomView
- **Fix**: RoomView must have `className="relative"`

**Issue**: Sidebar too wide on mobile
- **Cause**: Fixed width too large
- **Fix**: Use `w-24` instead of `w-32`

**Issue**: Not centered on desktop
- **Cause**: Missing centering on outer container
- **Fix**: Ensure outer div has `items-center justify-center`
