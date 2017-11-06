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
        door: [
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
        ],
        interiorWall: [
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

        // Initialize other features??
        this.interiorWalls = [];

    }

    // Function to create the string to draw path.
    compilePath(points) {
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
        path.push("Z");

        // make a string out of path
        return (path.join(" "));
    }

    drawRoomOutline(points, fill, strokeColor, strokeWidth) {
        // compilePath() takes points and makes the string to pass into path? 
        this.wall = this.paper.path(this.compilePath(points));

        // give style to shape
        this.wall.attr({
            fill: fill,
            stroke: strokeColor,
            strokeWidth: strokeWidth
        });
    }

    drawLine(points, strokeColor, strokeWidth) {
        var windowPoints = [];

        points.outline.forEach((point) => {
            windowPoints.push(point.x, point.y);
        });

        this.windows.push(this.paper.polyline(windowPoints).attr({
            stroke: strokeColor,
            strokeWidth: strokeWidth
        }));
    }

    drawWindows(windows, strokeColor, strokeWidth) {
        windows.forEach((window) => {
            // console.log(window);
            this.drawLine(window, strokeColor, strokeWidth);
        });
    }

    drawInteriorWalls(walls, strokeColor, strokeWidth) {
        walls.forEach((wall) => {
            this.drawLine(wall, strokeColor, strokeWidth);
        });
    }
}


var roomRender = new Floorplan("#svg", 0, 0, 1000, 1000);
roomRender.drawRoomOutline(roomData.room.outline, "white", "black", 5);
roomRender.drawWindows(roomData.features.windows, "cyan", 3);
roomRender.drawInteriorWalls(roomData.features.interiorWall, "black", 5);

registerServiceWorker()
