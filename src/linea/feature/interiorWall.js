import Feature from './feature';

export default class InteriorWall extends Feature {
  constructor(canvas, origin, outline, id, style) {
    super(canvas);
    this.outline = InteriorWall.addOrigin(outline, origin);
    this.origin = origin;
    this.id = id;
    this.style = style;
    this.interiorWalls = [];
  }

  draw() {
    this.features.push(this.interiorWalls.push(this.drawLine(this.outline, this.style)));
  }
}
