# Audio Assets Placeholder

This directory should contain the following audio files for the game's sound system:

## Required Audio Files

### 1. `click.mp3`
- **Usage:** Button presses, keypad input, inventory selection
- **Type:** Short, mechanical click sound
- **Duration:** ~100-200ms
- **Volume:** Low to medium

### 2. `unlock.mp3`
- **Usage:** Success events (correct code, unlocking doors/drawers)
- **Type:** Positive chime or unlock sound
- **Duration:** ~500ms-1s
- **Volume:** Medium

### 3. `error.mp3`
- **Usage:** Wrong code entry, failed interactions
- **Type:** Negative buzz or error tone
- **Duration:** ~300-500ms
- **Volume:** Medium

### 4. `turn.mp3`
- **Usage:** Camera rotation (left/right arrows)
- **Type:** Footstep, whoosh, or smooth turn sound
- **Duration:** ~300-500ms
- **Volume:** Low to medium

### 5. `slide.mp3`
- **Usage:** Drawer opening
- **Type:** Wood sliding or drawer opening sound
- **Duration:** ~500ms-1s
- **Volume:** Medium

### 6. `static.mp3`
- **Usage:** TV static noise (loops continuously)
- **Type:** TV/radio static noise
- **Duration:** ~2-5s (will loop)
- **Volume:** Low (background ambient)

## File Format Requirements

- **Format:** MP3 (best compatibility)
- **Bitrate:** 128-192 kbps (balance quality/size)
- **Sample Rate:** 44.1 kHz
- **Mono/Stereo:** Mono preferred (smaller file size)
- **Normalization:** Peak at -3dB to -6dB (prevent clipping)

## Implementation Notes

- The SoundManager is already configured with these paths
- If files are missing, the game will continue to work (sounds just won't play)
- Error messages are logged to console for debugging
- All sounds use Howler.js for cross-platform compatibility

## Integration Status

✅ SoundManager implemented
✅ KeypadModal integrated (click, unlock, error)
✅ NavigationArrows integrated (turn)
✅ InventoryBar integrated (click)
⏳ Audio files pending (add .mp3 files here)

## Next Steps

1. Source or create audio files matching the descriptions above
2. Place .mp3 files in this directory (`/public/sounds/`)
3. Test in browser (sounds should play automatically)
4. Adjust volume levels in `SoundManager.js` if needed

---

**Current Status:** Audio system ready, awaiting audio assets
