import Snap from 'snapsvg-cjs';
import Feature from './feature';
import defaultStyle from '../style/styles';

export default class Door extends Feature {
  constructor(canvas, origin, outline, angle, clockwise, id, dStyle, dStopStyle, dProjectionStyle) {
    super(canvas);
    this.outline = outline !== undefined && Door.addOrigin(outline, origin);
    if (this.outline.length < 2) {
      throw Error('Not enough valid points in Door Outline');
    }
    this.origin = origin !== undefined && origin;
    this.id = id !== undefined && id;
    this.angle = angle !== undefined && angle;
    this.radius = Door.lineLen(this.outline[0], this.outline[1]);
    this.curve = clockwise ? 'concave' : 'convex';
    this.doors = [];
    this.doorStyle = dStyle !== undefined
      ? dStyle : defaultStyle.doorStyle.door.default;
    this.doorStopStyle = dStopStyle !== undefined
      ? dStopStyle : defaultStyle.doorStyle.doorStop.default;
    this.projectionStyle = dProjectionStyle !== undefined
      ? dProjectionStyle : defaultStyle.doorStyle.projection.default;
    this.features.push(this.doors);
  }

  static getDoorAngle(curve, baseAngle, angle) {
    let doorAngle = 0;

    if (curve === 'concave') {
      doorAngle = baseAngle + Snap.rad(angle);
    } else {
      doorAngle = baseAngle - Snap.rad(angle);
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
    const doorAngle = Door.getDoorAngle(this.curve, baseAngle, this.angle);

    openPoint.x = (this.radius * Math.cos(doorAngle)) + hinge.x;
    openPoint.y = (this.radius * Math.sin(doorAngle)) + hinge.y;

    const door = [hinge, end];
    const curve = [end, openPoint];
    const stop = [hinge, openPoint];
    lines.push(
      this.drawLine(door, this.doorStyle),
      this.drawLine(stop, this.doorStopStyle),
      this.drawPathOutline(curve, false, this.projectionStyle),
    );

    this.doors.push(lines);
  }
}
