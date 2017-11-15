export var ellisTwo = {
    unit: {
        name: "room-01",
        code: "mission-room-01",
        rate: 2100,
        number: 1
    },
    room: {
        outline: [
            { x: 10, y: 10, radius: 0, curve: "none", index: 0 },
            { x: 228, y: 10, radius: 0, curve: "none", index: 1 },
            { x: 228, y: 220, radius: 0, curve: "none", index: 2 },
            { x: 250, y: 220, radius: 0, curve: "none", index: 3 },
            { x: 250, y: 416, radius: 0, curve: "none", index: 4 },
            { x: 30, y: 416, radius: 0, curve: "none", index: 5 },
            { x: 30, y: 208, radius: 0, curve: "none", index: 6 },
            { x: 10, y: 208, radius: 0, curve: "none", index: 7 },
        ]
    },
    features: {
        windows: [
            {
                type: "window",
                code: "room-01-window01",
                label: "window",
                outline: [
                    { x: 147, y: 416, radius: 0, curve: "none", index: 0 },
                    { x: 218, y: 416, radius: 0, curve: "none", index: 1 }
                ]
            },
        ],
        doors: [
            {
                type: "door",
                code: "room-01-door01",
                label: "door",
                clockwise: false,
                outline: [
                    { x: 213, y: 10, radius: 0, curve: "none", index: 0 },
                    { x: 146, y: 10, radius: 0, curve: "none", index: 1 },
                    { x: 213, y: 107, radius: 40, curve: "concave", index: 2 }
                ]
            },
        ],
        slidingDoors: [
            {
                type: "slidingDoor",
                code: "room-01-slidingDoor01",
                label: "sliding door",
                outline: [
                    { x: 91, y: 98, index: 0},
                    { x: 91, y: 167, index: 1},
                    { x: 91, y: 41, index: 2}
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
                    { x: 91, y: 41, radius: 0, curve: "none", index: 1 },
                ]
            },
            {
                type: "interiorWall",
                code: "room-01-interiorWall02",
                label: "interior wall",
                outline: [
                    { x: 91, y: 110, radius: 0, curve: "none", index: 0 },
                    { x: 91, y: 208, radius: 0, curve: "none", index: 1 },
                ]
            },
            {
                type: "interiorWall",
                code: "room-01-interiorWall03",
                label: "interior wall",
                outline: [
                    { x: 91, y: 208, radius: 0, curve: "none", index: 0 },
                    { x: 30, y: 208, radius: 0, curve: "none", index: 1 },
                ]
            }
        ]
    }
}
