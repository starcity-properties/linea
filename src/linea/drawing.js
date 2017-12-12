import Snap from 'snapsvg-cjs';
import LineaCanvas from './canvas.js';

export default class Drawing {
    constructor(canvas) {
        this.paper = canvas.paper;
        this.minX = canvas.minX;
        this.minY = canvas.minY;
        this.maxX = canvas.maxX;
        this.maxY = canvas.maxY;
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

    // **********************************************************************
    // Shift Origin
    // **********************************************************************
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

    drawHorizontalGrid(xMin, yMin, xMax, yMax, unitLength, gridStyle) {
        for(var i = xMin; i < yMax; i++) {
            var horizontalLines = {
                outline:  [
                    { x: xMin, y: i * unitLength },
                    { x: xMax * unitLength, y: i * unitLength }
                ]};
            if (i % 5 === 0) {
                this.majorGrid.push(this.drawLine(horizontalLines.outline, gridStyle.majorGridLine));
            } else {
                this.minorGrid.push(this.drawLine(horizontalLines.outline, gridStyle.minorGridLine));
            }
        }
    }

    drawVerticalGrid(xMin, yMin, xMax, yMax, unitLength, gridStyle) {
        for(var j = xMin; j < xMax; j++) {
            var verticalLines = {
                outline:  [
                    { x: j * unitLength, y: yMin },
                    { x: j * unitLength, y: yMax * unitLength }
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
        var xMin = this.minX;
        var yMin = this.minY;

        this.drawHorizontalGrid(xMin, yMin, xMax, yMax, unitLength, gridStyle);
        this.drawVerticalGrid(xMin, yMin, xMax, yMax, unitLength, gridStyle);
    }
}
