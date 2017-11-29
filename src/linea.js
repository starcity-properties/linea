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
        this.walls = [];

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

    drawPathOutline(points, closed, outlineStyle) {
        return this.paper.path(this.compilePath(points, closed)).attr(outlineStyle);
    }

    drawRoomOutline(points, id, outlineStyle) {
        // compilePath() takes points and makes the string to pass into path?
        var lastItem = this.walls.push(this.drawPathOutline(points, true, outlineStyle)) - 1;

        // give style to shape and assign id to object
        this.walls[lastItem].id = id;
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

    drawLine(points, lineStyle) {
        return this.paper.polyline(points).attr(lineStyle);
    }

    drawWindow(window, windowStyle) {
        var points = this.generateLineArray(window.outline);
        this.windows.push(this.drawLine(points, windowStyle));
    }

    drawWindows(windows, windowStyle) {
        windows.forEach((window, index) => {
            this.drawWindow(window, windowStyle);
            this.windows[index].id = window.code;
        });
    }

    drawInteriorWall(wall, wallStyle) {
        var points = this.generateLineArray(wall.outline);
        this.interiorWalls.push(this.drawLine(points, wallStyle));
    }

    drawInteriorWalls(walls, wallStyle) {
        walls.forEach((wall, index) => {
            this.drawInteriorWall(wall, wallStyle);
            this.interiorWalls[index].id = wall.code;
        });
    }

    drawRoom(room) {
        // this.drawRoomOutline(room.room.outline, room.unit.code, "#f4e4d7", "black", 8);
        this.drawRoomOutline(room.room.outline, room.unit.code, style.roomOutline.default);

        // this.drawInteriorWalls(room.features.interiorWalls, "black", 8);
        this.drawInteriorWalls(room.features.interiorWalls, style.interiorWalls.default);

        this.drawWindows(room.features.windows, style.windowStyle.default);

        this.drawDoors(room.features.doors, style.doorStyle);

        this.drawSlidingDoors(room.features.slidingDoors, style.doorStyle);

        this.drawFurniture(room.features.furniture, style.furniture, room.unit.scale);
    }

    update(feature, id, attrObject) {
        // TODO: updating outline or features. Events, moving furniture around, etc
        feature.forEach((item) => {
            if (item.id === id) {
                item.attr(attrObject);
            }
        });
    }

    addFeature() {

    }

    removeFeature() {

    }

    drawSlidingDoor(slidingDoor, slidingDoorStyle) {
        var slidingDoorLines = [];
        var doorSegment= [];
        var dottedSegment = [];
        doorSegment.push(slidingDoor.outline[0], slidingDoor.outline[1]);
        dottedSegment.push(slidingDoor.outline[1], slidingDoor.outline[2]);
        slidingDoorLines.push(
            this.drawLine(this.generateLineArray(doorSegment), slidingDoorStyle.door.default),
            this.drawLine(this.generateLineArray(dottedSegment), slidingDoorStyle.projection.default)
        );
        this.slidingDoors.push(slidingDoorLines);
    }

    drawSlidingDoors(slidingDoors, slidingDoorStyle) {
        slidingDoors.forEach((item, index) => {
            this.drawSlidingDoor(item, slidingDoorStyle);
            this.slidingDoors[index].id = item.code;
        });
    }

    lineLength(pointA, pointB) {
        var xLength= 0;
        var yLength= 0;
        xLength= pointA.x - pointB.x;
        xLength= xLength * xLength;

        yLength= pointA.y - pointB.y;
        yLength= yLength * yLength;

        return Math.sqrt( xLength + yLength );
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
        var radius = this.lineLength(hingePoint, endPoint);
        var pointThreeX = 0;
        var pointThreeY = 0;
        var pointThree = {};
        var baseAngle = Snap.rad(Snap.angle(hingePoint.x, hingePoint.y, endPoint.x, endPoint.y)) - Math.PI;
        var supportAngle = 0;
        var doorAngle = 0;
        var hasAngle = door.angleDegrees !== undefined ? door.angleDegrees : false;
        if (!hasAngle) {
            pointThreeX = hingePoint.x + this.doorCoord(hingePoint, endPoint, curve, "x") * (Math.abs(hingePoint.y - endPoint.y));
            pointThreeY = hingePoint.y + this.doorCoord(hingePoint, endPoint, curve, "y") * (Math.abs(hingePoint.x - endPoint.x));
        } else {
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
        pointThree = { x: pointThreeX, y: pointThreeY, radius: radius, curve: curve };
        doorLine.push(hingePoint, endPoint);
        doorCurve.push(endPoint, pointThree);
        doorStop.push(hingePoint, pointThree);
        doorLines.push(
            this.drawLine(this.generateLineArray(doorLine), doorStyle.door.default),
            this.drawLine(this.generateLineArray(doorStop), doorStyle.doorStop.default),
            this.paper.path(this.compilePath(doorCurve)).attr(doorStyle.projection.default)
        );
        this.doors.push(doorLines);
    }

    drawDoors(doors, doorStyle) {
        doors.forEach((door) => {
            this.drawDoor(door, doorStyle);
        });
    }

    lineMidPoint(pointA, pointB) {
        var midPoint = {};
        midPoint.x = (pointA.x + pointB.x) / 2;
        midPoint.y = (pointA.y + pointB.y) / 2;
        return midPoint;
    }

    drawBed(bed, bedStyle, pillows) {
        var bedObjs = [];
        var topLeftPoint = bed.outline[0];
        var topRightPoint = bed.outline[1];
        var bottomRightPoint = bed.outline[2];
        var headBoardLength = this.lineLength(topLeftPoint, topRightPoint);
        var halfLength = headBoardLength / 2;
        var quarterLength = halfLength / 2;
        var sideLength = this.lineLength(topRightPoint, bottomRightPoint);
        var topPillowBuffer = .025 * sideLength;
        var centerPoint = this.lineMidPoint(topLeftPoint, bottomRightPoint);
        var pillowOnePoints = [
            { x: topLeftPoint.x + quarterLength - 13, y: topLeftPoint.y + topPillowBuffer },
            { x: topLeftPoint.x + quarterLength + 13, y: topLeftPoint.y + topPillowBuffer },
            { x: topLeftPoint.x + quarterLength + 13, y:topLeftPoint.y + 20 + topPillowBuffer },
            { x: topLeftPoint.x + quarterLength - 13, y: topLeftPoint.y + 20 + topPillowBuffer }];
        var pillowTwoPoints = [
            { x: topLeftPoint.x + halfLength + quarterLength - 13, y: topLeftPoint.y + topPillowBuffer },
            { x: topLeftPoint.x + halfLength + quarterLength + 13, y: topLeftPoint.y + topPillowBuffer },
            { x: topLeftPoint.x + halfLength + quarterLength + 13, y:topLeftPoint.y + 20 + topPillowBuffer },
            { x: topLeftPoint.x + halfLength + quarterLength - 13, y: topLeftPoint.y + 20 + topPillowBuffer }];
        bedObjs.push(
            this.paper.text(centerPoint.x, centerPoint.y, bed.label).attr({textAnchor: "middle", alignmentBaseline: "middle", fontSize: 8}),
            this.paper.polygon(this.generateLineArray(bed.outline)).attr(bedStyle),
            this.paper.polygon(
                this.generateLineArray(pillowOnePoints)).attr(bedStyle).transform(
                    "r" + Snap.angle(topRightPoint.x, topRightPoint.y, topLeftPoint.x, topLeftPoint.y) + ", " + topLeftPoint.x + ", " + topLeftPoint.y),
            this.paper.polygon(
                this.generateLineArray(pillowTwoPoints)).attr(bedStyle).transform(
                    "r" + Snap.angle(topRightPoint.x, topRightPoint.y, topLeftPoint.x, topLeftPoint.y) + ", " + topLeftPoint.x + ", " + topLeftPoint.y)
        );
    }

    drawRectWithLabel(rect, rectStyle) {
        var rectObjs = [];
        var centerPoint = this.lineMidPoint(rect.outline[0], rect.outline[2]);
        rectObjs.push(
            this.paper.polygon(this.generateLineArray(rect.outline)).attr(rectStyle),
            this.paper.text(centerPoint.x, centerPoint.y, rect.label).attr({textAnchor: "middle", alignmentBaseline: "middle", fontSize: 8})
        );
    }

    drawFurniture(furniture, furnitureStyle, scale) {
        var hasBed = furniture.beds !== undefined ? furniture.beds : false;
        var hasDresser = furniture.dressers !== undefined ? furniture.dressers : false;
        var hasNightTable = furniture.nightTables !== undefined ? furniture.nightTables : false;
        if (hasBed) {
            hasBed.forEach((item) => {
                this.drawBed(item, furnitureStyle.bed);
            });
        }
        if (hasDresser) {
            hasDresser.forEach((item) => {
                this.drawRectWithLabel(item, furnitureStyle.dresser);
            });
        }
        if (hasNightTable) {
            hasNightTable.forEach((item) => {
                this.drawRectWithLabel(item, furnitureStyle.nightTable);
            });
        }
    }

    drawGrid(unitLength, gridStyle) {
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
                this.majorGrid.push(this.drawLine(this.generateLineArray(horizontalLines.outline), gridStyle.majorGridLine));
            } else {
                this.minorGrid.push(this.drawLine(this.generateLineArray(horizontalLines.outline), gridStyle.minorGridLine));
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
                this.majorGrid.push(this.drawLine(this.generateLineArray(verticalLines.outline), gridStyle.majorGridLine));
            } else {
                this.minorGrid.push(this.drawLine(this.generateLineArray(verticalLines.outline), gridStyle.minorGridLine));
            }
        }
    }

    drawCircle(centerPoint, radius, circleStyle) {
        return this.paper.circle(centerPoint.x, centerPoint.y, radius).attr(circleStyle);
    }
}
