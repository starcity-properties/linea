import Snap from 'snapsvg-cjs';
import { style } from './styles.js';

export default class Floorplan {
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
        return path.join(" ");
    }

    drawRoomOutline(points, id, style) {
        // compilePath() takes points and makes the string to pass into path?
        this.wall = this.paper.path(this.compilePath(points, true));

        // give style to shape and assign id to object
        this.wall.attr(style);
        this.wall.id = id;
    }

    pointArrayGenerator(point) {
        var pointArray = [];

        pointArray.push(point.x, point.y);
        return pointArray;
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
        return this.paper.polyline(points).attr(style);
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
        // this.drawRoomOutline(room.room.outline, room.unit.code, "#f4e4d7", "black", 8);
        this.drawRoomOutline(room.room.outline, room.unit.code, style.roomOutline.default);

        // this.drawInteriorWalls(room.features.interiorWalls, "black", 8);
        this.drawInteriorWalls(room.features.interiorWalls, style.interiorWalls.default);

        this.drawWindows(room.features.windows, style.windowStyle.default);

        // console.log(room.features.door);
        this.drawDoors(room.features.doors, style.doorStyle.door.default);

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
        return (door[1].x - door[0].x) * (door[2].y - door[0].y)
            - ((door[1].y - door[0].y) * (door[2].x - door[0].x));
    }

    /*
     testCoordinateZone(centerPoint, endPoint, direction) {
     if (centerPoint.x - endPoint.x > 0) {
     if (centerPoint.y - endPoint.y > 0) {
     return1;
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
                        return 1;
                    } else {
                        return -1;
                    }
                } else { // Counter-Clockwise
                    if (axis === "x") {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            } else { // Door is in Zone 3
                if (direction === "concave") { // Clockwise
                    return -1;
                } else { // Counter-Clockwise
                    return 1;
                }
            }
        } else {
            if (centerPoint.y - endPoint.y > 0) { // Door is in Zone 2
                if (direction === "concave") { // Clockwise
                    return 1;
                } else { // Counter-Clockwise
                    return -1;
                }
            } else { // Door is in Zone 4
                if (direction === "concave") { // Clockwise
                    if (axis === "x") {
                        return -1;
                    } else {
                        return 1;
                    }
                } else { // Counter-Clockwise
                    if (axis === "x") {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            }
        }
    }

    drawDoor(door, doorStyle) {
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
            this.drawLine(this.lineArrayGenerator(doorLine), doorStyle)
        );
        doorLines.push(
            this.paper.path(this.compilePath(doorCurve, false)).attr({
                stroke: doorStyle.stroke,
                strokeWidth: doorStyle.strokeWidth - 3,
                fill: "transparent",
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

    drawDoors(doors, doorStyle) {
        doors.forEach((door) => {
            this.drawDoor(door, doorStyle);
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
        return this.paper.circle(centerPoint.x, centerPoint.y, radius).attr({ fill: fill});
    }
}
