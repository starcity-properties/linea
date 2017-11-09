import registerServiceWorker from './registerServiceWorker';
import Snap from 'snapsvg-cjs';
import './index.css';
import {style} from './styles.js';

// console.log(style);

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
                outline: [
                    { x: 380, y: 230, radius: 0, curve: "none", index: 0 },
                    { x: 380, y: 270, radius: 0, curve: "none", index: 1 },
                    // { x: 340, y: 230, radius: 40, curve: "concave", index: 2 }
                    // we might need to math the radius for the door by calculating the distance between p1 and p2
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
            }
        ]
    }
}

class Floorplan {
    constructor(id, minX, minY, x, y) {
        // Create Snap with ID associated with HTML SVG. e.g. <svg id="svg">
        this.paper = Snap(id);

        // Creates a responsive viewBox of dimensions x and y, with optional minX and minY
        // Separate function for making the string to pass into viewBox?
        this.paper.attr({ viewBox: minX + " " + minY + " " + x + " " + y });
        this.minX = minX;
        this.minY = minY;
        this.maxX = x;
        this.maxY = y;

        // Initialize major grid lines
        this.majorGrid = [];

        // Initialize minor grid lines
        this.minorGrid = [];

        // Initialize walls
        this.wall = [];

        // Initialize interiorWalls
        this.interiorWalls = [];

        // Initialize windows
        this.windows = [];

        // Initialize door
        this.doors = [];

        // Initialize slidingDoors
        this.slidingDoors = [];

        // Initialize other features??
        this.furniture = [];
    }

    // Function to create the string to draw path
    compilePath(points, closed) {
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
        if (closed) {
            path.push("Z");
        }

        // make a string out of path
        return (path.join(" "));
    }

    drawRoomOutline(points, id, style) {
        // compilePath() takes points and makes the string to pass into path?
        this.wall = this.paper.path(this.compilePath(points, true));

        // give style to shape and assign id to object
        this.wall.attr(style);
        this.wall.id = id;
    }

    // takes outline object and created array of points to be fed into polyline draw
    lineArrayGenerator(outline) {
        var linePoints = [];

        outline.forEach((point) => {
            linePoints.push(point.x, point.y);
        });
        return linePoints;
    }

    drawLine(points, style) {
        return(this.paper.polyline(points).attr(style));
    }

    drawWindow(window, style) {
        var points = this.lineArrayGenerator(window.outline);
        this.windows.push(this.drawLine(points, style));
    }

    drawWindows(windows, style) {
        windows.forEach((window, index) => {
            this.drawWindow(window, style);
            this.windows[index].id = window.code;
        });
    }

    drawInteriorWall(wall, style) {
        var points = this.lineArrayGenerator(wall.outline);
        this.interiorWalls.push(this.drawLine(points, style));
    }

    drawInteriorWalls(walls, style) {
        walls.forEach((wall, index) => {
            this.drawInteriorWall(wall, style);
            this.interiorWalls[index].id = wall.code;
        });
    }

    drawRoom(room) {
        // TODO: draw room outline
        // this.drawRoomOutline(room.room.outline, room.unit.code, "#f4e4d7", "black", 8);
        this.drawRoomOutline(room.room.outline, room.unit.code, style.roomOutline.default);

        // TODO: draw inside walls
        // this.drawInteriorWalls(room.features.interiorWalls, "black", 8);
        this.drawInteriorWalls(room.features.interiorWalls, style.interiorWalls.default);

        // TODO: draw windows
        this.drawWindows(room.features.windows, style.windowStyle.default);

        // TODO: draw door
        // console.log(room.features.door);
        // this.drawDoors(room.features.doors, "pink", 3);

        // TODO: draw sliding doors
        this.drawSlidingDoors(room.features.slidingDoors, style.doorStyle);

        // TODO: draw furniture
    }

    update(feature, id, attrObject) {
        // TODO: updating outline or features. Events, moving furniture around, etc
        // what if the feature only has one item?? ie it's not an array...
        feature.forEach((item) => {
            if (item.id === id) {
                console.log("updating");
                item.attr(attrObject);
            }
        });
    }

    addFeature() {

    }

    removeFeature() {

    }

    drawSlidingDoor(slidingDoor, style) {
        var slidingDoorLines = [];
        var doorSegment= [];
        var dottedSegment = [];
        doorSegment.push(slidingDoor.outline[0], slidingDoor.outline[1]);
        dottedSegment.push(slidingDoor.outline[1], slidingDoor.outline[2]);
        slidingDoorLines.push(
            this.drawLine(this.lineArrayGenerator(doorSegment), style.door.default),
            this.drawLine(this.lineArrayGenerator(dottedSegment), style.projection.default)
        );
        this.slidingDoors.push(slidingDoorLines);
    }

    drawSlidingDoors(slidingDoors, style) {
        slidingDoors.forEach((item, index) => {
            this.drawSlidingDoor(item, style);
            this.slidingDoors[index].id = item.code;
        });
    }

    lineLength(linePoints) {
        var xs = 0;
        var ys = 0;

        xs = linePoints[0] - linePoints[2];
        xs = xs * xs;

        ys = linePoints[1] - linePoints[3];
        ys = ys * ys;

        return Math.sqrt( xs + ys );
    }

    drawDoor(door, strokeColor, strokeWidth) {
        var doorLines = [];
        var doorPoints = this.lineArrayGenerator(door.outline);
        var radius = this.lineLength(doorPoints);
    }

    drawDoors(doors, strokeColor, strokeWidth) {
        doors.forEach((door) => {
            this.drawDoor(door, strokeColor, strokeWidth);
        });
    }

    drawGrid(unitLength) {
        var xMax = this.maxX / unitLength;
        var yMax = this.maxY / unitLength;
        for(var i = 0; i < yMax - 1; i++) {
            var horizontalLines = {
                outline:  [
                    {
                        x: 10,
                        y: 10 + i * unitLength
                    },
                    {
                        x: (xMax * unitLength) - 10,
                        y: 10 + i * unitLength
                    }
                ]};
            if (i % 5 === 0) {
                this.majorGrid.push(this.drawLine(this.lineArrayGenerator(horizontalLines.outline), {stroke: "#cccccc", strokeWidth: 1}));
            } else {
                this.minorGrid.push(this.drawLine(this.lineArrayGenerator(horizontalLines.outline), {stroke: "#eaeaea", strokeWidth: 1}));
            }
        }
        for(var j = 0; j < xMax - 1; j++) {
            var verticalLines = {
                outline:  [
                    {
                        x: 10 + j * unitLength,
                        y: 10
                    },
                    {
                        x: 10 + j * unitLength,
                        y: (yMax * unitLength) - 10
                    }
                ]};
            if (j % 5 === 0) {
                this.majorGrid.push(this.drawLine(this.lineArrayGenerator(verticalLines.outline), {stroke: "#ccc", strokeWidth: 1}));
            } else {
                this.minorGrid.push(this.drawLine(this.lineArrayGenerator(verticalLines.outline), {stroke: "#eaeaea", strokeWidth: 1}));
            }
        }
    }
}


var roomRender = new Floorplan("#svg", 0, 0, 600, 600);
roomRender.drawGrid(10);
roomRender.drawRoom(roomData);

// console.log(roomRender);
// console.log(roomRender.windows);
// console.log(roomRender.slidingDoors);

setTimeout(function() {
    roomRender.update(roomRender.windows, roomRender.windows[0].id, style.windowStyle.open);
}, 5000);

registerServiceWorker();
