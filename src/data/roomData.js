// Room configuration: walls and their clickable zones
// Chapter 1: The Majlis
export const walls = [
  {
    id: 0,
    name: 'North',
    color: '#8b0000', // Dark Red
    props: [
      // Add North wall props here, e.g.:
      // { id: 'door-frame', src: '/images/prop-door.png', top: 10, left: 25, width: 50 },
    ],
    zones: [
      {
        id: 'north-door',
        name: 'Door',
        type: 'lockedObject',
        colorType: 'exit', // RED: Exit/Navigation
        requiredItem: 'Brass Key',
        top: 20,
        left: 35,
        width: 30,
        height: 60,
        backgroundColor: '#4a4a4a', // Dark Grey (locked)
        openColor: '#88aa88', // Light Green (open)
      }
    ]
  },
  {
    id: 1,
    name: 'East',
    color: '#1e3a8a', // Dark Blue
    props: [
      { id: 'tv-unit', src: '/images/prop-tv-unit.png', top: 41, left: 38.4, width: 17, zoneId: 'east-tv' },
    ],
    zones: [
      {
        id: 'east-tv',
        name: 'TV Screen',
        type: 'tvInteractive',
        colorType: 'puzzle', // BLUE: Puzzle/Interactive
        top: 20,
        left: 30,
        width: 40,
        height: 30,
        backgroundColor: '#1a1a1a', // Black (static)
        activeColor: '#2a4a6a', // Blue-grey (fixed, showing time)
      },
      {
        id: 'east-drawer',
        name: 'Cabinet Drawer',
        type: 'codelock',
        colorType: 'puzzle', // BLUE: Puzzle/Interactive
        correctCode: '314',
        top: 52,
        left: 30,
        width: 40,
        height: 12,
        backgroundColor: '#4a4a4a', // Dark grey (closed)
      },
      {
        id: 'east-coaster',
        name: 'Coaster',
        type: 'inspect',
        colorType: 'lore', // GREEN: Flavor/Lore
        inspectItem: 'coaster',
        top: 52,
        left: 15,
        width: 12,
        height: 8,
        backgroundColor: '#8b7355', // Brown
      },
      {
        id: 'east-letter',
        name: 'Folded Letter',
        type: 'inspect',
        colorType: 'item', // YELLOW: Item/Loot (narrative item)
        inspectItem: 'letter',
        top: 52,
        left: 3,
        width: 10,
        height: 8,
        backgroundColor: '#f5f5dc', // Beige (aged paper)
      },
      {
        id: 'east-tv-knob',
        name: 'TV Knob',
        type: 'conditionalPickup',
        colorType: 'item', // YELLOW: Item/Loot
        itemName: 'TV Knob',
        requiresState: 'drawerOpen',
        top: 58,
        left: 45,
        width: 10,
        height: 6,
        backgroundColor: '#888888', // Grey knob
      }
    ]
  },
  {
    id: 2,
    name: 'South',
    color: '#065f46', // Dark Green
    props: [
      // Add South wall props here, e.g.:
      // { id: 'sofa', src: '/images/prop-sofa.png', top: 50, left: 15, width: 70 },
    ],
    zones: [
      {
        id: 'south-sofa',
        name: 'Sofa Cushions',
        type: 'pickupItem',
        colorType: 'item', // YELLOW: Item/Loot
        itemName: 'Photo Half A',
        top: 55,
        left: 25,
        width: 50,
        height: 25,
        backgroundColor: '#7c3aed', // Purple (sofa)
      }
    ]
  },
  {
    id: 3,
    name: 'West',
    color: '#78350f', // Dark Brown/Yellow
    props: [
      // Add West wall props here, e.g.:
      // { id: 'clock', src: '/images/prop-clock.png', top: 10, left: 35, width: 30 },
      // { id: 'frame', src: '/images/prop-frame.png', top: 40, left: 30, width: 40 },
    ],
    zones: [
      {
        id: 'west-clock',
        name: 'Clock Face',
        type: 'conditional',
        colorType: 'puzzle', // BLUE: Puzzle/Interactive
        requiredState: 'tvFixed',
        top: 15,
        left: 40,
        width: 20,
        height: 20,
        backgroundColor: '#fbbf24', // Yellow (clock)
      },
      {
        id: 'west-frame',
        name: 'Picture Frame',
        type: 'placement',
        colorType: 'puzzle', // BLUE: Puzzle/Interactive
        acceptsItems: ['Photo Half A', 'Photo Half B'],
        top: 45,
        left: 35,
        width: 30,
        height: 25,
        backgroundColor: '#92400e', // Brown (frame)
        filledColor: '#d97706', // Orange (frame with photos)
      },
      {
        id: 'west-brass-key',
        name: 'Brass Key',
        type: 'conditionalPickup',
        colorType: 'item', // YELLOW: Item/Loot
        itemName: 'Brass Key',
        requiresState: 'brassKeyRevealed',
        top: 72,
        left: 43,
        width: 14,
        height: 8,
        backgroundColor: '#fbbf24', // Gold/Brass
      }
    ]
  }
];
