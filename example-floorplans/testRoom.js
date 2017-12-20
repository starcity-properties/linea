const testRoom = {
  unit: {
    name: 'room-01',
    code: 'mission-room-01',
    rate: 2100,
    number: 1,
  },
  floor: {
    unit: {
      origin: { x: 0, y: 0 },
      code: 'testFloor',
    },
    outline: [
      {
        x: 0, y: 0, radius: 0, curve: 'none', index: 0,
      },
      {
        x: 590, y: 0, radius: 0, curve: 'none', index: 1,
      },
      {
        x: 590, y: 590, radius: 0, curve: 'none', index: 2,
      },
      {
        x: 0, y: 590, radius: 0, curve: 'none', index: 3,
      },
    ],
  },
  rooms: [
    {
      unit: {
        name: 'room-01',
        code: 'mission-room-01',
        rate: 2100,
        number: 1,
        origin: { x: 0, y: 0 },
      },
      outline: [
        {
          x: 0, y: 0, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 200, y: 0, radius: 0, curve: 'none', index: 1,
        },
        {
          x: 270, y: 90, radius: 100, curve: 'concave', index: 2,
        },
        {
          x: 270, y: 170, radius: 0, curve: 'none', index: 3,
        },
        {
          x: 300, y: 210, radius: 50, curve: 'convex', index: 4,
        },
        {
          x: 370, y: 210, radius: 0, curve: 'none', index: 5,
        },
        {
          x: 370, y: 270, radius: 0, curve: 'none', index: 6,
        },
        {
          x: 0, y: 270, radius: 0, curve: 'none', index: 7,
        },
      ],
    },
    {
      unit: {
        code: 'testing',
        origin: { x: 0, y: 120 },
      },
      outline: [
        {
          x: 0, y: 0, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 0, y: 150, radius: 0, curve: 'none', index: 1,
        },
        {
          x: 210, y: 150, radius: 0, curve: 'none', index: 2,
        },
        {
          x: 210, y: 0, radius: 0, curve: 'none', index: 3,
        },
      ],
    },
  ],
  features: [
    {
      type: 'window',
      code: 'room-01-window01',
      label: 'window',
      origin: { x: 0, y: 0 },
      outline: [
        {
          x: 0, y: 20, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 0, y: 90, radius: 0, curve: 'none', index: 1,
        },
      ],
    },
    {
      type: 'window',
      code: 'room-01-window02',
      label: 'window',
      origin: { x: 0, y: 0 },
      outline: [
        {
          x: 0, y: 140, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 0, y: 250, radius: 0, curve: 'none', index: 1,
        },
      ],
    },
    {
      type: 'door',
      code: 'room-01-door01',
      label: 'door',
      origin: { x: 0, y: 0 },
      angleDegrees: 45,
      clockwise: false,
      outline: [
        {
          x: 370, y: 220, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 370, y: 260, radius: 0, curve: 'none', index: 1,
        },
      ],
    },
    {
      type: 'door',
      label: 'door-room-02',
      origin: { x: 0, y: 0 },
      angleDegrees: 30,
      clockwise: true,
      outline: [
        { x: 130, y: 0, index: 0 },
        { x: 170, y: 0, index: 1 },
      ],
    },
    {
      type: 'door',
      label: 'door-room-03',
      origin: { x: 0, y: 0 },
      angleDegrees: 45,
      clockwise: true,
      outline: [
        { x: 100, y: 120, index: 0 },
        { x: 100, y: 80, index: 1 },
      ],
    },
    {
      type: 'door',
      label: 'door-room-04',
      origin: { x: 0, y: 0 },
      clockwise: false,
      outline: [
        { x: 70, y: 120, index: 0 },
        { x: 30, y: 120, index: 1 },
      ],
    },
    {
      type: 'slidingDoor',
      code: 'room-01-slidingDoor01',
      label: 'sliding door',
      origin: { x: 0, y: 0 },
      outline: [
        { x: 210, y: 220, index: 0 },
        { x: 210, y: 170, index: 1 },
        { x: 210, y: 120, index: 2 },
      ],
    },
    {
      type: 'interiorWall',
      code: 'room-01-interiorWall01',
      label: 'interior wall',
      origin: { x: 0, y: 0 },
      outline: [
        {
          x: 210, y: 170, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 210, y: 270, radius: 0, curve: 'none', index: 1,
        },
      ],
    },
    {
      type: 'interiorWall',
      code: 'room-01-interiorWall02',
      label: 'interior wall',
      origin: { x: 0, y: 0 },
      outline: [
        {
          x: 0, y: 120, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 210, y: 120, radius: 0, curve: 'none', index: 1,
        },
      ],
    },
    {
      type: 'interiorWall',
      code: 'room-01-interiorWall03',
      label: 'interior wall',
      origin: { x: 0, y: 0 },
      outline: [
        { x: 100, y: 0, index: 0 },
        { x: 100, y: 80, index: 1 },
      ],
    },
    {
      type: 'bed',
      code: 'room-01-bed01',
      label: 'Queen Bed',
      origin: { x: 0, y: 0 },
      outline: [
        { x: 20, y: 260, index: 0 },
        { x: 20, y: 200, index: 1 },
        { x: 100, y: 200, index: 2 },
        { x: 100, y: 260, index: 3 },
      ],
    },
    {
      type: 'dresser',
      code: 'room-01-dresser01',
      label: 'Dresser',
      origin: { x: 0, y: 0 },
      outline: [
        { x: 80, y: 160, index: 0 },
        { x: 80, y: 130, index: 1 },
        { x: 170, y: 130, index: 2 },
        { x: 170, y: 160, index: 3 },
      ],
    },
    {
      type: 'nightTable',
      code: 'room-01-nightTable01',
      label: 'NightTable',
      origin: { x: 0, y: 0 },
      outline: [
        { x: 20, y: 165, index: 0 },
        { x: 20, y: 195, index: 0 },
        { x: 50, y: 195, index: 0 },
        { x: 50, y: 165, index: 1 },
      ],
    },
  ],
};

export default testRoom;
