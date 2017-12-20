import Snap from 'snapsvg-cjs';
import Feature from './feature';

export default class Door extends Feature {
  constructor(canvas, origin, outline, angle, direction, id, style) {
    super(canvas);
    this.outline = Door.addOrigin(outline, origin);
    this.origin = origin;
    this.id = id;
    this.angle = angle;
    this.radius = Door.lineLen(this.outline[0], this.outline[1]);
    this.curve = direction ? 'concave' : 'convex';
    this.doors = [];
    this.doorStyle = style.door.default;
    this.projectionStyle = style.projection.default;
  }

  static getSupportAngle(baseAngle, hingePnt, endPnt, radius) {
    if (hingePnt.x !== endPnt.x && hingePnt.y !== endPnt.y) {
      if (baseAngle === Math.PI || baseAngle === 0) {
        return Math.acos(Door.lineLen([hingePnt, { x: endPnt.x, y: hingePnt.y }]) / radius);
      }
      return Math.acos(Door.lineLen([hingePnt, { x: hingePnt.x, y: endPnt.y }]) / radius);
    }
    return 0;
  }

  static getDoorAngle(curve, baseAngle, angle, supportAngle) {
    let doorAngle = 0;

    if (curve === 'concave') {
      doorAngle = baseAngle + Snap.rad(angle) + supportAngle;
    } else {
      doorAngle = baseAngle - Snap.rad(angle) - supportAngle;
    }

    if (doorAngle > 2 * Math.PI) {
      doorAngle %= (2 * Math.PI);
    } else if (doorAngle < 0) {
      doorAngle = (2 * Math.PI) - (Math.abs(doorAngle) % (2 * Math.PI));
    }

    return doorAngle;
  }

  draw() {
    const lines = [];
    const hinge = this.outline[0];
    const end = this.outline[1];
    const openPoint = {
      x: 0, y: 0, radius: this.radius, curve: this.curve,
    };

    const baseAngle = Snap.rad(Snap.angle(hinge.x, hinge.y, end.x, end.y)) - Math.PI;
    const supportAngle = Door.getSupportAngle(baseAngle, hinge, end, this.radius);
    const doorAngle = Door.getDoorAngle(this.curve, baseAngle, this.angle, supportAngle);

    openPoint.x = (this.radius * Math.cos(doorAngle)) + hinge.x;
    openPoint.y = (this.radius * Math.sin(doorAngle)) + hinge.y;

    const door = [hinge, end];
    const curve = [end, openPoint];
    const stop = [hinge, openPoint];
    lines.push(
      this.drawLine(door, this.doorStyle),
      this.drawLine(stop, this.projectionStyle),
      this.drawPathOutline(curve, false, this.projectionStyle),
    );

    this.features.push(this.doors.push(lines));
  }
}
