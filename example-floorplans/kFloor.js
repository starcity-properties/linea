const kFloorTwo = {
  unit: {
    building: '1020-k',
    name: '1020-k-floor2',
    code: '1020-k-02',
    number: 2,
    scale: 1, // what is this??
    origin: { x: 0, y: 0 },
  },
  room: {
    outline: [
      {
        x: 0, y: 0, radius: 0, curve: 'none', index: 0,
      },
      {
        x: 340, y: 0, radius: 0, curve: 'none', index: 1,
      },
      {
        x: 340, y: 166, radius: 0, curve: 'none', index: 2,
      },
      {
        x: 394, y: 166, radius: 0, curve: 'none', index: 3,
      },
      {
        x: 394, y: 226, radius: 0, curve: 'none', index: 4,
      },
      {
        x: 340, y: 226, radius: 0, curve: 'none', index: 5,
      },
      {
        x: 340, y: 200, radius: 0, curve: 'none', index: 6,
      },
      {
        x: 274, y: 200, radius: 0, curve: 'none', index: 7,
      },
      {
        x: 274, y: 214, radius: 0, curve: 'none', index: 8,
      },
      {
        x: 0, y: 214, radius: 0, curve: 'none', index: 9,
      },
    ],
  },
  features: [
    {
      type: 'window',
      code: '1020-k-02-window01',
      label: 'window',
      origin: { x: 0, y: 0 },
      outline: [
        {
          x: 24, y: 0, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 84, y: 0, radius: 0, curve: 'none', index: 1,
        },
      ],
    },
    {
      type: 'window',
      code: '1020-k-02-window02',
      label: 'window',
      origin: { x: 0, y: 0 },
      outline: [
        {
          x: 276, y: 0, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 318, y: 0, radius: 0, curve: 'none', index: 1,
        },
      ],
    },
    {
      type: 'window',
      code: '1020-k-02-window03',
      label: 'window',
      origin: { x: 0, y: 0 },
      outline: [
        {
          x: 274, y: 214, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 256, y: 214, radius: 0, curve: 'none', index: 1,
        },
      ],
    },
    {
      type: 'window',
      code: '1020-k-02-window04',
      label: 'window',
      origin: { x: 0, y: 0 },
      outline: [
        {
          x: 248, y: 214, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 228, y: 214, radius: 0, curve: 'none', index: 1,
        },
      ],
    },
    {
      type: 'window',
      code: '1020-k-02-window05',
      label: 'window',
      origin: { x: 0, y: 0 },
      outline: [
        {
          x: 160, y: 214, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 130, y: 214, radius: 0, curve: 'none', index: 1,
        },
      ],
    },
    {
      type: 'window',
      code: '1020-k-02-window06',
      label: 'window',
      origin: { x: 0, y: 0 },
      outline: [
        {
          x: 64, y: 214, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 36, y: 214, radius: 0, curve: 'none', index: 1,
        },
      ],
    },
    {
      type: 'dresser',
      code: 'k-floor2-table',
      label: 'Food Table',
      origin: { x: 0, y: 0 },
      outline: [
        { x: 230, y: 130, index: 0 },
        { x: 250, y: 130, index: 1 },
        { x: 250, y: 210, index: 2 },
        { x: 230, y: 210, index: 3 },
      ],
    },
    {
      type: 'interiorWall',
      code: 'dry-erase',
      origin: { x: 0, y: 0 },
      outline: [
        { x: 80, y: 50 },
        { x: 80, y: 100 },
      ],
    },
    {
      type: 'stairs',
      code: 'k-floor2-stairs',
      origin: { x: 0, y: 0 },
      vertical: false,
      outline: [
        { x: 310, y: 30 },
        { x: 335, y: 30 },
        { x: 335, y: 90 },
        { x: 310, y: 90 },
      ],
    },
    {
      type: 'stairs',
      code: 'k-floor2-stairs2',
      origin: { x: 0, y: 0 },
      vertical: true,
      outline: [
        { x: 290, y: 90 },
        { x: 310, y: 90 },
        { x: 310, y: 120 },
        { x: 290, y: 120 },
      ],
    },
  ],
};

export default kFloorTwo;
