export var kearnyFloorTwoFull = {
    unit: {
        building: "1020-kearny",
        name: "1020-kearny-floor2",
        code: "1020-kearny-02",
        number: 2,
        scale: 1, // what is this??
        origin: {x: 0, y: 0}
    },
    floor: {
        unit: {
            origin: {x: 0, y: 0},
            code: "1020-kearny-floor2"
        },
        outline: [
            { x: 0, y: 0, radius: 0, curve: "none", index: 0 },
            { x: 340, y: 0, radius: 0, curve: "none", index: 1 },
            { x: 340, y: 166, radius: 0, curve: "none", index: 2 },
            { x: 394, y: 166, radius: 0, curve: "none", index: 3 },
            { x: 394, y: 226, radius: 0, curve: "none", index: 4 },
            { x: 340, y: 226, radius: 0, curve: "none", index: 5 },
            { x: 340, y: 200, radius: 0, curve: "none", index: 6 },
            { x: 274, y: 200, radius: 0, curve: "none", index: 7 },
            { x: 274, y: 214, radius: 0, curve: "none", index: 8 },
            { x: 0, y: 214, radius: 0, curve: "none", index: 9 },
        ],
        features: [
            {
                type: "window",
                code: "1020-kearny-02-window01",
                label: "window",
                origin: {x: 0, y: 0},
                outline: [
                    { x: 24, y: 0, radius: 0, curve: "none", index: 0 },
                    { x: 84, y: 0, radius: 0, curve: "none", index: 1 },
                ]
            },
            {
                type: "window",
                code: "1020-kearny-02-window02",
                label: "window",
                origin: {x: 0, y: 0},
                outline: [
                    { x: 276, y: 0, radius: 0, curve: "none", index: 0 },
                    { x: 318, y: 0, radius: 0, curve: "none", index: 1 },
                ]
            },
            {
                type: "window",
                code: "1020-kearny-02-window03",
                label: "window",
                origin: {x: 0, y: 0},
                outline: [
                    { x: 274, y: 214, radius: 0, curve: "none", index: 0 },
                    { x: 256, y: 214, radius: 0, curve: "none", index: 1 },
                ]
            },
            {
                type: "window",
                code: "1020-kearny-02-window04",
                label: "window",
                origin: {x: 0, y: 0},
                outline: [
                    { x: 248, y: 214, radius: 0, curve: "none", index: 0 },
                    { x: 228, y: 214, radius: 0, curve: "none", index: 1 },
                ]
            },
            {
                type: "window",
                code: "1020-kearny-02-window05",
                label: "window",
                origin: {x: 0, y: 0},
                outline: [
                    { x: 160, y: 214, radius: 0, curve: "none", index: 0 },
                    { x: 130, y: 214, radius: 0, curve: "none", index: 1 },
                ]
            },
            {
                type: "window",
                code: "1020-kearny-02-window06",
                label: "window",
                origin: {x: 0, y: 0},
                outline: [
                    { x: 64, y: 214, radius: 0, curve: "none", index: 0 },
                    { x: 36, y: 214, radius: 0, curve: "none", index: 1 },
                ]
            }
        ],
    },
    rooms: [
        {
            unit: {
                name: "Jazz Room",
                code: "kearny-floor02-room01",
                rate: 2000,
                number: 1,
                scale: 1,
                origin: {x: 94, y: 0}
            },
            outline: [
                { x: 0, y: 0, radius: 0, curve: "none", index: 0 },
                { x: 94, y: 0, radius: 0, curve: "none", index: 1 },
                { x: 94, y: 116, radius: 0, curve: "none", index: 2 },
                { x: 0, y: 116, radius: 0, curve: "none", index: 3 },
            ],
            features: [
                {
                    type: "window",
                    code: "kearny-floor02-room01-window01",
                    label: "window",
                    origin: {x: 94, y: 0},
                    outline: [
                        { x: 8, y: 0, radius: 0, curve: "none", index: 0 },
                        { x: 68, y: 0, radius: 0, curve: "none", index: 1 }
                    ]
                },
                {
                    type: "slidingDoor",
                    code: "kearny-floor02-room01-slidingDoor01",
                    label: "sliding door",
                    origin: {x: 94, y: 0},
                    outline: [
                        { x: 0, y: 90, index: 0 },
                        { x: 0, y: 60, index: 1 },
                        { x: 0, y: 112, index: 2 }
                    ]
                },
                {
                    type: "slidingDoor",
                    code: "kearny-floor02-room01-slidingDoor02",
                    label: "sliding door",
                    origin: {x: 94, y: 0},
                    outline: [
                        { x: 36, y: 116, index: 0 },
                        { x: 55, y: 116, index: 1 },
                        { x: 4, y: 116, index: 2 }
                    ]
                }
            ]
        },
        {
            unit: {
                name: "Mars Room",
                code: "kearny-floor02-room02",
                rate: 2000,
                number: 1,
                scale: 1,
                origin: {x: 192, y: 0}
            },
            outline: [
                { x: 0, y: 0, radius: 0, curve: "none", index: 0 },
                { x: 70, y: 0, radius: 0, curve: "none", index: 1 },
                { x: 70, y: 70, radius: 0, curve: "none", index: 2 },
                { x: 0, y: 70, radius: 0, curve: "none", index: 3 },
            ],
            features: [
                {
                    type: "window",
                    code: "kearny-floor02-room02-window01",
                    label: "window",
                    origin: {x: 192, y: 0},
                    outline: [
                        { x: 22, y: 0, radius: 0, curve: "none", index: 0 },
                        { x: 62, y: 0, radius: 0, curve: "none", index: 1 }
                    ]
                },
                {
                    type: "slidingDoor",
                    code: "kearny-floor02-room02-slidingDoor01",
                    label: "sliding door",
                    origin: {x: 192, y: 0},
                    outline: [
                        { x: 70, y: 44, index: 0 },
                        { x: 70, y: 24, index: 1 },
                        { x: 70, y: 68, index: 2 }
                    ]
                }
            ]
        },
        {
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
                    origin: {x: 310, y: 124},
                    clockwise: false,
                    outline: [
                        { x: 0, y: 36, index: 0 },
                        { x: 0, y: 12, index: 1 },
                    ]
                }
            ]
        }
    ]
};
