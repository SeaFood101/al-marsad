# Layout Evolution

## Previous Layout (Portrait/Vertical)

```
┌─────────────────────┐
│                     │
│   ROOM VIEW (4:3)   │  ← Top section
│                     │
├─────────────────────┤
│                     │
│   INVENTORY BAR     │  ← Bottom (flex-grow)
│   [Items...]        │
│                     │
└─────────────────────┘
```

**Issues:**
- Wasted vertical space on tall phones
- Inventory panel becomes huge on modern phones
- Not optimized for landscape gaming

---

## Current Layout (Landscape/Horizontal) ✅

```
┌────────────────────────────┬────┐
│                            │ I  │
│                            │ N  │
│   ROOM VIEW (4:3)         │ V  │  ← Right sidebar
│   (Full height,            │ E  │    (flex-grow)
│    width scales)           │ N  │
│                            │ T  │
│                            │ O  │
│                            │ R  │
│                            │ Y  │
└────────────────────────────┴────┘
       ← Room (h-full, aspect-[4/3])
```

**Advantages:**
- ✅ Optimized for landscape mobile gaming
- ✅ Better use of screen space
- ✅ Compact inventory sidebar
- ✅ Centered on desktop (professional look)
- ✅ Wider field of view for room exploration
- ✅ Rusty Lake aesthetic

---

## Key Differences

| Aspect | Portrait Layout | Landscape Layout |
|--------|----------------|------------------|
| **Flex Direction** | `flex-col` | `flex-row` |
| **Room Sizing** | `w-full aspect-[4/3]` | `h-full aspect-[4/3]` |
| **Inventory Position** | Bottom (horizontal) | Right sidebar (vertical) |
| **Inventory Layout** | Flex wrap (rows) | Flex column (stack) |
| **Item Size** | 20x20 | 16x16 |
| **Border** | Top border | Left border |
| **Gradient** | Top → Bottom | Left → Right |
| **Best For** | Portrait phones | Landscape phones, Desktop |
| **Desktop Experience** | Full width (awkward) | Centered (professional) |

---

## Mobile Gaming Standard

Most mobile games use **landscape orientation** because:
1. Wider field of view
2. Better thumb ergonomics
3. More immersive experience
4. Standard for premium mobile games (Rusty Lake, Monument Valley, etc.)

The new layout follows this industry standard!
