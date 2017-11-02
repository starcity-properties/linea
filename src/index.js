import Snap from 'snapsvg';

// console.log("TEST");

// console.log("room information: ");

var room = {
    unit: {
        name: "room-01",
        code: "mission-room-01",
        rate: 2100,
        number: 1
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
    features: [
        {
            type: "window",
            label: "window01-room-01",
            outline: [
                { x: 10, y: 30, radius: 0, curve: "none", index: 0 },
                { x: 10, y: 100, radius: 0, curve: "none", index: 1 }
            ]
        },
        {
            type: "window",
            label: "window02-room-01",
            outline: [
                { x: 10, y: 150, radius: 0, curve: "none", index: 0 },
                { x: 10, y: 260, radius: 0, curve: "none", index: 1 }
            ]
        },
        {
            type: "door",
            label: "door-room-01",
            outline: [
                { x: 380, y: 230, radius: 0, curve: "none", index: 0 },
                { x: 380, y: 270, radius: 0, curve: "none", index: 1 },
                { x: 340, y: 230, radius: 40, curve: "none", index: 2 }
                // we might need to math the radius for the door by calculating the distance between p1 and p2
            ]
        }
    ]
}


// console.log(room);

var elem = (document.compatMode === "CSS1Compat") ? 
    document.documentElement :
    document.body;

var windowHeight = elem.clientHeight;
var windowWidth = elem.clientWidth;

console.log("height: " + windowHeight);
console.log("width " + windowWidth);

class Floorplan {
    constructor(id, minX, minY, x, y) {
        // Create Snap with ID associated with HTML SVG. e.g. <svg id="svg">
        this.paper = Snap(id);
        // Creates a responsive viewBox of dimensions x and y, with optional minX and minY
        this.paper.attr({ viewBox: minX + " " + minY + " " + x + " " + y });
        this.paper.attr({ border: "solid 1px lightgrey" });
        this.paper.attr({ padding: "10px" });
       // this.circle = this.paper.circle(90,120,80);
    }

    drawCircle(x, y, z) {
        console.log(x + " " + y + " "+ z);
        this.paper.circle(x, y, z).attr({
            fill: "black"
        });
    }
}


var newData = new Floorplan("#svg", 1000, 800, 600, 400);
//var newData = new Floorplan("#svg", windowWidth, windowHeight, 600, 400);
newData.drawCircle(90, 120, 80);
