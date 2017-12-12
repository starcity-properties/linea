import Snap from 'snapsvg-cjs';
import Feature from './feature.js';

export default class Bed extends Feature {
    constructor(canvas, origin, outline, id, style, label) {
        super(canvas);
        this.outline = this.addOrigin(outline, origin);
        this.origin = origin;
        this.id = id;
        this.style = style;
        this.label = label !== undefined ? label : false;
        this.beds = [];
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

    drawBed(outline, style, id, label) {
        var bedObjs = [];
        var hasLabel = label !== undefined ? label : false;
        var topLeftPoint = outline[0];
        var topRightPoint = outline[1];

        var pillowBuffer = 2;
        var pillowLength = (this.lineLength(topLeftPoint, topRightPoint) - pillowBuffer * 3) / 2;
        var pillowHeight = pillowLength * 0.66;

        var pillowOnePoints = this.getPillowPoints(pillowBuffer, pillowBuffer, pillowLength, pillowHeight, topLeftPoint);
        var pillowTwoPoints = this.getPillowPoints(pillowLength + pillowBuffer * 2, pillowBuffer, pillowLength, pillowHeight, topLeftPoint);

        var pillowOne = this.drawPolygon(pillowOnePoints, style);
        var pillowTwo = this.drawPolygon(pillowTwoPoints, style);
        var drawnBed = this.drawPolygon(outline, style);

        var pillowAngle = Snap.angle(topRightPoint.x, topRightPoint.y, topLeftPoint.x, topLeftPoint.y);

        this.rotateObject(pillowOne, pillowAngle, topLeftPoint);
        this.rotateObject(pillowTwo, pillowAngle, topLeftPoint);

        bedObjs.push(drawnBed, pillowOne, pillowTwo);

        if (hasLabel) {
            var bottomRightPoint = outline[2];
            var centerPoint = this.lineMidPoint(topLeftPoint, bottomRightPoint);
            var newLabel = this.paper.text(centerPoint.x + pillowHeight/2, centerPoint.y, label);
            newLabel.attr({textAnchor: "middle", alignmentBaseline: "middle", fontSize: 8});
            bedObjs.push(newLabel);
        }

        bedObjs.id = id;
        this.beds.push(bedObjs);
    }

    draw() {
        this.features.push(this.beds.push(this.drawBed(this.outline, this.style, this.id, this.label)));
    }
}
