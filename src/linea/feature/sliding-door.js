import Feature from './feature';
import defaultStyle from '../style/styles';

export default class SlidingDoor extends Feature {
  constructor(canvas, origin, outline, id, doorStyle, doorProjStyle) {
    super(canvas);
    this.outline = outline !== undefined && SlidingDoor.addOrigin(outline, origin);
    if (this.outline.length < 3) {
      throw Error('Not enough valid points in SlidingDoor Outline');
    }
    this.origin = origin !== undefined && origin;
    this.id = id !== undefined && id;
    this.slidingDoors = [];
    this.doorStyle = doorStyle !== undefined ? doorStyle : defaultStyle.doorStyle.door.default;
    this.projStyle = doorProjStyle !== undefined
      ? doorProjStyle : defaultStyle.doorStyle.projection.default;
    this.features.push(this.slidingDoors);
  }

  draw() {
    const doorSegment = [this.outline[0], this.outline[1]];
    const projection = [this.outline[1], this.outline[2]];
    const lines = [];

    lines.push(
      this.drawLine(doorSegment, this.doorStyle),
      this.drawLine(projection, this.projStyle),
    );

    this.slidingDoors.push(lines);
  }
}
