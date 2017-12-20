import Feature from './feature';

export default class SlidingDoor extends Feature {
  constructor(canvas, origin, outline, id, style) {
    super(canvas);
    this.outline = this.constructor.addOrigin(outline, origin);
    this.origin = origin;
    this.id = id;
    this.slidingDoors = [];
    this.doorStyle = style.door.default;
    this.projectionStyle = style.projection.default;
  }

  draw() {
    const doorSegment = [this.outline[0], this.outline[1]];
    const projection = [this.outline[1], this.outline[2]];
    const lines = [];

    lines.push(
      this.drawLine(doorSegment, this.doorStyle),
      this.drawLine(projection, this.projectionStyle),
    );

    this.features.push(this.slidingDoors.push(lines));
  }
}
