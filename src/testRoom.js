export var testRoom = {
    unit: {
        name: "room-01",
        code: "mission-room-01",
        rate: 2100,
        number: 1,
        scale: 1
    },
    room: {
        outline: [
            { x: 10, y: 10, radius: 0, curve: "none", index: 0 },
            { x: 210, y: 10, radius: 0, curve: "none", index: 1 },
            { x: 280, y: 100, radius: 100, curve: "concave", index: 2 },
            { x: 280, y: 180, radius: 0, curve: "none", index: 3 },
            { x: 310, y: 220, radius: 50, curve: "convex", index: 4 },
            { x: 380, y: 220, radius: 0, curve: "none", index: 5 },
            { x: 380, y: 280, radius: 0, curve: "none", index: 6 },
            { x: 10, y: 280, radius: 0, curve: "none", index: 7 },
        ]
    },
    features: {
        windows: [
            {
                type: "window",
                code: "room-01-window01",
                label: "window",
                outline: [
                    { x: 10, y: 30, radius: 0, curve: "none", index: 0 },
                    { x: 10, y: 100, radius: 0, curve: "none", index: 1 }
                ]
            },
            {
                type: "window",
                code: "room-01-window02",
                label: "window",
                outline: [
                    { x: 10, y: 150, radius: 0, curve: "none", index: 0 },
                    { x: 10, y: 260, radius: 0, curve: "none", index: 1 }
                ]
            }
        ],
        doors: [
            {
                type: "door",
                code: "room-01-door01",
                label: "door",
                angleDegrees: 45,
                clockwise: false,
                outline: [
                    { x: 380, y: 230, radius: 0, curve: "none", index: 0 },
                    { x: 380, y: 270, radius: 0, curve: "none", index: 1 },
                ]
            },
            {
                type: "door",
                label: "door-room-02",
                angleDegrees: 30,
                clockwise: true,
                outline: [
                    { x: 140, y: 10, index: 0 },
                    { x: 180, y: 10, index: 1 },
                ]
            },
            {
                type: "door",
                label: "door-room-03",
                angleDegrees: 45,
                clockwise: true,
                outline: [
                    { x: 110, y: 130, index: 0 },
                    { x: 110, y: 90, index: 1 },
                ]
            },
            {
                type: "door",
                label: "door-room-04",
                clockwise: false,
                outline: [
                    { x: 80, y: 130, index: 0 },
                    { x: 40, y: 130, index: 1 },
                ]
            }
        ],
        slidingDoors: [
            {
                type: "slidingDoor",
                code: "room-01-slidingDoor01",
                label: "sliding door",
                outline: [
                    { x: 220, y: 230, index: 0},
                    { x: 220, y: 180, index: 1},
                    { x: 220, y: 130, index: 2}
                ]
            }
        ],
        interiorWalls: [
            {
                type: "interiorWall",
                code: "room-01-interiorWall01",
                label: "interior wall",
                outline: [
                    { x: 220, y: 180, radius: 0, curve: "none", index: 0 },
                    { x: 220, y: 280, radius: 0, curve: "none", index: 1 },
                ]
            },
            {
                type: "interiorWall",
                code: "room-01-interiorWall02",
                label: "interior wall",
                outline: [
                    { x: 10, y: 130, radius: 0, curve: "none", index: 0 },
                    { x: 220, y: 130, radius: 0, curve: "none", index: 1 },
                ]
            },
            {
                type: "interiorWall",
                code: "room-01-interiorWall03",
                label: "interior wall",
                outline: [
                    { x: 110, y: 10, index: 0 },
                    { x: 110, y: 90, index: 1 }
                ]
            }
        ],
        furniture: {
            beds:[
                {
                    type: "queen",
                    code: "room-01-bed01",
                    label: "Queen Bed",
                    outline: [
                        { x: 30, y: 270, index: 0 },
                        { x: 30, y: 210, index: 1 },
                        { x: 110, y: 210, index: 2 },
                        { x: 110, y: 270, index: 3 }
                    ]
                }
            ],
            dressers: [
                {
                    type: "dresser",
                    code: "room-01-dresser01",
                    label: "Dresser",
                    outline: [
                        { x: 90, y: 170, index: 0 },
                        { x: 90, y: 140, index: 1 },
                        { x: 180, y: 140, index: 2 },
                        { x: 180, y: 170, index: 3 }
                    ]
                }
            ],
            nightTables: [
                {
                    type: "nightTable",
                    code: "room-01-nightTable01",
                    label: "NightTable",
                    outline: [
                        { x: 30, y: 175, index: 0 },
                        { x: 30, y: 205, index: 0 },
                        { x: 60, y: 205, index: 0 },
                        { x: 60, y: 175, index: 1 }
                    ]
                }
            ]
        }
    }
};
