export var kearnyFloor2Room2 = {
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
            outline: [
                { x: 22, y: 0, radius: 0, curve: "none", index: 0 },
                { x: 62, y: 0, radius: 0, curve: "none", index: 1 }
            ]
        },
        {
            type: "slidingDoor",
            code: "kearny-floor02-room02-slidingDoor01",
            label: "sliding door",
            outline: [
                { x: 70, y: 44, index: 0 },
                { x: 70, y: 24, index: 1 },
                { x: 70, y: 68, index: 2 }
            ]
        }
    ]
};
