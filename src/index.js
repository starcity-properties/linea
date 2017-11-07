import registerServiceWorker from './registerServiceWorker';
import Snap from 'snapsvg-cjs';
import './index.css';

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
        doors: [
            {
                type: "door",
                label: "door-room-01",
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
                label: "slidingDoor-room-01",
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
                label: "interior-room-01",
                outline: [
                    { x: 220, y: 180, radius: 0, curve: "none", index: 0 },
                    { x: 220, y: 280, radius: 0, curve: "none", index: 1 },
                ]
            },
            {
                type: "interiorWall",
                label: "interior-room-02",
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
        this.interiorWalls = [];
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

    drawRoomOutline(points, fill, strokeColor, strokeWidth) {
        // compilePath() takes points and makes the string to pass into path?
        this.wall = this.paper.path(this.compilePath(points, true));

        // give style to shape
        this.wall.attr({
            fill: fill,
            stroke: strokeColor,
            strokeWidth: strokeWidth,
            fillOpacity: .5
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

    drawLine(points, strokeColor, strokeWidth) {
        return(this.paper.polyline(points).attr({
            stroke: strokeColor,
            strokeWidth: strokeWidth
        }));
    }

    drawWindow(window, strokeColor, strokeWidth) {
        var points = this.lineArrayGenerator(window.outline);
        this.windows.push(this.drawLine(points, strokeColor, strokeWidth));
    }

    drawWindows(windows, strokeColor, strokeWidth) {
        windows.forEach((window) => {
            this.drawWindow(window, strokeColor, strokeWidth);
        });
    }

    drawInteriorWall(wall, strokeColor, strokeWidth) {
        var points = this.lineArrayGenerator(wall.outline);
        this.interiorWalls.push(this.drawLine(points, strokeColor, strokeWidth));
    }

    drawInteriorWalls(walls, strokeColor, strokeWidth) {
        walls.forEach((wall) => {
            this.drawInteriorWall(wall, strokeColor, strokeWidth);
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

    drawSlidingDoor(slidingDoor, strokeColor, strokeWidth) {
        var slidingDoorLines = [];
        var doorSegment= [];
        var dottedSegment = [];
        doorSegment.push(slidingDoor.outline[0], slidingDoor.outline[1]);
        dottedSegment.push(slidingDoor.outline[1], slidingDoor.outline[2]);
        slidingDoorLines.push(
            this.drawLine(this.lineArrayGenerator(doorSegment), strokeColor, strokeWidth),
            this.drawLine(this.lineArrayGenerator(dottedSegment), strokeColor, strokeWidth).attr({
                strokeDasharray: "10 10",
                strokeLinecap: "round"
            })
        );
        this.slidingDoors.push(slidingDoorLines);
    }

    drawSlidingDoors(slidingDoors, strokeColor, strokeWidth) {
        slidingDoors.forEach((item) => {
            this.drawSlidingDoor(item, strokeColor, strokeWidth);
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
        console.log(radius);
        // doorLines.push(this.drawLine(points, strokeColor, strokeWidth));

        // this.doors.push(doorLines);
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
                this.majorGrid.push(this.drawLine(this.lineArrayGenerator(horizontalLines.outline), "#c1c1c1", 1));
            } else {
                this.minorGrid.push(this.drawLine(this.lineArrayGenerator(horizontalLines.outline), "lightgrey", 1));
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
                this.majorGrid.push(this.drawLine(this.lineArrayGenerator(verticalLines.outline), "#c1c1c1", 1));
            } else {
                this.minorGrid.push(this.drawLine(this.lineArrayGenerator(verticalLines.outline), "lightgrey", 1));
            }
        }
    }
}





var roomRender = new Floorplan("#svg", 0, 0, 600, 600);
roomRender.drawGrid(10);
// roomRender.drawRoom(roomData);
roomRender.drawRoomOutline(roomData.room.outline, "lightgrey", "black", 5);
roomRender.drawWindows(roomData.features.windows, "cyan", 3);
roomRender.drawInteriorWalls(roomData.features.interiorWalls, "black", 5);
roomRender.drawSlidingDoors(roomData.features.slidingDoors, "turquoise", 3);
roomRender.drawDoors(roomData.features.doors, "pink", 3);
registerServiceWorker();
