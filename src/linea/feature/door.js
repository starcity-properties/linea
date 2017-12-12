import Snap from 'snapsvg-cjs';
import Feature from './feature.js';

export default class Door extends Feature {
    constructor(canvas, origin, outline, angle, direction, id, style) {
        super(canvas);
        this.outline = this.addOrigin(outline, origin);
        this.origin = origin;
        this.id = id;
        this.angle = angle;
        this.radius = this.lineLength(this.outline[0], this.outline[1]);
        this.curve = direction ? "concave" : "convex";
        this.doors = [];
        this.doorStyle = style.door.default;
        this.projectionStyle = style.projection.default;
    }

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

    draw() {
        var lines = [];
        var hinge = this.outline[0];
        var end = this.outline[1];
        var openPoint = {x: 0, y: 0, radius: this.radius, curve: this.curve};

        var baseAngle = Snap.rad(Snap.angle(hinge.x, hinge.y, end.x, end.y)) - Math.PI;
        var supportAngle = this.getSupportAngle(baseAngle, hinge, end, this.radius);
        var doorAngle = this.getDoorAngle(this.curve, baseAngle, this.angle, supportAngle);

        openPoint.x = this.radius * Math.cos(doorAngle) + hinge.x;
        openPoint.y = this.radius * Math.sin(doorAngle) + hinge.y;

        var door = [hinge, end];
        var curve = [end, openPoint];
        var stop = [hinge, openPoint];
        lines.push(
            this.drawLine(door, this.doorStyle),
            this.drawLine(stop, this.projectionStyle),
            this.drawPathOutline(curve, false, this.projectionStyle),
        );

        this.features.push(this.doors.push(lines));
    }
};
