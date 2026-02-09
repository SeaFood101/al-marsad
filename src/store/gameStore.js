import { create } from 'zustand';

const useGameStore = create((set) => ({
  // Current wall index (0: North, 1: East, 2: South, 3: West)
  currentWall: 0,

  // Slide direction for wall transition animation ('left' or 'right')
  slideDirection: null,

  // Inventory items
  inventory: [],

  // Currently selected inventory item
  activeItem: null,

  // Zones that have been picked up (won't render)
  pickedUpZones: [],

  // Currently inspecting item (for zoom overlay)
  inspectingItem: null,

  // Debug mode flag
  debugMode: true,

  // Toast notification
  toast: null,
  _toastTimer: null,

  // Game state flags
  gameState: {
    // Chapter 1: The Majlis - Layer 2
    doorOpen: false,
    tvFixed: false,
    tvHasKnob: false,
    clockOpen: false,
    frameHasA: false,
    frameHasB: false,
    brassKeyRevealed: false,
    drawerOpen: false,
    drawerUnlocked: false,
  },

  // Actions
  rotateLeft: () => set((state) => ({
    currentWall: (state.currentWall - 1 + 4) % 4,
    slideDirection: 'left',
  })),

  rotateRight: () => set((state) => ({
    currentWall: (state.currentWall + 1) % 4,
    slideDirection: 'right',
  })),

  // Add item to inventory (prevent duplicates)
  addToInventory: (item) => set((state) => {
    if (state.inventory.includes(item)) {
      console.warn(`[Store] Item "${item}" already in inventory`);
      return state;
    }
    return {
      inventory: [...state.inventory, item]
    };
  }),

  // Remove item from inventory and deselect if active
  removeFromInventory: (item) => set((state) => ({
    inventory: state.inventory.filter(i => i !== item),
    activeItem: state.activeItem === item ? null : state.activeItem
  })),

  // Toggle item selection (select/deselect)
  setActiveItem: (item) => set((state) => ({
    activeItem: state.activeItem === item ? null : item
  })),

  // Mark zone as picked up (prevent re-rendering and duplicate pickups)
  pickUpZone: (zoneId) => set((state) => {
    if (state.pickedUpZones.includes(zoneId)) {
      console.warn(`[Store] Zone "${zoneId}" already picked up`);
      return state;
    }
    return {
      pickedUpZones: [...state.pickedUpZones, zoneId]
    };
  }),

  // Update a single game state flag
  updateGameState: (key, value) => set((state) => ({
    gameState: { ...state.gameState, [key]: value }
  })),

  // Open inspect overlay
  setInspectingItem: (item) => set(() => ({
    inspectingItem: item
  })),

  // Close inspect overlay
  closeInspect: () => set(() => ({
    inspectingItem: null
  })),

  // Show a toast message (auto-dismisses after 3s)
  showToast: (message) => {
    const state = useGameStore.getState();
    if (state._toastTimer) clearTimeout(state._toastTimer);
    const timer = setTimeout(() => {
      set({ toast: null, _toastTimer: null });
    }, 3000);
    set({ toast: message, _toastTimer: timer });
  },

  // Toggle debug mode visibility
  toggleDebugMode: () => set((state) => ({
    debugMode: !state.debugMode
  })),
}));

export default useGameStore;
