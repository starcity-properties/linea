const kFloor2Room1 = {
  unit: {
    name: 'Jazz Room',
    code: 'k-floor02-room01',
    rate: 2000,
    number: 1,
    scale: 1,
    origin: { x: 94, y: 0 },
  },
  outline: [
    {
      x: 0, y: 0, radius: 0, curve: 'none', index: 0,
    },
    {
      x: 94, y: 0, radius: 0, curve: 'none', index: 1,
    },
    {
      x: 94, y: 116, radius: 0, curve: 'none', index: 2,
    },
    {
      x: 0, y: 116, radius: 0, curve: 'none', index: 3,
    },
  ],
  features: [
    {
      type: 'window',
      code: 'k-floor02-room01-window01',
      label: 'window',
      origin: { x: 0, y: 0 },
      outline: [
        {
          x: 8, y: 0, radius: 0, curve: 'none', index: 0,
        },
        {
          x: 68, y: 0, radius: 0, curve: 'none', index: 1,
        },
      ],
    },
    {
      type: 'slidingDoor',
      code: 'k-floor02-room01-slidingDoor01',
      label: 'sliding door',
      origin: { x: 0, y: 0 },
      outline: [
        { x: 0, y: 90, index: 0 },
        { x: 0, y: 60, index: 1 },
        { x: 0, y: 112, index: 2 },
      ],
    },
    {
      type: 'slidingDoor',
      code: 'k-floor02-room01-slidingDoor02',
      label: 'sliding door',
      origin: { x: 0, y: 0 },
      outline: [
        { x: 36, y: 116, index: 0 },
        { x: 55, y: 116, index: 1 },
        { x: 4, y: 116, index: 2 },
      ],
    },
    {
      type: 'bed',
      code: 'k-floor02-room1-bed',
      label: 'secret bed',
      origin: { x: 0, y: 0 },
      outline: [
        { x: 14, y: 10 },
        { x: 40, y: 10 },
        { x: 40, y: 60 },
        { x: 14, y: 60 },
      ],
    },
    {
      type: 'nightTable',
      code: 'booze cart',
      label: 'Bar Cart',
      origin: { x: 0, y: 0 },
      outline: [
        { x: 14, y: 70 },
        { x: 24, y: 70 },
        { x: 24, y: 80 },
        { x: 14, y: 80 },
      ],
    },
  ],
};

export default kFloor2Room1;
