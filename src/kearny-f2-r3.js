export var kearnyFloor2Room3 = {
    unit: {
        name: "Closet",
        code: "kearny-floor02-room02",
        rate: 0,
        number: 1,
        scale: 1,
        origin: {x: 310, y: 124}
    },
    outline: [
        { x: 0, y: 0, radius: 0, curve: "none", index: 0 },
        { x: 30, y: 0, radius: 0, curve: "none", index: 1 },
        { x: 30, y: 42, radius: 0, curve: "none", index: 2 },
        { x: 0, y: 42, radius: 0, curve: "none", index: 3 },
    ],
    features: [
        {
            type: "door",
            code: "kearny-floor02-room02-door01",
            label: "door",
            clockwise: true,
            outline: [
                { x: 0, y: 36, index: 0 },
                { x: 0, y: 12, index: 1 },
            ]
        }
    ]
};
