# Placeholder Images Implementation

## 🎨 Visual Testing System

The game now uses **dynamic placeholder images** from placehold.co for visual feedback during development and testing!

---

## 📸 Background Images

### How It Works

The `RoomView` component now renders background images that change based on game state:

```javascript
const getWallBackground = () => {
  switch (currentWall) {
    case 0: // North - Door
      return gameState.doorOpen
        ? 'https://placehold.co/800x600/3e2723/ffffff?text=NORTH:+Door+OPEN+(EXIT)'
        : 'https://placehold.co/800x600/3e2723/ffffff?text=NORTH:+Door+LOCKED';
    // ... other walls
  }
};
```

### CSS Styling

```css
backgroundImage: `url('${getWallBackground()}')`,
backgroundSize: 'contain',
backgroundPosition: 'center',
backgroundRepeat: 'no-repeat',
backgroundColor: '#000000',
```

**Key Features:**
- `contain` - Shows full image without cropping
- `center` - Centers image in container
- `no-repeat` - Single image display
- Black background - Fills letterbox areas

---

## 🖼️ Wall States

### North Wall (Brown #3e2723)

**Default State:**
```
https://placehold.co/800x600/3e2723/ffffff?text=NORTH:+Door+LOCKED
```
Shows: Brown background, white text "NORTH: Door LOCKED"

**After Unlocking (doorOpen = true):**
```
https://placehold.co/800x600/3e2723/ffffff?text=NORTH:+Door+OPEN+(EXIT)
```
Shows: Brown background, white text "NORTH: Door OPEN (EXIT)"

---

### East Wall (Dark Grey #263238)

**Default State:**
```
https://placehold.co/800x600/263238/ffffff?text=EAST:+TV+Static
```
Shows: Dark grey background, white text "EAST: TV Static"

**After Fixing (tvFixed = true):**
```
https://placehold.co/800x600/263238/ffffff?text=EAST:+TV+Says+09:30
```
Shows: Dark grey background, white text "EAST: TV Says 09:30"

---

### South Wall (Blue #1a237e)

**Always:**
```
https://placehold.co/800x600/1a237e/ffffff?text=SOUTH:+Sofa+Cushions
```
Shows: Blue background, white text "SOUTH: Sofa Cushions"

**Note:** No state changes - sofa zone just disappears when clicked

---

### West Wall (Purple #4a148c)

**Default State:**
```
https://placehold.co/800x600/4a148c/ffffff?text=WEST:+Clock+Stuck
```
Shows: Purple background, white text "WEST: Clock Stuck"

**After Setting Time (clockOpen = true):**
```
https://placehold.co/800x600/4a148c/ffffff?text=WEST:+Clock+OPEN
```
Shows: Purple background, white text "WEST: Clock OPEN"

---

## 🎒 Inventory Icons

### How It Works

Each inventory item displays a placeholder image:

```javascript
const getItemImage = (item) => {
  const encodedName = encodeURIComponent(item);
  return `https://placehold.co/100x100/4a4a4a/ffffff?text=${encodedName}`;
};
```

### Examples

**Photo Half A:**
```
https://placehold.co/100x100/4a4a4a/ffffff?text=Photo%20Half%20A
```
Shows: 100x100 grey square with "Photo Half A"

**Photo Half B:**
```
https://placehold.co/100x100/4a4a4a/ffffff?text=Photo%20Half%20B
```
Shows: 100x100 grey square with "Photo Half B"

**Brass Key:**
```
https://placehold.co/100x100/4a4a4a/ffffff?text=Brass%20Key
```
Shows: 100x100 grey square with "Brass Key"

### CSS Styling

```jsx
<img
  src={getItemImage(item)}
  alt={item}
  className="w-full h-full object-cover"
/>
```

**Key Features:**
- `w-full h-full` - Fills container (80x80px)
- `object-cover` - Crops to fit without distortion
- Auto URL encoding for special characters

---

## 🎯 Clickable Zones

### Simplified Design

Zones are now **transparent hotspots** with subtle hover effects:

```jsx
<div
  className="absolute cursor-pointer transition-all duration-200
             hover:bg-yellow-400/20 hover:border hover:border-yellow-400/50
             rounded-sm"
  style={{
    top: `${zone.top}%`,
    left: `${zone.left}%`,
    width: `${zone.width}%`,
    height: `${zone.height}%`,
  }}
/>
```

**Features:**
- **Transparent** - Shows background image through zone
- **Hover highlight** - Yellow glow on mouseover
- **Border on hover** - Yellow outline for clarity
- **Tooltip** - Shows zone name

**Why transparent?**
- Background images show game state
- Zones are just interaction points
- Hover provides visual feedback
- Clean, professional look

---

## 📋 URL Structure

### placehold.co Format

```
https://placehold.co/{width}x{height}/{bg_color}/{text_color}?text={message}
```

**Parameters:**
- `width x height` - Image dimensions (e.g., 800x600, 100x100)
- `bg_color` - Hex color without # (e.g., 3e2723, 4a4a4a)
- `text_color` - Text hex color (ffffff = white)
- `text` - URL-encoded message (spaces = +)

**Examples:**
```
800x600 - Wall backgrounds
100x100 - Inventory items
3e2723 - Brown color
ffffff - White text
NORTH:+Door+LOCKED - Message with spaces
```

---

## 🔄 State-Driven Updates

### Automatic Image Changes

React automatically re-renders when state changes:

1. **User clicks TV**
2. `updateGameState('tvFixed', true)`
3. `RoomView` re-renders
4. `getWallBackground()` returns new URL
5. Background image updates instantly

**Hot Module Replacement (HMR):**
- Changes apply without refresh
- State persists during updates
- Instant visual feedback

---

## 🎨 Color Palette

### Wall Colors (Dark Tones)

| Wall | Color | Hex | RGB |
|------|-------|-----|-----|
| North | Brown | #3e2723 | rgb(62, 39, 35) |
| East | Dark Grey | #263238 | rgb(38, 50, 56) |
| South | Blue | #1a237e | rgb(26, 35, 126) |
| West | Purple | #4a148c | rgb(74, 20, 140) |

### Item Colors

| Element | Color | Hex | RGB |
|---------|-------|-----|-----|
| Inventory Items | Dark Grey | #4a4a4a | rgb(74, 74, 74) |
| Text | White | #ffffff | rgb(255, 255, 255) |
| Hover Highlight | Yellow (20% opacity) | #eab308 | rgba(234, 179, 8, 0.2) |
| Selected Border | Yellow | #eab308 | rgb(234, 179, 8) |

---

## 🚀 Benefits

### For Development

1. **Instant Visual Feedback**
   - See state changes immediately
   - No need for art assets
   - Easy to debug logic

2. **Clear State Labels**
   - Wall backgrounds show current state
   - No ambiguity about game status
   - Easy to verify puzzle logic

3. **Rapid Prototyping**
   - Test puzzles without art
   - Focus on gameplay mechanics
   - Iterate quickly

### For Production

**Easy Transition to Real Art:**
```javascript
// Development
backgroundImage: `url('${getWallBackground()}')`

// Production (swap in real images)
const getRealWallImage = () => {
  switch (currentWall) {
    case 0:
      return gameState.doorOpen
        ? '/assets/north-door-open.jpg'
        : '/assets/north-door-locked.jpg';
    // ...
  }
};
```

**Same logic, different URLs!**

---

## 📝 Implementation Checklist

### Files Modified

- [x] `RoomView.jsx` - Dynamic background images
- [x] `InventoryBar.jsx` - Placeholder item images
- [x] `ClickableZone.jsx` - Transparent hotspots
- [x] `gameStore.js` - State flags updated

### Features Implemented

- [x] 6 wall state variations (2 per dynamic wall)
- [x] 3 inventory item placeholders
- [x] Hover highlights on zones
- [x] State-driven image switching
- [x] URL encoding for item names
- [x] Responsive image sizing

### Testing Complete

- [x] All wall states display correctly
- [x] Images change on state updates
- [x] Inventory shows item images
- [x] Zones clickable through images
- [x] Hover effects work
- [x] HMR updates preserve state

---

## 🎯 Next Steps

### Upgrading to Real Art

1. **Create Assets**
   - Design room backgrounds (800x600 or higher)
   - Create item icons (100x100 or higher)
   - Maintain same state variations

2. **Update URLs**
   - Replace placehold.co with asset paths
   - Keep same conditional logic
   - Test state transitions

3. **Optimize**
   - Use WebP format for smaller files
   - Implement lazy loading
   - Add loading states

**The gameplay logic is complete and production-ready!**
