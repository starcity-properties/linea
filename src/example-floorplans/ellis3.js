export var ellisThree = {
    unit: {
        name: "room-01",
        code: "mission-room-01",
        rate: 2100,
        number: 1
    },
    room: {
        outline: [
            { x: 10, y: 10, radius: 0, curve: "none", index: 0 },
            { x: 290, y: 10, radius: 0, curve: "none", index: 1 },
            { x: 290, y: 134, radius: 0, curve: "none", index: 2 },
            { x: 510, y: 134, radius: 0, curve: "none", index: 3 },
            { x: 510, y: 417, radius: 0, curve: "none", index: 4 },
            { x: 264, y: 417, radius: 0, curve: "none", index: 5 },
            { x: 264, y: 318, radius: 0, curve: "none", index: 6 },
            { x: 281, y: 318, radius: 0, curve: "none", index: 6 },
            { x: 281, y: 219, radius: 0, curve: "none", index: 7 },
            { x: 170, y: 219, radius: 0, curve: "none", index: 7 },
            { x: 170, y: 183, radius: 0, curve: "none", index: 7 },
            { x: 91, y: 183, radius: 0, curve: "none", index: 7 },
            { x: 91, y: 219, radius: 0, curve: "none", index: 7 },
            { x: 10, y: 219, radius: 0, curve: "none", index: 7 },
        ]
    },
    features: {
        windows: [
            {
                type: "window",
                code: "room-01-window01",
                label: "window",
                outline: [
                    { x: 275, y: 417, radius: 0, curve: "none", index: 0 },
                    { x: 347, y: 417, radius: 0, curve: "none", index: 1 }
                ]
            },
        ],
        doors: [
            {
                type: "door",
                code: "room-01-door01",
                label: "door",
                clockwise: true,
                outline: [
                    { x: 112, y: 10, radius: 0, curve: "none", index: 0 },
                    { x: 180, y: 10, radius: 0, curve: "none", index: 1 },
                    { x: 112, y: 78, radius: 0, curve: "none", index: 2 }
                ]
            },
            {
                type: "door",
                label: "door-room-02",
                clockwise: false,
                outline: [
                    { x: 455, y: 417, index: 0 },
                    { x: 387, y: 417, index: 1 },
                    { x: 455, y: 475, index: 2 }
                ]
            },
            {
                type: "door",
                label: "door-room-03",
                clockwise: false,
                outline: [
                    { x: 264, y: 219, index: 0 },
                    { x: 193, y: 219, index: 1 },
                    { x: 264, y: 282, index: 2 }
                ]
            },
        ],
        slidingDoors: [
            {
                type: "slidingDoor",
                code: "room-01-slidingDoor01",
                label: "sliding door",
                outline: [
                    { x: 90, y: 129, index: 0},
                    { x: 90, y: 197, index: 1},
                    { x: 90, y: 71, index: 2}
                ]
            },
            {
                type: "slidingDoor",
                code: "room-01-slidingDoor02",
                label: "sliding door",
                outline: [
                    { x: 281, y: 205, index: 0},
                    { x: 281, y: 273, index: 1},
                    { x: 281, y: 139, index: 2}
                ]
            }
        ],
        interiorWalls: [
            {
                type: "interiorWall",
                code: "room-01-interiorWall01",
                label: "interior wall",
                outline: [
                    { x: 91, y: 10, radius: 0, curve: "none", index: 0 },
                    { x: 91, y: 71, radius: 0, curve: "none", index: 1 },
                ]
            },
            {
                type: "interiorWall",
                code: "room-01-interiorWall02",
                label: "interior wall",
                outline: [
                    { x: 250, y: 134, radius: 0, curve: "none", index: 0 },
                    { x: 290, y: 134, radius: 0, curve: "none", index: 1 },
                ]
            }
        ]
    }
}
