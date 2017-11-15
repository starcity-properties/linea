// Styles to be used in rendering our floorplans

export var style = {
    roomOutline: {
        default: {
            stroke: "#000000",
            strokeWidth: 8,
            fill: "#f4e4d7",
            fillOpacity: .5
        },
    },
    interiorWalls: {
        default: {
            stroke: "#000000",
            strokeWidth: 8,
            fill: "#f4e4d7",
            fillOpacity: 1
        },
    },
    windowStyle: {
        default: {
            stroke: "#f9f9f9",
            strokeWidth: 6,
            fill: "none",
            fillOpacity: 1
        },
        open: {
            stroke: "yellow",
            strokeWidth: 6,
            fill: "none",
            fillOpacity: 1
        }
    },
    doorStyle: {
        door: {
            default: {
                stroke: "#c1272d",
                strokeWidth: 6,
                fill: "none",
                fillOpacity: 1
            },
            open: {
                stroke: "#ff00ff",
                strokeWidth: 6,
                fill: "none",
                fillOpacity: 1
            }
        },
        projection: {
            default: {
                stroke: "#c1272d",
                strokeWidth: 3,
                fill: "none",
                fillOpacity: 1,
                strokeDasharray: "4 8",
                strokeLinecap: "round"
            },
            open :{
                stroke: "#ff00ff",
                strokeWidth: 3,
                fill: "none",
                fillOpacity: 1,
                strokeDasharray: "0",
                strokeLinecap: "round"
            }
        }
    }
}



