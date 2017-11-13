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
                clockwise: false,
                outline: [
                    { x: 350, y: 230, radius: 0, curve: "none", index: 0 },
                    { x: 380, y: 270, radius: 0, curve: "none", index: 1 },
                    { x: 430, y: 80, radius: 40, curve: "concave", index: 2 }
                ]
            },
            {
                type: "door",
                label: "door-room-02",
                clockwise: false,
                outline: [
                    { x: 110, y: 130, index: 0 },
                    { x: 150, y: 130, index: 1 },
                    { x: 130, y: 100, index: 2 }
                ]
            },
            {
                type: "door",
                label: "door-room-03",
                clockwise: false,
                outline: [
                    { x: 110, y: 130, index: 0 },
                    { x: 110, y: 90, index: 1 },
                    { x: 90, y: 80, index: 2 }
                ]
            },
            {
                type: "door",
                label: "door-room-04",
                clockwise: false,
                outline: [
                    { x: 110, y: 130, index: 0 },
                    { x: 70, y: 130, index: 1 },
                    { x: 90, y: 170, index: 2 }
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
        this.wall = this.paper.path(this.compilePath(points, closed));

        // give style to shape and assign id to object
        this.wall.attr(style);
        this.wall.id = id;
    }

    pointArrayGenerator(point) {
        var pointArray = [];

        pointArray.push(point.x, point.y);
        return (pointArray);
    }

    // takes outline object and created array of points to be fed into polyline draw
    lineArrayGenerator(outline) {
        var linePoints = [];

        outline.forEach((point) => {
            linePoints.push(this.pointArrayGenerator(point));
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
        var xLength= 0;
        var yLength= 0;
        xLength= linePoints[0].x - linePoints[1].x;
        xLength= xLength * xLength;

        yLength= linePoints[0].y - linePoints[1].y;
        yLength= yLength * yLength;

        return Math.sqrt( xLength + yLength );
    }

    testDoorSide(door) {
        return (
            (door[1].x - door[0].x) * (door[2].y - door[0].y)
                - ((door[1].y - door[0].y) * (door[2].x - door[0].x))
        );
    }

    /*
     testCoordinateZone(centerPoint, endPoint, direction) {
        if (centerPoint.x - endPoint.x > 0) {
            if (centerPoint.y - endPoint.y > 0) {
                return(1);
            } else {
                return(3);
            }
        } else {
            if (centerPoint.y - endPoint.y > 0) {
                return(2);
            } else {
                return(4);
            }
        }
    }
    */

    doorCoord(centerPoint, endPoint, direction, axis) {
        if (centerPoint.x - endPoint.x > 0) {
            if (centerPoint.y - endPoint.y > 0) { // Door Zone 1
                if (direction === "concave") { // Clockwise
                    if (axis === "x") {
                        return (1);
                    } else {
                        return (-1);
                    }
                } else { // Counter-Clockwise
                    if (axis === "x") {
                        return (-1);
                    } else {
                        return (1);
                    }
                }
            } else { // Door is in Zone 3
                if (direction === "concave") { // Clockwise
                    if (axis === "x") {
                        return (-1);
                    } else {
                        return (-1);
                    }
                } else { // Counter-Clockwise
                    if (axis === "x") {
                        return (1);
                    } else {
                        return (1);
                    }
                }
            }
        } else {
            if (centerPoint.y - endPoint.y > 0) { // Door is in Zone 2
                if (direction === "concave") { // Clockwise
                    if (axis === "x") {
                        return (1);
                    } else {
                        return (1);
                    }
                } else { // Counter-Clockwise
                    if (axis === "x") {
                        return (-1);
                    } else {
                        return (-1);
                    }
                }
            } else { // Door is in Zone 4
                if (direction === "concave") { // Clockwise
                    if (axis === "x") {
                        return (-1);
                    } else {
                        return (1);
                    }
                } else { // Counter-Clockwise
                    if (axis === "x") {
                        return (1);
                    } else {
                        return (-1);
                    }
                }
            }
        }
    }

    drawDoor(door, strokeColor, strokeWidth) {
        // Initialize Values
        var doorLines = [];
        var doorLine = [];
        var doorCurve = [];
        var curve = door.clockwise ? "concave" : "convex";
        var hingePoint = door.outline[0];
        var endPoint = door.outline[1];
        doorLine.push(hingePoint, endPoint);
        var radius = this.lineLength(doorLine);
        var pointThreeX = hingePoint.x + this.doorCoord(hingePoint, endPoint, curve, "x") * (Math.abs(hingePoint.y - endPoint.y));
        var pointThreeY = hingePoint.y + this.doorCoord(hingePoint, endPoint, curve, "y") * (Math.abs(hingePoint.x - endPoint.x));
        var pointThree = { x: pointThreeX, y: pointThreeY, radius: radius, curve: curve };
        doorCurve.push(endPoint, pointThree);
        doorLines.push(
            this.drawLine(this.lineArrayGenerator(doorLine), strokeColor, strokeWidth)
        );
        doorLines.push(
            this.paper.path(this.compilePath(doorCurve, false)).attr({
                fill: "transparent",
                stroke: strokeColor,
                strokeWidth: strokeWidth - 1,
                strokeDasharray: "10 10",
                strokeLinecap: "round"
            })
        );
        this.doors.push(doorLines);
     }

    // ################################################################################
    // TODO: Even Snazzier door
    // Takes in an specific angle for the door, Default being 90 degrees
    // ################################################################################
    /*drawDoorWithAngle(door, angle, strokeColor, strokeWidth) {
        // Testing with Door Colors
        if (door.label === "door-room-01") {
            strokeColor = "green";
        } else if (door.label === "door-room-02") {
            strokeColor = "magenta";
        } else if (door.label === "door-room-03") {
            strokeColor = "blue";
        } else if (door.label === "door-room-04") {
            // strokeColor = "transparent";
            // strokeWidth = 0;
        } else {
            strokeColor = "grey";
        }

        // Log to check room and color
        console.log(door.label);
        console.log(strokeColor);


        // Initialize Values
        var doorLines = [];
        var doorLine = [];
        var doorCurve = [];
        var curve = "concave";
        var hingePoint = door.outline[0];
        var endPoint = door.outline[1];
        doorLine.push(hingePoint, endPoint);
        var radius = this.lineLength(doorLine);
        var radian1 = 0;
        var radian2 = 0;

        if (hingePoint.y === endPoint.y) {
            radian1 = Math.PI / 2;
        } else if (hingePoint.x === endPoint.x){
            radian1 = Math.PI;
        }

        if (clockwise) {
            console.log("test");
        }
        console.log(this.testDoorSide(door.outline));
        if (this.testDoorSide(door.outline) < 0) {
            curve = "convex";
            if (hingePoint.y < endPoint.y) {
                radian1 = radian1 + Math.PI;
            } else if (hingePoint.x < endPoint.x){
                radian1 = radian1 - Math.PI;
            }
        }
        console.log(curve);

        // radian2 must be calculated if both points have a different x value
        // var radian2 = Math.PI / 2;

        // var degree1 = radian1 * 180 / Math.PI; // Checking what each value is in degrees
        // var degree2 = radian2 * 180 / Math.PI;
        // console.log(radian1);
        var pointThreeX = radius * Math.cos(radian1) + doorLine[0].x;
        var pointThreeY = radius * Math.sin(radian1) + doorLine[0].y;
        var pointThree = { x: pointThreeX, y: pointThreeY, radius: radius, curve: curve };

        // var lineLengthTest = []; // Testing to see whether the line is the correct length 
        // lineLengthTest.push(hingePoint, pointThree); // (correct length should be the length of the radius)

        doorCurve.push(endPoint, pointThree);

        // console.log(degree1 + " " + degree2);
        // console.log("test" + radius * Math.cos(radian2));
        // console.log(this.lineLength(lineLengthTest));
        // console.log(this.testCoordinate(door.outline[0], door.outline[1]));
        // console.log(door.outline[0]);
        // console.log(doorCurve);
        this.drawCircle(doorLine[0], 5); // Point 1 Hinge
        // this.drawCircle(doorLine[1], 5); // Point 2
        this.drawCircle(door.outline[2], 5, strokeColor); // Point that picks the side.
        // console.log(radius);
        doorLines.push(
            this.drawLine(this.lineArrayGenerator(doorLine), strokeColor, strokeWidth)
        );
        doorLines.push(
            this.paper.path(this.compilePath(doorCurve, false)).attr({
                fill: "transparent",
                stroke: strokeColor,
                strokeWidth: strokeWidth - 1,
                strokeDasharray: "10 10",
                strokeLinecap: "round"
            })
        );
        this.doors.push(doorLines);
     }*/

    /*
    // #########################################################################
    // Original Draw Door
    // #########################################################################
    drawDoor(door, strokeColor, strokeWidth) {
        var doorLines = [];
        var doorLine = [];
        var doorCurve = [];
        var hingePoint = door.outline[0];
        var endPoint = door.outline[1];
        var curvePoint = door.outline[2];
        doorLine.push(hingePoint, endPoint);
        doorCurve.push(endPoint, curvePoint);
        doorLines.push(
            this.drawLine(this.lineArrayGenerator(doorLine), strokeColor, strokeWidth),
            this.paper.path(this.compilePath(doorCurve, false)).attr({
                fill: "transparent",
                stroke: strokeColor,
                strokeWidth: strokeWidth
            })
        );
        this.doors.push(doorLines);
    }
     */

    drawDoors(doors, strokeColor, strokeWidth) {
        doors.forEach((door) => {
            this.drawDoor(door, strokeColor, strokeWidth);
        });
    }

    drawGrid(unitLength, majorColor, minorColor) {
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

    drawCircle(centerPoint, radius, fill) {
        return (this.paper.circle(centerPoint.x, centerPoint.y, radius).attr({ fill: fill}));
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
