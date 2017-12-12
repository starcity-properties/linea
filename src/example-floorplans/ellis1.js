export var ellisOne = {
    unit: {
        name: "room-01",
        code: "ellis-room-01",
        rate: 2100,
        number: 1
    },
    room: {
        // outline: [
        //     { x: 10, y: 10, radius: 0, curve: "none", index: 0 },
        //     { x: 152, y: 10, radius: 0, curve: "none", index: 1 },
        //     { x: 233, y: 123, radius: 0, curve: "none", index: 2 },
        //     { x: 233, y: 257, radius: 0, curve: "none", index: 3 },
        //     { x: 10, y: 257, radius: 0, curve: "none", index: 4 },
        // ]
        outline: [
            { x: 50, y: 10, radius: 0, curve: "none", index: 0 },
            { x: 152, y: 10, radius: 0, curve: "none", index: 1 },
            { x: 233, y: 90, radius: 0, curve: "none", index: 2 },
            { x: 233, y: 180, radius: 0, curve: "none", index: 3 },
            { x: 180, y: 257, radius: 0, curve: "none", index: 3 },
            { x: 100, y: 257, radius: 0, curve: "none", index: 3 },
            { x: 10, y: 180, radius: 0, curve: "none", index: 3 },
            { x: 10, y: 80, radius: 0, curve: "none", index: 4 },
        ]
    },
    features: {
        windows: [
            {
                type: "window",
                code: "room-01-window01",
                label: "window",
                outline: [
                    { x: 161, y: 257, radius: 0, curve: "none", index: 0 },
                    { x: 226, y: 257, radius: 0, curve: "none", index: 1 }
                ]
            },
        ],
        doors: [
            {
                type: "door",
                label: "door-room-02",
                clockwise: false,
                outline: [
                    { x: 223.5, y: 110.5, index: 0 },
                    { x: 183.5, y: 55.5, index: 1 },
                    { x: 167.306, y: 142, index: 2 }
                ]
            },
            {
                type: "door",
                label: "door-room-03",
                clockwise: true,
                outline: [
                    { x: 69.5, y: 257, index: 0 },
                    { x: 136.5, y: 257, index: 1 },
                    { x: 72.5, y: 318.5, index: 2 }
                ]
            },
        ],
        slidingDoors: [
        ],
        interiorWalls: [
        ]
    }
}
