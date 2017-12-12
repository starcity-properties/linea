import Snap from 'snapsvg-cjs';
import { style } from './styles.js';

export default class lineaCanvas {
    constructor(id, minX, minY, maxX, maxY) {
        this.paper = Snap(id);
        this.paper.attr({ viewBox: minX + " " + minY + " " + maxX + " " + maxY });
        this.id = id;
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
        // how to do?
    }

    removeFeature() {
        // how to do?
    }

    addOrigin(outline, origin) {
        var newOutline = outline;
        if (origin.x || origin.y) {
            newOutline = outline.map((item) => (
                {
                    x: item.x + origin.x,
                    y: item.y + origin.y,
                    radius: item.radius,
                    curve: item.curve,
                    index: item.index
                }));
        }
        return newOutline;
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
    // Generic functions to transform an object
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
        this.features = {};
        // this.features = new Features(id, minX, minY, maxX, maxY);
    }

    drawRoomOutline(points, id, outlineStyle) {
        // compilePath() takes points and makes the string to pass into path?
        var path = this.drawPathOutline(points, true, outlineStyle);
        var lastItem = this.walls.push(path) - 1;

        // assign id to object
        this.walls[lastItem].id = id;
    }

    // **********************************************************************
    // DRAW ROOM DISPATCHES ALL THE DRAWING FUNCTIONS.
    // SHOULD ADD CHECKING FOR ACTUAL CONTENT FOR OPTIONAL FEATURES
    // **********************************************************************

    drawRoom(room, origin) {
        // console.log(room);
        var roomOutline = this.addOrigin(room.outline, origin);
        this.drawRoomOutline(roomOutline, room.unit.code, style.roomOutline.default);
        this.features = new Features(this.id, this.minX, this.minY, this.maxX, this.maxY);
        // console.log(room.features);
        this.features.drawFeatures(room.features, origin);
    }
}

export class Floor extends Room {
    constructor(id, minX, minY, maxX, maxY) {
        super(id, minX, minY, maxX, maxY);
        this.floorPlan = [];
        this.rooms = [];
        this.features = {};
    }

    drawFloor(floor) {
        this.floorPlan.push(this.drawRoom(floor.floor, floor.floor.unit.origin));
        this.features = new Features(this.id, this.minX, this.minY, this.maxX, this.maxY);
        this.drawRooms(floor.rooms);
        this.features.drawFeatures(floor.features);
    }

    drawRooms(rooms) {
        rooms.forEach((item) => {
            this.drawRoom(item, item.unit.origin);
            // this.features.drawFeatures(item.features);
        });
    }
}

export class Features extends lineaCanvas {
    constructor(id, minX, minY, maxX, maxY) {
        super(id, minX, minY, maxX, maxY);
        this.features = [];
        this.windows = [];
        this.interiorWalls = [];
        this.slidingDoors = [];
        this.doors = [];
        this.furniture = [];
        this.beds = [];
        this.dressers = [];
        this.nightTables = [];
    }

    filterFeature(features, type) {
        return features.filter((item) => (item.type === type));
    }

    drawFeatures(featureObjs, origin) {
        if (featureObjs === undefined)
            return ;
        var interiorWalls = this.filterFeature(featureObjs, "interiorWall");
        var doors = this.filterFeature(featureObjs, "door");
        var slidingDoors = this.filterFeature(featureObjs, "slidingDoor");
        var windows = this.filterFeature(featureObjs, "window");
        var beds = this.filterFeature(featureObjs, "bed");
        var dressers = this.filterFeature(featureObjs, "dresser");
        var nightTables = this.filterFeature(featureObjs, "nightTable");

        if (interiorWalls) {
            this.drawInteriorWalls(interiorWalls, style.interiorWallStyle.default, origin);
        }
        if (doors) {
            this.drawDoors(doors, style.doorStyle, origin);
        }
        if (slidingDoors) {
            this.drawSlidingDoors(slidingDoors, style.doorStyle, origin);
        }
        if (windows) {
            this.drawWindows(windows, style.windowStyle.default, origin);
        }
        if (beds) {
            this.drawBeds(beds, style.bedStyle.default, origin);
        }
        if (dressers) {
            this.drawDressers(dressers, style.dresserStyle.default, origin);
        }
        if (nightTables) {
            this.drawNightTables(nightTables, style.nightTableStyle.default, origin);
        }
    }

    // **********************************************************************
    // DRAW WINDOWS
    // **********************************************************************

    // Should we move the point array generation into drawLine? so it's all in one series of functions
    drawWindow(window, origin, windowStyle) {
        var newOutline = this.addOrigin(window.outline, origin);
        this.windows.push(this.drawLine(newOutline, windowStyle));
    }

    drawWindows(windows, windowStyle, origin) {
        windows.forEach((window, index) => {
            this.drawWindow(window, origin, windowStyle);
            this.windows[index].id = window.code;
        });
    }

    // **********************************************************************
    // DRAW INTERIOR WALLS
    // **********************************************************************

    drawInteriorWall(wall, origin, wallStyle) {
        var newOutline = this.addOrigin(wall.outline, origin);
        this.interiorWalls.push(this.drawLine(newOutline, wallStyle));
    }

    drawInteriorWalls(walls, wallStyle, origin) {
        walls.forEach((wall, index) => {
            this.drawInteriorWall(wall, origin, wallStyle);
            this.interiorWalls[index].id = wall.code;
        });
    }

    // **********************************************************************
    // SLIDING DOORS
    // **********************************************************************

    drawSlidingDoor(slidingDoor, origin, slidingDoorStyle) {
        var slidingDoorLines = [];
        var newOutline = this.addOrigin(slidingDoor.outline, origin);
        var doorSegment= [newOutline[0], newOutline[1]];
        var dottedSegment = [newOutline[1], newOutline[2]];

        slidingDoorLines.push(
            this.drawLine(doorSegment, slidingDoorStyle.door.default),
            this.drawLine(dottedSegment, slidingDoorStyle.projection.default)
        );

        this.slidingDoors.push(slidingDoorLines);
    }

    drawSlidingDoors(slidingDoors, slidingDoorStyle, origin) {
        slidingDoors.forEach((item, index) => {
            this.drawSlidingDoor(item, origin, slidingDoorStyle);
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

    drawDoor(door, origin, doorStyle) {
        // Initialize Values
        var doorLines = [];
        var doorLine = [];
        var doorStop = [];
        var doorCurve = [];
        var newOutline = this.addOrigin(door.outline, origin);
        var curve = door.clockwise ? "concave" : "convex";
        var hingePoint = newOutline[0];
        var endPoint = newOutline[1];
        var radius = this.lineLength(hingePoint, endPoint);

        var pointThree = { x: 0, y: 0, radius: radius, curve: curve };

        // if there's angleDegrees, we set the angle, otherwise its false
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

    drawDoors(doors, doorStyle, origin) {
        doors.forEach((door, index) => {
            this.drawDoor(door, origin, doorStyle);
            this.doors[index].id = door.code;
        });
    }

    // **********************************************************************
    // DRAW BEDS
    // **********************************************************************

    getPillowPoints(xOffset, yOffset, lenght, height, origin) {
        var pillow = [
            {x: (origin.x + xOffset), y: (origin.y + yOffset)},
            {x: (origin.x + xOffset + lenght), y: (origin.y + yOffset)},
            {x: (origin.x + xOffset + lenght), y: (origin.y + yOffset + height)},
            {x: (origin.x + xOffset), y: (origin.y + yOffset + height)}
        ];

        return pillow;
    }

    drawBed(bed, origin, bedStyle) {
        var bedObjs = [];
        var newOutline = this.addOrigin(bed.outline, origin);
        var topLeftPoint = newOutline[0];
        var topRightPoint = newOutline[1];

        var pillowBuffer = 2;
        var pillowLength = (this.lineLength(topLeftPoint, topRightPoint) - pillowBuffer * 3) / 2;
        var pillowHeight = pillowLength * 0.66;

        // only used for label... do we write the label here?
        var bottomRightPoint = newOutline[2];
        var centerPoint = this.lineMidPoint(topLeftPoint, bottomRightPoint);

        var pillowOnePoints = this.getPillowPoints(pillowBuffer, pillowBuffer, pillowLength, pillowHeight, topLeftPoint);
        var pillowTwoPoints = this.getPillowPoints(pillowLength + pillowBuffer * 2, pillowBuffer, pillowLength, pillowHeight, topLeftPoint);

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
        this.beds.push(bedObjs);
    }


    // **********************************************************************
    // DRAW FURNITURE
    // **********************************************************************
    drawRectWithLabel(rect, origin, rectStyle) {
        var rectObjs = [];
        var newOutline = this.addOrigin(rect.outline, origin);
        var centerPoint = this.lineMidPoint(newOutline[0], newOutline[2]);
        rectObjs.push(
            this.paper.polygon(this.generateLineArray(newOutline)).attr(rectStyle),
            this.paper.text(centerPoint.x, centerPoint.y, rect.label).attr({textAnchor: "middle", alignmentBaseline: "middle", fontSize: 8})
        );
        return rectObjs;
    }

    drawBeds(beds, bedStyle, origin) {
        if (beds) {
            beds.forEach((item) => {
                this.beds.push(this.drawBed(item, origin, bedStyle));
            });
            this.furniture.push(this.beds);
        }
    }

    drawDressers(dressers, dresserStyle, origin) {
        if (dressers) {
            dressers.forEach((item) => {
                this.dressers.push(this.drawRectWithLabel(item, origin, dresserStyle));
            });
            this.furniture.push(this.dressers);
        }
    }

    drawNightTables(nightTables, nightTableStyle, origin) {
        if (nightTables) {
            nightTables.forEach((item) => {
                this.nightTables.push(this.drawRectWithLabel(item, origin, nightTableStyle));
            });
            this.furniture.push(this.nightTables);
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
            this.drawDistance(points[i], points[i + 1]);
            // var distance = this.calculateDistance(points[i], points[i + 1]);
            // this.paper.text(points[i].x + 20, points[i].y + 20, distance).attr({fontFamily: "Arial", fontSize: 10});
        }
        this.drawDistance(points[i], points[0]);
        // var distance = this.calculateDistance(points[i], points[0]);
        // this.paper.text(points[i].x + 20, points[i].y + 20, distance).attr({fontFamily: "Arial", fontSize: 10});
    }

}
