import registerServiceWorker from './registerServiceWorker';
import Snap from 'snapsvg-cjs';
// const Snap = window.Snap;

// import Snap from 'snapsvg';

// console.log("TEST");

// console.log("room information: ");

var roomData = {
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
    features: {
        windows: [
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
            }
        ],
        door: [
            {
                type: "door",
                label: "door-room-01",
                outline: [
                    { x: 380, y: 230, radius: 0, curve: "none", index: 0 },
                    { x: 380, y: 270, radius: 0, curve: "none", index: 1 },
                    { x: 340, y: 230, radius: 40, curve: "concave", index: 2 }
                    // we might need to math the radius for the door by calculating the distance between p1 and p2
                ]
            }
        ],
        interiorWalls: [
            {
                type: "interiorWall",
                label: "interior-room-01",
                outline: [
                    { x: 220, y: 210, radius: 0, curve: "none", index: 0 },
                    { x: 220, y: 280, radius: 0, curve: "none", index: 1 },
                ]
            }
        ]
    }
}


// Code to get viewport dimensions
var elem = (document.compatMode === "CSS1Compat") ? 
    document.documentElement :
    document.body;

var windowHeight = elem.clientHeight;
var windowWidth = elem.clientWidth;

// Floorplan class starts here
class Floorplan {
    constructor(id, minX, minY, x, y) {
        // Create Snap with ID associated with HTML SVG. e.g. <svg id="svg">
        this.paper = Snap(id);

        // Creates a responsive viewBox of dimensions x and y, with optional minX and minY
        // Separate function for making the string to pass into viewBox?
        this.paper.attr({ viewBox: minX + " " + minY + " " + x + " " + y });

        // Initialize walls
        this.wall = [];

        // Initialize windows
        this.windows = [];

        // Initialize door
        this.doors = [];
        this.slidingDoors = [];

        // Initialize other features??
        this.interiorWalls = [];
        this.furniture = [];
    }

    // Function to create the string to draw path
    compilePath(points, closePath) {
        // console.log(points);
        var path = [];

        // Iterates through each point object to create path
        // M starts a path
        // A indicates an arc. Uses: xRadius, yRadius, rotation, arc-flag, sweep-flag, endX, endY.
        // L indicate a straight line to (x, y)
        // Z closes the shape of the path
        points.forEach((point, index) => {
            if (index === 0)
                path.push("M", point.x, point.y);
            else if (point.radius > 0 && point.curve === "concave")
                path.push("A", point.radius, point.radius, 0, 0, 1, point.x, point.y);
            else if (point.radius > 0 && point.curve === "convex")
                path.push("A", point.radius, point.radius, 0, 0, 0, point.x, point.y);
            else
                path.push("L", point.x, point.y);
        });
        if (closePath)
            path.push("Z");

        // make a string out of path
        return (path.join(" "));
    }

    drawRoomOutline(points, fill, strokeColor, strokeWidth) {
        // compilePath() takes points and makes the string to pass into path? 
        this.wall = this.paper.path(this.compilePath(points, 1));

        // give style to shape
        this.wall.attr({
            fill: fill,
            stroke: strokeColor,
            strokeWidth: strokeWidth
        });
    }

    // takes outline object and created array of points to be fed into polyline draw 
    lineArrayGenerator(outline) {
        var linePoints = [];

        outline.forEach((point) => {
            linePoints.push(point.x, point.y);
        });

        return linePoints;
    }

    // takes array of points, strokeColor and strokeWidth to draw a polyline. Minimum of on segment.
    drawLine(points, strokeColor, strokeWidth) {
        this.windows.push(this.paper.polyline(points).attr({
            stroke: strokeColor,
            strokeWidth: strokeWidth
        }));
    }

    drawWindows(windows, strokeColor, strokeWidth) {
        windows.forEach((window) => {
            var points = this.lineArrayGenerator(window.outline);
            this.drawLine(points, strokeColor, strokeWidth);
        });
    }

    drawInteriorWalls(walls, strokeColor, strokeWidth) {
        walls.forEach((wall) => {
            var points = this.lineArrayGenerator(wall.outline);
            this.drawLine(points, strokeColor, strokeWidth);
        });
    }

    drawDoors(doors, strokeColor, strokeWidth) {
        doors.forEach((door) => {
            this.drawLine(door, strokeColor, strokeWidth);
        });
    }

    drawRoom(room) {
        // TODO: draw room outline
        this.drawRoomOutline(room.room.outline, "#efe3e6", "black", 7);

        // TODO: draw inside walls
        this.drawInteriorWalls(room.features.interiorWalls, "black", 7);

        // TODO: draw windows
        this.drawWindows(room.features.windows, "#f9f9f9", 4);

        // TODO: draw door
        console.log(room.features.door);
        this.drawRoomOutline(room.features.door[0].outline, "none", "red", 4);

        // TODO: draw sliding doors

        // TODO: draw furniture
    }

    update() {
        // TODO: updating outline or features. Events, moving furniture around, etc
    }

    addFeature() {
        
    }

    removeFeature() {
        
    }
}


var roomRender = new Floorplan("#svg", 0, 0, windowWidth, windowHeight);
roomRender.drawRoom(roomData);


// drawCircle(x, y, z) {
//     console.log(x + " " + y + " "+ z);
//     this.paper.circle(x, y, z).attr({
//         stroke: "black",
//         strokeWidth: 3,
//         fill: "black"
//     });
// }
