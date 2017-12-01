import Snap from 'snapsvg-cjs';
import { style } from './styles.js';

export default class lineaCanvas {
    constructor(id, minX, minY, maxX, maxY) {
        this.paper = Snap(id);
        this.paper.attr({ viewBox: minX + " " + minY + " " + maxX + " " + maxY });
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
        this.majorGrid = [];
        this.minorGrid = [];
    }

    // **********************************************************************
    // EDIT DRAWINGS. WORK IN PROGRESS
    // **********************************************************************
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

    // **********************************************************************
    // FUNCTIONS TO DRAW A ROOMS OUTLINE
    // **********************************************************************

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
        // **********************************************************************
        // Should make this more human readable. We dont have norm here
        // **********************************************************************

        var pathString = this.compilePath(points,closed);
        var outline = this.paper.path(pathString);
        outline.attr(outlineStyle);

        return outline;
    }



    // **********************************************************************
    // Generic functions to draw a line
    // **********************************************************************

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

    drawLine(poinstObject, lineStyle) {
        var points = this.generateLineArray(poinstObject);

        return this.paper.polyline(points).attr(lineStyle);
    }


    // **********************************************************************
    // Generic functions to draw a polygon
    // **********************************************************************

    drawPolygon(pointObject, style) {
        var points = this.generateLineArray(pointObject);

        return this.paper.polygon(points).attr(style);
    }

    // **********************************************************************
    // Generic function to write labels
    // **********************************************************************

    writeLabel(text, origin, style) {
        var label = this.paper.text(origin.x, origin.y, text);
        label.attr(style);

        // label.attr({fontFamily: "Roboto", fontSize: 20, fontWeight: "bold", fontStyle: "italic"});
        // label.attr({textAnchor: "right", fill: "blue", textDecoration: "none", writingMode: "tb", direction: "ltr"});
        return label;
    }

    // **********************************************************************
    // Generic functions to draw a polygon
    // **********************************************************************

    rotateObject(object, angle, origin) {
        object.transform("r" + angle + ", " + origin.x + ", " + origin.y);
    }

    // **********************************************************************
    // Generic function to draw a circle
    // **********************************************************************

    drawCircle(centerPoint, radius, circleStyle) {
        return this.paper.circle(centerPoint.x, centerPoint.y, radius).attr(circleStyle);
    }

    // **********************************************************************
    // LINE LENGTH
    // **********************************************************************
    // rewriting this to use snaps function
    lineLength(pointA, pointB) {
        var len = Snap.len(pointA.x, pointA.y, pointB.x, pointB.y);

        return len;
    }

    lineMidPoint(pointA, pointB) {
        var midPoint = {};
        midPoint.x = (pointA.x + pointB.x) / 2;
        midPoint.y = (pointA.y + pointB.y) / 2;
        return midPoint;
    }

    // **********************************************************************
    // DRAW GRID
    // **********************************************************************

    drawHorizontalGrid(xMax, yMax, unitLength, gridStyle) {
        for(var i = 0; i < yMax - 1; i++) {
            var horizontalLines = {
                outline:  [
                    { x: 10, y: 10 + i * unitLength },
                    { x: (xMax * unitLength) - 10, y: 10 + i * unitLength }
                ]};
            if (i % 5 === 0) {
                this.majorGrid.push(this.drawLine(horizontalLines.outline, gridStyle.majorGridLine));
            } else {
                this.minorGrid.push(this.drawLine(horizontalLines.outline, gridStyle.minorGridLine));
            }
        }
    }

    drawVerticalGrid(xMax, yMax, unitLength, gridStyle) {
        for(var j = 0; j < xMax - 1; j++) {
            var verticalLines = {
                outline:  [
                    { x: 10 + j * unitLength, y: 10 },
                    { x: 10 + j * unitLength, y: (yMax * unitLength) - 10 }
                ]};
            if (j % 5 === 0) {
                this.majorGrid.push(this.drawLine(verticalLines.outline, gridStyle.majorGridLine));
            } else {
                this.minorGrid.push(this.drawLine(verticalLines.outline, gridStyle.minorGridLine));
            }
        }
    }

    drawGrid(unitLength, gridStyle) {
        var xMax = this.maxX / unitLength;
        var yMax = this.maxY / unitLength;

        this.drawHorizontalGrid(xMax, yMax, unitLength, gridStyle);
        this.drawVerticalGrid(xMax, yMax, unitLength, gridStyle);
    }


}


export class Room extends lineaCanvas {
    constructor(id, minX, minY, maxX, maxY) {
        super(id, minX, minY, maxX, maxY);
        this.walls = [];
    }

    drawRoomOutline(points, id, outlineStyle) {
        // compilePath() takes points and makes the string to pass into path?
        var path = this.drawPathOutline(points, true, outlineStyle);
        var lastItem = this.walls.push(path) - 1;

        // give style to shape and assign id to object
        this.walls[lastItem].id = id;
    }

    // **********************************************************************
    // DRAW ROOM DISPATCHES ALL THE DRAWING FUNCTIONS.
    // SHOULD ADD CHECKING FOR ACTUAL CONTENT FOR OPTIONAL FEATURES
    // **********************************************************************

    drawRoom(room, drawWithOrigin) {
        var origin = room.unit.origin;
        var roomOutline = room.outline;

        if (drawWithOrigin) {
            roomOutline = room.outline.map((item) => (
                {
                    x: item.x + origin.x,
                    y: item.y + origin.y,
                    radius: item.radius,
                    curve: item.curve,
                    index: item.index
                }));
        }
        this.drawRoomOutline(roomOutline, room.unit.code, style.roomOutline.default);
    }
}

export class Floor extends Room {
    constructor(id, minX, minY, maxX, maxY) {
        super(id, minX, minY, maxX, maxY);
        this.floorPlan = [];
        this.rooms = [];
    }

    drawFloor(floor) {
        this.floorPlan.push(this.drawRoom(floor.floor, true));
        this.drawRooms(floor.rooms);
    }

    drawRooms(rooms) {
        rooms.forEach((item) => {
            this.drawRoom(item, true);
        });
    }
}

export class Feature extends lineaCanvas {
    constructor(id, minX, minY, maxX, maxY) {
        super(id, minX, minY, maxX, maxY);
        this.features = [];
    }

    // **********************************************************************
    // DRAW WINDOWS
    // **********************************************************************

    // Should we move the point array generation into drawLine? so it's all in one series of functions
    drawWindow(window, windowStyle) {
        // var points = this.generateLineArray(window.outline);
        this.windows.push(this.drawLine(window.outline, windowStyle));
    }

    drawWindows(windows, windowStyle) {
        windows.forEach((window, index) => {
            this.drawWindow(window, windowStyle);
            this.windows[index].id = window.code;
        });
    }

    // **********************************************************************
    // DRAW INTERIOR WALLS
    // **********************************************************************

    drawInteriorWall(wall, wallStyle) {
        // var points = this.generateLineArray(wall.outline);
        this.interiorWalls.push(this.drawLine(wall.outline, wallStyle));
    }

    drawInteriorWalls(walls, wallStyle) {
        walls.forEach((wall, index) => {
            this.drawInteriorWall(wall, wallStyle);
            this.interiorWalls[index].id = wall.code;
        });
    }

    // **********************************************************************
    // SLIDING DOORS
    // **********************************************************************

    drawSlidingDoor(slidingDoor, slidingDoorStyle) {
        var slidingDoorLines = [];
        var doorSegment= [slidingDoor.outline[0], slidingDoor.outline[1]];
        var dottedSegment = [slidingDoor.outline[1], slidingDoor.outline[2]];

        slidingDoorLines.push(
            this.drawLine(doorSegment, slidingDoorStyle.door.default),
            this.drawLine(dottedSegment, slidingDoorStyle.projection.default)
        );

        this.slidingDoors.push(slidingDoorLines);
    }

    drawSlidingDoors(slidingDoors, slidingDoorStyle) {
        slidingDoors.forEach((item, index) => {
            this.drawSlidingDoor(item, slidingDoorStyle);
            this.slidingDoors[index].id = item.code;
        });
    }

    // **********************************************************************
    // REGULAR DOORS
    // **********************************************************************

    getSupportAngle(baseAngle, hingePoint, endPoint, radius) {
        if (hingePoint.x !== endPoint.x && hingePoint.y !== endPoint.y) {
            if (baseAngle === Math.PI || baseAngle === 0) {
                return Math.acos(this.lineLength([hingePoint,{x: endPoint.x, y: hingePoint.y}]) / radius);
            }
            return Math.acos(this.lineLength([hingePoint,{x: hingePoint.x, y: endPoint.y}]) / radius);
        }
        return 0;
    }

    getDoorAngle(curve, baseAngle, angle, supportAngle) {
        var doorAngle = 0;

        if (curve === "concave") {
            doorAngle = baseAngle + Snap.rad(angle) + supportAngle;
        } else {
            doorAngle = baseAngle - Snap.rad(angle) - supportAngle;
        }

        if (doorAngle > 2 * Math.PI) {
            doorAngle = doorAngle % (2 * Math.PI);
        } else if (doorAngle < 0) {
            doorAngle = 2 * Math.PI - (Math.abs(doorAngle) % (2 * Math.PI));
        }

        return doorAngle;
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

        var pointThree = { x: 0, y: 0, radius: radius, curve: curve };

        // if theres degrees, we set the angle, otherwise its false
        var angle = door.angleDegrees !== undefined ? door.angleDegrees : 90;
        var baseAngle = Snap.rad(Snap.angle(hingePoint.x, hingePoint.y, endPoint.x, endPoint.y)) - Math.PI;
        var supportAngle = this.getSupportAngle(baseAngle, hingePoint, endPoint, radius);
        var doorAngle = this.getDoorAngle(curve, baseAngle, angle, supportAngle);

        pointThree.x = radius * Math.cos(doorAngle) + hingePoint.x;
        pointThree.y = radius * Math.sin(doorAngle) + hingePoint.y;

        doorLine.push(hingePoint, endPoint);
        doorCurve.push(endPoint, pointThree);
        doorStop.push(hingePoint, pointThree);
        doorLines.push(
            this.drawLine(doorLine, doorStyle.door.default),
            this.drawLine(doorStop, doorStyle.doorStop.default),
            this.paper.path(this.compilePath(doorCurve)).attr(doorStyle.projection.default)
        );
        this.doors.push(doorLines);
    }

    drawDoors(doors, doorStyle) {
        doors.forEach((door, index) => {
            this.drawDoor(door, doorStyle);
            this.doors[index].id = door.code;
        });
    }

    // **********************************************************************
    // DRAW BEDS
    // **********************************************************************

    lineMidPoint(pointA, pointB) {
        var midPoint = {};
        midPoint.x = (pointA.x + pointB.x) / 2;
        midPoint.y = (pointA.y + pointB.y) / 2;
        return midPoint;
    }

    getPillowPoints(xOffset, yOffset, lenght, height, origin) {
        var pillow = [
            {x: (origin.x + xOffset), y: (origin.y + yOffset)},
            {x: (origin.x + xOffset + lenght), y: (origin.y + yOffset)},
            {x: (origin.x + xOffset + lenght), y: (origin.y + yOffset + height)},
            {x: (origin.x + xOffset), y: (origin.y + yOffset + height)}
        ];

        return pillow;
    }

    drawBed(bed, bedStyle, pillows) {
        var bedObjs = [];
        var topLeftPoint = bed.outline[0];
        var topRightPoint = bed.outline[1];

        var pillowBuffer = 2;
        var pillowLength = ((this.lineLength(topLeftPoint, topRightPoint) - (pillowBuffer * 3)) / 2);
        var pillowHeight = pillowLength * 0.66;

        // only used for label... do we write the label here?
        var bottomRightPoint = bed.outline[2];
        var centerPoint = this.lineMidPoint(topLeftPoint, bottomRightPoint);

        var pillowOnePoints = this.getPillowPoints(pillowBuffer, pillowBuffer, pillowLength, pillowHeight, topLeftPoint);
        var pillowTwoPoints = this.getPillowPoints((pillowLength) + (pillowBuffer * 2), pillowBuffer, pillowLength, pillowHeight, topLeftPoint);

        var pillowOne = this.drawPolygon(pillowOnePoints, bedStyle);
        var pillowTwo = this.drawPolygon(pillowTwoPoints, bedStyle);
        var drawnBed = this.drawPolygon(bed.outline,bedStyle);

        var pillowAngle = Snap.angle(topRightPoint.x, topRightPoint.y, topLeftPoint.x, topLeftPoint.y);

        this.rotateObject(pillowOne, pillowAngle, topLeftPoint);
        this.rotateObject(pillowTwo, pillowAngle, topLeftPoint);

        var label = this.paper.text(centerPoint.x + pillowHeight/2, centerPoint.y, bed.label);
        label.attr({textAnchor: "middle", alignmentBaseline: "middle", fontSize: 8});
        bedObjs.push(drawnBed, pillowOne, pillowTwo, label);

        bedObjs.id = bed.code;
        console.log(bedObjs);
    }


    // **********************************************************************
    // DRAW FURNITURE
    // **********************************************************************
    drawRectWithLabel(rect, rectStyle) {
        var rectObjs = [];
        var centerPoint = this.lineMidPoint(rect.outline[0], rect.outline[2]);
        rectObjs.push(
            this.paper.polygon(this.generateLineArray(rect.outline)).attr(rectStyle),
            this.paper.text(centerPoint.x, centerPoint.y, rect.label).attr({textAnchor: "middle", alignmentBaseline: "middle", fontSize: 8})
        );
    }

    drawFurniture(furniture, furnitureStyle, scale) {
        if (furniture.beds !== undefined) {
            furniture.beds.forEach((item) => {
                this.drawBed(item, furnitureStyle.bed);
            });
        }
        if (furniture.dressers !== undefined) {
            furniture.dressers.forEach((item) => {
                this.drawRectWithLabel(item, furnitureStyle.dresser);
            });
        }
        if (furniture.nightTables !== undefined) {
            furniture.nightTables.forEach((item) => {
                this.drawRectWithLabel(item, furnitureStyle.nightTable);
            });
        }
    }

}


class Labels extends lineaCanvas {
    constructor(id, minX, minY, maxX, maxY){
        super(id, minX, minY, maxX, maxY);
        this.labels = [];
    }

    // *******************************************************************************************
    // WRITE SIZE LABELS STARTS HERE
    // *******************************************************************************************

    shiftPoint(a, b, d, shift) {
        var point = {};

        point.x = (a.x - ((shift * (a.x - b.x))/d));
        point.y = (a.y - ((shift * (a.y - b.y))/d));

        return point;
    }

    drawDiagonal(a, b) {
        var d = Snap.len(a.x, a.y, b.x, b.y);
        var label = [];
        var m = this.lineMidPoint(a, b);
        var style = {textAnchor: "middle", fontStyle: "Arial", fontSize: 10};

        if (a.x < b.x && a.y < b.y) { // shift line down and cut short from b
            a = this.shiftPoint(a, b, d, 10);
            b = this.shiftPoint(b, a, d, 10);
            this.drawLine([{x: a.x - 8, y: a.y + 8}, {x: b.x - 8, y: b.y + 8}], {stroke: "gray", strokeWidth: 1});
            label = this.writeLabel(Math.round(d), {x: (m.x - 20), y: (m.y + 20)}, style);
        } else if (a.x < b.x && a.y > b.y) { // shift line down and cut short from a
            a = this.shiftPoint(a, b, d, 10);
            b = this.shiftPoint(b, a, d, 10);
            this.drawLine([{x: a.x+ 8, y: a.y + 8}, {x: b.x + 8, y: b.y + 8}], {stroke: "gray", strokeWidth: 1});
            label = this.writeLabel(Math.round(d), {x: (m.x + 20), y: (m.y + 20)}, style);
        } else if (a.x > b.x && a.y < b.y) { // shift line up and cut short from a
            a = this.shiftPoint(a, b, d, 10);
            b = this.shiftPoint(b, a, d, 10);
            this.drawLine([{x: a.x - 8, y: a.y - 8}, {x: b.x - 8, y: b.y - 8}], {stroke: "gray", strokeWidth: 1});
            label = this.writeLabel(Math.round(d), {x: (m.x - 20), y: (m.y - 20)}, style);
        } else { // shift line up and cut short from b
            a = this.shiftPoint(a, b, d, 10);
            b = this.shiftPoint(b, a, d, 10);
            this.drawLine([{x: a.x + 8, y: a.y - 8}, {x: b.x + 8, y: b.y - 8}], {stroke: "gray", strokeWidth: 1});
            label = this.writeLabel(Math.round(d), {x: (m.x + 20), y: (m.y - 20)}, style);
        }
    }

    drawDistance(a, b) {
        var d = Snap.len(a.x, a.y, b.x, b.y);
        var label = [];
        var style = {textAnchor: "middle", fontStyle: "Arial", fontSize: 10};

        if (a.y === b.y && b.x > a.x) { // line is going right, shift line down
            this.drawLine([{x: a.x + 10, y: a.y + 10}, {x: b.x - 10, y: b.y + 10}], {stroke: "gray", strokeWidth: 1});
            label = this.writeLabel(d, {x: (a.x + (d / 2)), y: (a.y + 20)}, style);
        } else if (a.y === b.y && a.x > b.x) { // line is going left, shift line up
            this.drawLine([{x: a.x - 10, y: a.y - 10}, {x: b.x + 10, y: b.y - 10}], {stroke: "gray", strokeWidth: 1});
            label = this.writeLabel(d, {x: (b.x + (d / 2)), y: (b.y - 20)}, style);
        } else if (b.y > a.y && b.x === a.x) { // line is going down, shift line left
            this.drawLine([{x: a.x - 10, y: a.y + 10}, {x: b.x - 10, y: b.y - 10}], {stroke: "gray", strokeWidth: 1});
            style.textAnchor = "right";
            label = this.writeLabel(d, {x: (a.x - 30), y: (a.y + (d / 2))}, style);
        } else if (b.x === a.x && a.y > b.y) { // line is going up, shift line right
            this.drawLine([{x: a.x + 10, y: a.y - 10}, {x: b.x + 10, y: b.y + 10}], {stroke: "gray", strokeWidth: 1});
            style.textAnchor = "left";
            label = this.writeLabel(d, {x: (a.x + 20), y: (a.y - (d / 2))}, style);
        } else { // line is diagonal need to determine which direction and where to draw it
            this.drawDiagonal(a, b);
        }

    }

    writeSizes(points) {
        var len = points.length;
        for (var i = 0; i < len - 1; i++) {
            // console.log("round: " + i);
            this.drawDistance(points[i], points[i + 1]);
            // var distance = this.calculateDistance(points[i], points[i + 1]);
            // this.paper.text(points[i].x + 20, points[i].y + 20, distance).attr({fontFamily: "Arial", fontSize: 10});
        }
        // console.log("round: " + i);
        this.drawDistance(points[i], points[0]);
        // var distance = this.calculateDistance(points[i], points[0]);
        // this.paper.text(points[i].x + 20, points[i].y + 20, distance).attr({fontFamily: "Arial", fontSize: 10});
    }

}















/*
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

    // *******************************************************************************************
    // WRITE SIZE LABELS STARTS HERE
    // *******************************************************************************************

    writeLabel(text) {
        var label = this.paper.text(50, 50, text);

        label.attr({fontFamily: "Roboto", fontSize: 20, fontWeight: "bold", fontStyle: "italic"});
        label.attr({textAnchor: "right", fill: "blue", textDecoration: "none", writingMode: "tb", direction: "ltr"});
    }


    getMiddlePoint(a, b, distance) {
        var middle = {};

        middle.x = (a.x - (((distance/2) * (a.x - b.x))/distance));
        middle.y = (a.y - (((distance/2) * (a.y - b.y))/distance));

        return middle;
    }

    shiftPoint(a, b, d, shift) {
        var point = {};

        point.x = (a.x - ((shift * (a.x - b.x))/d));
        point.y = (a.y - ((shift * (a.y - b.y))/d));

        return point;
    }

    drawDiagonal(a, b) {
        var d = Snap.len(a.x, a.y, b.x, b.y);
        var label = [];
        var m = this.getMiddlePoint(a, b, d);

        if (a.x < b.x && a.y < b.y) { // shift line down and cut short from b
            a = this.shiftPoint(a, b, d, 10);
            b = this.shiftPoint(b, a, d, 10);
            this.drawLine([a.x - 8, a.y + 8, b.x - 8, b.y + 8], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(m.x - 20, m.y + 20, Math.round(d));
        } else if (a.x < b.x && a.y > b.y) { // shift line down and cut short from a
            a = this.shiftPoint(a, b, d, 10);
            b = this.shiftPoint(b, a, d, 10);
            this.drawLine([a.x+ 8, a.y + 8, b.x + 8, b.y + 8], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(m.x + 20, m.y + 20, Math.round(d));
        } else if (a.x > b.x && a.y < b.y) { // shift line up and cut short from a
            a = this.shiftPoint(a, b, d, 10);
            b = this.shiftPoint(b, a, d, 10);
            this.drawLine([a.x - 8, a.y - 8, b.x - 8, b.y - 8], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(m.x - 20, m.y - 20, Math.round(d));
        } else { // shift line up and cut short from b
            a = this.shiftPoint(a, b, d, 10);
            b = this.shiftPoint(b, a, d, 10);
            this.drawLine([a.x + 8, a.y - 8, b.x + 8, b.y - 8], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(m.x + 20, m.y - 20, Math.round(d));
        }
        label.attr({textAnchor: "middle", fontStyle: "Arial", fontSize: 10});
    }

    drawDistance(a, b) {
        var d = Snap.len(a.x, a.y, b.x, b.y);
        var label = [];
        if (a.y === b.y && b.x > a.x) { // line is going right, shift line down
            this.drawLine([a.x + 10, a.y + 10, b.x - 10, b.y + 10], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(a.x + (d/2), a.y + 20, d);
            label.attr({textAnchor: "middle", fontStyle: "Arial", fontSize: 10});
        } else if (a.y === b.y && a.x > b.x) { // line is going left, shift line up
            this.drawLine([a.x - 10, a.y - 10, b.x + 10, b.y - 10], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(b.x + (d/2), b.y - 20, d);
            label.attr({textAnchor: "middle", fontStyle: "Arial", fontSize: 10});
        } else if (b.y > a.y && b.x === a.x) { // line is going down, shift line left
            this.drawLine([a.x - 10, a.y + 10, b.x - 10, b.y - 10], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(a.x - 30, a.y + (d/2), d);
            label.attr({textAnchor: "right", fontStyle: "Arial", fontSize: 10});
        } else if (b.x === a.x && a.y > b.y) { // line is going up, shift line right
            this.drawLine([a.x + 10, a.y - 10, b.x + 10, b.y + 10], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(a.x + 20, a.y - (d/2), d);
            label.attr({textAnchor: "left", fontStyle: "Arial", fontSize: 10});
        } else { // line is diagonal need to determine which direction and where to draw it
            this.drawDiagonal(a, b);
        }

    }

    writeSizes(points) {
        var len = points.length;
        for (var i = 0; i < len - 1; i++) {
            // console.log("round: " + i);
            this.drawDistance(points[i], points[i + 1]);
            // var distance = this.calculateDistance(points[i], points[i + 1]);
            // this.paper.text(points[i].x + 20, points[i].y + 20, distance).attr({fontFamily: "Arial", fontSize: 10});
        }
        // console.log("round: " + i);
        this.drawDistance(points[i], points[0]);
        // var distance = this.calculateDistance(points[i], points[0]);
        // this.paper.text(points[i].x + 20, points[i].y + 20, distance).attr({fontFamily: "Arial", fontSize: 10});
    }
}
*/
