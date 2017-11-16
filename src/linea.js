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

    generatePointArray(point) {
        var pointArray = [];

        pointArray.push(point.x, point.y);
        return pointArray;
    }

    // takes outline object and created array of points to be fed into polyline draw
    generateLineArray(outline) {
        var linePoints = [];

        outline.forEach((point) => {
            linePoints.push(this.generatePointArray(point));
        });
        return linePoints;
    }

    drawLine(points, style) {
        return this.paper.polyline(points).attr(style);
    }

    drawWindow(window, style) {
        var points = this.generateLineArray(window.outline);
        this.windows.push(this.drawLine(points, style));
    }

    drawWindows(windows, style) {
        windows.forEach((window, index) => {
            this.drawWindow(window, style);
            this.windows[index].id = window.code;
        });
    }

    drawInteriorWall(wall, style) {
        var points = this.generateLineArray(wall.outline);
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
        feature.forEach((item) => {
            if (item.id === id) {
                // console.log("updating");
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
            this.drawLine(this.generateLineArray(doorSegment), style.door.default),
            this.drawLine(this.generateLineArray(dottedSegment), style.projection.default)
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

    doorCoordBaseAngle(centerPoint, endPoint, direction) {
        if (centerPoint.x - endPoint.x === 0) {
            if (centerPoint.y - endPoint.y > 0) {
                return 3 * Math.PI / 2;
            } else {
                return Math.PI / 2;
            }
        }
        if (centerPoint.y - endPoint.y === 0) {
            if (centerPoint.x - endPoint.x > 0) {
                return Math.PI;
            } else {
                return 0;
            }
        }
        if (centerPoint.x - endPoint.x > 0) {
            if (centerPoint.y - endPoint.y > 0) {
                if (direction === "concave") {
                    return Math.PI;
                } else {
                    return 3 * Math.PI / 2;
                }
            } else {
                if (direction === "concave") {
                    return Math.PI / 2;
                } else {
                    return Math.PI;
                }
            }
        } else {
            if (centerPoint.y - endPoint.y > 0) {
                if (direction === "concave") {
                    return 3 * Math.PI / 2;
                } else {
                    return 0;
                }
            } else {
                if (direction === "concave") {
                    return 0;
                } else {
                    return Math.PI / 2;
                }
            }
        }
    }

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
        var doorStop = [];
        var doorCurve = [];
        var curve = door.clockwise ? "concave" : "convex";
        var hingePoint = door.outline[0];
        var endPoint = door.outline[1];
        doorLine.push(hingePoint, endPoint);
        var radius = this.lineLength(doorLine);
        var pointThreeX = 0;
        var pointThreeY = 0;
        var baseAngle = 0;
        var supportAngle = 0;
        var doorAngle = 0;
        var hasAngle = door.angleDegrees !== undefined ? door.angleDegrees : false;
        if (!hasAngle) {
            pointThreeX = hingePoint.x + this.doorCoord(hingePoint, endPoint, curve, "x") * (Math.abs(hingePoint.y - endPoint.y));
            pointThreeY = hingePoint.y + this.doorCoord(hingePoint, endPoint, curve, "y") * (Math.abs(hingePoint.x - endPoint.x));
        } else {
            baseAngle = this.doorCoordBaseAngle(hingePoint, endPoint, curve);
            if (hingePoint.x !== endPoint.x && hingePoint.y !== endPoint.y) {
                if (baseAngle === Math.PI || baseAngle === 0) {
                    supportAngle = Math.acos(this.lineLength([hingePoint,{x: endPoint.x, y: hingePoint.y}]) / radius);
                } else {
                    supportAngle = Math.acos(this.lineLength([hingePoint,{x: hingePoint.x, y: endPoint.y}]) / radius);
                }
            }
            doorAngle = curve === "concave"
                ? baseAngle + Snap.rad(hasAngle) + supportAngle
                : baseAngle - Snap.rad(hasAngle) - supportAngle;
            if (doorAngle > 2 * Math.PI) {
                doorAngle = doorAngle % (2 * Math.PI);
            } else if (doorAngle < 0) {
                doorAngle = 2 * Math.PI - (Math.abs(doorAngle) % (2 * Math.PI));
            }
            pointThreeX = radius * Math.cos(doorAngle) + hingePoint.x;
            pointThreeY = radius * Math.sin(doorAngle) + hingePoint.y;
        }

        var pointThree = { x: pointThreeX, y: pointThreeY, radius: radius, curve: curve };
        doorCurve.push(endPoint, pointThree);
        doorStop.push(hingePoint, pointThree);
        doorLines.push(
            this.drawLine(this.generateLineArray(doorLine), doorStyle),
            this.drawLine(this.generateLineArray(doorStop), doorStyle)
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
                this.majorGrid.push(this.drawLine(this.generateLineArray(horizontalLines.outline), {stroke: "#cccccc", strokeWidth: 1}));
            } else {
                this.minorGrid.push(this.drawLine(this.generateLineArray(horizontalLines.outline), {stroke: "#eaeaea", strokeWidth: 1}));
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
                this.majorGrid.push(this.drawLine(this.generateLineArray(verticalLines.outline), {stroke: "#ccc", strokeWidth: 1}));
            } else {
                this.minorGrid.push(this.drawLine(this.generateLineArray(verticalLines.outline), {stroke: "#eaeaea", strokeWidth: 1}));
            }
        }
    }

    drawCircle(centerPoint, radius, fill) {
        return this.paper.circle(centerPoint.x, centerPoint.y, radius).attr({ fill: fill});
    }
}
