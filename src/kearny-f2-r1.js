export var kearnyFloor2Room1 = {
    unit: {
        name: "Jazz Room",
        code: "kearny-floor02-room01",
        rate: 2000,
        number: 1,
        scale: 1,
        origin: {x: 94, y: 0}
    },
    room: {
        outline: [
            { x: 0, y: 0, radius: 0, curve: "none", index: 0 },
            { x: 94, y: 0, radius: 0, curve: "none", index: 1 },
            { x: 94, y: 116, radius: 0, curve: "none", index: 2 },
            { x: 0, y: 116, radius: 0, curve: "none", index: 3 },
        ]
    },
    features: {
        windows: [
            {
                type: "window",
                code: "kearny-floor02-room01-window01",
                label: "window",
                outline: [
                    { x: 8, y: 0, radius: 0, curve: "none", index: 0 },
                    { x: 68, y: 0, radius: 0, curve: "none", index: 1 }
                ]
            }
        ],
        slidingDoors: [
            {
                type: "slidingDoor",
                code: "kearny-floor02-room01-slidingDoor01",
                label: "sliding door",
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
                outline: [
                    { x: 36, y: 116, index: 0 },
                    { x: 55, y: 116, index: 1 },
                    { x: 4, y: 116, index: 2 }
                ]
            }
        ]
    }
};
